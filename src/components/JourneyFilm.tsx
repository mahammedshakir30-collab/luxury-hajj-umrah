import React, { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export default function JourneyFilm() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(err => console.log("Playback interrupted", err));
      setIsPlaying(true);
    }
  };

  return (
    <section className="py-28 bg-brand-charcoal text-white relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-brand-gold tracking-[0.25em] uppercase text-xs font-semibold mb-4 block">
            Cinematic Reflections
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-white mb-6">
            Experience the Sacred Journey
          </h2>
          <p className="font-sans text-white/60 text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto">
            Witness the spiritual essence, the serene landscapes, and the profound peace of the holy sanctuaries through our cinematic presentation.
          </p>
        </div>

        {/* Video Player Container */}
        <div className="max-w-4xl mx-auto">
          <div 
            onClick={handlePlayToggle}
            className="relative aspect-[16/9] w-full rounded-[24px] overflow-hidden bg-brand-charcoal border border-brand-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-pointer group"
          >
            {/* HTML5 Video */}
            <video
              ref={videoRef}
              src="/review v/review video 1.mp4"
              loop
              playsInline
              poster="/makka%20&%20madina%20pics/madinah.jpg"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
            />

            {/* Custom Glassmorphic Play Overlay */}
            <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-500 z-10 ${
              isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
            }`}>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C9A340] flex items-center justify-center text-brand-charcoal shadow-lg">
                  {isPlaying ? (
                    <Pause size={24} fill="currentColor" />
                  ) : (
                    <Play size={24} fill="currentColor" className="translate-x-0.5" />
                  )}
                </div>
              </div>
            </div>

            {/* Subtle Gold Border Highlight */}
            <div className="absolute inset-0 border border-brand-gold/10 rounded-[24px] pointer-events-none z-20" />
          </div>
        </div>

      </div>
    </section>
  );
}
