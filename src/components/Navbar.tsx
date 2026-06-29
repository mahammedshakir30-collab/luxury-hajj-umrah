import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 md:px-8 pt-4 pointer-events-none">
      <nav className={`mx-auto w-full max-w-7xl rounded-full border transition-all duration-500 pointer-events-auto flex items-center justify-between ${
        isScrolled 
          ? 'bg-brand-charcoal/85 backdrop-blur-md border-white/10 py-3 px-6 shadow-[0_12px_40px_rgba(0,0,0,0.25)]' 
          : 'bg-transparent border-transparent py-5 px-6'
      }`}>
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img 
            src="/logo/main logo.png" 
            alt="ZAITHOON HOLIDAYS Logo" 
            className="h-9 md:h-11 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
            draggable={false}
          />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-white/80">
          {[
            { label: 'Register', href: '#registration-system' },
            { label: 'The Journey', href: '#journey' },
            { label: 'Destinations', href: '#destinations' },
            { label: 'FAQ', href: '#faq' }
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-2 hover:text-brand-gold transition-colors duration-300 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <a
            href="https://wa.me/919745964752"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-brand-gold hover:text-brand-charcoal border border-white/10 hover:border-brand-gold transition-all duration-500 text-white"
          >
            <Phone size={12} className="group-hover:rotate-12 transition-transform" />
            <span>Consultation</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden text-white p-2 hover:text-brand-gold transition-colors focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-4 right-4 mt-2 bg-brand-charcoal/95 backdrop-blur-lg border border-white/10 rounded-3xl py-6 px-6 flex flex-col gap-5 md:hidden shadow-2xl pointer-events-auto"
          >
            {[
              { label: 'Register', href: '#registration-system' },
              { label: 'The Journey', href: '#journey' },
              { label: 'Destinations', href: '#destinations' },
              { label: 'FAQ', href: '#faq' }
            ].map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white/90 hover:text-brand-gold font-medium text-base tracking-wide transition-colors"
              >
                {link.label}
              </a>
            ))}
            
            <a
              href="https://wa.me/919745964752"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#C9A340] hover:from-[#C9A340] hover:to-[#B38F2E] text-brand-charcoal font-semibold rounded-full uppercase tracking-wider text-xs shadow-md transition-all"
            >
              <Phone size={14} />
              <span>WhatsApp Consultation</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
