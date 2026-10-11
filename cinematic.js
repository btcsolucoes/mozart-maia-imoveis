import * as THREE from './assets/vendor/three.module.js';
import {createCoastalScene} from './coastal-scene.js';
import {createCoastalHorizon} from './coastal-horizon.js';

// Every scene is a pure function of scroll progress. No timed elevator or door events.
const section=document.getElementById('jornada');
const canvas=document.getElementById('city-canvas');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const mobile=()=>innerWidth<=650;
const clamp=(n,a=0,b=1)=>Math.min(b,Math.max(a,n));
const segment=(p,a,b)=>clamp((p-a)/(b-a));
const smooth=t=>t*t*(3-2*t);
const ease=t=>t<.5?4*t*t*t:1-((-2*t+2)**3)/2;
const lerp=(a,b,t)=>a+(b-a)*t;
let renderer,scene,camera,active=true,sceneProgress=0,scheduled=false,viewportHeight=innerHeight;
let initialization,refreshScene=()=>{};
const motionEnabled=()=>!reduced.matches&&!document.documentElement.classList.contains('motion-off');
async function syncMotion(){
 const enabled=motionEnabled();section.classList.toggle('fallback',!enabled);
 if(!enabled){document.querySelector('.site-header').classList.remove('cinematic-header');return;}
 if(!initialization)initialization=init().catch(error=>{console.warn('Cinematic unavailable; showing full landing page.',error);section.classList.add('failed');});
 await initialization;refreshScene();
}
document.addEventListener('mozart:motionchange',syncMotion);
reduced.addEventListener('change',syncMotion);
await syncMotion();

