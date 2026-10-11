// A continuous photographic camera move reveals Boa Viagem with natural image detail.
export async function createCoastalHorizon(){
 const image=new Image();image.src='./assets/boa-viagem-panorama.webp';await image.decode();
 const canvas=document.createElement('canvas');canvas.className='coastal-horizon';canvas.setAttribute('aria-hidden','true');document.querySelector('.cinematic-sticky').append(canvas);
 const ctx=canvas.getContext('2d');let width=0,height=0;
 const clamp=n=>Math.max(0,Math.min(1,n));
 return function render(p){
  const active=p>=.795;canvas.style.opacity=active?'1':'0';if(!active)return;
  const w=innerWidth,h=innerHeight,dpr=Math.min(devicePixelRatio,1.5);if(width!==w||height!==h){width=w;height=h;canvas.width=w*dpr;canvas.height=h*dpr;}
  const t=clamp((p-.795)/.205),growth=t*t*(3-2*t);
  // Scale continuously as the camera approaches the skyline. No tiled/warped clouds or water.
  const scale=Math.max(w/1942,h/809)*(1+growth*.13);
  const left=(w-1942*scale)*(w<650?.4:.5),top=(h-809*scale)*.7;
  ctx.setTransform(dpr*scale,0,0,dpr*scale,left*dpr,top*dpr);ctx.drawImage(image,0,0);
 };
}
