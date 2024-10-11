"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, BookOpen, UserCircle, ChevronsLeft, FileText, Settings, LogOut } from 'lucide-react';
import { Button } from './button';
import { ScrollArea } from './scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';
import { cn } from '@/lib/utils';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  session?: { user: { name?: string; image?: string } };
}

const Sidebar: React.FC<SidebarProps> = ({ className, session, ...props }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: BookOpen, label: 'Courses', href: '/courses' },
    { icon: FileText, label: 'Articles', href: '/articles' },
  ];

  return (
    <aside
      className={cn(
        "bg-background p-4 transition-all duration-300 ease-in-out h-screen flex flex-col",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          {!isCollapsed && (
            <Image
              src="/images/logo-text.png"
              alt="Logo"
              width={250}
              height={100}
              className="rounded-lg cursor-pointer"
            />
          )}
        </Link>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isCollapsed ? (
            <Image
              src="/images/logoo.png"
              alt="Logo"
              width={60}
              height={60}
              className="rounded-lg cursor-pointer"
            />
          ) : (
            <ChevronsLeft />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-grow">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  isCollapsed ? "px-2" : "px-4"
                )}
              >
                <item.icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>

      <div className="mt-auto space-y-2">
        {session?.user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start items-center",
                  isCollapsed ? "px-0" : "px-4"
                )}
              >
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={session.user.image} alt={session.user.name} />
                  <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <span className="truncate">{session.user.name}</span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Link href="/profile" className="flex items-center">
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/api/auth/signout" className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
      </div>
    </aside>
  );
};

export default Sidebar;
