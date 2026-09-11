import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, Menu, X, Check } from 'lucide-react';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  ['15–20%', 'Typical sucrose range'],
  ['12–18', 'Months to mature'],
  ['#2', 'India in global production'],
  ['90%+', 'High extraction potential']
];

const steps = [
  { n:'01', title:'Harvesting', tag:'CUT & COLLECT', text:'Mature cane is cut close to the ground and moved quickly to the mill.', fact:'Mature stalks generally contain more sucrose.' },
  { n:'02', title:'Crushing & Extraction', tag:'ROLLERS', text:'Powerful rollers crush the stalks and squeeze out the sweet cane juice.', fact:'The dry fibrous residue is called bagasse.' },
  { n:'03', title:'Clarification', tag:'CLEAN THE JUICE', text:'The raw juice is heated and treated so suspended impurities can be removed.', fact:'Cleaner juice improves downstream processing.' },
  { n:'04', title:'Evaporation', tag:'REMOVE WATER', text:'Heat removes water from clarified juice, concentrating it into a thick syrup.', fact:'The solution becomes much more concentrated.' },
  { n:'05', title:'Crystallization', tag:'FORM THE CRYSTALS', text:'Controlled concentration lets sucrose leave the syrup and form crystals.', fact:'Crystal growth depends on concentration and cooling.' },
  { n:'06', title:'CENTRIFUGING & DRYING', tag:'SEPARATE & FINISH', text:'Centrifuges separate crystals from molasses; the crystals are then dried.', fact:'Molasses remains as a useful co-product.' }
];

function makeTextSprite(text, color='#ff9a24') {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.font = '700 28px Arial'; ctx.fillStyle = color; ctx.textAlign = 'center';
  ctx.fillText(text, 256, 76);
  const texture = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({ map:texture, transparent:true });
  const sprite = new THREE.Sprite(mat); sprite.scale.set(3.4,.85,1); return sprite;
}

function makeCane(scene) {
  const g = new THREE.Group();
  const stalkMat = new THREE.MeshStandardMaterial({ color:0x6c9e35, roughness:.65, metalness:.05 });
  const nodeMat = new THREE.MeshStandardMaterial({ color:0xb4cf64, roughness:.5 });
  for (let i=0;i<5;i++) {
    const stalk = new THREE.Mesh(new THREE.CylinderGeometry(.16,.19,3.8,16), stalkMat);
    stalk.position.y = i*0.08; stalk.rotation.z = (i%2 ? .045 : -.045); g.add(stalk);
    for (let j=0;j<7;j++) { const node=new THREE.Mesh(new THREE.TorusGeometry(.19,.025,8,20),nodeMat); node.rotation.x=Math.PI/2; node.position.y=-1.5+j*.5; stalk.add(node); }
  }
  const leafMat = new THREE.MeshStandardMaterial({color:0x3f752d,side:THREE.DoubleSide,roughness:.8});
  for(let i=0;i<6;i++){const leaf=new THREE.Mesh(new THREE.ConeGeometry(.09,.95,12),leafMat);leaf.rotation.z=-1.05+(i%2)*2.1;leaf.rotation.y=i*.9;leaf.position.set((i%2?.28:-.28),1.55-(i%3)*.25,0);g.add(leaf);}
  const ring=new THREE.Mesh(new THREE.TorusGeometry(1.15,.012,8,64),new THREE.MeshBasicMaterial({color:0xff8a18,transparent:true,opacity:.65}));ring.rotation.x=Math.PI/2;ring.position.y=-1.8;g.add(ring);
  g.userData.ring=ring; scene.add(g); return g;
}

