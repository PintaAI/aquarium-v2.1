import React from 'react';
import Sidebar from '@/components/ui/Sidebar';

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
       <Sidebar className="hidden md:block" />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}