import React from 'react';
import LogoLoop from './LogoLoop';

const services = [
  {
    title: "Air Ticket Booking",
    description: "Premium flight arrangements with leading airlines.",
    src: "/images/services/airplane.png",
  },
  {
    title: "Visa Assistance",
    description: "Fast, stress-free Hajj, Umrah, and tourist visa processing.",
    src: "/images/services/passport.png",
  },
  {
    title: "Luxury Hotel Booking",
    description: "Handpicked 5-star accommodations right next to the holy sites.",
    src: "/images/services/hotel.png",
  },
  {
    title: "Hajj & Umrah Packages",
    description: "Carefully curated spiritual journeys for individuals and families.",
    src: "/images/services/kaaba.png",
  },
  {
    title: "Ziyarah Services",
    description: "Guided tours of historical Islamic landmarks in Makkah and Madinah.",
    src: "/images/services/mosque.png",
  },
  {
    title: "Comfortable Transport",
    description: "Private air-conditioned coaches and VIP SUVs for all transfers.",
    src: "/images/services/bus.png",
  }
];

export default function ServiceHighlightsLoop() {
  // Triple the items to ensure there are enough cards to loop smoothly
  const loopedServices = [...services, ...services, ...services];

  return (
    <section className=\"py-24 bg-[#090909] text-white relative overflow-hidden flex flex-col justify-center\">
      {/* Background radial glow */}
      <div className=\"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none z-0\" />

      <div className=\"max-w-7xl mx-auto px-6 md:px-12 w-full text-center mb-16 relative z-10\">
        <span className=\"font-sans text-brand-gold tracking-[0.25em] uppercase text-xs font-semibold mb-4 block\">
          Our Services
        </span>
        <h2 className=\"font-heading text-3xl md:text-5xl text-white\">
          Complete Pilgrimage Solutions
        </h2>
        <p className=\"font-sans text-white/50 text-sm md:text-base font-light mt-4 max-w-xl mx-auto leading-relaxed\">
          From flights and visa processing to handpicked hotels, we handle every detail so you can focus entirely on your worship.
        </p>
      </div>

      {/* Infinite Horizontal Ticker */}
      <div className=\"w-full overflow-hidden relative z-10 py-4\">
        {/* Soft edge gradients */}
        <div className=\"absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#090909] to-transparent z-20 pointer-events-none\" />
        <div className=\"absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#090909] to-transparent z-20 pointer-events-none\" />

        <div className=\"flex animate-marquee hover:[animation-play-state:paused] gap-6 w-max\">
          {loopedServices.map((service, idx) => (
            <div
              key={idx}
              className=\"w-[280px] md:w-[320px] bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-3xl flex flex-col items-center text-center transition-all duration-300 hover:border-brand-gold/30 hover:bg-white/[0.04] group shrink-0\"
            >
              <div className=\"w-16 h-16 rounded-2xl bg-brand-gold/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-brand-gold/10\">
                <img
                  src={service.src}
                  alt={service.title}
                  className=\"w-9 h-9 object-contain filter brightness-100\"
                  draggable={false}
                />
              </div>
              <h3 className=\"font-display text-lg md:text-xl text-white mb-3 group-hover:text-brand-gold transition-colors\">
                {service.title}
              </h3>
              <p className=\"font-sans text-white/40 text-xs md:text-sm leading-relaxed font-light\">
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
      <div className=\"mt-16\">
        <LogoLoop />
      </div>
    </section>
  );
}
