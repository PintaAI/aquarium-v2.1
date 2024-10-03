import React from 'react';
import { Navigation } from "@/components/Navigation";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/30 via-background to-secondary/30">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}