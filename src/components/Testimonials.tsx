import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Volume2, VolumeX, ArrowRight, Quote, CheckCircle2 } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  location: string;
  avatarText: string;
  verified: boolean;
  stars: number;
  text: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "MG",
    location: "Kasaragod, Kerala",
    avatarText: "MG",
    verified: true,
    stars: 5,
    text: "അൽഹംദുലില്ലാഹ്, സൈത്തൂൻ ഹോളിഡേയ്‌സിനൊപ്പമുള്ള ഞങ്ങളുടെ ഉംറ യാത്ര സമാനതകളില്ലാത്തതായിരുന്നു.Cherkala മുതൽ മക്കയും മദീനയും വരെ അവർ നൽകിയ പരിചരണം അത്ഭുതകരമാണ്.വിശുദ്ധ ഹറമിന് ഏറ്റവും അടുത്തുള്ള ആഡംബര ഹോട്ടലുകൾ ഞങ്ങൾക്ക് പ്രാർത്ഥനകളിൽ കൂടുതൽ ശ്രദ്ധ കേന്ദ്രീകരിക്കാൻ അവസരമൊരുക്കി.പ്രത്യേകിച്ച് അവരുടെ പണ്ഡിതന്മാരുടെ മാർഗ്ഗനിർദ്ദേശവും, എയർപോർട്ടിലെ സ്വീകരണവും എടുത്തുപറയേണ്ടതാണ്.കുടുംബത്തോടൊപ്പം സമാധാനത്തോടെ യാത്ര ചെയ്യാൻ ആഗ്രഹിക്കുന്നവർക്ക് ഞാൻ സൈത്തൂൻ ഹോളിഡേയ്‌സ് ശക്തമായി ശുപാർശ ചെയ്യുന്നു."
  },
  {
    id: 2,
    name: "MK",
    location: "Kasaragod, Kerala",
    avatarText: "MK",
    verified: true,
    stars: 5,
    text: "ഉംറ നിർവ്വഹിക്കുക എന്നത് ഞങ്ങളുടെ വലിയൊരു സ്വപ്നമായിരുന്നു, അതിനെ ഏറ്റവും മനോഹരമായ ഒരു അനുഭവമാക്കി മാറ്റാൻ സൈത്തൂൻ ഹോളിഡേയ്‌സിന് കഴിഞ്ഞു.യാത്രയിലെ ഓരോ ഘട്ടത്തിലും അവർ കാണിച്ച കൃത്യതയും ഉത്തരവാദിത്തവും പ്രശംസനീയമാണ്.വിമാന ടിക്കറ്റ്, വിസ, മികച്ച ഭക്ഷണം, ആഡംബര വാഹനങ്ങൾ തുടങ്ങി എല്ലാ കാര്യങ്ങളും അവർ മുൻകൂട്ടി ഭംഗിയായി ക്രമീകരിച്ചിരുന്നു.അല്ലാഹു അവരുടെ സേവനങ്ങളെ സ്വീകരിക്കട്ടെ.ഇൻഷാ അല്ലാഹ്, ഞങ്ങളുടെ അടുത്ത വിശുദ്ധ യാത്രയും സൈത്തൂനോടൊപ്പം മാത്രമായിരിക്കും."
  }
];

