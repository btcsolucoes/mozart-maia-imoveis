// Boa Viagem-inspired architectural set. Dimensions are scenographic, not a property listing.
export function createCoastalScene(T,scene,renderer){
 const seed=i=>{const n=Math.sin(i*127.1+311.7)*43758.5453;return n-Math.floor(n)};
 const mat=(color,roughness=.6,metalness=0)=>new T.MeshStandardMaterial({color,roughness,metalness});
 const limestone=mat('#f2ebdd',.55),porcelain=mat('#faf8ef',.38),brass=mat('#b99258',.24,.75),navy=mat('#123e57',.35,.35),wood=mat('#a5693e',.72),road=mat('#677583',.94),sand=mat('#efd8a8',1),path=mat('#e9deca',.9),cycle=mat('#c76b60',.9),leaf=mat('#427c46',.85),leafLight=mat('#77a34b',.8);
 const glass=new T.MeshPhysicalMaterial({color:'#78c3dd',metalness:.34,roughness:.15,clearcoat:1,clearcoatRoughness:.08,envMapIntensity:1.5});
 const glassDark=new T.MeshPhysicalMaterial({color:'#357f9d',metalness:.45,roughness:.2,clearcoat:1,envMapIntensity:1.3});
 const balustrade=new T.MeshPhysicalMaterial({color:'#b4e1e5',metalness:.08,roughness:.18,transparent:true,opacity:.45,depthWrite:false});
 const emissive=new T.MeshBasicMaterial({color:'#fff1ce'});
 const windows=new T.MeshStandardMaterial({map:windowTexture(T),color:'#d4e8ec',roughness:.27,metalness:.24,envMapIntensity:.65});
 function facade(parent,x,y,z,w,h,angle=0){const mesh=new T.Mesh(new T.PlaneGeometry(w,h),windows);mesh.position.set(x,y,z);mesh.rotation.y=angle;mesh.receiveShadow=true;parent.add(mesh);}
 const boxGeo=new T.BoxGeometry(1,1,1);
 function box(parent,x,y,z,w,h,d,material){const m=new T.Mesh(boxGeo,material);m.position.set(x,y,z);m.scale.set(w,h,d);m.receiveShadow=true;parent.add(m);return m;}
 const geometries=new Map();
 function rounded(parent,x,y,z,w,h,d,r,material){
  const key=[w,h,d,r].join();let geometry=geometries.get(key);
  if(!geometry){const s=new T.Shape(),a=-w/2,b=-d/2;s.moveTo(a+r,b);s.lineTo(a+w-r,b);s.quadraticCurveTo(a+w,b,a+w,b+r);s.lineTo(a+w,b+d-r);s.quadraticCurveTo(a+w,b+d,a+w-r,b+d);s.lineTo(a+r,b+d);s.quadraticCurveTo(a,b+d,a,b+d-r);s.lineTo(a,b+r);s.quadraticCurveTo(a,b,a+r,b);geometry=new T.ExtrudeGeometry(s,{depth:h,bevelEnabled:false,curveSegments:10});geometry.rotateX(-Math.PI/2);geometry.translate(0,-h/2,0);geometries.set(key,geometry);}
  const m=new T.Mesh(geometry,material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;
 }
 function cylinder(parent,x,y,z,r,h,material){const m=new T.Mesh(new T.CylinderGeometry(r,r,h,32),material);m.position.set(x,y,z);m.castShadow=true;parent.add(m);return m;}
 function plant(parent,x,z,h=8,rotation=0){
  const palm=new T.Group();palm.position.set(x,0,z);palm.rotation.y=rotation;parent.add(palm);
  const curve=new T.CatmullRomCurve3([new T.Vector3(0,0,0),new T.Vector3(.15,h*.35,0),new T.Vector3(.6,h*.72,.1),new T.Vector3(1,h,.2)]);
  const trunk=new T.Mesh(new T.TubeGeometry(curve,14,.12,7,false),wood);trunk.castShadow=true;palm.add(trunk);
  for(let i=0;i<10;i++){
   const angle=i*Math.PI*2/10;const length=2.7+(i%3)*.5;const positions=[],indices=[];
   for(let j=0;j<=14;j++){const t=j/14,reach=t*length,width=Math.sin(t*Math.PI)*.42;const yy=h+.5*Math.sin(t*Math.PI)-t*t*1.55;for(const sign of [-1,1])positions.push(1+Math.cos(angle)*reach+Math.sin(angle)*width*sign,yy,.2+Math.sin(angle)*reach-Math.cos(angle)*width*sign);if(j<14){const q=j*2;indices.push(q,q+1,q+2,q+1,q+3,q+2)}}
   const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setIndex(indices);g.computeVertexNormals();const lm=(i%3?leaf:leafLight).clone();lm.side=T.DoubleSide;const frond=new T.Mesh(g,lm);frond.castShadow=true;palm.add(frond);
  }
 }
 function towerAt(parent,x,z,h,w,d,variant=0){
  const g=new T.Group();g.position.set(x,0,z);parent.add(g);
  const material=[porcelain,limestone,mat('#e7e3de'),mat('#edc9b2')][variant%4];
  rounded(g,0,h/2,0,w*.83,h,d*.8,1.2,variant%2?glass:glassDark);
  // Continuous rounded balconies and recessed glazing produce a residential silhouette.
  for(let y=2.8;y<h;y+=3.3){rounded(g,0,y,0,w,.22,d,Math.min(w*.24,2.1),material);if(variant%3===0)rounded(g,0,y+.67,0,w-.35,1.05,d-.2,1.7,balustrade);}
  for(const xx of [-w*.39,w*.39])rounded(g,xx,h/2,-d*.25,.7,h,d*.5,.22,material);
  rounded(g,0,h+.1,0,w+.25,.45,d+.25,2,material);
  rounded(g,-w*.16,h+1.4,-1,w*.42,2.1,d*.48,1,material);
  return g;
 }
 // A blue sky reflection gives glass and brushed metal a real light environment.
 const ec=document.createElement('canvas');ec.width=1024;ec.height=512;const e=ec.getContext('2d');const eg=e.createLinearGradient(0,0,0,512);eg.addColorStop(0,'#438cca');eg.addColorStop(.32,'#99d4ee');eg.addColorStop(.48,'#e7f5fb');eg.addColorStop(.54,'#fff1d7');eg.addColorStop(.65,'#64bbc8');eg.addColorStop(1,'#3d7990');e.fillStyle=eg;e.fillRect(0,0,1024,512);const sunGlow=e.createRadialGradient(760,140,0,760,140,110);sunGlow.addColorStop(0,'#fff8e9');sunGlow.addColorStop(.3,'#fff3dccc');sunGlow.addColorStop(1,'#ffffff00');e.fillStyle=sunGlow;e.fillRect(0,0,1024,512);const et=new T.CanvasTexture(ec);et.mapping=T.EquirectangularReflectionMapping;et.colorSpace=T.SRGBColorSpace;const pmrem=new T.PMREMGenerator(renderer);scene.environment=pmrem.fromEquirectangular(et).texture;et.dispose();pmrem.dispose();

 const tower=new T.Group();scene.add(tower);
 for(const x of [-6.3,6.3]){
  rounded(tower,x,37.5,-.7,7.8,75,12.3,2,glass);
  facade(tower,x,37.5,5.47,4.9,74.5);
  facade(tower,x+3.92,37.5,-.7,8,74.5,Math.PI/2);
  facade(tower,x-3.92,37.5,-.7,8,74.5,-Math.PI/2);
  for(let f=0;f<=24;f++){const y=f*3.13;rounded(tower,x,y,-.6,9.4,.24,15,2.4,porcelain);rounded(tower,x,y+.67,-.6,9.15,1.04,14.8,2.3,balustrade);}
  rounded(tower,x-2.5,37.5,-2,.34,75,7,.1,limestone);
  rounded(tower,x+2.5,37.5,-2,.34,75,7,.1,limestone);
 }
 rounded(tower,0,38,-3.8,5,76,6,1,limestone);
 rounded(tower,0,76.25,0,23,.6,17,3,porcelain);
 rounded(tower,-4,76.7,-1,8,.45,10,2,new T.MeshPhysicalMaterial({color:'#19bfcf',roughness:.12,metalness:.23,clearcoat:1}));
 rounded(tower,6,77,-1,6,.9,8,1.7,limestone);
 for(let i=0;i<10;i++)box(tower,4+i*.45,79,-1,.14,.13,8,wood);
 for(const x of [4,8])cylinder(tower,x,77.8,-4,.07,2.4,brass);
 for(const x of [-10,10]){const roofPalm=new T.Group();roofPalm.position.y=76.5;plant(roofPalm,x,-3,4.2,x);tower.add(roofPalm);}
 // Central brushed-metal elevator, fitted into a warm stone and timber lobby.
 const cab=new T.Group();cab.position.set(0,71.5,7.9);tower.add(cab);
 box(tower,0,38,6.94,4.85,76,.15,navy);for(const x of [-2.55,2.55])cylinder(tower,x,38,7.65,.075,76,brass);
 const cabinBack=mat('#b6824e',.56,.05);
 box(cab,0,2.25,-.95,4.9,4.75,.18,cabinBack);
 for(let i=0;i<24;i++)box(cab,-2.2+i*.19,2.3,-.83,.055,4.5,.035,wood);
 for(const x of [-2.36,2.36])box(cab,x,2.3,0,.2,4.9,2.2,brass);
 box(cab,0,4.7,0,5,.2,2.35,brass);box(cab,0,.08,.2,5,.16,2.6,limestone);
 box(cab,0,4.48,.1,4.45,.06,1.65,emissive);
 for(const x of [-1.85,1.85])box(cab,x,2.4,-.79,.055,4,.03,emissive);
 const brushed=materialTexture(T,'metal');const doors=new T.MeshPhysicalMaterial({color:'#d5c1a2',metalness:.87,roughness:.32,map:brushed,envMapIntensity:1.1});
 const leftDoor=box(cab,-1.14,2.31,1.19,2.26,4.45,.1,doors),rightDoor=box(cab,1.14,2.31,1.19,2.26,4.45,.1,doors);
 const indicatorCanvas=document.createElement('canvas');indicatorCanvas.width=256;indicatorCanvas.height=128;const indicatorContext=indicatorCanvas.getContext('2d');const indicatorTex=new T.CanvasTexture(indicatorCanvas);indicatorTex.colorSpace=T.SRGBColorSpace;const indicator=new T.Mesh(new T.PlaneGeometry(1.2,.6),new T.MeshBasicMaterial({map:indicatorTex}));indicator.position.set(0,5.12,1.23);cab.add(indicator);
 const light=new T.PointLight('#ffe0ac',6,9);light.position.set(0,4,1);cab.add(light);
 rounded(tower,0,-.25,3,42,.5,39,7,limestone);
 rounded(tower,0,5.8,7.6,23,.32,10,4,porcelain);
 for(const x of [-9,9])cylinder(tower,x,2.8,10,.13,5.6,brass);
 for(const x of [-8,8]){rounded(tower,x,.6,7.5,4,1.2,3.5,1.4,limestone);for(let i=0;i<22;i++){const shrub=new T.Mesh(new T.SphereGeometry(.45+seed(i)*.2,8,6),i%3?leaf:leafLight);shrub.position.set(x+(seed(i+40)-.5)*2.5,1.35+seed(i+30)*.65,7.5+(seed(i+70)-.5)*2);tower.add(shrub);}}
 for(const x of [-15,15])plant(tower,x,7,9,x);
 for(let i=0;i<5;i++)box(tower,-8+i*4,.02,14,.015,.02,8,mat('#cfc9bb'));

 const street=new T.Group();scene.add(street);coast(street);
 const distant=new T.Group();scene.add(distant);
 const city=new T.Group();scene.add(city);city.visible=false;
 const grown=[];
 function coast(parent){
  box(parent,0,-.48,-45,650,.5,150,limestone);
  box(parent,0,-.17,37,650,.16,20,road);
  box(parent,0,-.05,51,650,.08,5,cycle);
  box(parent,0,-.04,61,650,.1,15,path);
  box(parent,0,-.16,84,800,.08,32,sand);
  const oceanMat=new T.MeshPhysicalMaterial({color:'#168daf',metalness:.18,roughness:.2,clearcoat:.8,envMapIntensity:1.2,bumpMap:materialTexture(T,'water'),bumpScale:.18});
  box(parent,0,-.3,365,1400,.08,550,oceanMat);
  box(parent,0,-.22,110,950,.05,22,new T.MeshPhysicalMaterial({color:'#4bc5cf',roughness:.24,metalness:.1,transparent:true,opacity:.86}));
  const foamMat=new T.MeshBasicMaterial({color:'#d9f5ed',transparent:true,opacity:.67,depthWrite:false});
  for(let k=0;k<3;k++){
   const points=[];for(let x=-390;x<=390;x+=8)points.push(new T.Vector3(x,-.14,98+k*9+Math.sin(x*.027+k)*2));
   const wave=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),100,.12+(k%2)*.15,3,false),foamMat);parent.add(wave);
  }
  for(let i=-12;i<=12;i++){box(parent,i*20,-.069,37,7,.025,.15,porcelain);plant(parent,i*22,65,9+(i%3),i*.7);}
  for(let i=-8;i<9;i++){box(parent,i*32,-.005,56,.05,.015,14,mat('#c6bcaa'));}
  for(const x of [-57,59]){cylinder(parent,x,1.5,69,2.7,.13,mat('#e68468'));cylinder(parent,x,.7,69,.1,1.5,brass);}
 }
 return {tower,street,distant,city,grown,cab,leftDoor,rightDoor,indicatorCanvas,indicatorContext,indicatorTex};
}

