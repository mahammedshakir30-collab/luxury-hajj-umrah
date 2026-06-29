import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <img 
              src="/logo/main logo.png" 
              alt="ZAITHOON HOLIDAYS Logo" 
              className="h-12 w-auto object-contain mb-6" 
              draggable={false}
            />
            <p className="font-sans text-white/60 text-sm font-light leading-relaxed mb-8">
              Curating exceptionally refined and spiritually enriching Hajj and Umrah experiences for the discerning traveler.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-brand-gold hover:border-brand-gold transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-brand-gold hover:border-brand-gold transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-lg mb-6 tracking-wide text-white">Experience</h4>
            <ul className="space-y-4">
              <li><a href="#" className="font-sans text-sm font-light text-white/60 hover:text-brand-gold transition-colors">Premium Hajj</a></li>
              <li><a href="#" className="font-sans text-sm font-light text-white/60 hover:text-brand-gold transition-colors">VIP Umrah</a></li>
              <li><a href="#" className="font-sans text-sm font-light text-white/60 hover:text-brand-gold transition-colors">Ramadan Escapes</a></li>
              <li><a href="#" className="font-sans text-sm font-light text-white/60 hover:text-brand-gold transition-colors">Family Packages</a></li>
              <li><a href="#" className="font-sans text-sm font-light text-white/60 hover:text-brand-gold transition-colors">Private Ziyarah</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-lg mb-6 tracking-wide text-white">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="font-sans text-sm font-light text-white/60 hover:text-brand-gold transition-colors">About Us</a></li>
              <li><a href="#" className="font-sans text-sm font-light text-white/60 hover:text-brand-gold transition-colors">Our Scholars</a></li>
              <li><a href="#" className="font-sans text-sm font-light text-white/60 hover:text-brand-gold transition-colors">Travel Insurance</a></li>
              <li><a href="#" className="font-sans text-sm font-light text-white/60 hover:text-brand-gold transition-colors">Visa Services</a></li>
              <li><a href="#" className="font-sans text-sm font-light text-white/60 hover:text-brand-gold transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg mb-6 tracking-wide text-white">Contact Us</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-brand-gold flex-shrink-0 mt-0.5" />
                <span className="font-sans text-sm font-light text-white/60">
                  <a href="tel:+919745964752" className="hover:text-brand-gold transition-colors">+91 97459 64752</a>
                  <br />
                  <a href="tel:+919895964752" className="hover:text-brand-gold transition-colors">+91 98959 64752</a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-brand-gold flex-shrink-0 mt-0.5" />
                <span className="font-sans text-sm font-light text-white/60">
                  <a href="mailto:zaitoonholidays@gmail.com" className="hover:text-brand-gold transition-colors">
                    zaitoonholidays@gmail.com
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <a 
                  href="https://share.google/fxy8P7P6WVWqj4uIp" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-start gap-3 group"
                >\n                  <MapPin size={18} className="text-brand-gold flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="font-sans text-sm font-light text-white/60 hover:text-brand-gold transition-colors">
                    Cherkala City Center Building<br />
                    Pady Road, Cherkala<br />
                    Kasaragod, Kerala
                  </span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
          <p className="font-sans text-xs text-white/40 font-light mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ZAITHOON HOLIDAYS. All rights reserved.
          </p>
          <div className="font-sans text-xs text-white/40 font-light space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
