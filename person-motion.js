// Continuous articulation of one photographic cutout. No frame-index jumps or ghosted limbs.
// This remains an illustrated performance, not a filmed performance of Mozart.
const rows = [0,.16,.25,.38,.51,.62,.78,.92,1];
function triangle(ctx, image, s, d, alpha) {
  const [a,b,c]=s, [u,v,w]=d;
  const det=(b[0]-a[0])*(c[1]-a[1])-(c[0]-a[0])*(b[1]-a[1]);
  if(Math.abs(det)<.000001)return;
  const m11=((v[0]-u[0])*(c[1]-a[1])-(w[0]-u[0])*(b[1]-a[1]))/det;
  const m12=((v[1]-u[1])*(c[1]-a[1])-(w[1]-u[1])*(b[1]-a[1]))/det;
  const m21=((w[0]-u[0])*(b[0]-a[0])-(v[0]-u[0])*(c[0]-a[0]))/det;
  const m22=((w[1]-u[1])*(b[0]-a[0])-(v[1]-u[1])*(c[0]-a[0]))/det;
  // Overlap clips by one raster pixel. Adjacent anti-aliased edges must not leave
  // transparent triangle seams across the face or suit.
  const center=[(u[0]+v[0]+w[0])/3,(u[1]+v[1]+w[1])/3];
  const expanded=d.map(p=>{const dx=(p[0]-center[0])*240,dy=(p[1]-center[1])*620;const length=Math.hypot(dx,dy)||1;return[p[0]+dx/length/240,p[1]+dy/length/620];});
  ctx.save();ctx.beginPath();expanded.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.closePath();ctx.clip();
  ctx.globalAlpha=alpha;
  ctx.transform(m11,m12,m21,m22,u[0]-m11*a[0]-m21*a[1],u[1]-m12*a[0]-m22*a[1]);
  ctx.drawImage(image,0,0,1,1);ctx.restore();
}
export function createPersonMotion(atlas) {
  const source=document.createElement('canvas');source.width=240;source.height=620;
  const sc=source.getContext('2d',{willReadFrequently:true});sc.drawImage(atlas,673,630,231,592,0,0,240,620);
  const pixels=sc.getImageData(0,0,240,620).data;
  let minX=240,minY=620,maxX=0,maxY=0;
  for(let y=0;y<620;y++)for(let x=0;x<240;x++)if(pixels[(y*240+x)*4+3]>100){minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}
  const frame=document.createElement('canvas');frame.width=240;frame.height=620;
  const fc=frame.getContext('2d',{willReadFrequently:true});fc.drawImage(source,minX,minY,maxX-minX+1,maxY-minY+1,0,0,240,620);
  const alpha=fc.getImageData(0,0,240,620).data;
  // Locate each sole in the actual alpha image, not at an assumed body baseline.
  const soles=[0,1].map(side=>{
    let bottom=0,sum=0,count=0;
    for(let y=500;y<620;y++)for(let x=side*120;x<(side+1)*120;x++)if(alpha[(y*240+x)*4+3]>160)bottom=Math.max(bottom,y);
    for(let y=bottom-2;y<=bottom;y++)for(let x=side*120;x<(side+1)*120;x++)if(alpha[(y*240+x)*4+3]>160){sum+=x;count++;}
    return{x:(sum/count)/240,y:(bottom+1)/620};
  });
  const meshRows=[...new Set([...rows,soles[0].y,soles[1].y])].sort((a,b)=>a-b);
  const columns=[0,soles[0].x,.495,.505,soles[1].x,1];
  const rest=meshRows.flatMap(y=>columns.map(x=>[x,y]));
  const ratio=(maxX-minX+1)/(maxY-minY+1);
  const buffer=document.createElement('canvas');buffer.width=240;buffer.height=800;
  const b=buffer.getContext('2d');let last=-1;
  return function paint(ctx,x,foot,height,walk,motion) {
    const width=height*ratio;
    const contacts=soles.map((sole,index)=>{
      const t=Math.max(0,Math.min(1,(walk-index*.5)/.5));
      const step=t*t*(3-2*t),lift=Math.sin(t*Math.PI)*motion.startHeight*.025;
      const sx=motion.startCenter+(sole.x-.5)*motion.startHeight*ratio;
      const ex=motion.endCenter+(sole.x-.5)*motion.endHeight*ratio;
      const sy=motion.startFoot+(sole.y-1)*motion.startHeight;
      const ey=motion.endFoot+(sole.y-1)*motion.endHeight;
      const ground=sy+(ey-sy)*step,px=sx+(ex-sx)*step;
      return{x:px,ground,lift,dx:(px-(x+(sole.x-.5)*width))/width,dy:(ground-lift-(foot+(sole.y-1)*height))/height};
    });
    const key=Math.round(walk*720);
    if(key!==last){
      last=key;b.setTransform(1,0,0,1,0,0);b.clearRect(0,0,240,800);b.scale(240,620);
      const phase=walk*Math.PI*2,envelope=Math.sin(walk*Math.PI);
      const target=rest.map(([px,py],i)=>{
        const column=i%columns.length,index=column<3?0:1;
        // Below the ankle the entire shoe translates rigidly; only calf/knee bend.
        const leg=Math.max(0,Math.min(1,(py-.62)/.28));
        const arm=Math.exp(-(((py-.49)/.13)**2));
        return[px+contacts[index].dx*leg+(px<.5?-1:1)*envelope*arm*.006*Math.sin(phase),py+contacts[index].dy*leg];
      });
      for(let r=0;r<meshRows.length-1;r++)for(let c=0;c<columns.length-1;c++){
        const stride=columns.length,n=r*stride+c;
        for(const ids of [[n,n+1,n+stride],[n+1,n+stride+1,n+stride]])triangle(b,frame,ids.map(i=>rest[i]),ids.map(i=>target[i]),1);
      }
    }
    contacts.forEach(contact=>{
      const liftRatio=contact.lift/(motion.startHeight*.025);
      ctx.save();ctx.translate(contact.x,contact.ground);ctx.scale(height*(.045+liftRatio*.022),height*(.006+liftRatio*.009));
      const shade=ctx.createRadialGradient(0,0,0,0,0,1);shade.addColorStop(0,`rgba(7,15,19,${.68-liftRatio*.38})`);shade.addColorStop(.45,`rgba(7,15,19,${.4-liftRatio*.24})`);shade.addColorStop(1,'rgba(7,15,19,0)');ctx.fillStyle=shade;ctx.fillRect(-1,-1,2,2);ctx.restore();
    });
    ctx.save();ctx.filter='saturate(.88) brightness(.92)';ctx.drawImage(buffer,x-width/2,foot-height,width,height*800/620);ctx.restore();
  };
}
