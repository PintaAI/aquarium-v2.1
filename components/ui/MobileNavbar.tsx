"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gamepad, Users, UserCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UseCurrentUser } from '@/hooks/use-current-user';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

interface MobileNavbarProps {
  className?: string;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ className }) => {
  const user = UseCurrentUser();
  const pathname = usePathname();

  // Hide navbar on vocabulary game route
  if (pathname === "/games/vocabulary") {
    return null;
  }

  const menuItems = [
    { icon: Gamepad, label: 'Games', href: '/home' },
    { icon: Users, label: 'Community', href: '/community' },
    { icon: BookOpen, label: 'Courses', href: '/courses' },
  ];

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50",
      className
    )}>
      <div className="flex justify-around items-center h-16 mb-5">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={cn(
                "flex flex-col items-center",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-6 w-6" />
              
            </Link>
          );
        })}
        <Link 
          href="/profile" 
          className={cn(
            "flex flex-col items-center",
            pathname === '/profile' ? "text-primary" : "text-muted-foreground"
          )}
        >
          {user ? (
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.image || ''} alt={user.name || ''} />
              <AvatarFallback>
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
          ) : (
            <UserCircle className="h-6 w-6" />
          )}
          
        </Link>
      </div>
    </nav>
  );
};

export default MobileNavbar;
