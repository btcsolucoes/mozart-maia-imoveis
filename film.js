import {createBuildingScene} from './building-scene.js?v=6.6';
import {createSkylineScene} from './skyline-scene.js?v=6.6';
const section=document.getElementById('jornada'),canvas=document.getElementById('city-canvas');
const ctx=canvas.getContext('2d',{alpha:true});
const backdrop=document.createElement('div');backdrop.className='building-backdrop';backdrop.setAttribute('aria-hidden','true');canvas.before(backdrop);
const compact=matchMedia('(max-height:500px)');
const copy=[...section.querySelectorAll('[data-scene-copy]')];
const facts=[...section.querySelectorAll('.city-fact')];
const indicator=section.querySelector('.lift-indicator');
const clamp=x=>Math.max(0,Math.min(1,x));
const segment=(p,a,b)=>clamp((p-a)/(b-a));
const smooth=x=>x*x*(3-2*x);
let building,skyline,plates,trigger,scrub,width=1,height=1,progress=0,dpr=1;
const visualState=new WeakMap();
const motionOff=()=>compact.matches||document.documentElement.classList.contains('motion-off');
function load(src){return new Promise((resolve,reject)=>{const image=new Image();image.decoding='async';image.onload=()=>resolve(image);image.onerror=reject;image.src=src;});}
function visibility(el,amount,offset=18){
  amount=Math.round(amount*1000)/1000;if(visualState.get(el)===amount)return;visualState.set(el,amount);
  el.style.opacity=amount;el.style.transform=`translate3d(0,${(1-amount)*offset}px,0)`;
  el.style.visibility=amount<.01?'hidden':'visible';el.inert=amount<.7;el.setAttribute('aria-hidden',amount<.2?'true':'false');
}
function render(p){
  progress=p;if(!building)return;
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.globalAlpha=1;ctx.clearRect(0,0,width,height);ctx.imageSmoothingQuality='high';
  const transition=smooth(segment(p,.655,.71));
  backdrop.style.visibility=transition<1?'visible':'hidden';backdrop.style.transform=`translate3d(0,${-transition*height*.12}px,0)`;
  let metrics;
  if(transition<1){ctx.save();ctx.translate(0,-transition*height*.12);metrics=building.render(ctx,width,height,p);ctx.restore();}
  let city;
  if(transition>0){
    ctx.save();ctx.beginPath();ctx.rect(0,height*(1-transition),width,height*transition+1);ctx.clip();
    if(skyline)city=skyline.render(ctx,width,height,segment(p,.705,.965));
    else {ctx.fillStyle='#103d54';ctx.fillRect(0,0,width,height);}
    ctx.restore();
  }
  const ranges={roof:1-smooth(segment(p,.065,.115)),descent:smooth(segment(p,.17,.20))*(1-smooth(segment(p,.325,.355))),welcome:smooth(segment(p,.568,.59))*(1-smooth(segment(p,.635,.66))),city:smooth(segment(p,.735,.765))};
  copy.forEach(el=>visibility(el,ranges[el.dataset.sceneCopy]));
  facts.forEach((el,i)=>visibility(el,smooth(segment(p,.80+i*.075,.835+i*.075))));
  const show=metrics? smooth(segment(p,.445,.47))*(1-transition):0;
  indicator.style.opacity=show;indicator.style.visibility=show>.1?'visible':'hidden';
  const floorLabel=window.MozartI18n?.language==='en'?'G':window.MozartI18n?.language==='es'?'PB':'T';
  if(indicator.textContent!==floorLabel)indicator.textContent=floorLabel;
  if(metrics)indicator.style.transform=`translate(${metrics.opening.x}px,${metrics.opening.y-29}px) translateX(-50%)`;
  // Diagnostics stay off the DOM: progress attributes/custom properties caused
  // whole-scene style invalidations on every animation frame.
  section.sceneState={progress:p,scene:p<.13?'roof':p<.445?'descent':p<.71?'lobby':'city',floor:metrics?.floor||0,doorOpen:metrics?.door??1,walk:metrics?.walk??1,detail:metrics?.closeup??false,buildings:city?.complete||0,skylineGrowth:city?.meanHeight||0};
  section.style.setProperty('--photo-shade',p<.115?.90:p>.71?.82:.72);
}
function measure(){
  const bounds=canvas.getBoundingClientRect();width=Math.max(1,bounds.width);height=Math.max(1,bounds.height);
  dpr=Math.min(devicePixelRatio,width<700?1.5:2,Math.max(1,Math.sqrt(5000000/(width*height))));
  const nextWidth=Math.round(width*dpr),nextHeight=Math.round(height*dpr);
  if(canvas.width!==nextWidth||canvas.height!==nextHeight){canvas.width=nextWidth;canvas.height=nextHeight;}
  render(progress);
}
function syncMotion(){
  scrub?.kill();trigger?.kill();scrub=trigger=null;
  const oldHeight=section.offsetHeight,oldY=scrollY,top=section.getBoundingClientRect().top+oldY;
  const below=oldY>top+oldHeight-innerHeight;
  const off=motionOff()||!building||!window.ScrollTrigger;
  section.classList.toggle('is-static',off);measure();
  if(below)scrollTo({top:oldY+section.offsetHeight-oldHeight,behavior:'instant'});
  else if(off&&oldY>top)scrollTo({top:Math.max(0,top-80),behavior:'instant'});
  if(off){render(0);return;}
  gsap.registerPlugin(ScrollTrigger);const clock={value:0};
  scrub=gsap.to(clock,{value:1,ease:'none',onUpdate:()=>render(clock.value),scrollTrigger:{trigger:section,start:'top top',end:'bottom bottom',scrub:.24,invalidateOnRefresh:true,onRefresh:t=>{measure();render(t.progress);}}});
  trigger=scrub.scrollTrigger;trigger.refresh();
}
try{
  const [facade,elevator,person,city,cabin,entrance,cityScene]=await Promise.all([load('assets/tower-coast-v65.webp'),load('assets/elevator-frames.webp'),load('assets/mozart-atlas-v65.webp'),Promise.resolve(null),load('assets/cabin-coast-v6.webp'),load('assets/entrance-detail-v65.webp'),createSkylineScene().catch(()=>null)]);
  plates={facade,elevator,person,city,cabin,entrance};building=createBuildingScene(plates,backdrop);skyline=cityScene;section.classList.add('ready');syncMotion();
}catch(error){section.classList.add('is-static','failed');console.warn('A cena estática permanece disponível.',error);}
new ResizeObserver(measure).observe(canvas);
document.addEventListener('mozart:motionchange',syncMotion);
document.addEventListener('mozart:languagechange',()=>{render(progress);requestAnimationFrame(()=>trigger?.refresh());});
compact.addEventListener('change',syncMotion);document.fonts.ready.then(()=>trigger?.refresh());
addEventListener('pagehide',e=>{if(!e.persisted){scrub?.kill();trigger?.kill();}});
addEventListener('pageshow',e=>{if(e.persisted)syncMotion();});
