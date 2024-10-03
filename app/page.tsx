import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import TestimonialSection from '@/components/TestimonialSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { Navigation } from '@/components/Navigation';

export default function Home() {
  return (
    <ScrollArea className="h-screen">
      <Navigation />
      <HeroSection />
      <FeatureSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </ScrollArea>
  );
}
