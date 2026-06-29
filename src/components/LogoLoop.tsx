import React from 'react';
import './LogoLoop.css';

// Luxury hotels and airlines associated with premium Hajj & Umrah
const partners = [
  { name: 'Saudi Arabian Airlines', logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=120' },
  { name: 'Fairmont Makkah Clock Royal Tower', logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=120' },
  { name: 'Raffles Makkah Palace', logo: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=120' },
  { name: 'Pullman ZamZam Makkah', logo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=120' },
  { name: 'The Oberoi Madinah', logo: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=120' },
  { name: 'Dar Al Taqwa Madinah', logo: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=120' },
];

export default function LogoLoop() {
  // Double the array for a seamless loop
  const doublePartners = [...partners, ...partners];

  return (
    <div className=\"logo-ticker-container bg-[#090909] border-y border-white/5 py-8 relative z-20 overflow-hidden\">
      <div className=\"logo-ticker-track flex items-center\">
        {doublePartners.map((partner, idx) => (
          <div key={idx} className=\"flex items-center justify-center px-4\">
            <span className=\"font-heading text-lg md:text-xl text-white/20 tracking-[0.25em] uppercase hover:text-brand-gold/75 transition-all duration-500 cursor-default select-none whitespace-nowrap\">
              {partner.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
