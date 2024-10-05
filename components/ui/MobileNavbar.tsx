"use client";
import React from 'react';
import Link from 'next/link';
import { Home, Users, UserCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UseCurrentUser } from "@/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

interface MobileNavbarProps {
  className?: string;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ className }) => {
  const user = UseCurrentUser();

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Users, label: 'Community', href: '/community' },
    { icon: BookOpen, label: 'Courses', href: '/courses' },
  ];

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 bg-background border-t border-border",
      className
    )}>
      <div className="flex justify-around items-center h-16">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} className="flex flex-col items-center">
            <item.icon className="h-6 w-6 text-muted-foreground" />
          </Link>
        ))}
        <Link href="/profile" className="flex flex-col items-center">
          {user ? (
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.image || ''} alt={user.name || ''} />
              <AvatarFallback>
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
          ) : (
            <UserCircle className="h-6 w-6 text-muted-foreground" />
          )}
        </Link>
      </div>
    </nav>
  );
};

export default MobileNavbar;
