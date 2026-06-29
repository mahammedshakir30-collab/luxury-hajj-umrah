import React from 'react';
import { motion } from 'motion/react';
import { Phone, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full bg-brand-charcoal overflow-hidden flex items-center justify-center">
      {/* Optimized WebP/JPEG Background Image with Lazy Loading & Preload hint */}
      <div className="absolute inset-0 z-0">
        <img
          src="/makka%20&%20madina%20pics/_Beautiful%20Mecca%20View.jpg"
          alt="Masjid Al Haram Mecca Sanctity View"
          className="w-full h-full object-cover scale-105 animate-[subtle-zoom_20s_ease-out_infinite]"
        />
        {/* Luxury Vignette and Gradients */}
        <div className="absolute inset-0 bg-brand-charcoal/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/60 via-transparent to-brand-charcoal/85 z-10" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center justify-center h-full pt-16">
        {/* Gold Badge */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-sans text-brand-gold tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-6 block"
        >
          Zaitoon Holidays
        </motion.span>

        {/* Elegant Serif Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-6 uppercase tracking-tight"
        >
          A Journey of Faith.<br />
          <span className="font-display italic font-light text-white/90 capitalize">A Lifetime of Blessings.</span>
        </motion.h1>

        {/* Premium Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="font-sans text-white/80 text-base md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          Your Sacred Journey, Our Blessed Promise. From the moment you dream of the Holy Journey to your safe return, we are with you every step, every dua.
        </motion.p>

        {/* Two Luxury CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#registration-system"
            className="group bg-gradient-to-r from-[#D4AF37] to-[#C9A340] hover:from-[#C9A340] hover:to-[#B38F2E] text-brand-charcoal px-8 py-4 rounded-full font-semibold tracking-wider text-xs uppercase shadow-lg hover:shadow-brand-gold/10 transition-all duration-300 w-full sm:w-auto text-center flex items-center justify-center gap-2"
          >
            <span>Book Your Journey</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://wa.me/919745964752"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 border border-white/30 hover:bg-white hover:text-brand-charcoal text-white px-8 py-4 rounded-full font-semibold tracking-wider text-xs uppercase transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
          >
            <Phone size={14} />
            <span>Talk on WhatsApp</span>
          </a>
        </motion.div>
      </div>

      {/* Sleek Animated Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[20px] h-[32px] border border-white/30 rounded-full flex justify-center p-1"
        >
          <div className="w-[2px] h-[5px] bg-brand-gold rounded-full" />
        </motion.div>
        <span className="text-[8px] text-white/30 tracking-[0.3em] uppercase font-sans">Scroll</span>
      </div>

      {/* Background zoom animation style */}
      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1.02); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1.02); }
        }
      `}</style>
    </section>
  );
}
