import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Rocket } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/90 to-primary-foreground text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
      <div className="container mx-auto relative z-10">
        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-primary/20 shadow-lg">
          <CardContent className="p-12 text-center">
            <Rocket className="w-16 h-16 mx-auto mb-6 text-primary animate-bounce" />
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Udah siap buat belajar bahasa korea?</h2>
            <p className="text-xl mb-8 text-foreground/80 max-w-2xl mx-auto">Ayo gabung sama temen temen pmi yang mau berangkat ke korea! ada banyak banget kursus bahasa korea yang keren keren loh</p>
            <div className="flex justify-center space-x-4">
              <Link href="/auth/register" passHref>
                <Button size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/courses" passHref>
                <Button size="lg" variant="outline" className="group border-primary text-primary hover:bg-primary/10">
                  Explore Courses
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;