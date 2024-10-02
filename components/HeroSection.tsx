import React from 'react';
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Amazing Product</h1>
      <p className="text-xl mb-8">Discover the power of innovation and simplicity</p>
      <Button size="lg">Get Started</Button>
    </section>
  );
};

export default HeroSection;