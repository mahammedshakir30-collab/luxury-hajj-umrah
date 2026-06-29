import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import ConsultationModal from './ConsultationModal';

// Dynamically import all 241 frame images using Vite's glob import
const frameModules = import.meta.glob('../../assets/.aistudio/202/303/ezgif-frame-*.png', { 
  eager: true, 
  import: 'default' 
});

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [activePhase, setActivePhase] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef(1);
  const renderedFrameRef = useRef(1);

  const totalFrames = 241;
  const PRELOAD_BATCH_SIZE = 30; // Wait for initial batch to load before showing page

  // Generate sorted list of frame URLs
  const frameUrls = React.useMemo(() => {
    const urls: string[] = [];
    for (let i = 1; i <= totalFrames; i++) {
      const padded = String(i).padStart(3, '0');
      const path = `../../assets/.aistudio/202/303/ezgif-frame-${padded}.png`;
      const url = frameModules[path] as string;
      if (url) {
        urls.push(url);
      } else {
        urls.push(`/assets/.aistudio/202/303/ezgif-frame-${padded}.png`);
      }
    }
    return urls;
  }, []);

  // Frame aspect ratio and coverage calculator (object-fit: cover for canvas)
  const drawImage = (img: HTMLImageElement, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    
    if (imgWidth === 0 || imgHeight === 0) return;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    } else {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Safe draw helper with fallback to closest cached frame
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let img = imageCache.current.get(index);
    
    if (!img) {
      // Find closest cached frame to display instead of blank canvas
      let closestIndex = 1;
      let minDiff = Infinity;
      
      for (const cachedIndex of imageCache.current.keys()) {
        const diff = Math.abs(cachedIndex - index);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = cachedIndex;
        }
      }
      
      img = imageCache.current.get(closestIndex);
      
      // Load target frame dynamically in background
      const loadPending = new Image();
      loadPending.src = frameUrls[index - 1];
      loadPending.onload = () => {
        imageCache.current.set(index, loadPending);
        if (Math.abs(currentFrameRef.current - index) <= 2) {
          drawImage(loadPending, ctx, canvas);
        }
      };
    }

    if (img) {
      drawImage(img, ctx, canvas);
    }
  };

  // Scroll tracking hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to active timeline phase
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const targetFrame = Math.min(
      totalFrames,
      Math.max(1, Math.floor(latest * totalFrames) + 1)
    );
    currentFrameRef.current = targetFrame;

    if (latest < 0.25) {
      if (activePhase !== 1) setActivePhase(1);
    } else if (latest < 0.55) {
      if (activePhase !== 2) setActivePhase(2);
    } else if (latest < 0.82) {
      if (activePhase !== 3) setActivePhase(3);
    } else {
      if (activePhase !== 4) setActivePhase(4);
    }
  });

  // Animated MotionValues for text slides opacity and position offsets
  const opacity1 = useTransform(scrollYProgress, [0.0, 0.2, 0.25], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.0, 0.2, 0.25], [0, 0, -50]);
  const pointerEvents1 = useTransform(scrollYProgress, [0.0, 0.25], ["auto" as const, "none" as const]);

  const opacity2 = useTransform(scrollYProgress, [0.22, 0.3, 0.45, 0.53], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.3, 0.45, 0.53], [50, 0, 0, -50]);

  const opacity3 = useTransform(scrollYProgress, [0.5, 0.58, 0.73, 0.81], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.58, 0.73, 0.81], [50, 0, 0, -50]);

  const opacity4 = useTransform(scrollYProgress, [0.78, 0.86, 0.95], [0, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.78, 0.86, 0.95], [50, 0, 0]);
  const pointerEvents4 = useTransform(scrollYProgress, [0.78, 0.82], ["none" as const, "auto" as const]);

  // Load initial batch of frames and stream remaining frames in the background
  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;

    // Load first frame immediately
    const loadFirstFrame = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.src = frameUrls[0];
      img.onload = () => resolve(img);
      img.onerror = reject;
    });

    loadFirstFrame.then((img) => {
      if (!isMounted) return;
      imageCache.current.set(1, img);
      
      // Draw first frame immediately
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx) {
        drawImage(img, ctx, canvas);
      }

      // Load rest of the initial preload batch
      const promises: Promise<void>[] = [];
      for (let i = 2; i <= PRELOAD_BATCH_SIZE; i++) {
        const p = new Promise<void>((resolve) => {
          const frameImg = new Image();
          frameImg.src = frameUrls[i - 1];
          frameImg.onload = () => {
            if (isMounted) {
              imageCache.current.set(i, frameImg);
              loadedCount++;
              setLoadProgress(Math.round((loadedCount / (PRELOAD_BATCH_SIZE - 1)) * 100));
            }
            resolve();
          };
          frameImg.onerror = () => resolve();
        });
        promises.push(p);
      }

      Promise.all(promises).then(() => {
        if (isMounted) {
          setIsLoading(false);
          preloadRemainingFrames();
        }
      });
    }).catch((err) => {
      console.error("Failed to load first frame", err);
      if (isMounted) setIsLoading(false);
    });

    // Stream remaining frames in idle chunks to prevent H/W stalling
    const preloadRemainingFrames = () => {
      let currentIndex = PRELOAD_BATCH_SIZE + 1;
      const chunkSize = 12;

      const loadNextChunk = () => {
        if (!isMounted || currentIndex > totalFrames) return;

        const promises: Promise<void>[] = [];
        const end = Math.min(currentIndex + chunkSize - 1, totalFrames);
        
        for (let i = currentIndex; i <= end; i++) {
          const p = new Promise<void>((resolve) => {
            const frameImg = new Image();
            frameImg.src = frameUrls[i - 1];
            frameImg.onload = () => {
              if (isMounted) {
                imageCache.current.set(i, frameImg);
              }
              resolve();
            };
            frameImg.onerror = () => resolve();
          });
          promises.push(p);
        }

        Promise.all(promises).then(() => {
          currentIndex += chunkSize;
          if (typeof window.requestIdleCallback === 'function') {
            window.requestIdleCallback(() => loadNextChunk());
          } else {
            setTimeout(loadNextChunk, 40);
          }
        });
      };

      loadNextChunk();
    };

    return () => {
      isMounted = false;
    };
  }, [frameUrls]);

  // Silky smooth lerp redraw loop (interpolates frames during fast mouse scrolls)
  useEffect(() => {
    let rAFId: number;

    const updateLoop = () => {
      const targetFrame = currentFrameRef.current;
      const diff = targetFrame - renderedFrameRef.current;

      if (Math.abs(diff) > 0.05) {
        renderedFrameRef.current += diff * 0.14; // Lerp multiplier
        const frameToDraw = Math.round(renderedFrameRef.current);
        drawFrame(frameToDraw);
      }

      rAFId = requestAnimationFrame(updateLoop);
    };

    rAFId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(rAFId);
  }, []);

  // Handle canvas sizing and responsiveness
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      const currentImg = imageCache.current.get(Math.round(renderedFrameRef.current));
      const ctx = canvas.getContext('2d');
      if (currentImg && ctx) {
        drawImage(currentImg, ctx, canvas);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (\n    <section ref={containerRef} className="relative h-[360vh] w-full bg-brand-charcoal">
      {/* Sticky Frame Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Hardware-accelerated drawing Canvas */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000" 
        />
        
        {/* Luxury Vignette and Gradients */}
        <div className="absolute inset-0 bg-brand-charcoal/45 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/70 via-transparent to-brand-charcoal/80 z-10 pointer-events-none" />
        

        {/* Vertical Side Phase Navigator */}
        <div className="hidden lg:flex flex-col gap-6 absolute left-12 top-1/2 -translate-y-1/2 z-30">
          {[\n            { id: 1, label: 'Intention', num: '01' },
            { id: 2, label: 'Sanctuary', num: '02' },
            { id: 3, label: 'Journey', num: '03' },
            { id: 4, label: 'Covenant', num: '04' }
          ].map((phase) => {
            const isActive = activePhase === phase.id;
            return (
              <button
                key={phase.id}
                onClick={() => {
                  const scrollTarget = (phase.id - 1) / 3;
                  const container = containerRef.current;
                  if (container) {
                    const containerTop = container.offsetTop;
                    const containerHeight = container.offsetHeight;
                    const scrollY = containerTop + scrollTarget * (containerHeight - window.innerHeight);
                    window.scrollTo({
                      top: scrollY,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="group flex items-center gap-4 text-left focus:outline-none cursor-pointer"
              >
                <div className="relative flex items-center justify-center">
                  <div className={`h-[1px] transition-all duration-500 ${isActive ? 'w-8 bg-brand-gold' : 'w-4 bg-white/30 group-hover:w-6 group-hover:bg-white/60'}`} />
                </div>
                <div className="flex flex-col">
                  <span className={`text-[10px] font-sans tracking-[0.2em] font-semibold transition-colors duration-500 ${isActive ? 'text-brand-gold' : 'text-white/40 group-hover:text-white/70'}`}>
                    {phase.num}
                  </span>
                  <span className={`text-xs font-heading uppercase tracking-wider transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}>
                    {phase.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* --- SCROLLING TEXT PANELS --- */}

        {/* Phase 1: Brand Introduction */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto z-20 transition-all duration-700 ease-out ${
            activePhase === 1 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 -translate-y-8 pointer-events-none'
          }`}
        >
          <span className="font-sans text-brand-gold tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-6 block">
            ZAITOON HOLIDAYS
          </span>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-8 uppercase">
            A Journey of Faith.<br />
            <span className="font-display italic font-light text-white/90 capitalize">A Lifetime of Blessings.</span>
          </h1>
          <span className="font-sans text-brand-gold text-lg md:text-xl font-medium mb-4 block">
            Your Sacred Journey, Our Blessed Promise.
          </span>
          <p className="font-sans text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            From the moment you dream of the Holy Journey to your safe return, we are with you every step, every dua.
          </p>
          
          {/* Scroll Down Mouse Indicator */}
          <div className="absolute bottom-12 flex flex-col items-center gap-2 pointer-events-none">
            <div className="w-[22px] h-[36px] border border-white/35 rounded-full flex justify-center p-1.5 animate-bounce">
              <div className="w-[3px] h-[6px] bg-brand-gold rounded-full" />
            </div>
            <span className="text-[9px] text-white/40 tracking-[0.25em] uppercase font-sans">Scroll to begin</span>
          </div>
        </div>

        {/* Phase 2: Exquisite Accommodations */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto z-20 transition-all duration-700 ease-out ${
            activePhase === 2 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <span className="font-sans text-brand-gold tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-6 block">
            PREMIUM ACCOMMODATION
          </span>
          <h2 className="font-heading text-4xl md:text-6xl text-white leading-[1.2] mb-8">
            Stay Closer to the Haram,<br />
            <span className="font-display italic font-light text-white/90">Pray with Complete Peace</span>
          </h2>
          <p className="font-sans text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Experience carefully selected hotels just moments from Masjid Al-Haram and Masjid An-Nabawi, offering comfort, convenience, and more precious time for your worship
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
            {['Walking Distance to Haram', 'Premium Hotel Partners', 'Comfortable Family Stays'].map((feature, idx) => (
              <div key={idx} className="bg-brand-charcoal/45 backdrop-blur-md border border-white/10 px-5 py-3 rounded-full text-white/95 text-xs md:text-sm font-sans tracking-wide">
                <span className="text-brand-gold mr-2">✦</span> {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Phase 3: Complete Pilgrimage Services */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto z-20 transition-all duration-700 ease-out ${
            activePhase === 3 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <span className="font-sans text-brand-gold tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-6 block">
            COMPLETE PILGRIMAGE SERVICES
          </span>
          <h2 className="font-heading text-4xl md:text-6xl text-white leading-[1.2] mb-8">
            Walk the Sacred Path.<br />
            <span className="font-display italic font-light text-white/90">We'll Handle the Rest</span>
          </h2>
          <p className="font-sans text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            From air ticket booking and visa assistance to hotel arrangements and comfortable transport, ZAITHOON HOLIDAYS provides complete pilgrimage solutions with professionalism, care, and peace of mind
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
            {['Air Ticket Booking', 'Visa Assistance', 'Comfortable Transport'].map((feature, idx) => (
              <div key={idx} className="bg-brand-charcoal/45 backdrop-blur-md border border-white/10 px-5 py-3 rounded-full text-white/95 text-xs md:text-sm font-sans tracking-wide">
                <span className="text-brand-gold mr-2">✦</span> {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Phase 4: Final Call to Action */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto z-20 transition-all duration-700 ease-out ${
            activePhase === 4 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <span className="font-sans text-brand-gold tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-6 block">
            Begin Your Spiritual Destiny
          </span>
          <h2 className="font-heading text-4xl md:text-6xl text-white leading-[1.2] mb-8">
            Craft Your Pilgrimage,<br />
            <span className="font-display italic font-light text-white/90">Embrace the Divine.</span>
          </h2>
          <p className="font-sans text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Select one of our limited-availability VIP Hajj & Umrah packages or speak with our concierge to build a completely bespoke itinerary.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
            <a 
              href="#registration-system"
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-charcoal px-8 py-4 rounded-full font-medium tracking-wide transition-all duration-300 w-full sm:w-auto text-center cursor-pointer"
            >
              Reserve Journey
            </a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="border border-white/30 hover:bg-white hover:text-brand-charcoal text-white px-8 py-4 rounded-full font-medium tracking-wide transition-all duration-300 w-full sm:w-auto backdrop-blur-sm cursor-pointer"
            >
              Request Itinerary
            </button>
          </div>
        </div>

        {/* Luxurious loading layer */}
        {isLoading && (\n          <div className="absolute inset-0 bg-brand-charcoal z-50 flex flex-col items-center justify-center text-center p-6">
            <div className="mb-6 relative flex items-center justify-center">
              <svg className="w-16 h-16 animate-spin text-brand-gold" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>\n              <span className="absolute text-[10px] font-sans font-bold text-brand-gold">{loadProgress}%</span>
            </div>
            <span className="font-heading text-brand-gold tracking-[0.2em] uppercase text-xs font-semibold mb-2">
              Entering the Sanctuary
            </span>
            <p className="text-white/60 text-xs max-w-xs font-sans font-light">
              Preparing the visual time-lapse experience of the Holy Land...
            </p>
          </div>
        )}
      </div>
      
      {/* Dynamic itinerary request modal */}
      <ConsultationModal \n        isOpen={isModalOpen} \n        onClose={() => setIsModalOpen(false)} \n      />\n    </section>\n  );\n}\n