"use client";
import React, { Suspense, lazy } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import HeroSectionSkeleton from './HeroSectionSkeleton';

const LazyContent = lazy(() => import('./HeroSectionContent'));

const HeroSection = () => {
  const router = useRouter();

  const handleStartCourse = () => {
    router.push('/courses');
  };

  const handleAboutUs = () => {
    console.log('Navigate to About Us page');
  };

  return (
    <Suspense fallback={<HeroSectionSkeleton />}>
      <LazyContent
        handleStartCourse={handleStartCourse}
        handleAboutUs={handleAboutUs}
      />
    </Suspense>
  );
};

export default HeroSection;
