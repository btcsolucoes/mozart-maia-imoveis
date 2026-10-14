import {createPersonMotion} from './person-motion.js?v=6.7';
const clamp=x=>Math.max(0,Math.min(1,x));
const range=(p,a,b)=>clamp((p-a)/(b-a));
const ease=x=>x*x*(3-2*x);
const mix=(a,b,t)=>a+(b-a)*t;
function travel(t){const a=.16;if(t<a)return t*t/(2*a*(1-a));if(t>1-a)return 1-(1-t)**2/(2*a*(1-a));return(t-a/2)/(1-a);}

export function createBuildingScene(plates,backdrop){
  const {facade,entrance,elevator,person,cabin}=plates;
  const iw=facade.width,ih=facade.height;
  // Crops and color treatments are prepared at publication time.
  const car=cabin,interior=elevator;
  const paintPerson=createPersonMotion(person);
  // Landmarks in one coastal building: the guide rails end behind its entrance canopy.
  const opening={x:649,y:1286,w:39,h:86};
  const sourceDoor={x:1105,y:156,w:200,h:473};
  const detailScale=opening.h/sourceDoor.h,detailScaleX=opening.w/sourceDoor.w;
  const detail={x:opening.x-sourceDoor.x*detailScaleX,y:opening.y-sourceDoor.y*detailScale,w:entrance.width*detailScaleX,h:entrance.height*detailScale};
  const world=document.createElement('div');world.className='building-world';
  facade.style.cssText=`position:absolute;left:0;top:0;width:${iw}px;height:${ih}px;max-width:none`;
  entrance.style.cssText=`position:absolute;left:${detail.x}px;top:${detail.y}px;width:${detail.w}px;height:${detail.h}px;max-width:none;visibility:hidden`;
  world.append(facade,entrance);backdrop.append(world);
  let previousDetail=false;
  function render(ctx,w,h,p){
    const trip=travel(range(p,.13,.395)),arrive=ease(range(p,.385,.475));
    const door=ease(range(p,.485,.54)),walk=ease(range(p,.55,.64));
    const carH=86,carW=45,cx=668,carFoot=mix(220,opening.y+opening.h,trip);
    const wide=Math.max(w/iw,h/(ih*.82));
    const close=wide*(w<700?1.85:1.25);
    const zoom=ease(range(p,.015,.13)),trackingScale=mix(wide,close,zoom);
    const landingScale=Math.min(h*(w<700?.56:.60)/opening.h,w*.60/opening.w);
    const cameraScale=mix(trackingScale,landingScale,arrive);
    const trackingFocal=mix(w<700?.67:.67,w<700?.62:.72,zoom);
    const focal=mix(trackingFocal,w<700?.5:.69,arrive);
    const upperY=mix(0,h*.44-(carFoot-carH/2)*trackingScale,zoom);
    let x=w*focal-cx*cameraScale,y=mix(upperY,h*.15-opening.y*landingScale,arrive);
    x=Math.min(0,Math.max(w-iw*cameraScale,x));y=Math.min(0,Math.max(h-ih*cameraScale,y));
    const view={left:-x/cameraScale,top:-y/cameraScale,right:(w-x)/cameraScale,bottom:(h-y)/cameraScale};
    // A full-frame matched architectural close-up supplies extra detail only once
    // its bounds enclose the camera. There is no feathered hall inset or dissolve.
    const closeup=arrive>.15&&view.left>=detail.x&&view.top>=detail.y&&view.right<=detail.x+detail.w&&view.bottom<=detail.y+detail.h;
    ctx.save();ctx.translate(x,y);ctx.scale(cameraScale,cameraScale);
    world.style.transform=`translate3d(${x}px,${y}px,0) scale(${cameraScale})`;
    if(closeup!==previousDetail){facade.style.visibility=closeup?'hidden':'visible';entrance.style.visibility=closeup?'visible':'hidden';previousDetail=closeup;}
    if(trip<1){
      ctx.save();ctx.beginPath();ctx.rect(636,82,64,1181);ctx.clip();
      ctx.strokeStyle='rgba(7,18,26,.6)';ctx.lineWidth=.7;ctx.beginPath();
      [-5,5].forEach(offset=>{ctx.moveTo(cx+offset,82);ctx.lineTo(cx+offset,carFoot-carH);});ctx.stroke();
      ctx.drawImage(car,cx-carW/2,carFoot-carH,carW,carH);
      // The facade glazing reflects the environment across the moving car.
      ctx.globalAlpha=.24;
      ctx.drawImage(facade,cx-carW/2,carFoot-carH,carW,carH,cx-carW/2,carFoot-carH,carW,carH);
      ctx.globalAlpha=1;
      [649,683].forEach(rail=>ctx.drawImage(facade,rail,82,2,1181,rail,82,2,1181));
      ctx.restore();
    }
    if(door>0){
      ctx.save();ctx.beginPath();ctx.rect(opening.x,opening.y,opening.w,opening.h);ctx.clip();
      ctx.drawImage(interior,opening.x,opening.y,opening.w,opening.h);
      ctx.restore();
      const bodyH=opening.h*mix(.78,.91,walk),foot=opening.y+opening.h*mix(.995,1.14,walk);
      const center=opening.x+opening.w*mix(.5,.53,walk);
      paintPerson(ctx,center,foot,bodyH,walk,{
        startCenter:opening.x+opening.w*.5,endCenter:opening.x+opening.w*.53,
        startFoot:opening.y+opening.h*.995,endFoot:opening.y+opening.h*1.14,
        startHeight:opening.h*.78,endHeight:opening.h*.91
      });
      ctx.save();ctx.beginPath();ctx.rect(opening.x,opening.y,opening.w,opening.h);ctx.clip();
      const dx=opening.w*.5*door;
      ctx.drawImage(entrance,sourceDoor.x,sourceDoor.y,sourceDoor.w/2,sourceDoor.h,opening.x-dx,opening.y,opening.w/2+.05,opening.h);
      ctx.drawImage(entrance,sourceDoor.x+sourceDoor.w/2,sourceDoor.y,sourceDoor.w/2,sourceDoor.h,opening.x+opening.w/2+dx,opening.y,opening.w/2+.05,opening.h);
      ctx.restore();
    }
    ctx.restore();
    return{trip,floor:Math.max(0,Math.ceil(18*(1-trip)-.00001)),door,walk,carY:carFoot/ih,closeup,opening:{x:x+(opening.x+opening.w/2)*cameraScale,y:y+opening.y*cameraScale,w:opening.w*cameraScale,h:opening.h*cameraScale}};
  }
  return{render};
}
