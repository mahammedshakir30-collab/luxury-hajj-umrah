import React from 'react';
import { motion } from 'motion/react';
import ImageLoader from './ImageLoader';

export default function Destinations() {
  return (
    <section id="destinations" className="py-32 bg-brand-emerald text-brand-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-sans text-brand-gold tracking-[0.2em] uppercase text-sm font-semibold mb-4 block">
              Sacred Cities
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white">
              Spiritual Destinations
            </h2>
          </div>
          <p className="font-sans text-white/70 max-w-md font-light leading-relaxed">
            Walk the lands where revelations descended, and experience the profound peace 
            of the two holiest sanctuaries in Islam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Makkah Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="md:col-span-7 h-[400px] overflow-hidden group rounded-[24px]"
          >
            <div className="w-full h-full relative">
              <ImageLoader 
                src="/makka%20&%20madina%20pics/_Beautiful%20Mecca%20View.jpg" 
                alt="Makkah" 
                wrapperClassName="w-full h-full absolute inset-0"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end pointer-events-none">
                <span className="font-sans text-brand-gold tracking-widest uppercase text-xs font-semibold mb-2">The Mother of Cities</span>
                <h3 className="font-heading text-4xl text-white">Makkah Al-Mukarramah</h3>
              </div>
            </div>
          </motion.div>

          {/* Madinah Image */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:col-span-5 h-[450px] overflow-hidden group rounded-[24px] md:mt-12"
          >
            <div className="w-full h-full relative">
              <ImageLoader 
                src="/makka%20&%20madina%20pics/madinah.jpg" 
                alt="Madinah" 
                wrapperClassName="w-full h-full absolute inset-0"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end pointer-events-none">
                <span className="font-sans text-brand-gold tracking-widest uppercase text-xs font-semibold mb-2">The Radiant City</span>
                <h3 className="font-heading text-4xl text-white">Al-Madinah Al-Munawwarah</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