function windowTexture(T){
 const c=document.createElement('canvas');c.width=512;c.height=2048;const ctx=c.getContext('2d');
 const sky=ctx.createLinearGradient(0,0,512,2048);sky.addColorStop(0,'#c2e7f4');sky.addColorStop(.33,'#6cb0c7');sky.addColorStop(.6,'#90c2ca');sky.addColorStop(1,'#355a67');ctx.fillStyle=sky;ctx.fillRect(0,0,512,2048);
 for(let row=0;row<24;row++)for(let col=0;col<3;col++){
  const x=col*170.67,y=row*85.33;const variation=(row*7+col*3)%11;
  ctx.fillStyle=variation<2?'rgba(245,224,181,.6)':variation<5?'rgba(17,48,62,.44)':'rgba(229,248,253,.16)';ctx.fillRect(x+3,y+3,164,78);
  if(variation<3){ctx.fillStyle='rgba(248,236,212,.45)';for(let a=0;a<10;a++)ctx.fillRect(x+5+a*11,y+4,5,75);}
  ctx.fillStyle='#39535c';ctx.fillRect(x,y,3,86);ctx.fillRect(x,y,171,3);ctx.fillStyle='rgba(229,246,251,.7)';ctx.fillRect(x+4,y,1,85);
 }
 const reflection=ctx.createLinearGradient(0,0,512,0);reflection.addColorStop(0,'#ffffff00');reflection.addColorStop(.65,'#e8f9ff25');reflection.addColorStop(.67,'#ffffff00');ctx.fillStyle=reflection;ctx.fillRect(0,0,512,2048);
 const texture=new T.CanvasTexture(c);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=4;return texture;
}

