import React from 'react';
import { motion } from 'motion/react';

const timelineSteps = [
  {
    step: '01',
    title: 'Book Package',
    description: 'Select your preferred Hajj or Umrah package and reserve your place. Our consultants will guide you through custom options.'
  },
  {
    step: '02',
    title: 'Visa Processing',
    description: 'Submit your documents securely. Our dedicated visa team handles all coordination for swift approvals.'
  },
  {
    step: '03',
    title: 'Flight Departure',
    description: 'Receive your travel kit, flight tickets, and details. Begin your journey with premium airline partners.'
  },
  {
    step: '04',
    title: 'Makkah Al-Mukarramah',
    description: 'Arrive at your 5-star hotel near the Haram. Perform your Umrah or Hajj rituals under scholarly guidance.'
  },
  {
    step: '05',
    title: 'Al-Madinah Al-Munawwarah',
    description: 'Travel to the Prophet\'s City in comfort. Visit Masjid An-Nabawi and engage in peaceful Ziyarah tours.'
  },
  {
    step: '06',
    title: 'Return Home',
    description: 'Conclude your spiritual journey. We coordinate your departure and transfer to the airport for your flight home.'
  }
];

export default function Timeline() {
  return (
    <section id="journey" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Central vertical line for desktop */}
      <div className="absolute top-[350px] bottom-[200px] left-1/2 -translate-x-1/2 w-[2px] bg-brand-stone/10 hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <span className="font-sans text-brand-emerald tracking-[0.2em] uppercase text-xs font-semibold mb-4 block">
            The Path of Devotion
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-brand-charcoal">
            The Sacred Journey
          </h2>
          <div className="h-[2px] bg-brand-gold w-16 mx-auto mt-6" />
        </div>

        {/* Timeline Items */}
        <div className="relative space-y-16 md:space-y-24">
          {timelineSteps.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center relative">
                
                {/* Timeline Center Bullet (Desktop) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-10 h-10 rounded-full bg-brand-ivory border-2 border-brand-gold flex items-center justify-center text-xs font-bold font-sans text-brand-emerald z-20 hidden md:flex shadow-sm">
                  {item.step}
                </div>

                {/* Left Side (Step content or spacer) */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col ${isEven ? 'md:text-right md:items-end' : 'md:order-2 md:text-left md:items-start'}`}
                >
                  <span className="font-sans text-brand-gold text-xs font-semibold mb-2 tracking-widest uppercase block md:hidden">
                    Step {item.step}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl text-brand-charcoal mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans text-brand-stone font-light leading-relaxed text-sm md:text-base max-w-md">
                    {item.description}
                  </p>
                </motion.div>

                {/* Right Side (Visual Card placeholder or spacer) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`bg-brand-ivory/40 border border-brand-stone/5 p-6 rounded-[20px] aspect-[16/7] flex items-center justify-center ${isEven ? 'md:order-2' : ''}`}
                >
                  <div className="text-center p-4 border border-dashed border-brand-stone/15 w-full h-full flex flex-col items-center justify-center rounded-[16px]">
                    <span className="font-sans text-brand-stone/20 text-4xl font-extralight block mb-1">{item.step}</span>
                    <span className="font-heading text-[10px] tracking-widest uppercase text-brand-emerald/50">{item.title}</span>
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
