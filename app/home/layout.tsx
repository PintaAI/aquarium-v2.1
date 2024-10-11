import React from 'react';
import { currentUser } from "@/lib/auth";
import Sidebar from '@/components/ui/Sidebar';

export default async function MiniGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex">
        <Sidebar session={user ? { user } : undefined} />
      </div>
      
      <main className="flex-1 overflow-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
