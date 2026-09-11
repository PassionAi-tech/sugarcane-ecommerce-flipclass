import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowRight, Check, CircleDot, Factory, Flame, Leaf, Menu, X, Zap } from 'lucide-react';
import './styles.css';

const stats = [['15–20%','Typical sucrose range'],['12–18','Months to mature'],['#2','India in global production'],['90%+','High extraction potential']];
const steps = [
 {n:'01',title:'Harvesting',tag:'CUT & COLLECT',text:'Mature cane is cut close to the ground and moved quickly to the mill.',visual:'harvest',icon:Leaf,fact:'Timing matters: mature stalks hold more sucrose.'},
 {n:'02',title:'Crushing & Extraction',tag:'ROLLERS',text:'Powerful rollers crush the stalks, squeezing out the sweet cane juice.',visual:'crush',icon:Factory,fact:'The fibrous residue is called bagasse.'},
 {n:'03',title:'Clarification',tag:'CLEAN THE JUICE',text:'The raw juice is heated and treated so suspended impurities can be removed.',visual:'clarify',icon:CircleDot,fact:'Cleaner juice gives better downstream processing.'},
 {n:'04',title:'Evaporation',tag:'REMOVE WATER',text:'Heat removes water from the clarified juice, turning it into a concentrated syrup.',visual:'evaporate',icon:Flame,fact:'Less water means a much thicker sugar solution.'},
 {n:'05',title:'Crystallization',tag:'FORM THE CRYSTALS',text:'Under controlled conditions, sucrose leaves the syrup and forms sugar crystals.',visual:'crystal',icon:Zap,fact:'Crystal growth depends on concentration and cooling.'},
 {n:'06',title:'Centrifuging & Drying',tag:'SEPARATE & FINISH',text:'Centrifuges separate crystals from molasses; the crystals are then dried and prepared.',visual:'finish',icon:Check,fact:'Molasses remains as a valuable co-product.'}
];
const products = [
 ['MOLASSES','Dark, thick syrup used in food and fermentation.','01'],['BAGASSE','Fibrous cane residue used as fuel and in paper products.','02'],['JAGGERY','Concentrated cane juice made without forming refined crystals.','03'],['ETHANOL','A fuel alcohol that can be produced from sugar-based feedstocks.','04']
];
function Visual({type}){return <div className={`process-visual visual-${type}`} aria-hidden="true">
 {type==='harvest'&&<><div className="field"/><div className="cane-row">╱╱╱╱╱╱╱</div><div className="harvester">▰━━▰</div><span className="dust-cloud"/></>}
 {type==='crush'&&<><div className="rollers"><i/><i/><i/></div><div className="cane-feed">╱╱╱</div><div className="juice-flow"/><div className="bagasse-out">▰▰▰</div></>}
 {type==='clarify'&&<><div className="clarify-tank"><span>RAW JUICE</span><div/></div><div className="clarify-filter">FILTER</div><div className="clean-line"/></>}
 {type==='evaporate'&&<><div className="evap-pan"><div/></div><div className="steam"><i/><i/><i/></div><span className="heat-label">HEAT ↑</span></>}
 {type==='crystal'&&<><div className="crystal-core">SUCROSE</div>{[1,2,3,4,5,6,7,8].map(i=><i className={`crystal c${i}`} key={i}>✦</i>)}</>}
 {type==='finish'&&<><div className="centrifuge"><div>SPIN</div></div><div className="crystal-stream">✦ ✦ ✦</div><div className="molasses-stream"/></>}
 </div>}