function materialTexture(T,kind){
 const c=document.createElement('canvas');c.width=512;c.height=512;const ctx=c.getContext('2d');
 if(kind==='metal'){const g=ctx.createLinearGradient(0,0,512,0);g.addColorStop(0,'#b4b6b4');g.addColorStop(.28,'#e4e7e5');g.addColorStop(.58,'#f8f9f4');g.addColorStop(1,'#a7adaa');ctx.fillStyle=g;ctx.fillRect(0,0,512,512);for(let i=0;i<700;i++){ctx.strokeStyle=`rgba(255,255,255,${.02+(i%5)*.012})`;ctx.beginPath();ctx.moveTo(i*.73,0);ctx.lineTo(i*.73,512);ctx.stroke();}}
 else{ctx.fillStyle='#808080';ctx.fillRect(0,0,512,512);for(let j=0;j<64;j++){ctx.strokeStyle=`rgba(255,255,255,${.12+(j%5)*.07})`;ctx.lineWidth=1;ctx.beginPath();for(let i=0;i<=512;i+=4){const y=j*8+Math.sin(i*.07+j)*2.5;if(i===0)ctx.moveTo(i,y);else ctx.lineTo(i,y)}ctx.stroke();}}
 const texture=new T.CanvasTexture(c);texture.wrapS=texture.wrapT=T.RepeatWrapping;texture.repeat.set(kind==='water'?16:1,kind==='water'?16:1);texture.colorSpace=kind==='metal'?T.SRGBColorSpace:T.NoColorSpace;return texture;
}
