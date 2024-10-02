import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    title: "Easy to Use",
    description: "Our product is designed with simplicity in mind, making it accessible for everyone."
  },
  {
    title: "Powerful Features",
    description: "Packed with advanced capabilities to meet all your needs."
  },
  {
    title: "24/7 Support",
    description: "Our dedicated team is always ready to assist you."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;