function makeCrush(scene){
  const g=new THREE.Group();
  const metal=new THREE.MeshStandardMaterial({color:0x55585b,metalness:.8,roughness:.25});
  for(let i=0;i<4;i++){const r=new THREE.Mesh(new THREE.CylinderGeometry(.65,.65,.5,32),metal);r.rotation.z=Math.PI/2;r.position.set((i-1.5)*.72,0,0);g.add(r);}
  const juice=new THREE.Mesh(new THREE.BoxGeometry(3.3,.08,.45),new THREE.MeshStandardMaterial({color:0xffa51f,emissive:0x6b2e00,emissiveIntensity:.4}));juice.position.y=-.8;g.add(juice);
  const fiber=new THREE.Mesh(new THREE.BoxGeometry(1.6,.16,.5),new THREE.MeshStandardMaterial({color:0xa37a48}));fiber.position.set(1.1,-.55,.1);g.add(fiber);
  scene.add(g);return g;
}
function makeTank(scene){const g=new THREE.Group();const tank=new THREE.Mesh(new THREE.CylinderGeometry(1.25,1.05,2.4,32,1,true),new THREE.MeshStandardMaterial({color:0x777b7c,metalness:.65,roughness:.28,side:THREE.DoubleSide}));g.add(tank);const liquid=new THREE.Mesh(new THREE.CylinderGeometry(1.1,1,1.15,32),new THREE.MeshStandardMaterial({color:0xb97b31,transparent:true,opacity:.9}));liquid.position.y=-.45;g.add(liquid);const top=new THREE.Mesh(new THREE.TorusGeometry(1.25,.07,12,40),new THREE.MeshStandardMaterial({color:0xaaa}));top.position.y=1.2;g.add(top);scene.add(g);return g;}
function makeEvaporator(scene){const g=new THREE.Group();const pan=new THREE.Mesh(new THREE.CylinderGeometry(1.65,1.35,.55,40),new THREE.MeshStandardMaterial({color:0x65686a,metalness:.8,roughness:.25}));g.add(pan);const syrup=new THREE.Mesh(new THREE.CylinderGeometry(1.35,1.2,.2,40),new THREE.MeshStandardMaterial({color:0x9b5d1d,emissive:0x3b1800,emissiveIntensity:.5}));syrup.position.y=.3;g.add(syrup);for(let i=0;i<4;i++){const steam=new THREE.Mesh(new THREE.TorusGeometry(.25,.035,8,20),new THREE.MeshBasicMaterial({color:0xd8d8d8,transparent:true,opacity:.45}));steam.position.set((i-1.5)*.45,.8+Math.abs(i-1.5)*.1,0);steam.rotation.x=Math.PI/2;g.add(steam);}scene.add(g);return g;}
function makeCrystals(scene){const g=new THREE.Group();const mat=new THREE.MeshStandardMaterial({color:0xffc45a,emissive:0x8a3e00,emissiveIntensity:.35,roughness:.25});for(let i=0;i<22;i++){const c=new THREE.Mesh(new THREE.OctahedronGeometry(.14+Math.random()*.13),mat);const a=Math.random()*Math.PI*2,r=.35+Math.random()*.95;c.position.set(Math.cos(a)*r,(Math.random()-.5)*1.3,Math.sin(a)*r);c.rotation.set(Math.random()*3,Math.random()*3,Math.random()*3);g.add(c);}scene.add(g);return g;}
function makeCentrifuge(scene){const g=new THREE.Group();const outer=new THREE.Mesh(new THREE.CylinderGeometry(1.35,1.35,.45,48),new THREE.MeshStandardMaterial({color:0x5d6062,metalness:.85,roughness:.2}));outer.rotation.x=Math.PI/2;g.add(outer);for(let i=0;i<6;i++){const arm=new THREE.Mesh(new THREE.BoxGeometry(1.8,.12,.14),new THREE.MeshStandardMaterial({color:0xffa12b,metalness:.4}));arm.rotation.z=i*Math.PI/3;arm.position.z=.27;g.add(arm);}scene.add(g);return g;}

function ThreeJourney({onStage}) {
  const mount=useRef(null);
  useEffect(()=>{
    const el=mount.current; const scene=new THREE.Scene();
    scene.fog=new THREE.Fog(0xf1ede5,7,18);
    const camera=new THREE.PerspectiveCamera(38,el.clientWidth/el.clientHeight,.1,100);camera.position.set(0,.2,8.5);
    const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));renderer.setSize(el.clientWidth,el.clientHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;el.appendChild(renderer.domElement);
    scene.add(new THREE.HemisphereLight(0xfff6e7,0x5b633e,2.3));const key=new THREE.DirectionalLight(0xffffff,3.5);key.position.set(4,6,6);scene.add(key);const rim=new THREE.PointLight(0xff8a18,35,12);rim.position.set(-3,1,4);scene.add(rim);
    const stages=[makeCane(scene),makeCrush(scene),makeTank(scene),makeEvaporator(scene),makeCrystals(scene),makeCentrifuge(scene)];
    stages.forEach((g,i)=>{g.visible=i===0;g.position.y=.15;g.scale.setScalar(.95)});
    const ground=new THREE.Mesh(new THREE.CircleGeometry(4.2,64),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.35}));ground.rotation.x=-Math.PI/2;ground.position.y=-2.15;scene.add(ground);
    const state={stage:0,scroll:0};
    const setStage=i=>{if(state.stage!==i){state.stage=i;onStage(i);stages.forEach((g,j)=>g.visible=j===i);gsap.fromTo(stages[i].scale,{x:.72,y:.72,z:.72},{x:1,y:1,z:1,duration:.8,ease:'back.out(1.7)'});}};
    const heroTween=gsap.timeline({scrollTrigger:{trigger:'.journey-scroll',start:'top top',end:'bottom bottom',scrub:1.1,onUpdate:self=>{const p=self.progress;const idx=Math.min(5,Math.floor(p*6));setStage(idx);state.scroll=p;}}});
    heroTween.to(camera.position,{z:7.1,duration:.18,ease:'power2.out'},0).to(camera.position,{x:1.2,z:6.3,duration:.18},.18).to(camera.position,{x:-1,z:6.7,duration:.18},.36).to(camera.position,{x:.8,z:6.1,duration:.18},.54).to(camera.position,{x:-.7,z:6.4,duration:.18},.72).to(camera.position,{x:0,z:6.0,duration:.28},.9);
    stages.forEach((g,i)=>heroTween.to(g.rotation,{y:(i+1)*Math.PI*.65,x:i%2?.16:-.1,duration:.16,ease:'power2.inOut'},i/6));
    const clock=new THREE.Clock(); let raf;
    const animate=()=>{const t=clock.getElapsedTime(); if(stages[0].visible){stages[0].rotation.y+=.0025;stages[0].position.y=.15+Math.sin(t*1.2)*.06;stages[0].userData.ring.rotation.z=t*.7;} if(stages[1].visible)stages[1].rotation.z=t*.65;if(stages[2].visible)stages[2].rotation.y=t*.22;if(stages[3].visible)stages[3].rotation.y=t*.18;if(stages[4].visible)stages[4].rotation.y=t*.28;if(stages[5].visible)stages[5].rotation.z=t*1.1;renderer.render(scene,camera);raf=requestAnimationFrame(animate);};animate();
    const resize=()=>{camera.aspect=el.clientWidth/el.clientHeight;camera.updateProjectionMatrix();renderer.setSize(el.clientWidth,el.clientHeight)};window.addEventListener('resize',resize);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);heroTween.scrollTrigger?.kill();heroTween.kill();renderer.dispose();el.removeChild(renderer.domElement);};
  },[onStage]);
  return <div className="three-mount" ref={mount}/>;
}

