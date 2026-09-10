import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, Check, Leaf, Menu, Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';
import './styles.css';

const products = [
  { id: 1, name: 'Fresh Sugarcane', type: 'Farm Fresh', price: 80, unit: '3 kg', emoji: '🎋', note: 'Crunchy, juicy canes harvested at peak freshness.' },
  { id: 2, name: 'Pure Cane Juice', type: 'Cold Pressed', price: 60, unit: '500 ml', emoji: '🥤', note: 'Fresh-pressed cane juice with a naturally sweet finish.' },
  { id: 3, name: 'Golden Jaggery', type: 'Traditional', price: 120, unit: '500 g', emoji: '🟤', note: 'Slow-cooked cane juice transformed into golden jaggery.' },
  { id: 4, name: 'Cane Sugar', type: 'Pure & Fine', price: 95, unit: '1 kg', emoji: '✨', note: 'Crystalline sugar made from processed sugarcane juice.' },
];

function App() {
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [answer, setAnswer] = useState(null);

  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = useMemo(() => products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0), [cart]);

  const add = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const remove = (id) => setCart(c => ({ ...c, [id]: Math.max((c[id] || 0) - 1, 0) }));

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="site">
      <div className="announcement"><Sparkles size={14} /> Fresh harvest just arrived · Educational storefront demo <span>Flip Class 2026</span></div>
      <nav className="nav">
        <button className="brand" onClick={() => scrollTo('home')}><span className="brand-mark">C</span><span>Cane<span>&</span>Co.</span></button>
        <div className="nav-links"><button onClick={() => scrollTo('shop')}>Shop</button><button onClick={() => scrollTo('journey')}>Our Journey</button><button onClick={() => scrollTo('learn')}>Learn</button></div>
        <button className="cart-btn" onClick={() => setCartOpen(true)}><ShoppingBag size={18}/><span>Cart</span>{count > 0 && <b>{count}</b>}</button>
        <button className="mobile-menu"><Menu size={22}/></button>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="dot"/> Straight from the cane fields</div>
            <h1>Sweetness,<br/><em>grown naturally.</em></h1>
            <p>Discover the journey of sugarcane — from a sunlit field to the products you enjoy every day.</p>
            <div className="hero-actions"><button className="primary" onClick={() => scrollTo('shop')}>Shop the harvest <ArrowRight size={17}/></button><button className="text-btn" onClick={() => scrollTo('journey')}>Explore the journey</button></div>
            <div className="trust"><span><Check size={15}/> Farm sourced</span><span><Check size={15}/> Naturally sweet</span><span><Check size={15}/> No additives</span></div>
          </div>
          <div className="hero-art">
            <div className="sun"/><div className="cloud cloud-a"/><div className="cloud cloud-b"/>
            <div className="field field-back"/><div className="field field-front"/>
            <div className="cane cane-1">🎋</div><div className="cane cane-2">🎋</div><div className="cane cane-3">🎋</div><div className="cane cane-4">🎋</div>
            <div className="hero-card"><span>Today's harvest</span><strong>100% fresh cane</strong><small>Harvested this morning</small></div>
          </div>
        </section>

        <section className="strip"><div><Leaf/><strong>Field to shelf</strong><span>We follow every stage.</span></div><div><Sparkles/><strong>Made with care</strong><span>Simple, honest products.</span></div><div><ShoppingBag/><strong>Shop & learn</strong><span>Every product tells a story.</span></div></section>

        <section className="section" id="shop">
          <div className="section-head"><div><div className="kicker">THE HARVEST</div><h2>Shop something <i>sweet.</i></h2></div><button className="view-all" onClick={() => setShopOpen(!shopOpen)}>{shopOpen ? 'Show featured' : 'View all products'} <ArrowRight size={16}/></button></div>
          <div className="products">{products.map(p => <article className="product" key={p.id}><div className="product-image"><span className="badge">{p.type}</span><span className="product-emoji">{p.emoji}</span><div className="leaf-deco">✦</div></div><div className="product-info"><h3>{p.name}</h3><p>{p.note}</p><div className="buy-row"><div><strong>₹{p.price}</strong><small> / {p.unit}</small></div><button onClick={() => add(p.id)} aria-label={`Add ${p.name}`}><Plus size={18}/></button></div></div></article>)}</div>
          <div className="shop-note"><span>🧠</span><div><strong>Buying sugarcane is learning sugarcane.</strong><p>Tap through our journey below to see how one crop becomes many everyday products.</p></div></div>
        </section>

        <section className="journey" id="journey">
          <div className="journey-copy"><div className="kicker">THE JOURNEY</div><h2>From green stalk<br/>to <i>golden sweetness.</i></h2><p>Sugarcane doesn't become sugar in one step. Each stage changes its physical form while preserving the useful carbohydrates stored in the plant.</p><button className="outline" onClick={() => scrollTo('learn')}>See what happens <ArrowRight size={16}/></button></div>
          <div className="timeline"><div className="line"/>{[['01','GROW','Sun + water','Healthy cane develops in warm, sunny conditions.'],['02','HARVEST','Cut the stalk','Mature stalks are harvested and transported for processing.'],['03','EXTRACT','Press the juice','Mills crush the stalks and collect the sweet juice.'],['04','PROCESS','Transform it','The juice can become jaggery, sugar, or refreshing cane juice.']].map(([n,t,title,text]) => <div className="step" key={n}><span className="step-no">{n}</span><div><small>{t}</small><h3>{title}</h3><p>{text}</p></div></div>)}</div>
        </section>

        <section className="learn" id="learn"><div className="learn-top"><div className="kicker">FLIP CLASS · QUICK LESSON</div><h2>Why is sugarcane <i>so sweet?</i></h2><p>Sugarcane stores energy mainly as <strong>sucrose</strong>. During processing, the juice is separated from the fibrous stalk, then purified and concentrated to create different products.</p></div><div className="facts"><div><span>01</span><strong>Sucrose</strong><p>The main sugar found in mature sugarcane.</p></div><div><span>02</span><strong>Photosynthesis</strong><p>Leaves use sunlight to make sugars that fuel plant growth.</p></div><div><span>03</span><strong>Juice → products</strong><p>Processing turns cane juice into several familiar foods.</p></div></div><button className="quiz-btn" onClick={() => {setQuiz(true);setAnswer(null)}}>Test your knowledge <ArrowRight size={17}/></button></section>
      </main>

      <footer><div className="footer-brand"><span className="brand-mark">C</span><div><strong>Cane&Co.</strong><small>A Flip Class sugarcane storefront</small></div></div><span>Fresh ideas. Sweet science.</span><span>© 2026 · Educational demo · No real orders</span></footer>

      {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)}><aside className="drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><h2>Your cart</h2><button onClick={() => setCartOpen(false)}><X/></button></div>{count === 0 ? <div className="empty"><ShoppingBag size={36}/><h3>Your cart is empty</h3><p>Add a product to see the demo cart in action.</p></div> : <>{products.filter(p => cart[p.id]).map(p => <div className="cart-item" key={p.id}><span>{p.emoji}</span><div><strong>{p.name}</strong><small>₹{p.price} · {p.unit}</small></div><div className="qty"><button onClick={() => remove(p.id)}><Minus size={14}/></button><b>{cart[p.id]}</b><button onClick={() => add(p.id)}><Plus size={14}/></button></div></div>)}<div className="cart-total"><span>Demo total</span><strong>₹{total}</strong></div><button className="primary full" onClick={() => {setCart({});setCartOpen(false)}}>Place demo order <Check size={16}/></button><p className="no-pay">No login · No payment · For classroom demonstration only</p></>}</aside></div>}

      {quiz && <div className="overlay" onClick={() => setQuiz(false)}><div className="quiz" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setQuiz(false)}><X/></button><div className="quiz-icon">🌱</div><div className="kicker">ONE QUICK QUESTION</div><h2>What is the main sugar stored in sugarcane?</h2><div className="answers">{['Glucose','Sucrose','Lactose'].map(a => <button className={answer === a ? (a === 'Sucrose' ? 'correct' : 'wrong') : ''} key={a} onClick={() => setAnswer(a)}>{a}{answer === a && (a === 'Sucrose' ? <Check/> : <X/>)}</button>)}</div>{answer && <p className="result">{answer === 'Sucrose' ? 'Correct! Sucrose is the main sugar accumulated in mature sugarcane.' : 'Not quite — the answer is sucrose.'}</p>}</div></div>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
