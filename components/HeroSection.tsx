"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const HeroSection = () => {
  const router = useRouter();

  const handleStartCourse = () => {
    router.push('/courses');
  };

  const handleAboutUs = () => {
    // You can implement this function to navigate to the About Us page
    // For now, we'll just log a message
    console.log('Navigate to About Us page');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <BackgroundLines className="absolute inset-0 w-full h-full">
          apa ya
        </BackgroundLines>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background/80 w-full h-full"></div>
      </div>
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/circle-logo.png"
            alt="PejuangKorea Academy Logo"
            width={250}
            height={250}
            className="mx-auto"
          />
        </motion.div>
        <motion.h1 
          className="text-3xl sm:text-6xl lg:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <br className="sm:hidden md:block" /> Pejuangkorea Academy
        </motion.h1>
        <motion.p 
          className="text-md sm:text-2xl mb-8 text-muted-foreground leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Platform belajar bahasa Korea dan penghubung komunitas Indonesia di Korea Selatan. 
          Kami membantu Anda mewujudkan impian bekerja di Korea melalui proses G2G yang aman dan terpercaya.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <HoverBorderGradient
            containerClassName="rounded"
            as="button"
            className="dark:bg-secondary bg-white text-black dark:text-white flex items-center space-x-2"
            onClick={handleStartCourse}
          >
            <span>Mulai Kursus</span>
          </HoverBorderGradient>
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8 py-6 text-lg"
            onClick={handleAboutUs}
          >
            Tentang Kami
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;