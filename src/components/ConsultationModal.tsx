import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'hajj'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', interest: 'hajj' });
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-charcoal/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            className="relative w-full max-w-lg bg-brand-ivory shadow-2xl overflow-hidden rounded-sm"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-brand-stone/10 bg-white">
              <div>
                <h3 className="font-heading text-2xl text-brand-charcoal">Book a Consultation</h3>
                <p className="font-sans text-sm text-brand-stone mt-1">Speak with our luxury travel concierges.</p>
              </div>
              <button 
                onClick={onClose}
                className="text-brand-stone hover:text-brand-charcoal transition-colors p-2"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 bg-brand-ivory">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="flex flex-col items-center justify-center py-12 text-center"
                >\n                  <div className="w-16 h-16 bg-brand-emerald/10 text-brand-emerald rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-display text-2xl text-brand-charcoal mb-2">Request Received</h4>
                  <p className="font-sans text-brand-stone">Our concierge will contact you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block font-sans text-sm font-medium text-brand-charcoal mb-2 uppercase tracking-wider text-xs">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-brand-stone/20 px-4 py-3 focus:outline-none focus:border-brand-emerald transition-colors font-sans text-brand-charcoal placeholder-brand-stone/50"
                      placeholder="e.g. Ahmed Al-Sayed"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block font-sans text-sm font-medium text-brand-charcoal mb-2 uppercase tracking-wider text-xs">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-brand-stone/20 px-4 py-3 focus:outline-none focus:border-brand-emerald transition-colors font-sans text-brand-charcoal placeholder-brand-stone/50"
                        placeholder="ahmed@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block font-sans text-sm font-medium text-brand-charcoal mb-2 uppercase tracking-wider text-xs">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-brand-stone/20 px-4 py-3 focus:outline-none focus:border-brand-emerald transition-colors font-sans text-brand-charcoal placeholder-brand-stone/50"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="interest" className="block font-sans text-sm font-medium text-brand-charcoal mb-2 uppercase tracking-wider text-xs">Journey of Interest</label>
                    <div className="relative">
                      <select
                        id="interest"
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full bg-white border border-brand-stone/20 px-4 py-3 focus:outline-none focus:border-brand-emerald transition-colors font-sans text-brand-charcoal appearance-none"
                      >\n                        <option value="hajj">Premium Hajj 2025</option>
                        <option value="umrah_vip">VIP Umrah</option>
                        <option value="umrah_ramadan">Ramadan Umrah</option>
                        <option value="family">Family Package</option>
                        <option value="custom">Custom Itinerary</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-brand-stone">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-emerald text-white font-medium py-4 uppercase tracking-widest text-sm hover:bg-brand-emerald/90 transition-colors"
                  >
                    Request Consultation
                  </button>
                  <p className="text-center font-sans text-xs text-brand-stone mt-4">
                    Your information is strictly confidential.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
