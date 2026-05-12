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
  const becRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text fade in
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      });

      // Falling BEC Croissant animation
      const tl = gsap.timeline();
      tl.from(becRef.current, {
        y: -800,
        rotation: -15,
        scale: 0.8,
        duration: 1.5,
        ease: 'bounce.out',
        delay: 0.5
      })
      // Continuous floating effect
      .to(becRef.current, {
        y: "+=20",
        rotation: 3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      
      // Parallax scroll on the sandwich
      gsap.to(becRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: -150,
        ease: 'none'
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full flex items-center md:items-end justify-center md:justify-start pb-20 px-6 md:px-20 bg-dark overflow-hidden">
      {/* Dark moody background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 via-dark to-dark"></div>
      
      {/* Falling Sandwich Image (Screen blend mode to hide black background) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none md:ml-64">
        <img 
          ref={becRef}
          src="/bec.png" 
          alt="Bacon Egg and Cheese Placeholder" 
          className="w-full max-w-[800px] object-contain opacity-90"
          style={{ mixBlendMode: 'screen', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }}
        />
      </div>
      
      <div className="relative z-10 text-background max-w-3xl text-center md:text-left">
        <h1 className="flex flex-col gap-2">
          <span className="hero-text font-sans font-bold text-3xl md:text-5xl tracking-tight uppercase">
            Breakfast is the
          </span>
          <span className="hero-text font-drama italic text-6xl md:text-8xl lg:text-[9rem] leading-[0.8] tracking-tighter">
            Experience.
          </span>
        </h1>
        <div className="hero-text mt-8 flex flex-col gap-2 font-mono mx-auto md:mx-0 items-center md:items-start bg-dark/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-background/10 w-fit">
          <p className="text-lg md:text-xl text-background drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">1320 Point Breeze Ave, Philadelphia, PA 19146</p>
          <a href="tel:215-465-1040" className="text-xl md:text-2xl text-accent font-bold hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">215-465-1040</a>
        </div>
        <div className="hero-text mt-10">
          <button className="group relative overflow-hidden bg-accent text-white px-8 py-4 rounded-full font-sans font-bold text-lg transition-transform hover:scale-[1.03]" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
            <span className="relative z-10 flex items-center gap-2 justify-center">Explore the Menu <ArrowRight size={20} /></span>
            <span className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
          </button>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const images = [
    { src: "https://cdn.menu-world.com/the-tasty-toast/photo-1.jpg", alt: "Artisanal toast with seasonal toppings at The Tasty Toast" },
    { src: "https://cdn.menu-world.com/the-tasty-toast/photo-2.jpg", alt: "Handcrafted breakfast dish at The Tasty Toast Philadelphia" },
    { src: "https://cdn.menu-world.com/the-tasty-toast/photo-3.jpg", alt: "Sourdough toast with locally sourced ingredients at The Tasty Toast" },
  ];

  return (
    <section id="menu" className="py-32 px-6 md:px-20 bg-background relative z-20 rounded-t-[3rem] -mt-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-sans font-bold text-4xl md:text-5xl text-primary mb-12 text-center">Featured Menu</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {images.map(({ src, alt }, idx) => (
            <div key={idx} className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group border border-dark/10 shadow-sm">
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
          alt=""
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
          id: `card-${i}`
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
