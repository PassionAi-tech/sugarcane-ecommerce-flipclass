import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowRight, Check, Droplets, Factory, Leaf, Menu, Sprout, Sun, Truck, X, Zap } from 'lucide-react';
import './styles.css';

const stages = [
  { no: '01', title: 'Planting the cane', tag: 'FIELD', text: 'Sugarcane begins as a healthy stalk section planted in warm, fertile soil. Farmers choose strong planting material so new shoots can develop.', icon: Sprout, fact: 'Sugarcane is a grass — not a tree.', visual: 'plant' },
  { no: '02', title: 'Sun + water + growth', tag: 'GROW', text: 'Leaves capture sunlight through photosynthesis. Water and nutrients help the crop build biomass while sugars are stored in the growing stalk.', icon: Sun, fact: 'Photosynthesis turns light energy into chemical energy.', visual: 'grow' },
  { no: '03', title: 'Harvest time', tag: 'HARVEST', text: 'When the stalks mature, they are cut and collected. Timing matters because mature cane contains more useful sucrose.', icon: Truck, fact: 'The harvested stalks are quickly moved for processing.', visual: 'harvest' },
  { no: '04', title: 'Crushing the stalks', tag: 'MILL', text: 'At the mill, heavy rollers crush the cane. This separates the sweet juice from the fibrous material called bagasse.', icon: Factory, fact: 'Bagasse can be used as a renewable fuel in sugar mills.', visual: 'mill' },
  { no: '05', title: 'Cleaning the juice', tag: 'CLARIFY', text: 'The raw juice contains water, dissolved sugars and other plant materials. Processing removes unwanted solids before the juice is concentrated.', icon: Droplets, fact: 'The goal is a cleaner juice stream for the next stage.', visual: 'clean' },
  { no: '06', title: 'Evaporation + concentration', tag: 'PROCESS', text: 'Water is removed from the clarified juice, concentrating the dissolved sugars into a thicker syrup.', icon: Zap, fact: 'Less water means a higher concentration of dissolved sugar.', visual: 'evaporate' },
  { no: '07', title: 'From syrup to products', tag: 'TRANSFORM', text: 'The concentrated cane juice can follow different paths: it can become jaggery, crystallized sugar, or stay as a fresh juice product.', icon: Leaf, fact: 'One crop can become several familiar products.', visual: 'products' },
  { no: '08', title: 'Ready for you', tag: 'FINISH', text: 'After the right finishing and packaging steps, sugarcane-derived products reach homes, shops and restaurants.', icon: Check, fact: 'Field → juice → processed products: the complete journey.', visual: 'finish' },
];

