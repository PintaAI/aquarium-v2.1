"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, BookOpen, Home, Users, UserCircle, ChevronsLeft, GraduationCap, Compass, ChevronDown } from 'lucide-react';
import { Button } from './button';
import { ScrollArea } from './scroll-area';
import { cn } from '@/lib/utils';
import { UseCurrentUser } from "@/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = UseCurrentUser();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const UserAvatar = () => (
    <Avatar className="h-8 w-8">
      <AvatarImage src={user?.image || ''} alt={user?.name || ''} />
      <AvatarFallback>
        {user?.name ? user.name[0].toUpperCase() : 'U'}
      </AvatarFallback>
    </Avatar>
  );

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Users, label: 'Community', href: '/community' },
    { icon: UserCircle, label: 'Profile', href: '/profile' },
  ];

  // Mock data for joined courses (replace with actual data fetching logic)
  const joinedCourses = [
    { id: '1', title: 'kursus 1' },
    { id: '2', title: 'kursus 2' },
    { id: '3', title: 'kursus 3' },
  ];

  return (
    <aside className={cn(
      "bg-background p-4 transition-all duration-300 ease-in-out h-screen flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
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
          {isCollapsed ?             <Image
              src="/images/logoo.png"
              alt="Logo"
              width={60}
              height={60}
              className="rounded-lg cursor-pointer"
            /> : <ChevronsLeft />}
        </Button>
      </div>

      <ScrollArea className="flex-grow">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="navigation">
            <AccordionTrigger className={cn(
              "hover:no-underline flex items-center justify-between",
              isCollapsed ? "px-2" : "px-4"
            )}>
              <div className="flex items-center">
                <Compass className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
                {!isCollapsed && <span>Navigation</span>}
              </div>
              {!isCollapsed && <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />}
            </AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="courses">
            <AccordionTrigger className={cn(
              "hover:no-underline flex items-center justify-between",
              isCollapsed ? "px-2" : "px-4"
            )}>
              <div className="flex items-center">
                <BookOpen className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
                {!isCollapsed && <span>Joined Courses</span>}
              </div>
              {!isCollapsed && <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />}
            </AccordionTrigger>
            <AccordionContent>
              <nav className="space-y-2">
                {joinedCourses.map((course) => (
                  <Link key={course.id} href={`/courses/${course.id}`}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start",
                        isCollapsed ? "px-2" : "px-4"
                      )}
                    >
                      <GraduationCap className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
                      {!isCollapsed && <span className="truncate">{course.title}</span>}
                    </Button>
                  </Link>
                ))}
              </nav>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>

      {isCollapsed ? (
        <div className="flex flex-col items-center mt-4">
          <Button variant="ghost" size="icon" className="mb-2">
            <UserAvatar />
          </Button>
        </div>
      ) : (
        <div className="mt-4 flex items-center space-x-2">
          <UserAvatar />
          <span className="text-sm font-medium">{user?.name || 'User'}</span>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;