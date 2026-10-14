// Photographic cutouts are prepared at publication time. Scrolling only moves
// existing layers: no pixel-mask generation or full-screen canvas redraws.
const clamp=value=>Math.max(0,Math.min(1,value));
const ease=value=>value*value*value*(value*(value*6-15)+10);
const DW=1448,DH=543,AVENUE=405;
export async function createSkylineScene(canvas){
  const base=new URL('./assets/motion/',import.meta.url);
  const response=await fetch(new URL('skyline.json',base));
  if(!response.ok)throw new Error('Skyline layers unavailable');
  const {layers,skyColors}=await response.json();
  const nativeScroll=CSS.supports('animation-timeline: --journey')&&CSS.supports('animation-range: contain 10% contain 90%');
  const host=document.createElement('div');host.className='skyline-reveal';host.setAttribute('aria-hidden','true');
  const scene=document.createElement('div');scene.className='skyline-scene';host.append(scene);
  const world=document.createElement('div');world.className='skyline-world';scene.append(world);
  const pending=[];
  function image(name,parent,x,y,w,h){
    const node=new Image();node.alt='';node.decoding='async';node.src=new URL(name,base).href;
    node.style.cssText=`position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;max-width:none`;
    parent.append(node);pending.push(node.decode());return node;
  }
  image('skyline-ground.webp',world,0,0,DW,DH);
  const water=image('skyline-ground.webp',world,0,DH,DW,DH);water.style.transform='scaleY(-1)';
  const towers=document.createElement('div');towers.className='skyline-towers';world.append(towers);
  const nodes=layers.map(layer=>image(layer.name,towers,layer.left,layer.top,layer.width,layer.height));
  if(nativeScroll){
    host.classList.add('native-scroll');
    nodes.forEach((node,i)=>{
      node.classList.add('skyline-tower-native');
      node.style.animationRange=`contain ${(0.705+layers[i].start*.26)*100}% contain ${(0.705+(layers[i].start+.37)*.26)*100}%`;
    });
  }
  image('skyline-palms.webp',world,0,0,DW,DH);
  await Promise.all(pending);
  canvas.after(host);
  let oldWidth=0,oldHeight=0,lastTransition=-1;
  const previous=layers.map(()=>-1);
  function render(width,height,rawProgress,transition){
    if(transition!==lastTransition){
      lastTransition=transition;host.style.visibility=transition>0?'visible':'hidden';
      // Nested transforms reveal the fixed scene without animating a clip-path.
      if(!nativeScroll){
        host.style.transform=`translate3d(0,${(1-transition)*100}%,0)`;
        scene.style.transform=`translate3d(0,${-(1-transition)*100}%,0)`;
      }
    }
    if(width!==oldWidth||height!==oldHeight){
      oldWidth=width;oldHeight=height;
      const scale=width>=900?width/DW:Math.max(width/DW,height/(DH*1.15));
      const x=(width-DW*scale)*(width<700?.47:.5),y=height*.73-AVENUE*scale;
      world.style.transform=`translate3d(${x}px,${y}px,0) scale(${scale})`;
      const stops=Array.from({length:16},(_,i)=>`rgb(${skyColors[i*4]},${skyColors[i*4+1]},${skyColors[i*4+2]}) ${((x+DW*scale*i/15)/width)*100}%`);
      scene.style.background=`linear-gradient(90deg,${stops.join(',')})`;
    }
    const heights=layers.map((layer,i)=>{
      const amount=ease(clamp((rawProgress-layer.start)/.37));
      if(!nativeScroll&&amount!==previous[i]){
        previous[i]=amount;
        nodes[i].style.transform=`translate3d(0,${layer.height*(1-amount)}px,0)`;
        nodes[i].style.visibility=amount>0?'visible':'hidden';
        nodes[i].style.willChange=amount>0&&amount<1?'transform':'auto';
      }
      return amount;
    });
    return {complete:heights.filter(v=>v>=.999).length,meanHeight:heights.reduce((a,b)=>a+b,0)/layers.length};
  }
  return {render,totalBuildings:layers.length};
}
