import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-brand-ivory/95 backdrop-blur-md border-b border-brand-emerald/10 py-4 shadow-sm' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img 
            src="/logo/main logo.png" 
            alt="ZAITHOON HOLIDAYS Logo" 
            className="h-12 w-auto object-contain" 
            draggable={false}
          />
        </a>

        {/* Desktop Links */}
        <div className={`hidden md:flex space-x-10 text-sm font-medium tracking-wide ${isScrolled ? 'text-brand-charcoal' : 'text-white/90'}`}>
          <a href="#registration-system" className="hover:text-brand-gold transition-colors">Register</a>
          <a href="#journey" className="hover:text-brand-gold transition-colors">The Journey</a>
          <a href="#destinations" className="hover:text-brand-gold transition-colors">Destinations</a>
          <a href="#faq" className="hover:text-brand-gold transition-colors">FAQ</a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="https://wa.me/919745964752"
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              isScrolled 
                ? 'bg-brand-emerald text-white hover:bg-brand-emerald/90' 
                : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            <Phone size={16} />
            <span>Consultation</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden ${isScrolled ? 'text-brand-charcoal' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          className="absolute top-full left-0 w-full bg-brand-ivory border-t border-brand-emerald/10 shadow-lg py-6 px-6 flex flex-col gap-6 md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <a href="#registration-system" onClick={() => setIsMobileMenuOpen(false)} className="text-brand-charcoal font-medium text-lg">Register</a>
          <a href="#journey" onClick={() => setIsMobileMenuOpen(false)} className="text-brand-charcoal font-medium text-lg">The Journey</a>
          <a href="#destinations" onClick={() => setIsMobileMenuOpen(false)} className="text-brand-charcoal font-medium text-lg">Destinations</a>
          <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="text-brand-charcoal font-medium text-lg">FAQ</a>
          
          <a
            href="https://wa.me/919745964752"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 bg-brand-emerald text-white font-semibold rounded-full uppercase tracking-wider text-xs shadow-md hover:bg-brand-emerald/90 transition-colors"
          >
            <Phone size={16} />
            <span>WhatsApp Consultation</span>
          </a>
        </motion.div>
      )}
    </nav>
  );
}
