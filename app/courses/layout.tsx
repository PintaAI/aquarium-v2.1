import React from 'react';
import Sidebar from '../../components/ui/Sidebar';

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}