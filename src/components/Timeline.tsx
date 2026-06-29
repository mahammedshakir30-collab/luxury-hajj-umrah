import React from 'react';
import { motion } from 'motion/react';
import { timeline } from '../data';

export default function Timeline() {
  return (
    <section id="journey" className="py-32 bg-white relative overflow-hidden">
      {/* Elegant geometric line background */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-brand-stone/10 hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <span className="font-sans text-brand-emerald tracking-[0.2em] uppercase text-sm font-semibold mb-4 block">
            The Path of Devotion
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-brand-charcoal">
            The Sacred Journey
          </h2>
          <div className="h-px bg-brand-gold w-20 mx-auto mt-8" />
        </div>

        {/* Timeline Items */}
        <div className="space-y-20 md:space-y-32">
          {timeline.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center relative">
                
                {/* Timeline Center Bullet (Desktop) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-10 h-10 rounded-full bg-brand-ivory border-2 border-brand-gold flex items-center justify-center text-xs font-semibold font-sans text-brand-emerald z-20 hidden md:flex">
                  {item.step}
                </div>

                {/* Left Side (Step content or spacer) */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col ${isEven ? 'md:text-right md:items-end' : 'md:order-2 md:text-left md:items-start'}`}
                >
                  <span className="font-sans text-brand-gold text-sm font-semibold mb-3 tracking-widest uppercase block md:hidden">
                    Step {item.step}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-brand-charcoal mb-4">
                    {item.title}
                  </h3>
                  <p className="font-sans text-brand-stone font-light leading-relaxed text-sm md:text-base max-w-md">
                    {item.description}
                  </p>
                </motion.div>

                {/* Right Side (Visual Card or spacer) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className={`bg-brand-ivory/50 border border-brand-stone/5 p-8 rounded-sm aspect-[4/3] flex items-center justify-center ${isEven ? 'md:order-2' : ''}`}
                >
                  <div className="text-center p-6 border border-dashed border-brand-stone/20 w-full h-full flex flex-col items-center justify-center">
                    <span className="font-sans text-brand-stone/30 text-6xl font-extralight block mb-2">{item.step}</span>
                    <span className="font-heading text-xs tracking-widest uppercase text-brand-emerald/40">{item.title}</span>
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
