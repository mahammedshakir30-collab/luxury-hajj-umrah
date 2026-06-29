import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import ImageLoader from './ImageLoader';

const places = [
  {
    title: "Makkah Al-Mukarramah",
    subtitle: "The Mother of Cities",
    src: "/makka%20&%20madina%20pics/_Beautiful%20Mecca%20View.jpg"
  },
  {
    title: "Al-Madinah Al-Munawwarah",
    subtitle: "The Radiant City",
    src: "/makka%20&%20madina%20pics/madinah.jpg"
  },
  {
    title: "Masjid Al-Haram",
    subtitle: "The Sacred Sanctuary",
    src: "/makka%20&%20madina%20pics/(1)%20مي%20(@_MI__E)%20_%20X.jpg"
  },
  {
    title: "Masjid An-Nabawi",
    subtitle: "The Prophet's Mosque",
    src: "/makka%20&%20madina%20pics/2674081025765530.jpg"
  },
  {
    title: "Mina",
    subtitle: "The City of Tents",
    src: "/makka%20&%20madina%20pics/90916486223714718.jpg"
  },
  {
    title: "Mount Arafat",
    subtitle: "The Mount of Mercy",
    src: "/makka%20&%20madina%20pics/download%20(8).jpg"
  },
  {
    title: "Muzdalifah",
    subtitle: "The Night under the Stars",
    src: "/makka%20&%20madina%20pics/download%20(9).jpg"
  }
];

export default function Destinations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ right: 0, left: 0 });

  useEffect(() => {
    const calculateConstraints = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      
      setDragConstraints({
        right: 0,
        left: -(scrollWidth - clientWidth + 48) // Account for padding
      });
    };

    calculateConstraints();
    window.addEventListener('resize', calculateConstraints);
    return () => window.removeEventListener('resize', calculateConstraints);
  }, []);

  return (
    <section id="destinations" className="py-24 md:py-32 bg-brand-emerald text-brand-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-sans text-brand-gold tracking-[0.25em] uppercase text-xs font-semibold mb-4 block">
              Sacred Sanctuary
            </span>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-white">
              Holy Places Gallery
            </h2>
          </div>
          <p className="font-sans text-white/70 max-w-md font-light leading-relaxed text-sm md:text-base">
            Journey through the sacred locations of Hajj & Umrah, tracing the steps of faith and devotion across the holiest sanctuaries.
          </p>
        </div>
      </div>

      {/* Swipe/Drag Container */}
      <div className="w-full overflow-hidden cursor-grab active:cursor-grabbing px-6 md:px-12 select-none">
        <motion.div
          ref={containerRef}
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.15}
          className="flex gap-6 md:gap-8 w-max pb-8"
        >
          {places.map((place, idx) => (
            <motion.div
              key={idx}
              className="w-[280px] sm:w-[320px] md:w-[360px] h-[380px] md:h-[440px] rounded-[24px] overflow-hidden relative group shadow-2xl shrink-0 border border-white/5"
            >
              <div className="w-full h-full relative">
                {/* Lazy-loaded image wrapper */}
                <ImageLoader
                  src={place.src}
                  alt={place.title}
                  wrapperClassName="w-full h-full absolute inset-0"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1500ms] ease-out"
                />
                
                {/* Luxury dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 flex flex-col justify-end pointer-events-none z-10" />
                
                {/* Card text */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 pointer-events-none">
                  <span className="font-sans text-brand-gold tracking-[0.15em] uppercase text-[10px] font-bold mb-2 block">
                    {place.subtitle}
                  </span>
                  <h3 className="font-heading text-xl md:text-2xl text-white leading-tight">
                    {place.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Swipe Indicator */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-4 flex items-center justify-end gap-2 text-white/40 text-[10px] font-sans tracking-widest uppercase">
        <span>Swipe to explore</span>
        <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </section>
  );
}
