import React from 'react';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import TestimonialSection from '@/components/TestimonialSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <FeatureSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