function App(){
 const [menu,setMenu]=useState(false),[active,setActive]=useState(0);
 const go=id=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenu(false)};
 return <div className="site">
  <nav className="nav"><button className="logo" onClick={()=>go('home')}>CANE<span>/</span>01</button><div className={`nav-links ${menu?'open':''}`}><button onClick={()=>go('home')}>Home</button><button onClick={()=>go('process')}>Process</button><button onClick={()=>go('facts')}>Facts</button></div><button className="menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></nav>
  <main>
   <section className="hero" id="home"><div className="hero-copy"><div className="eyebrow">SUGARCANE PROCESSING / FLIP CLASS 2026</div><h1>From cane<br/><em>to crystal.</em></h1><p>Follow one crop through harvesting, extraction, purification, concentration and crystallization.</p><button className="hero-cta" onClick={()=>go('process')}>Scroll to explore <ArrowDown size={16}/></button></div><div className="hero-stage"><ThreeJourney onStage={setActive}/><div className="model-label">REAL-TIME 3D<br/><b>ORIGIN → PRODUCT</b></div></div></section>
   <section className="stats" id="facts">{stats.map(([n,l],i)=><div className="stat" key={l}><small>0{i+1}</small><strong>{n}</strong><span>{l}</span></div>)}</section>
   <section className="intro"><div className="eyebrow">THE JOURNEY</div><h2>One stalk.<br/><em>Six transformations.</em></h2><p>Keep scrolling. The 3D scene stays with you while the camera, object and information change together.</p></section>
   <section className="journey-scroll" id="process"><div className="journey-pin"><div className="stage-meta"><span>PROCESS / 0{active+1}</span><div className="dots">{steps.map((_,i)=><i className={i===active?'on':''} key={i}/>)}</div></div><div className="stage-copy"><div className="stage-number">{steps[active].n}</div><div className="eyebrow">{steps[active].tag}</div><h2>{steps[active].title}</h2><p>{steps[active].text}</p><div className="fact"><Check size={15}/>{steps[active].fact}</div></div><div className="scroll-hint"><span>SCROLL</span><ArrowDown size={15}/></div></div>{steps.map((s,i)=><div className="scroll-marker" key={s.n}/>)}</section>
   <section className="uses"><div className="eyebrow">BEYOND SUGAR</div><h2>Nothing goes<br/><em>to waste.</em></h2><div className="use-grid"><article><b>01</b><h3>Bagasse</h3><p>Fibrous residue used as fuel and in products such as paper.</p></article><article><b>02</b><h3>Molasses</h3><p>Dark syrup left after sugar crystals are separated.</p></article><article><b>03</b><h3>Jaggery</h3><p>Concentrated cane juice made without refined crystal formation.</p></article><article><b>04</b><h3>Ethanol</h3><p>Fuel alcohol that can be produced from sugar-based feedstocks.</p></article></div></section>
   <section className="closing"><div className="eyebrow">THE TAKEAWAY</div><h2>From green stalk<br/>to <em>golden crystal.</em></h2><p>Plant → harvest → extract → clean → concentrate → crystallize → separate.</p><button onClick={()=>go('home')}>Back to the beginning <ArrowRight size={16}/></button></section>
  </main><footer><span>CANE/01</span><span>Made for Flip Class · 2026</span><span>SUGARCANE PROCESSING</span></footer>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
