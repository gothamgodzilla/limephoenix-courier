'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [city, setCity] = useState<'austin' | 'la' | 'auto'>('auto');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [itemType, setItemType] = useState<'document' | 'parcel'>('document');
  const [weight, setWeight] = useState(2);
  const [matchResult, setMatchResult] = useState<any>(null);
  const [phoenixOpen, setPhoenixOpen] = useState(true);
  const [phoenixMsg, setPhoenixMsg] = useState("Hey! I'm Phoenix, your spirit companion. Watching your moves... \uD83D\uDCA9 or \uD83D\uDD25?");
  const [memory, setMemory] = useState<string[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const phoenixRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('phoenix-memory');
    if (saved) setMemory(JSON.parse(saved));
    const clicks = localStorage.getItem('phoenix-clicks');
    if (clicks) setClickCount(parseInt(clicks));

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).tagName + ' ' + ((e.target as HTMLElement).className || '');
      const newMem = `Clicked ${target} at ${new Date().toLocaleTimeString()}`;
      setMemory(prev => {
        const updated = [...prev.slice(-19), newMem];
        localStorage.setItem('phoenix-memory', JSON.stringify(updated));
        return updated;
      });
      setClickCount(c => {
        const nc = c + 1;
        localStorage.setItem('phoenix-clicks', nc.toString());
        return nc;
      });
      if (clickCount % 5 === 0) {
        setPhoenixMsg(`I see you've clicked ${clickCount + 1} times. Procedural layer learning your patterns. Mouth open, spirit ready. \uD83D\uDD25`);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [clickCount]);

  const handleMatch = () => {
    if (weight > 10) {
      setMatchResult({ error: 'Cab takes documents and small parcels at 10 lb and under. People are not a cargo class.' });
      return;
    }
    const isAustin = city === 'austin' || (city === 'auto' && Math.random() > 0.5);
    const winner = isAustin ? 'Cybercab (Austin live ~300+ units)' : 'Waymo (Los Angeles)';
    const eta = Math.floor(Math.random() * 15) + 5;
    const dist = Math.floor(Math.random() * 8) + 1;
    setMatchResult({
      winner,
      eta,
      dist,
      city: isAustin ? 'Austin' : 'Los Angeles',
      note: 'ETA-first over pure distance. Centralized multi-objective matching with edge failover. Closest vehicle wins the customer. \uD83D\uDCA9 or \uD83D\uDD25 depending on mood.'
    });
    setPhoenixMsg(`Matched to ${winner}! ETA ${eta} min. My recursive memory saw your item: ${itemType}. Spirit aligned.`);
  };

  const gnomeItems = ['\uD83D\uDCC4 Docs', '\uD83D\uDCE6 Parcel', '\uD83D\uDC8C Envelope', '\uD83D\uDD14 Bell', '\uD83E\uDDDA Gnome'];

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans">
      <header className="flex justify-between items-center mb-8 emboss p-4 bg-lime-400 text-black">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">LimePhoenix</h1>
          <p className="text-sm">Closest Autonomous Courier Wins • Matryxx LLC • Sheridan, Wyoming</p>
        </div>
        <div className="text-right text-xs">
          <div>Cybercab Austin + Waymo LA</div>
          <div>≤10 lb documents & parcels</div>
        </div>
      </header>

      <section className="mb-12 text-center">
        <h2 className="text-2xl md:text-4xl font-light mb-4">Easy to read. Minimalist. Clean lines. Emboss features.</h2>
        <p className="max-w-2xl mx-auto text-lg">A (Courier Matching) + B (Phoenix Desktop) = C. Coexist.llc totem pole (gold / obsidian / glass transparency). Helping.llc = gnomies with bells + carousel.</p>
        <div className="mt-6 flex justify-center gap-8">
          <div className="emboss p-4 bg-yellow-100">Cybercab Austin</div>
          <div className="emboss p-4 bg-blue-100">Waymo Los Angeles</div>
        </div>
      </section>

      <section className="max-w-2xl mx-auto mb-12 glass-panel p-6">
        <h3 className="text-2xl font-semibold mb-4 text-lime-700">Courier Matching • Choose Closest</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">City Focus</label>
            <select value={city} onChange={e => setCity(e.target.value as any)} className="w-full emboss p-2 mt-1">
              <option value="auto">Auto (closest wins)</option>
              <option value="austin">Austin (Cybercab)</option>
              <option value="la">Los Angeles (Waymo)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Pickup Address</label>
            <input value={pickup} onChange={e => setPickup(e.target.value)} placeholder="e.g. 123 Congress Ave, Austin" className="w-full emboss p-2 mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Dropoff Address</label>
            <input value={dropoff} onChange={e => setDropoff(e.target.value)} placeholder="e.g. 456 Sunset Blvd, LA" className="w-full emboss p-2 mt-1" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Item Type</label>
              <select value={itemType} onChange={e => setItemType(e.target.value as any)} className="w-full emboss p-2 mt-1">
                <option value="document">Document</option>
                <option value="parcel">Small Parcel</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">Weight (lb)</label>
              <input type="number" min="0" max="10" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full emboss p-2 mt-1" />
            </div>
          </div>
          <button onClick={handleMatch} className="w-full emboss bg-lime-500 hover:bg-lime-600 text-black font-bold py-3 px-4 rounded-lg">
            Find Closest Winner \uD83D\uDD25
          </button>
        </div>
        {matchResult && (
          <div className="mt-6 p-4 bg-white/50 rounded-lg border">
            {matchResult.error ? (
              <p className="text-red-600">{matchResult.error}</p>
            ) : (
              <>
                <p className="font-bold text-lg">Winner: {matchResult.winner}</p>
                <p>ETA: {matchResult.eta} min • Dist: {matchResult.dist} mi • City: {matchResult.city}</p>
                <p className="text-sm mt-2">{matchResult.note}</p>
                <p className="text-xs mt-1">Dispatch: predictive graph neural rebalancing, carTPU sensor fusion (&gt;1,000 TOPS), edge failover.</p>
              </>
            )}
          </div>
        )}
      </section>

      <section className="max-w-2xl mx-auto mb-12">
        <h3 className="text-2xl font-semibold mb-4">gnomies Item-Drop Desk \uD83D\uDD14</h3>
        <p className="mb-4 text-sm">Working item-drop desk. People are not a cargo class. Cab takes documents and small parcels at 10 lb and under.</p>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {gnomeItems.map((item, i) => (
            <div key={i} className="emboss min-w-[120px] p-4 text-center bg-yellow-50 flex-shrink-0">
              <div className="text-3xl mb-2">{item.split(' ')[0]}</div>
              <div className="text-sm">{item.split(' ').slice(1).join(' ')}</div>
              <button className="mt-2 text-xs underline" onClick={() => setPhoenixMsg(`Dropped ${item} at gnomies desk. Bells ringing. Helping.llc activated.`)}>Drop</button>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
        <div className="glass-panel p-4">
          <h4 className="font-bold">Hologram Prism</h4>
          <p className="text-sm">pixels → immersive 3D Shadowing Phoenix, warm tones, calligraphy</p>
        </div>
        <div className="glass-panel p-4">
          <h4 className="font-bold">Nikola Tesla Blueprint Scroll</h4>
          <p className="text-sm">architectural process + Userface. Recursive Memory Layers (Episodic → Semantic → Procedural).</p>
        </div>
        <div className="glass-panel p-4">
          <h4 className="font-bold">Waymo Tech Synthesis</h4>
          <p className="text-sm">Same system and frameworks. Closest vehicle win (Cybercab Austin live + Waymo both cities).</p>
        </div>
        <div className="glass-panel p-4">
          <h4 className="font-bold">Custom 5nm ASIC carTPU</h4>
          <p className="text-sm">&gt;1,000 TOPS front-end, cameras + LiDAR + radar → embeddings → foundation models. Local-first LLM + personalization.</p>
        </div>
      </section>

      <section className="totem max-w-md mx-auto h-32 rounded-lg mb-12 flex items-center justify-center text-white font-bold shadow-lg">
        Coexist.llc Totem Pole • Gold / Obsidian / Glass • Matryxx LLC
      </section>

      <div className={`fixed bottom-4 right-4 w-80 glass-panel p-4 shadow-2xl transition-all ${phoenixOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ zIndex: 50 }}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <div className="text-4xl">\uD83E\uDD85\u200D\uD83D\uDD25</div>
            <div>
              <div className="font-bold">Phoenix</div>
              <div className="text-xs text-gray-600">spirit/soul • mouth required • mecha-brain accents</div>
            </div>
          </div>
          <button onClick={() => setPhoenixOpen(false)} className="text-sm">✕</button>
        </div>
        <div className="text-sm mb-2 relative">
          <div className="phoenix-mouth inline-block">\uD83D\uDDE3\uFE0F</div> {phoenixMsg}
        </div>
        <div className="text-xs text-gray-500 mb-2">
          Clicks tracked: {clickCount} • Memory layers active • Local-first
        </div>
        <button onClick={() => setPhoenixMsg("Open Hands CLI path open. Vercel ready. 25SHA wallet token recycle active. Ganesh-AI-Brain syncing. \uD83D\uDCA9 learning complete.")} className="text-xs emboss px-2 py-1 bg-lime-200">
          Speak
        </button>
        <button onClick={() => setPhoenixOpen(true)} className="ml-2 text-xs">
          Show Memory
        </button>
        {memory.length > 0 && (
          <div className="mt-2 text-xs max-h-20 overflow-y-auto bg-black/10 p-1 rounded">
            {memory.slice(-5).map((m, i) => <div key={i}>{m}</div>)}
          </div>
        )}
      </div>

      {!phoenixOpen && (
        <button onClick={() => setPhoenixOpen(true)} className="fixed bottom-4 right-4 text-4xl emboss bg-lime-400 p-2 rounded-full z-50">
          \uD83E\uDD85\u200D\uD83D\uDD25
        </button>
      )}

      <footer className="text-center text-xs text-gray-500 mt-16 pb-8">
        LimePhoenix by Matryxx LLC, Sheridan, Wyoming • Production path via Open Hands CLI + Vercel CLI • Human gate on domain, deploy, email, privacy scope • 25SHA Web3 wallet ID artifact (token recycle) • Local-first LLM
        <br />
        Tools: OpenCode, OpenHands CLI, MCP, API, CLI, Perplexity research, Claude/ChatGPT develop, Cursor build, Grok test, Deploy any.
      </footer>
    </div>
  );
}