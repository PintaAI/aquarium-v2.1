import React from 'react';
import { Navigation } from '@/components/Navigation';

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow container mx-auto py-8 max-w-5xl px-4 mt-4 md:mt-16"> {/* Adjusted for better mobile responsiveness */}
        {children}
      </main>
    </div>
  );
}
