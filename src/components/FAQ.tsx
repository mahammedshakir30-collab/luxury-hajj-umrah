import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqItems = [
  {
    question: 'What is included in the Zaitoon Holidays VIP Hajj & Umrah packages?',
    answer: 'Our VIP packages include 5-star hotel accommodations facing the Haram, premium flights (Business or Economy), luxury private transfers in SUVs or VIP coaches, guided Ziyarah tours with scholars, daily buffet meals, and 24/7 on-ground support.'
  },
  {
    question: 'Do you provide complete visa processing services?',
    answer: 'Yes, we handle the entire visa application process for Hajj, Umrah, and tourist visas. Our team ensures all documentation is correct and submitted promptly for a hassle-free approval.'
  },
  {
    question: 'Are the hotels within walking distance of the Haram?',
    answer: 'Yes, we select premium hotels in both Makkah and Madinah that are located in the front rows, offering short walking distances and direct access to the courtyard of Masjid Al-Haram and Masjid An-Nabawi.'
  },
  {
    question: 'Do you offer child-friendly and elderly-friendly packages?',
    answer: 'Absolutely. We offer tailored services including wheelchair assistance, minimal walking routes, medical coordination, child-friendly meals, and spacious connecting family suites.'
  },
  {
    question: 'What flight options are available for the journey?',
    answer: 'We partner with leading airlines such as Saudi Arabian Airlines, Emirates, Qatar Airways, and Gulf Air. We offer flexible departures from major airports with direct or convenient connection flights.'
  },
  {
    question: 'Is there a spiritual scholar accompanying the group?',
    answer: 'Yes, all our group packages are accompanied by respected religious scholars who provide lectures, guide you through the rituals of Umrah and Hajj, and answer any questions.'
  },
  {
    question: 'What transport options are used for intercity travel?',
    answer: 'We use modern, air-conditioned luxury transport. For VIP packages, we provide private GMCs, SUVs, or luxury sedans. For groups, we use spacious, high-end VIP coaches.'
  },
  {
    question: 'How far in advance should I book my package?',
    answer: 'For Hajj, we recommend booking 6 to 8 months in advance due to strict quota limits. For Umrah, especially during peak seasons like Ramadan or winter holidays, booking 3 to 4 months in advance is recommended.'
  },
  {
    question: 'Do you arrange private Ziyarah tours in Makkah and Madinah?',
    answer: 'Yes, our packages include guided Ziyarah (tours) to historical Islamic landmarks, including Cave Hira, Mount Arafat, Mina, Muzdalifah, Masjid Quba, and the battlefields of Uhud, with scholarly commentary.'
  },
  {
    question: 'Are medical services provided during the pilgrimage?',
    answer: 'We provide basic medical assistance and coordinate with local hospitals in Saudi Arabia if emergency medical care is required. Our tour leaders are trained to assist in these situations.'
  },
  {
    question: 'What is the booking and payment process?',
    answer: 'You can initiate your booking by filling out our online registration form. A travel consultant will contact you to finalize details. A deposit is required to secure flights and hotels, with the balance payable before departure.'
  },
  {
    question: 'Can I customize my Umrah itinerary?',
    answer: 'Yes, we specialize in bespoke custom itineraries. You can choose your own travel dates, hotels, transport preferences, and add extensions to other destinations like Dubai, Turkey, or Egypt.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Generate JSON-LD FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-brand-ivory relative">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <span className="font-sans text-brand-emerald tracking-[0.2em] uppercase text-xs font-semibold mb-4 block">
            Guidance
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-brand-charcoal">
            Frequently Asked Questions
          </h2>
          <div className="h-[2px] bg-brand-gold w-12 mx-auto mt-5" />
        </div>

        <div className="space-y-4">
          {faqItems.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.3) }}
                className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isOpen ? 'border-brand-gold/30 shadow-md' : 'border-brand-stone/10'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none cursor-pointer"
                >
                  <span className="font-display text-lg md:text-xl text-brand-charcoal pr-8 font-medium">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 text-brand-gold transition-transform duration-500 ${
                    isOpen ? 'rotate-185' : 'rotate-0'
                  }`}>
                    <ChevronDown size={20} strokeWidth={2} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8">
                        <p className="font-sans text-brand-stone font-light leading-relaxed text-sm md:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
