import React, { useState } from 'react';

interface RegistrationFormData {
  fullName: string;
  email: string;
  mobile: string;
  whatsapp: string;
  gender: string;
  members: number;
  selectedPackageId: string;
  travelMonth: string;
  specialRequests: string;
  agreeToTerms: boolean;
}

export default function RegistrationSystem() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    mobile: '',
    whatsapp: '',
    gender: '',
    members: 1,
    selectedPackageId: '',
    travelMonth: '',
    specialRequests: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let val: any = value;
    if (type === 'checkbox') {
      val = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      val = parseInt(value, 10) || 1;
    }

    setFormData(prev => ({ ...prev, [name]: val }));
    if (errors[name as keyof RegistrationFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrationFormData, string>> = {};

    const fullNameSanitized = formData.fullName.trim();
    if (!fullNameSanitized) {
      newErrors.fullName = 'Full Name is required';
    } else if (fullNameSanitized.length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters long';
    }

    const emailSanitized = formData.email.trim();
    if (!emailSanitized) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailSanitized)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const mobileSanitized = formData.mobile.replace(/\s+/g, '');
    if (!mobileSanitized) {
      newErrors.mobile = 'Mobile Number is required';
    } else if (!/^\+?[1-9]\d{8,14}$/.test(mobileSanitized)) {
      newErrors.mobile = 'Enter a valid mobile number (e.g. +91XXXXXXXXXX)';
    }

    const whatsappSanitized = formData.whatsapp.replace(/\s+/g, '');
    if (!whatsappSanitized) {
      newErrors.whatsapp = 'WhatsApp Number is required';
    } else if (!/^\+?[1-9]\d{8,14}$/.test(whatsappSanitized)) {
      newErrors.whatsapp = 'Enter a valid WhatsApp number (e.g. +91XXXXXXXXXX)';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender selection is required';
    }

    if (!formData.travelMonth) {
      newErrors.travelMonth = 'Please select travel month';
    }

    if (!formData.selectedPackageId) {
      newErrors.selectedPackageId = 'Please select a package';
    }

    if (formData.members < 1) {
      newErrors.members = 'Number of members must be at least 1';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms & Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const currentTime = Date.now();
    if (currentTime - lastSubmissionTime < 10000) {
      alert('We have already received your submission. Please wait a moment before trying again.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setLastSubmissionTime(Date.now());
      setIsSubmitting(false);
      setShowSuccessOverlay(true);

      const packageName = formData.selectedPackageId === 'Hajj'
        ? 'Hajj'
        : formData.selectedPackageId === 'Umrah'
          ? 'Umrah'
          : 'Hajj & Umrah';

      // Format WhatsApp message as requested
      const messageText =
        `🕋 NEW HAJJ & UMRAH REGISTRATION\n\nPackage:\n${packageName}\n\nName:\n${formData.fullName.trim()}\n\nPhone:\n${formData.mobile.replace(/\s+/g, '')}\n\nWhatsApp:\n${formData.whatsapp.replace(/\s+/g, '')}\n\nEmail:\n${formData.email.trim()}\n\nGender:\n${formData.gender}\n\nNumber of Members:\n${formData.members}\n\nTravel Month:\n${formData.travelMonth}\n\nSpecial Requests:\n${formData.specialRequests.trim() || 'None'}`;

      const encodedMessage = encodeURIComponent(messageText);
      const whatsappUrl = `https://wa.me/919745964752?text=${encodedMessage}`;

      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }, 1500);

    }, 2000);
  };

  return (
    <section id="registration-system" className="py-16 md:py-20 bg-[#0B0B0B] text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C9A340_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="font-sans text-[#C9A340] tracking-[0.25em] uppercase text-xs font-semibold mb-3 block">
            Online Booking
          </span>
          <h2 className="font-heading text-2xl md:text-4xl text-white mb-4">
            Reserve Your Sacred Journey
          </h2>
          <p className="font-sans text-white/60 text-sm md:text-base font-light leading-relaxed">
            Complete the registration below and our travel consultant will contact you shortly.
          </p>
        </div>

        {/* Small & Compact Registration Form Container */}
        <div id="sacred-journey-form" className="max-w-xl mx-auto">
          <div className="bg-white/[0.02] backdrop-blur-lg border border-[rgba(201,163,64,0.15)] rounded-[24px] p-6 md:p-8 relative overflow-hidden">

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Selected Package (Hajj / Umrah / Both) */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="selectedPackageId" className="font-sans text-[10px] tracking-wider text-white/50 uppercase">
                  Selected Package (Hajj & Umrah)
                </label>
                <select
                  id="selectedPackageId"
                  name="selectedPackageId"
                  value={formData.selectedPackageId}
                  onChange={handleChange}
                  className={`bg-[#0B0B0B] border ${errors.selectedPackageId ? 'border-red-500/50' : 'border-[rgba(201,163,64,0.15)] focus:border-[#C9A340]'
                    } rounded-xl px-4 py-2.5 text-white focus:outline-none focus:shadow-[0_0_10px_rgba(201,163,64,0.1)] transition-all duration-300 font-sans appearance-none`}
                >
                  <option value="" disabled className="text-white/30">Select Package</option>
                  <option value="Hajj" className="bg-[#0B0B0B] text-white">Hajj</option>
                  <option value="Umrah" className="bg-[#0B0B0B] text-white">Umrah</option>
                  <option value="Both" className="bg-[#0B0B0B] text-white">Hajj & Umrah</option>
                </select>
                {errors.selectedPackageId && (
                  <span className="text-red-400 text-xs font-sans mt-0.5 pl-1">{errors.selectedPackageId}</span>
                )}
              </div>

              {/* Full Name */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="fullName" className="font-sans text-[10px] tracking-wider text-white/50 uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`bg-white/[0.02] border ${errors.fullName ? 'border-red-500/50' : 'border-[rgba(201,163,64,0.15)] focus:border-[#C9A340]'
                    } rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:shadow-[0_0_10px_rgba(201,163,64,0.1)] transition-all duration-300 font-sans`}
                />
                {errors.fullName && (
                  <span className="text-red-400 text-xs font-sans mt-0.5 pl-1">{errors.fullName}</span>
                )}
              </div>

              {/* Mobile Number */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="mobile" className="font-sans text-[10px] tracking-wider text-white/50 uppercase">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="e.g. +919895964752"
                  className={`bg-white/[0.02] border ${errors.mobile ? 'border-red-500/50' : 'border-[rgba(201,163,64,0.15)] focus:border-[#C9A340]'
                    } rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:shadow-[0_0_10px_rgba(201,163,64,0.1)] transition-all duration-300 font-sans`}
                />
                {errors.mobile && (
                  <span className="text-red-400 text-xs font-sans mt-0.5 pl-1">{errors.mobile}</span>
                )}
              </div>

              {/* WhatsApp Number */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="whatsapp" className="font-sans text-[10px] tracking-wider text-white/50 uppercase">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="e.g. +919745964752"
                  className={`bg-white/[0.02] border ${errors.whatsapp ? 'border-red-500/50' : 'border-[rgba(201,163,64,0.15)] focus:border-[#C9A340]'
                    } rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:shadow-[0_0_10px_rgba(201,163,64,0.1)] transition-all duration-300 font-sans`}
                />
                {errors.whatsapp && (
                  <span className="text-red-400 text-xs font-sans mt-0.5 pl-1">{errors.whatsapp}</span>
                )}
              </div>

              {/* Email Address */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="email" className="font-sans text-[10px] tracking-wider text-white/50 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.name@example.com"
                  className={`bg-white/[0.02] border ${errors.email ? 'border-red-500/50' : 'border-[rgba(201,163,64,0.15)] focus:border-[#C9A340]'
                    } rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:shadow-[0_0_10px_rgba(201,163,64,0.1)] transition-all duration-300 font-sans`}
                />
                {errors.email && (
                  <span className="text-red-400 text-xs font-sans mt-0.5 pl-1">{errors.email}</span>
                )}
              </div>

              {/* Gender & Number of Members */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="gender" className="font-sans text-[10px] tracking-wider text-white/50 uppercase">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`bg-[#0B0B0B] border ${errors.gender ? 'border-red-500/50' : 'border-[rgba(201,163,64,0.15)] focus:border-[#C9A340]'
                      } rounded-xl px-4 py-2.5 text-white focus:outline-none focus:shadow-[0_0_10px_rgba(201,163,64,0.1)] transition-all duration-300 font-sans appearance-none`}
                  >
                    <option value="" disabled className="text-white/30">Select</option>
                    <option value="Male" className="bg-[#0B0B0B] text-white">Male</option>
                    <option value="Female" className="bg-[#0B0B0B] text-white">Female</option>
                  </select>
                  {errors.gender && (
                    <span className="text-red-400 text-xs font-sans mt-0.5 pl-1">{errors.gender}</span>
                  )}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="members" className="font-sans text-[10px] tracking-wider text-white/50 uppercase">
                    Total Members
                  </label>
                  <input
                    type="number"
                    id="members"
                    name="members"
                    min="1"
                    value={formData.members}
                    onChange={handleChange}
                    className={`bg-white/[0.02] border ${errors.members ? 'border-red-500/50' : 'border-[rgba(201,163,64,0.15)] focus:border-[#C9A340]'
                      } rounded-xl px-4 py-2.5 text-white focus:outline-none focus:shadow-[0_0_10px_rgba(201,163,64,0.1)] transition-all duration-300 font-sans`}
                  />
                  {errors.members && (
                    <span className="text-red-400 text-xs font-sans mt-0.5 pl-1">{errors.members}</span>
                  )}
                </div>
              </div>

              {/* Travel Month */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="travelMonth" className="font-sans text-[10px] tracking-wider text-white/50 uppercase">
                  Intended Month of Travel
                </label>
                <select
                  id="travelMonth"
                  name="travelMonth"
                  value={formData.travelMonth}
                  onChange={handleChange}
                  className={`bg-[#0B0B0B] border ${errors.travelMonth ? 'border-red-500/50' : 'border-[rgba(201,163,64,0.15)] focus:border-[#C9A340]'
                    } rounded-xl px-4 py-2.5 text-white focus:outline-none focus:shadow-[0_0_10px_rgba(201,163,64,0.1)] transition-all duration-300 font-sans appearance-none`}
                >
                  <option value="" disabled className="text-white/30">Select Travel Month</option>
                  <option value="January 2025" className="bg-[#0B0B0B] text-white">January 2025</option>
                  <option value="February 2025" className="bg-[#0B0B0B] text-white">February 2025</option>
                  <option value="March 2025" className="bg-[#0B0B0B] text-white">March 2025 (Ramadan)</option>
                  <option value="April 2025" className="bg-[#0B0B0B] text-white">April 2025</option>
                  <option value="May 2025" className="bg-[#0B0B0B] text-white">May 2025</option>
                  <option value="June 2025" className="bg-[#0B0B0B] text-white">June 2025 (Hajj Season)</option>
                  <option value="July 2025" className="bg-[#0B0B0B] text-white">July 2025</option>
                  <option value="August 2025" className="bg-[#0B0B0B] text-white">August 2025</option>
                  <option value="September 2025" className="bg-[#0B0B0B] text-white">September 2025</option>
                  <option value="October 2025" className="bg-[#0B0B0B] text-white">October 2025</option>
                  <option value="November 2025" className="bg-[#0B0B0B] text-white">November 2025</option>
                  <option value="December 2025" className="bg-[#0B0B0B] text-white">December 2025</option>
                </select>
                {errors.travelMonth && (
                  <span className="text-red-400 text-xs font-sans mt-0.5 pl-1">{errors.travelMonth}</span>
                )}
              </div>

              {/* Special Requests */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="specialRequests" className="font-sans text-[10px] tracking-wider text-white/50 uppercase">
                  Special Requests / Dietary / Wheelchair
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  rows={2}
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Describe any custom arrangements, wheelchair requirements, or dietary needs..."
                  className="bg-white/[0.02] border border-[rgba(201,163,64,0.15)] focus:border-[#C9A340] rounded-xl px-4 py-2 text-white placeholder-white/25 focus:outline-none focus:shadow-[0_0_10px_rgba(201,163,64,0.1)] transition-all duration-300 font-sans text-sm resize-none"
                />
              </div>

              {/* Terms & Conditions */}
              <div className="flex flex-col space-y-1 pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="mt-1 accent-[#C9A340] cursor-pointer"
                  />
                  <span className="font-sans text-[11px] text-white/60 leading-normal">
                    I agree to the terms of booking and confirm that all details provided are accurate.
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <span className="text-red-400 text-xs font-sans mt-0.5 pl-8">{errors.agreeToTerms}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 bg-gradient-to-r from-[#D4AF37] to-[#C9A340] hover:from-[#C9A340] hover:to-[#B38F2E] text-brand-charcoal font-semibold py-3.5 px-6 rounded-full transition-all duration-300 shadow-lg uppercase tracking-wider text-xs disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-brand-charcoal" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Processing Reservation...</span>
                  </>
                ) : (
                  <span>Confirm Booking via WhatsApp</span>
                )}
              </button>

            </form>

            {/* Success Overlay */}
            {showSuccessOverlay && (
              <div className="absolute inset-0 bg-brand-charcoal/95 flex flex-col items-center justify-center text-center p-6 z-20 transition-all duration-500">
                <div className="w-14 h-14 bg-gradient-to-r from-[#D4AF37] to-[#C9A340] text-brand-charcoal rounded-full flex items-center justify-center mb-4 animate-bounce">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-white mb-2">Booking Initiated!</h3>
                <p className="font-sans text-xs text-white/70 max-w-xs leading-relaxed mb-4">
                  We are redirecting you to WhatsApp to complete your reservation. If the window didn't open, please click the button below.
                </p>
                <button
                  onClick={() => {
                    const messageText =
                      `🕋 NEW HAJJ & UMRAH REGISTRATION\n\nPackage:\n${formData.selectedPackageId === 'Hajj' ? 'Hajj' : formData.selectedPackageId === 'Umrah' ? 'Umrah' : 'Hajj & Umrah'}\n\nName:\n${formData.fullName.trim()}\n\nPhone:\n${formData.mobile.replace(/\s+/g, '')}\n\nWhatsApp:\n${formData.whatsapp.replace(/\s+/g, '')}\n\nEmail:\n${formData.email.trim()}\n\nGender:\n${formData.gender}\n\nNumber of Members:\n${formData.members}\n\nTravel Month:\n${formData.travelMonth}\n\nSpecial Requests:\n${formData.specialRequests.trim() || 'None'}`;
                    window.open(`https://wa.me/919745964752?text=${encodeURIComponent(messageText)}`, '_blank');
                  }}
                  className="bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white transition-all"
                >
                  Open Chat Manually
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