export default function Testimonials() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);

  // Parallax mouse movements for featured video card
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = videoCardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Calculate rotation (max 6 degrees)
    const rY = (mouseX / (width / 2)) * 6;
    const rX = -(mouseY / (height / 2)) * 6;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(err => console.log("Video playback interrupted", err));
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-24 md:py-32 bg-[#0B0B0B] text-white relative overflow-hidden">
      {/* Drift Background Particles */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C9A340_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Background Gold Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-[#C9A340] tracking-[0.25em] uppercase text-xs font-semibold mb-4 block"
          >
            Pilgrim Testimonials
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl md:text-5xl lg:text-6xl text-white mb-6"
          >
            Voices of Trust
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-white/60 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto"
          >
            Every journey leaves a story. Hear from pilgrims who entrusted us with their sacred Hajj and Umrah experience.
          </motion.p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Premium Featured Video (40% span) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <motion.div
              ref={videoCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: "transform 0.1s ease-out"
              }}
              className="relative w-full aspect-[16/9] lg:aspect-[4/5] rounded-[24px] overflow-hidden bg-brand-charcoal border border-[rgba(201,163,64,0.25)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group cursor-pointer"
              onClick={togglePlay}
            >
              {/* Actual HTML5 Video Player */}
              <video
                ref={videoRef}
                src="/review v/review video 1.mp4"
                loop
                playsInline
                className="w-full h-full object-cover z-0"
              />

              {/* Glassmorphic Play/Control Overlays */}
              <div className={`absolute inset-0 bg-black/30 transition-opacity duration-500 z-10 flex flex-col justify-between p-6 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                
                {/* Upper Mute / Audio Controller */}
                <div className="flex justify-end">
                  <button 
                    onClick={toggleMute}
                    className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/90 hover:text-brand-gold hover:border-brand-gold/50 transition-all cursor-pointer"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>

                {/* Central Play Indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[rgba(201,163,64,0.15)] backdrop-blur-md border border-[rgba(201,163,64,0.3)] flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C9A340] flex items-center justify-center text-brand-charcoal shadow-inner">
                      {isPlaying ? (
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <Play size={20} fill="currentColor" className="translate-x-0.5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Lower Card Info */}
                <div className="translate-z-[30px] z-20">
                  <span className="font-sans text-[10px] tracking-[0.2em] text-[#C9A340] uppercase font-semibold mb-1 block">Featured Review</span>
                  <h4 className="font-heading text-xl text-white">Reflections of a Blessed Journey</h4>
                  <p className="font-sans text-white/60 text-xs mt-1">Watch our pilgrims share their travel experiences.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Malayalam Review Cards (60% span) */}
          <div className="lg:col-span-7 space-y-6">
            {reviews.map((review, index) => {
              const isExpanded = expandedCard === review.id;
              return (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  className="p-6 md:p-8 rounded-[24px] bg-white/[0.02] backdrop-blur-md border border-white/5 hover:border-[rgba(201,163,64,0.2)] hover:bg-white/[0.04] transition-all duration-300 group shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    
                    {/* User Profile Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#C9A340]/20 border border-[#C9A340]/30 flex items-center justify-center font-heading text-brand-gold text-base font-semibold shadow-inner">
                        {review.avatarText}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading text-lg text-white font-medium">{review.name}</h4>
                          {review.verified && (
                            <div className="flex items-center text-brand-gold" title="Verified Pilgrim">
                              <CheckCircle2 size={14} fill="currentColor" className="text-[#0B0B0B]" />
                            </div>
                          )}
                        </div>
                        <span className="font-sans text-xs text-white/40">{review.location}</span>
                      </div>
                    </div>

                    {/* Star Ratings */}
                    <div className="flex gap-1">
                      {[...Array(review.stars)].map((_, i) => (
                        <span key={i} className="text-brand-gold text-sm">★</span>
                      ))}
                    </div>
                  </div>

                  {/* Expandable Review Text (Malayalam) */}
                  <div className="relative">
                    <Quote className="absolute -top-3 -left-2 w-8 h-8 text-white/5 pointer-events-none" />
                    <motion.p 
                      animate={{ height: isExpanded ? "auto" : "76px" }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="font-sans text-white/70 text-sm md:text-base font-light leading-relaxed pl-6 overflow-hidden relative"
                    >
                      {review.text}
                    </motion.p>
                    
                    {/* Read More Toggle Button */}
                    <div className="mt-4 pl-6">
                      <button
                        onClick={() => setExpandedCard(isExpanded ? null : review.id)}
                        className="text-xs font-sans font-semibold tracking-wider uppercase text-brand-gold hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
                      >
                        <span>{isExpanded ? "Read Less" : "Read More"}</span>
                        <ArrowRight size={12} className={`transition-transform duration-300 ${isExpanded ? '-rotate-90' : 'rotate-0'}`} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Dynamic bottom CTA button */}
        <div className="mt-16 text-center">
          <a
            href="#registration-system"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#C9A340] hover:from-[#C9A340] hover:to-[#B38F2E] text-brand-charcoal px-8 py-4 rounded-full font-medium tracking-wider transition-all duration-300 text-xs uppercase shadow-lg hover:shadow-brand-gold/10"
          >
            <span>Book Your Pilgrimage</span>
            <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}
