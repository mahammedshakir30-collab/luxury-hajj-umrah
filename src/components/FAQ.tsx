import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { faqs } from '../data';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 bg-brand-ivory relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <span className="font-sans text-brand-emerald tracking-[0.2em] uppercase text-sm font-semibold mb-4 block">
            Guidance
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-brand-charcoal">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-white rounded-lg overflow-hidden border transition-colors duration-300 ${isOpen ? 'border-brand-emerald/30 shadow-sm' : 'border-brand-stone/10'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                >
                  <span className="font-display text-xl md:text-2xl text-brand-charcoal pr-8">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 text-brand-gold transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown size={24} strokeWidth={1.5} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8">
                        <p className="font-sans text-brand-stone font-light leading-relaxed">
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