function App() {
  const [menu, setMenu] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [answer, setAnswer] = useState('');
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return <div className="site">
    <div className="topbar"><span>FLIP CLASS 2026</span><span>THE COMPLETE SUGARCANE JOURNEY</span><span>SCROLL TO EXPLORE ↓</span></div>
    <nav className="nav">
      <button className="brand" onClick={() => go('home')}><span className="brand-mark">C</span><span>Cane<span>&</span>Co.</span></button>
      <div className={`nav-links ${menu ? 'open' : ''}`}><button onClick={() => go('story')}>The process</button><button onClick={() => go('science')}>The science</button><button onClick={() => go('products')}>The products</button></div>
      <button className="menu-btn" onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
    </nav>

    <main>
      <section className="hero" id="home">
        <div className="hero-copy"><div className="eyebrow"><span className="pulse"/> FROM SOIL TO SWEETNESS</div><h1>The journey<br/>of <em>sugarcane.</em></h1><p>Follow one sugarcane stalk from planting and growth to harvest, milling, processing and the products we use every day.</p><button className="start" onClick={() => go('story')}>Start the journey <ArrowDown size={17}/></button><div className="hero-meta"><span>08 stages</span><i/> <span>1 crop</span><i/> <span>many products</span></div></div>
        <div className="hero-scene"><div className="sun-orb"/><div className="cloud c1"/><div className="cloud c2"/><div className="hill h1"/><div className="hill h2"/><div className="hero-canes"><b>🎋</b><b>🎋</b><b>🎋</b><b>🎋</b><b>🎋</b></div><div className="seed-card"><Sprout size={18}/><div><small>STARTING POINT</small><strong>One tiny planting set</strong></div></div><div className="scroll-cue">SCROLL <ArrowDown size={14}/></div></div>
      </section>

      <section className="intro" id="story"><div><span className="big-number">01</span><div><div className="kicker">THE BIG PICTURE</div><h2>It starts in a field.<br/><em>It ends on a shelf.</em></h2></div></div><p>What looks like a simple stalk has a surprisingly long journey. The plant grows using sunlight, water and nutrients, then people use mechanical and physical processes to turn its stored sugars into useful products.</p></section>

      <div className="progress-bar"><span>THE PROCESS</span><div><i/><i/><i/><i/><i/><i/><i/><i/></div><span>08 STAGES</span></div>

      {stages.map((s, i) => { const Icon = s.icon; return <section className={`stage stage-${s.visual} ${i % 2 ? 'reverse' : ''}`} key={s.no}>
        <div className="stage-copy"><div className="stage-number">{s.no}</div><div className="kicker">{s.tag}</div><h2>{s.title}</h2><p>{s.text}</p><div className="fact"><span><Icon size={17}/></span><div><small>QUICK FACT</small><strong>{s.fact}</strong></div></div></div>
        <div className="stage-visual"><div className="visual-label">STAGE {s.no}<span>{s.tag}</span></div><div className={`scene scene-${s.visual}`}>
          {s.visual === 'plant' && <><div className="soil"/><div className="seed">●</div><div className="sprout"><i/><i/><i/></div><div className="rainbow-line"/></>}
          {s.visual === 'grow' && <><div className="big-sun"><Sun/></div><div className="grow-field">{[1,2,3,4,5].map(n => <b key={n}>🎋</b>)}</div><div className="water-drop">💧</div></>}
          {s.visual === 'harvest' && <><div className="field-lines"/><div className="harvest-cane">🎋🎋🎋</div><div className="harvest-machine">🚜</div><div className="dust"/></>}
          {s.visual === 'mill' && <><div className="mill-building"><span>CANЕ MILL</span><div className="rollers"><i/><i/></div></div><div className="cane-in">🎋</div><div className="juice-stream"/><div className="bagasse">▰ ▰ ▰</div></>}
          {s.visual === 'clean' && <><div className="tank"><div className="liquid"/><span>RAW JUICE</span></div><div className="filter">FILTER</div><div className="clean-stream"/></>}
          {s.visual === 'evaporate' && <><div className="pan"><div className="syrup"/></div><div className="steam"><i/><i/><i/></div><span className="heat">HEAT ↑</span></>}
          {s.visual === 'products' && <><div className="product-orbit p1">JAGGERY</div><div className="product-orbit p2">SUGAR</div><div className="product-orbit p3">JUICE</div><div className="center-syrup">CANE<br/>JUICE</div></>}
          {s.visual === 'finish' && <><div className="shelf"><div>🍬</div><div>🧃</div><div>🟫</div></div><div className="finish-cane">🎋</div><div className="spark s1">✦</div><div className="spark s2">✦</div><div className="finish-tag">FIELD → HOME</div></>}
        </div></div>
      </section> })}

      <section className="science" id="science"><div className="science-head"><div className="kicker">THE SCIENCE BEHIND THE SWEETNESS</div><h2>Three ideas explain<br/><em>the whole journey.</em></h2></div><div className="science-grid"><article><span>01</span><Leaf/><h3>Photosynthesis</h3><p>Leaves use sunlight, water and carbon dioxide to make organic compounds that support plant growth.</p></article><article><span>02</span><Droplets/><h3>Sucrose</h3><p>Sugarcane stores a large amount of its usable sugar as sucrose, especially as the stalk matures.</p></article><article><span>03</span><Factory/><h3>Processing</h3><p>Crushing, clarification, concentration and crystallization are physical processing steps that change the cane juice.</p></article></div></section>

      <section className="products-section" id="products"><div className="kicker">WHERE THE JOURNEY LEADS</div><h2>One crop.<br/><em>Different destinations.</em></h2><div className="product-path"><article><div>🥤</div><span>01</span><h3>Fresh cane juice</h3><p>Cane is crushed and the juice is served fresh.</p></article><div className="path-arrow"><ArrowRight/></div><article><div>🟫</div><span>02</span><h3>Jaggery</h3><p>Juice is concentrated into a solid, traditional sweetener.</p></article><div className="path-arrow"><ArrowRight/></div><article><div>✨</div><span>03</span><h3>Cane sugar</h3><p>Further processing can produce sugar crystals.</p></article></div></section>

      <section className="ending"><div className="kicker">YOU MADE IT</div><h2>From a green stalk<br/>to <em>sweetness.</em></h2><p>Now you know the complete sugarcane journey — and the science happening at every step.</p><button onClick={() => {setQuiz(true);setAnswer('')}}>Take the 30-second quiz <ArrowRight size={17}/></button><div className="end-line"><span>PLANT</span><i/><span>GROW</span><i/><span>HARVEST</span><i/><span>MILL</span><i/><span>PROCESS</span><i/><span>PRODUCT</span></div></section>
    </main>
    <footer><div className="brand-foot"><span className="brand-mark">C</span><strong>Cane&Co.</strong></div><span>Flip Class · Sugarcane Process</span><span>Educational website · 2026</span></footer>
    {quiz && <div className="overlay" onClick={() => setQuiz(false)}><div className="quiz" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setQuiz(false)}><X/></button><div className="quiz-icon">🌱</div><div className="kicker">QUICK CHECK</div><h2>What happens immediately after the stalks are crushed at the mill?</h2><div className="answers">{['The juice is separated from the fibrous material','The cane grows again','The sugar crystals are packaged'].map(a => <button className={answer === a ? (a.startsWith('The juice') ? 'correct' : 'wrong') : ''} key={a} onClick={() => setAnswer(a)}>{a}{answer === a && (a.startsWith('The juice') ? <Check/> : <X/>)}</button>)}</div>{answer && <p className="result">{answer.startsWith('The juice') ? 'Correct — crushing separates sweet juice from fibrous bagasse.' : 'Not quite. Crushing first separates the juice from the fibrous material.'}</p>}</div></div>}
  </div>;
}
createRoot(document.getElementById('root')).render(<App />);
