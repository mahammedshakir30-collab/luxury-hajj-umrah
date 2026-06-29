import React from 'react';
import LogoLoop from './LogoLoop';

const services = [
  {
    title: "Air Ticket Booking",
    description: "Premium flight arrangements and booking with leading international airlines.",
    icon: (
      <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    )
  },
  {
    title: "Visa Assistance",
    description: "Fast, stress-free Hajj, Umrah, and tourist visa processing and documentation.",
    icon: (
      <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
      </svg>
    )
  },
  {
    title: "Luxury Hotels",
    description: "Handpicked 5-star accommodations situated right next to the holy sites.",
    icon: (
      <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    )
  },
  {
    title: "Hajj & Umrah Packages",
    description: "Carefully curated spiritual journeys tailored for individuals and families.",
    icon: (
      <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    )
  },
  {
    title: "Ziyarah Services",
    description: "Guided tours of historical Islamic landmarks in Makkah and Madinah.",
    icon: (
      <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
      </svg>
    )
  },
  {
    title: "Comfortable Transport",
    description: "Private air-conditioned coaches and VIP SUVs for all transfers.",
    icon: (
      <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125v-3.047c0-.246-.08-.485-.228-.68l-1.999-2.666a1.125 1.125 0 00-.9-.45h-2.181a1.125 1.125 0 00-1.125 1.125v4.25" />
      </svg>
    )
  }
];

export default function ServiceHighlightsLoop() {
  // Triple the items to ensure there are enough cards to loop smoothly
  const loopedServices = [...services, ...services, ...services];

  return (
    <section className="py-24 bg-[#090909] text-white relative overflow-hidden flex flex-col justify-center">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center mb-16 relative z-10">
        <span className="font-sans text-brand-gold tracking-[0.25em] uppercase text-xs font-semibold mb-4 block">
          Our Services
        </span>
        <h2 className="font-heading text-3xl md:text-5xl text-white">
          Complete Pilgrimage Solutions
        </h2>
        <p className="font-sans text-white/50 text-sm md:text-base font-light mt-4 max-w-xl mx-auto leading-relaxed">
          From flights and visa processing to handpicked hotels, we handle every detail so you can focus entirely on your worship.
        </p>
      </div>

      {/* Infinite Horizontal Ticker */}
      <div className="w-full overflow-hidden relative z-10 py-4">
        {/* Soft edge gradients */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#090909] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#090909] to-transparent z-20 pointer-events-none" />

        <div className="flex animate-marquee hover:[animation-play-state:paused] gap-6 w-max">
          {loopedServices.map((service, idx) => (
            <div
              key={idx}
              className="w-[280px] md:w-[320px] bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-3xl flex flex-col items-center text-center transition-all duration-300 hover:border-brand-gold/30 hover:bg-white/[0.04] group shrink-0"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-gold/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-brand-gold/10">
                {service.icon}
              </div>
              <h3 className="font-display text-lg md:text-xl text-white mb-3 group-hover:text-brand-gold transition-colors">
                {service.title}
              </h3>
              <p className="font-sans text-white/40 text-xs md:text-sm leading-relaxed font-light">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind marquee animation styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translate3d(calc(-33.333% - 8px), 0, 0); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>

      {/* Brand hotel/airlines looping ribbon */}
      <div className="mt-16">
        <LogoLoop />
      </div>
    </section>
  );
}
