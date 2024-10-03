import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "John Doe",
    role: "CEO, TechCorp",
    content: "This product has revolutionized our workflow. Highly recommended!",
    avatar: "/avatars/john-doe.png"
  },
  {
    name: "Jane Smith",
    role: "Designer, CreativeCo",
    content: "I&apos;ve never used a more intuitive and powerful tool. It&apos;s a game-changer!",
    avatar: "/avatars/jane-smith.png"
  },
  {
    name: "Mike Johnson",
    role: "Developer, CodeMasters",
    content: "The features and support are unparalleled. This is a must-have for any serious professional.",
    avatar: "/avatars/mike-johnson.png"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col justify-between">
              <CardContent className="pt-6">
                <p className="mb-4">&quot;{testimonial.content}&quot;</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;