import React from 'react';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceHighlightsLoop from './components/ServiceHighlightsLoop';
import Timeline from './components/Timeline';
import Destinations from './components/Destinations';
import Testimonials from './components/Testimonials';
import RegistrationSystem from './components/RegistrationSystem';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import FadeInSection from './components/FadeInSection';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-ivory text-brand-charcoal selection:bg-brand-gold/30 selection:text-brand-emerald">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <ServiceHighlightsLoop />
        <FadeInSection><Timeline /></FadeInSection>
        <FadeInSection><Destinations /></FadeInSection>
        <Testimonials />
        <RegistrationSystem />
        <FadeInSection><FAQ /></FadeInSection>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
