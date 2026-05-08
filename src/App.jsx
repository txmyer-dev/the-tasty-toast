import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-accent selection:text-white">
      <div className="noise-overlay"></div>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -50",
        end: 99999,
        toggleClass: { className: 'nav-scrolled', targets: navRef.current }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav 
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-5xl rounded-full px-6 py-4 transition-all duration-500 text-background flex justify-between items-center"
    >
      <style>{`
        .nav-scrolled {
          background-color: rgba(242, 240, 233, 0.8) !important;
          backdrop-filter: blur(16px);
          color: #1A1A1A !important;
          border: 1px solid rgba(26, 26, 26, 0.1);
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
        }
      `}</style>
      <div className="font-sans font-bold text-xl tracking-tight">The Tasty Toast</div>
      <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
        {['Menu', 'Philosophy', 'Location'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:-translate-y-[1px] transition-transform">
            {item}
          </a>
        ))}
      </div>
      <button className="group relative overflow-hidden bg-accent text-white px-6 py-2 rounded-full font-medium text-sm transition-transform hover:scale-[1.03]" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
        <span className="relative z-10">Order Online</span>
        <span className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
      </button>
    </nav>
  );
}

function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full flex items-end pb-20 px-6 md:px-20">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1484723091791-0fee59cb1028?q=80&w=2000&auto=format&fit=crop" 
          alt="Artisanal Toast" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-dark/10"></div>
      </div>
      
      <div className="relative z-10 text-background max-w-3xl">
        <h1 className="flex flex-col gap-2">
          <span className="hero-text font-sans font-bold text-3xl md:text-5xl tracking-tight uppercase">
            Breakfast is the
          </span>
          <span className="hero-text font-drama italic text-6xl md:text-8xl lg:text-[9rem] leading-[0.8] tracking-tighter">
            Experience.
          </span>
        </h1>
        <p className="hero-text mt-8 text-lg md:text-xl font-mono text-background/80 max-w-xl">
          Elevated, artisanal toast and handcrafted breakfast experiences. Locally sourced ingredients, precision crafted.
        </p>
        <div className="hero-text mt-10">
          <button className="group relative overflow-hidden bg-accent text-white px-8 py-4 rounded-full font-sans font-bold text-lg transition-transform hover:scale-[1.03]" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
            <span className="relative z-10 flex items-center gap-2">Explore the Menu <ArrowRight size={20} /></span>
            <span className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
          </button>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="menu" className="py-32 px-6 md:px-20 bg-background relative z-20 rounded-t-[3rem] -mt-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Card 1: Diagnostic Shuffler */}
        <ShufflerCard />
        {/* Card 2: Telemetry Typewriter */}
        <TypewriterCard />
        {/* Card 3: Cursor Protocol Scheduler */}
        <SchedulerCard />
      </div>
    </section>
  );
}

