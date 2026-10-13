import {createBuildingScene} from './building-scene.js?v=6.3';
import {createSkylineScene} from './skyline-scene.js?v=6.3';
const section=document.getElementById('jornada'),canvas=document.getElementById('city-canvas');
const ctx=canvas.getContext('2d',{alpha:false});
const compact=matchMedia('(max-height:500px)');
const copy=[...section.querySelectorAll('[data-scene-copy]')];
const facts=[...section.querySelectorAll('.city-fact')];
const indicator=section.querySelector('.lift-indicator');
const clamp=x=>Math.max(0,Math.min(1,x));
const segment=(p,a,b)=>clamp((p-a)/(b-a));
const smooth=x=>x*x*(3-2*x);
let building,skyline,plates,trigger,scrub,width=1,height=1,progress=0;
const motionOff=()=>compact.matches||document.documentElement.classList.contains('motion-off');
function load(src){return new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=reject;image.src=src;});}
function visibility(el,amount,offset=18){
  el.style.opacity=amount;el.style.transform=`translate3d(0,${(1-amount)*offset}px,0)`;
  el.style.visibility=amount<.01?'hidden':'visible';el.inert=amount<.7;el.setAttribute('aria-hidden',amount<.2?'true':'false');
}
function render(p){
  progress=p;if(!building)return;
  const dpr=Math.min(devicePixelRatio,1.6);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.globalAlpha=1;ctx.imageSmoothingQuality='high';
  const transition=smooth(segment(p,.655,.71));
  let metrics;
  if(transition<1){ctx.save();ctx.translate(0,-transition*height*.12);metrics=building.render(ctx,width,height,p);ctx.restore();}
  let city;
  if(transition>0){
    ctx.save();ctx.beginPath();ctx.rect(0,height*(1-transition),width,height*transition+1);ctx.clip();
    if(skyline)city=skyline.render(ctx,width,height,segment(p,.705,.965));
    else {const scale=Math.max(width/plates.city.width,height/plates.city.height);ctx.drawImage(plates.city,(width-plates.city.width*scale)/2,(height-plates.city.height*scale)/2,plates.city.width*scale,plates.city.height*scale);}
    ctx.restore();
  }
  const ranges={roof:1-smooth(segment(p,.065,.115)),descent:smooth(segment(p,.17,.20))*(1-smooth(segment(p,.325,.355))),welcome:smooth(segment(p,.568,.59))*(1-smooth(segment(p,.635,.66))),city:smooth(segment(p,.735,.765))};
  copy.forEach(el=>visibility(el,ranges[el.dataset.sceneCopy]));
  facts.forEach((el,i)=>visibility(el,smooth(segment(p,.80+i*.075,.835+i*.075))));
  const show=metrics? smooth(segment(p,.445,.47))*(1-transition):0;
  indicator.style.opacity=show;indicator.style.visibility=show>.1?'visible':'hidden';
  indicator.textContent=window.MozartI18n?.language==='en'?'G':window.MozartI18n?.language==='es'?'PB':'T';
  if(metrics)indicator.style.transform=`translate(${metrics.opening.x}px,${metrics.opening.y-29}px) translateX(-50%)`;
  section.dataset.progress=p.toFixed(4);section.dataset.scene=p<.13?'roof':p<.445?'descent':p<.71?'lobby':'city';
  section.dataset.floor=String(metrics?.floor||0);section.dataset.doorOpen=(metrics?.door??1).toFixed(3);section.dataset.walk=(metrics?.walk??1).toFixed(3);
  section.dataset.detail=String(metrics?.closeup??false);section.dataset.carY=(metrics?.carY??.9175).toFixed(4);section.dataset.buildings=String(city?.complete||0);section.dataset.skylineGrowth=(city?.meanHeight||0).toFixed(4);
  section.style.setProperty('--film-progress',p);section.style.setProperty('--photo-shade',p<.115?.90:p>.71?.82:.72);
}
function measure(){const b=canvas.getBoundingClientRect();width=Math.max(1,b.width);height=Math.max(1,b.height);const dpr=Math.min(devicePixelRatio,1.6);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);render(progress);}
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
  const [facade,elevator,person,city,cabin,entrance,cityScene]=await Promise.all([load('assets/tower-coast-v6.webp'),load('assets/elevator-frames.webp'),load('assets/mozart-photo-atlas.png'),load('assets/recife.webp'),load('assets/cabin-coast-v6.webp'),load('assets/entrance-coast-v6.webp'),createSkylineScene().catch(()=>null)]);
  plates={facade,elevator,person,city,cabin,entrance};building=createBuildingScene(plates);skyline=cityScene;section.classList.add('ready');syncMotion();
}catch(error){section.classList.add('is-static','failed');console.warn('A cena estática permanece disponível.',error);}
new ResizeObserver(measure).observe(canvas);
document.addEventListener('mozart:motionchange',syncMotion);
document.addEventListener('mozart:languagechange',()=>{render(progress);requestAnimationFrame(()=>trigger?.refresh());});
compact.addEventListener('change',syncMotion);document.fonts.ready.then(()=>trigger?.refresh());
addEventListener('pagehide',e=>{if(!e.persisted){scrub?.kill();trigger?.kill();}});
addEventListener('pageshow',e=>{if(e.persisted)syncMotion();});
