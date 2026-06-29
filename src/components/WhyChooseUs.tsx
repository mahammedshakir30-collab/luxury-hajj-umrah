import React from 'react';
import { motion } from 'motion/react';

const features = [
  {
    title: "Expert Guidance",
    description: "Perform your Hajj & Umrah rituals with complete confidence, guided by experienced scholars who ensure everything aligns with the Sunnah.",
    icon: (
      <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    )
  },
  {
    title: "Premium Hotels",
    description: "Enjoy luxurious 5-star accommodations situated just steps away from Masjid Al-Haram in Makkah and Masjid An-Nabawi in Madinah.",
    icon: (
      <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18v3H3V3z" />
      </svg>
    )
  },
  {
    title: "Visa Assistance",
    description: "Our dedicated visa experts handle all documentation and coordination, delivering a fast, stress-free approval process.",
    icon: (
      <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 9h3.75m.9 12H4.5a2.25 2.25 0 01-2.25-2.25V5.25A2.25 2.25 0 014.5 3h15a2.25 2.25 0 012.25 2.25v6.75M19.5 19.5l3 3m-3-3a3 3 0 10-6 0 3 3 0 006 0z" />
      </svg>
    )
  },
  {
    title: "Luxury Transport",
    description: "Travel in absolute comfort with our fleet of private, air-conditioned luxury SUVs and VIP coaches for all your intercity transfers.",
    icon: (
      <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125v-3.047c0-.246-.08-.485-.228-.68l-1.999-2.666a1.125 1.125 0 00-.9-.45h-2.181a1.125 1.125 0 00-1.125 1.125v4.25" />
      </svg>
    )
  },
  {
    title: "24/7 Support",
    description: "Our team of local coordinators and guides are available round-the-clock in the Holy Cities to assist you with any request or emergency.",
    icon: (
      <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
      </svg>
    )
  },
  {
    title: "Family Friendly",
    description: "We design tailored itineraries that accommodate children and senior pilgrims, featuring wheelchair access and spacious family suites.",
    icon: (
      <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.97 5.97 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    )
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 bg-brand-ivory text-brand-charcoal relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-sans text-brand-emerald tracking-[0.25em] uppercase text-xs font-semibold mb-4 block">
            Our Commitment
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-brand-charcoal mb-6">
            Why Choose Zaitoon Holidays
          </h2>
          <p className="font-sans text-brand-stone text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto">
            We blend spiritual devotion with premium hospitality, crafting an Umrah and Hajj experience that is serene, secure, and profoundly moving.
          </p>
        </div>

        {/* 3x2 Luxury Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[24px] border border-brand-stone/10 hover:border-brand-gold/30 hover:shadow-[0_20px_50px_rgba(201,163,64,0.06)] transition-all duration-500 group"
            >
              {/* Gold Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-brand-gold/5 border border-brand-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>

              {/* Title & Description */}
              <h3 className="font-display text-xl text-brand-charcoal mb-4 group-hover:text-brand-emerald transition-colors">
                {feature.title}
              </h3>
              <p className="font-sans text-brand-stone text-sm leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