function App(){
 const [menu,setMenu]=useState(false),[active,setActive]=useState(0),[quiz,setQuiz]=useState(null);
 useEffect(()=>{const els=[...document.querySelectorAll('[data-step]')];const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setActive(Number(e.target.dataset.step))}),{rootMargin:'-35% 0px -45% 0px'});els.forEach(e=>obs.observe(e));return()=>obs.disconnect()},[]);
 const go=id=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenu(false)};
 return <div className="site"><div className="noise"/>
 <nav className="nav"><button className="logo" onClick={()=>go('home')}><span>◒</span> CANE<span className="accent">/</span>01</button><div className={`nav-links ${menu?'open':''}`}><button onClick={()=>go('home')}>Home</button><button onClick={()=>go('process')}>Process</button><button onClick={()=>go('facts')}>Facts</button><button onClick={()=>go('uses')}>Uses</button></div><button className="menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></nav>
 <main>
 <section className="hero" id="home"><div className="hero-copy"><div className="overline"><span/> SUGARCANE PROCESSING / FLIP CLASS 2026</div><h1>From cane<br/><em>to crystal.</em></h1><p>A visual journey through the science of sugarcane processing — from a mature stalk in the field to the sugar crystals we know.</p><button className="hero-cta" onClick={()=>go('process')}>Explore the process <ArrowDown size={16}/></button><div className="hero-note"><span>06 stages</span><b/><span>1 crop</span><b/><span>many products</span></div></div><div className="hero-art"><div className="orb"/><div className="grid-lines"/><div className="cane-stalk"><i/><i/><i/><i/><i/></div><div className="hero-chip"><small>ORIGIN</small><strong>SUCROSE<br/>STORED HERE</strong></div><div className="hero-index">SCROLL<br/><ArrowDown size={15}/></div></div></section>
 <section className="stats" id="facts">{stats.map(([num,label],i)=><div className="stat" key={label}><span>0{i+1}</span><strong>{num}</strong><p>{label}</p></div>)}</section>
 <section className="intro"><div className="section-tag">THE JOURNEY</div><h2>One stalk.<br/><em>Six transformations.</em></h2><p>The process uses mechanical separation, heat and controlled crystallization to move from plant material to concentrated sugar.</p></section>
 <section className="process" id="process"><div className="process-head"><div><div className="section-tag">PROCESS / 01—06</div><h2>The making<br/><em>of sugar.</em></h2></div><div className="progress"><span>STAGE {String(active+1).padStart(2,'0')}</span><div>{steps.map((_,i)=><i className={i<=active?'on':''} key={i}/>)}</div></div></div>
 {steps.map((s,i)=>{const Icon=s.icon;return <article className={`step ${i%2?'flip':''}`} data-step={i} key={s.n}><div className="step-copy"><div className="step-no">{s.n}</div><div className="section-tag">{s.tag}</div><h3>{s.title}</h3><p>{s.text}</p><div className="fact-line"><Icon size={17}/><span>{s.fact}</span></div></div><div className="step-card"><div className="card-top"><span>PROCESS VISUAL</span><span>{s.n} / 06</span></div><Visual type={s.visual}/></div></article>})}</section>
 <section className="uses" id="uses"><div className="section-tag">BEYOND SUGAR</div><h2>Every part has<br/><em>a purpose.</em></h2><div className="use-grid">{products.map(([title,text,n])=><article key={title}><span>{n}</span><div className="use-icon">{title==='MOLASSES'?'◐':title==='BAGASSE'?'▤':title==='JAGGERY'?'◆':'⚡'}</div><h3>{title}</h3><p>{text}</p><ArrowRight size={17}/></article>)}</div></section>
 <section className="closing"><div className="section-tag">THE TAKEAWAY</div><h2>From green stalk<br/>to <em>golden crystal.</em></h2><p>Plant → harvest → extract → clean → concentrate → crystallize → separate.</p><button onClick={()=>setQuiz(0)}>Test yourself <ArrowRight size={16}/></button><div className="closing-line"/></section>
 </main><footer><span>◒ CANE/01</span><span>Made for Flip Class · 2026</span><span>SUGARCANE PROCESSING</span></footer>
 {quiz!==null&&<div className="quiz-overlay" onClick={()=>setQuiz(null)}><div className="quiz" onClick={e=>e.stopPropagation()}><button className="quiz-close" onClick={()=>setQuiz(null)}><X/></button><div className="section-tag">QUICK CHECK</div><h3>What forms during crystallization?</h3><div className="answers">{['Sucrose crystals','Bagasse','Fresh leaves'].map(a=><button className={quiz===a?(a==='Sucrose crystals'?'correct':'wrong'):''} onClick={()=>setQuiz(a)} key={a}>{a}{quiz===a&&(a==='Sucrose crystals'?<Check/>:<X/>)}</button>)}</div>{typeof quiz==='string'&&<p className="quiz-result">{quiz==='Sucrose crystals'?'Correct. Sucrose leaves the concentrated syrup and forms crystals.':'Not quite. Crystallization is the stage where sucrose forms crystals.'}</p>}</div></div>}
 </div>}
createRoot(document.getElementById('root')).render(<App/>);
