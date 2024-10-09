import React from 'react';
import { redirect } from 'next/navigation';
import { ScrollArea } from "@/components/ui/scroll-area";
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import TestimonialSection from '@/components/TestimonialSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { currentUser } from '@/lib/auth';

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect('/mini-game');
  }

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