function ShufflerCard() {
  const [items, setItems] = useState(["Regional Farms", "Seasonal Harvest", "Artisan Bakers"]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newItems = [...prev];
        const last = newItems.pop();
        newItems.unshift(last);
        return newItems;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border border-dark/10 p-8 rounded-[2rem] shadow-sm flex flex-col h-96 relative overflow-hidden">
      <h3 className="font-sans font-bold text-2xl text-primary mb-2">Locally Sourced</h3>
      <p className="font-mono text-sm text-dark/60 mb-8">Ingredients from regional purveyors.</p>
      
      <div className="relative flex-1 flex items-center justify-center">
        {items.map((item, index) => {
          const isTop = index === 0;
          const isMid = index === 1;
          const isBottom = index === 2;
          
          return (
            <div 
              key={item}
              className="absolute w-full py-4 px-6 rounded-2xl bg-background border border-dark/5 shadow-md flex items-center justify-between transition-all duration-700 ease-in-out"
              style={{
                transform: \`translateY(\${isTop ? 0 : isMid ? 15 : 30}px) scale(\${isTop ? 1 : isMid ? 0.95 : 0.9})\`,
                opacity: isTop ? 1 : isMid ? 0.7 : 0.4,
                zIndex: 3 - index,
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <span className="font-sans font-semibold text-dark">{item}</span>
              <div className="w-2 h-2 rounded-full bg-accent"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TypewriterCard() {
  const text = "Crafting signature toast combinations... Perfecting sourdough fermentation... Brewing local roast...";
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) i = 0;
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border border-dark/10 p-8 rounded-[2rem] shadow-sm flex flex-col h-96 relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-sans font-bold text-2xl text-primary">Artisan Pairings</h3>
        <div className="flex items-center gap-2 px-3 py-1 bg-dark/5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          <span className="font-mono text-xs font-semibold text-dark/70 tracking-widest uppercase">Live Feed</span>
        </div>
      </div>
      <p className="font-mono text-sm text-dark/60 mb-6">Signature combinations by chefs.</p>
      
      <div className="bg-dark text-background p-6 rounded-2xl flex-1 font-mono text-sm leading-relaxed relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-dark/50 pointer-events-none"></div>
        {displayedText}
        <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle"></span>
      </div>
    </div>
  );
}

function SchedulerCard() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const cursorRef = useRef(null);
  const gridRef = useRef(null);
  const [activeDay, setActiveDay] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      // Starting pos
      tl.set(cursorRef.current, { x: 0, y: 0, opacity: 0 });
      
      // Enter
      tl.to(cursorRef.current, { x: 100, y: 50, opacity: 1, duration: 0.8, ease: "power2.out" });
      
      // Move to a day (Wednesday - index 3)
      tl.to(cursorRef.current, { x: 150, y: 120, duration: 0.6, ease: "power2.inOut" });
      
      // Click
      tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
      tl.call(() => setActiveDay(3));
      tl.to(cursorRef.current, { scale: 1, duration: 0.1 });
      
      // Move to Save
      tl.to(cursorRef.current, { x: 220, y: 220, duration: 0.7, ease: "power2.inOut", delay: 0.5 });
      
      // Click Save
      tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
      tl.to(cursorRef.current, { scale: 1, duration: 0.1 });
      tl.call(() => setActiveDay(null));
      
      // Exit
      tl.to(cursorRef.current, { x: 300, y: 300, opacity: 0, duration: 0.8, ease: "power2.in" });
      
    }, gridRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white border border-dark/10 p-8 rounded-[2rem] shadow-sm flex flex-col h-96 relative overflow-hidden">
      <h3 className="font-sans font-bold text-2xl text-primary mb-2">Community Hub</h3>
      <p className="font-mono text-sm text-dark/60 mb-8">A warm space for morning rituals.</p>
      
      <div className="flex-1 flex flex-col items-center justify-center relative" ref={gridRef}>
        <div className="grid grid-cols-7 gap-2 w-full mb-8">
          {days.map((day, i) => (
            <div 
              key={i} 
              className={\`aspect-square rounded-xl flex items-center justify-center font-sans font-semibold text-sm transition-colors duration-300 \${activeDay === i ? 'bg-accent text-white' : 'bg-background text-dark/50'}\`}
            >
              {day}
            </div>
          ))}
        </div>
        
        <button className="bg-primary text-background font-mono text-sm px-6 py-2 rounded-full self-end shadow-sm">
          Plan Visit
        </button>

        <div ref={cursorRef} className="absolute top-0 left-0 text-dark drop-shadow-md z-10 pointer-events-none">
          <MousePointer2 size={24} fill="white" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

function Philosophy() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-line', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
      });
      
      gsap.to('.phil-bg', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: 100,
        ease: 'none'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={containerRef} className="relative py-40 px-6 md:px-20 bg-dark text-background overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1601000537989-13e617d5cba1?q=80&w=2000&auto=format&fit=crop" 
          alt="Texture" 
          className="phil-bg w-full h-[120%] object-cover object-center -top-[10%]"
        />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">
        <p className="phil-line font-sans font-medium text-xl md:text-2xl text-background/70 tracking-wide">
          Most cafes focus on: mass production and speed over quality.
        </p>
        <p className="phil-line font-drama italic text-5xl md:text-7xl lg:text-[6rem] leading-[1.1] tracking-tight">
          We focus on: <span className="text-accent not-italic font-sans font-bold uppercase text-4xl md:text-6xl lg:text-[5rem] block mt-4">Precision Craft.</span>
        </p>
      </div>
    </section>
  );
}

function Protocol() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // Skip last card
        
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: containerRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          id: \`card-\${i}\`
        });
        
        gsap.to(card, {
          scrollTrigger: {
            trigger: cards[i+1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
          scale: 0.9,
          filter: "blur(20px)",
          opacity: 0.5,
          ease: "none"
        });
      });
      
      // Pin last card too so it stays while we scroll past the section
      ScrollTrigger.create({
        trigger: cards[cards.length - 1],
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-background relative">
      <ProtocolCard 
        index={1} 
        title="Source" 
        desc="Identifying the finest local grains and organic ingredients."
        animation="helix"
      />
      <ProtocolCard 
        index={2} 
        title="Ferment" 
        desc="Slow fermentation process for optimal texture and flavor development."
        animation="scan"
      />
      <ProtocolCard 
        index={3} 
        title="Craft" 
        desc="Meticulous assembly of flavors to create the perfect bite."
        animation="pulse"
      />
    </section>
  );
}

function ProtocolCard({ index, title, desc, animation }) {
  return (
    <div className="protocol-card h-screen w-full flex items-center justify-center p-6 md:p-20 absolute top-0 left-0 bg-background">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-12 md:p-20 rounded-[3rem] shadow-xl border border-dark/5 h-[80vh]">
        
        <div className="flex flex-col gap-6">
          <div className="font-mono text-accent text-xl font-bold tracking-widest">0{index}</div>
          <h2 className="font-sans font-bold text-5xl md:text-7xl text-primary">{title}</h2>
          <p className="font-mono text-lg text-dark/70 max-w-sm leading-relaxed">{desc}</p>
        </div>
        
        <div className="h-full w-full bg-dark/5 rounded-[2rem] flex items-center justify-center overflow-hidden relative border border-dark/10">
          {animation === 'helix' && <HelixAnimation />}
          {animation === 'scan' && <ScanAnimation />}
          {animation === 'pulse' && <PulseAnimation />}
        </div>
        
      </div>
    </div>
  );
}

function HelixAnimation() {
  const ref = useRef(null);
  useEffect(() => {
    gsap.to(ref.current, { rotation: 360, duration: 20, repeat: -1, ease: "none" });
  }, []);
  return (
    <svg ref={ref} width="200" height="200" viewBox="0 0 200 200" className="opacity-40">
      <circle cx="100" cy="100" r="80" fill="none" stroke="#2E4036" strokeWidth="2" strokeDasharray="10 10" />
      <circle cx="100" cy="100" r="40" fill="none" stroke="#CC5833" strokeWidth="1" />
      <rect x="90" y="20" width="20" height="160" fill="none" stroke="#1A1A1A" strokeWidth="1" transform="rotate(45 100 100)" />
      <rect x="90" y="20" width="20" height="160" fill="none" stroke="#1A1A1A" strokeWidth="1" transform="rotate(-45 100 100)" />
    </svg>
  );
}

function ScanAnimation() {
  const lineRef = useRef(null);
  useEffect(() => {
    gsap.to(lineRef.current, { y: 200, duration: 2, repeat: -1, yoyo: true, ease: "power1.inOut" });
  }, []);
  return (
    <div className="relative w-[200px] h-[200px] opacity-40">
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-1">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="bg-primary/20 rounded-sm"></div>
        ))}
      </div>
      <div ref={lineRef} className="absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_10px_#CC5833] z-10"></div>
    </div>
  );
}

function PulseAnimation() {
  const pathRef = useRef(null);
  useEffect(() => {
    const path = pathRef.current;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(path, { strokeDashoffset: 0, duration: 3, repeat: -1, ease: "none" });
  }, []);
  return (
    <svg width="200" height="100" viewBox="0 0 200 100" className="opacity-50">
      <path 
        ref={pathRef}
        d="M 0 50 L 50 50 L 60 20 L 70 80 L 80 50 L 120 50 L 130 10 L 140 90 L 150 50 L 200 50" 
        fill="none" 
        stroke="#CC5833" 
        strokeWidth="3" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Pricing() {
  // Converted to "Get Started" as requested for non-pricing fit
  return (
    <section className="py-32 px-6 md:px-20 bg-background mt-[300vh] relative z-20">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8 bg-white p-12 md:p-20 rounded-[3rem] shadow-xl border border-dark/10">
        <h2 className="font-sans font-bold text-4xl md:text-6xl text-primary">Experience the Craft</h2>
        <p className="font-mono text-lg text-dark/70 max-w-lg">
          Join us for a morning ritual unlike any other. Reserve your table or order ahead for seamless pickup.
        </p>
        <button className="group relative overflow-hidden bg-accent text-white px-10 py-5 rounded-full font-sans font-bold text-xl mt-4 transition-transform hover:scale-[1.03]" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
          <span className="relative z-10 flex items-center gap-3">Start Order <ArrowRight size={24} /></span>
          <span className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-dark text-background pt-24 pb-12 px-6 md:px-20 rounded-t-[4rem] relative z-30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <div className="font-sans font-bold text-3xl tracking-tight mb-4 text-white">The Tasty Toast</div>
          <p className="font-mono text-background/60 max-w-xs text-sm">
            Elevated, artisanal toast and handcrafted breakfast experiences.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <h4 className="font-sans font-semibold text-lg text-white">Navigation</h4>
          {['Menu', 'Philosophy', 'Location', 'Careers'].map(link => (
            <a key={link} href="#" className="font-mono text-sm text-background/60 hover:text-accent transition-colors">
              {link}
            </a>
          ))}
        </div>
        
        <div className="flex flex-col gap-4">
          <h4 className="font-sans font-semibold text-lg text-white">Legal</h4>
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
            <a key={link} href="#" className="font-mono text-sm text-background/60 hover:text-accent transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-xs text-background/40">
          &copy; {new Date().getFullYear()} The Tasty Toast. All rights reserved.
        </p>
        <div className="flex items-center gap-2 px-4 py-2 bg-background/5 rounded-full border border-background/10">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="font-mono text-xs text-background/60 tracking-widest uppercase">System Operational</span>
        </div>
      </div>
    </footer>
  );
}