async function init(){
 renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,mobile()?1.5:1.8));
 renderer.setSize(innerWidth,innerHeight);
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;renderer.setClearColor(0x000000,0);
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 scene=new THREE.Scene();scene.fog=new THREE.FogExp2('#d1ecf5',.0015);
 camera=new THREE.PerspectiveCamera(43,innerWidth/innerHeight,.15,800);
 scene.add(new THREE.HemisphereLight('#dcf1ff','#b8a988',1.7));
 const sun=new THREE.DirectionalLight('#ffe9c6',2.5);sun.position.set(-50,120,75);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-45,right:45,top:90,bottom:-15,near:1,far:250});sun.shadow.bias=-.00035;sun.shadow.normalBias=.09;sun.shadow.radius=3;scene.add(sun);
 const fill=new THREE.DirectionalLight('#a8dfff',.65);fill.position.set(90,75,-40);scene.add(fill);

 const {tower,street,distant,city,grown,cab,leftDoor,rightDoor,indicatorCanvas,indicatorContext,indicatorTex}=createCoastalScene(THREE,scene,renderer);
 let lastFloor=-1;
 const renderHorizon=await createCoastalHorizon();

 const atlas=await new THREE.TextureLoader().loadAsync('./assets/mozart-walk-atlas.png');atlas.colorSpace=THREE.SRGBColorSpace;atlas.repeat.set(.25,.5);atlas.offset.set(.75,0);atlas.magFilter=THREE.LinearFilter;atlas.minFilter=THREE.LinearFilter;atlas.generateMipmaps=false;
 const personMaterial=new THREE.SpriteMaterial({map:atlas,transparent:true,alphaTest:.15,depthWrite:false});
 const person=new THREE.Sprite(personMaterial);person.scale.set(1.88,3.76,1);person.position.set(0,1.98,8.2);person.visible=false;scene.add(person);
 // A small soft floor contact shadow grounds the generated transparent character.
 const shadowCanvas=document.createElement('canvas');shadowCanvas.width=128;shadowCanvas.height=128;const sc=shadowCanvas.getContext('2d');const grad=sc.createRadialGradient(64,64,2,64,64,60);grad.addColorStop(0,'rgba(5,25,20,.46)');grad.addColorStop(1,'rgba(5,25,20,0)');sc.fillStyle=grad;sc.fillRect(0,0,128,128);
 const shadow=new THREE.Mesh(new THREE.PlaneGeometry(2.4,1.5),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(shadowCanvas),transparent:true,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.y=.145;shadow.visible=false;scene.add(shadow);

 const copy=[...document.querySelectorAll('[data-scene-copy]')];const floorDisplay=document.querySelector('.floor-display');const floorNum=document.getElementById('floor-number');const floorStatus=document.getElementById('floor-status');const shade=document.querySelector('.cinematic-shading');const wipe=document.querySelector('.cinematic-transition');const facts=[...document.querySelectorAll('.city-fact')];
 const ranges={roof:[0,.02,.125,.20],descent:[.20,.255,.48,.555],welcome:[.61,.655,.72,.775],city:[.8,.85,1,1.1]};
 const alphaRange=(p,[a,b,c,d])=>smooth(segment(p,a,b))*(1-smooth(segment(p,c,d)));
 function setCamera(pos,target){camera.position.set(...pos);camera.lookAt(...target);}
 function blendVec(a,b,t){return a.map((v,i)=>lerp(v,b[i],t));}
 function renderProgress(p){
  sceneProgress=p;const m=mobile();const descent=ease(segment(p,.245,.56));const cabY=lerp(71.5,.15,descent);cab.position.y=cabY;
  const floor=Math.max(0,Math.round(24*(1-descent)));
  const doorOpen=p>=.60?smooth(segment(p,.60,.663)):0;
  leftDoor.position.x=-1.14-doorOpen*2.25;rightDoor.position.x=1.14+doorOpen*2.25;
  const walk=segment(p,.668,.73);person.visible=p>=.6&&p<.792;person.position.set(lerp(0,.55,walk),lerp(.31,.15,smooth(walk)),lerp(8.3,12.4,smooth(walk)));person.scale.set(1.88,3.76,1);
  let frame=7;if(walk>0&&walk<.91)frame=Math.floor(walk*18)%6;else if(walk>=.91&&walk<.97)frame=6;
  atlas.offset.set((frame%4)*.25,(1-Math.floor(frame/4))*.5);
  // Anchor each atlas pose at its opaque shoe baseline, so the feet meet the plaza.
  person.center.set(.5,1-[593,589,591,594,586,589,582,583][frame]/627);
  shadow.visible=person.visible;shadow.position.x=person.position.x;shadow.position.z=person.position.z;
  if(lastFloor!==floor){indicatorContext.fillStyle='#102f46';indicatorContext.fillRect(0,0,256,128);indicatorContext.fillStyle='#effcff';indicatorContext.font='500 76px sans-serif';indicatorContext.textAlign='center';indicatorContext.fillText(floor===0?'T':String(floor).padStart(2,'0'),128,91);indicatorTex.needsUpdate=true;lastFloor=floor;floorNum.textContent=floor===0?'T':String(floor).padStart(2,'0');}
  floorStatus.textContent=floor===0?(p<.60?'TÉRREO / CHEGAMOS':p<.668?'PORTAS ABRINDO':'BEM-VINDO'):'DESCENDO / PORTAS FECHADAS';
  const aimX=m?0:-3.2;
  const nearPos=[m?0:1.0,cabY+(m?3.15:3.5),m?24:21];const nearAim=[aimX,cabY+(m?4.0:2.6),8.0];
  if(p<.245){const t=ease(segment(p,.01,.235));setCamera(blendVec(m?[37,108,91]:[43,108,76],[nearPos[0],75,nearPos[2]],t),blendVec(m?[0,72,0]:[-15,64,0],[aimX,m?75.5:74.1,8],t));}
  else if(p<.73){setCamera(nearPos,nearAim);}
  else if(p<.8){const t=smooth(segment(p,.73,.8));setCamera(blendVec(nearPos,[54,34,79],t),blendVec(nearAim,[-8,20,0],t));}
  else{const t=smooth(segment(p,.8,1));setCamera(m?[125,63,191]:[145-t*12,61-t*8,171-t*10],m?[0,23,28]:[0,12,37]);}
  tower.visible=p<.795;street.visible=p>.15&&p<.795;distant.visible=false;city.visible=false;
  renderHorizon(p);
  grown.forEach(({group,start})=>{group.scale.y=Math.max(.008,ease(segment(p,start,start+.095)));});
  copy.forEach(el=>{const key=el.dataset.sceneCopy;let a=alphaRange(p,ranges[key]);if(key==='roof'&&p<.02)a=1;el.style.opacity=a;el.style.transform=`translateY(${(1-a)*24}px)`;el.setAttribute('aria-hidden',a<.12?'true':'false');});
  const floorAlpha=alphaRange(p,[.18,.25,.715,.78]);floorDisplay.style.opacity=floorAlpha;floorDisplay.setAttribute('aria-hidden',floorAlpha<.1?'true':'false');
  facts.forEach((el,i)=>{let a=smooth(segment(p,.855+i*.052,.885+i*.052));if(m&&i<2)a*=1-smooth(segment(p,.916+i*.05,.936+i*.05));el.style.opacity=a;el.style.transform=`translateY(${(1-a)*45}px)`;el.classList.toggle('visible',a>.7);el.inert=a<.7;el.setAttribute('aria-hidden',a<.2?'true':'false');});
  const flash=Math.max(0,1-Math.abs(p-.795)/.026);wipe.style.opacity=flash*.97;
  shade.style.opacity=p>.795?.78:1;
  section.style.setProperty('--coast-pan',`${-p*2}%`);
  section.style.setProperty('--coast-scale',1.02+p*.035);
  document.querySelector('.cinematic-progress span').style.transform=`scaleX(${p})`;
  document.querySelector('.cinematic-scene-label').textContent=p<.245?'01 / O HORIZONTE':p<.60?'02 / A DESCIDA':p<.79?'03 / O ENCONTRO':'04 / NOVAS POSSIBILIDADES';
  // Read-only diagnostic state for accessibility/sequence regression checks.
  section.dataset.progress=p.toFixed(4);section.dataset.floor=String(floor);section.dataset.doorOpen=doorOpen.toFixed(3);section.dataset.walk=walk.toFixed(3);section.dataset.scene=p<.795?'elevator':'city';
  renderer.render(scene,camera);
 }
 let offset=0,span=1;
 function measure(){viewportHeight=innerHeight;renderer.setPixelRatio(Math.min(devicePixelRatio,mobile()?1.5:1.8));renderer.setSize(innerWidth,viewportHeight);camera.aspect=innerWidth/viewportHeight;camera.fov=mobile()?48:43;camera.updateProjectionMatrix();offset=section.getBoundingClientRect().top+scrollY;span=section.offsetHeight-viewportHeight;}
 function draw(){scheduled=false;if(!motionEnabled()||section.classList.contains('failed')){document.querySelector('.site-header').classList.remove('cinematic-header');return;}if(!active)return;const y=scrollY;const inSequence=y<offset+span+viewportHeight;document.querySelector('.site-header').classList.toggle('cinematic-header',inSequence&&y>=offset);if(inSequence)renderProgress(clamp((y-offset)/span));}
 function requestDraw(){if(!scheduled){scheduled=true;requestAnimationFrame(draw);}}
 refreshScene=()=>{measure();requestDraw();};
 section.classList.add('ready');measure();renderProgress(0);draw();
 addEventListener('scroll',requestDraw,{passive:true});addEventListener('resize',()=>{measure();requestDraw();},{passive:true});
 // Loading fonts may change the page, but sequence dimensions depend only on viewport.
 document.fonts.ready.then(()=>{measure();requestDraw();});
 document.addEventListener('visibilitychange',()=>{active=!document.hidden;if(active)requestDraw();});
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();section.classList.add('failed');document.querySelector('.site-header').classList.remove('cinematic-header');});
}
