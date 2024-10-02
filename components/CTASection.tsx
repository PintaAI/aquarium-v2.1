import React from 'react';
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-8">Join thousands of satisfied customers and transform your workflow today.</p>
        <Button size="lg" variant="secondary">
          Start Your Free Trial
        </Button>
      </div>
    </section>
  );
};

export default CTASection;