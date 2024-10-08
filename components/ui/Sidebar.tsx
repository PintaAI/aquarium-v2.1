"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Home, Users, UserCircle, ChevronsLeft, GraduationCap, Compass, ChevronDown, GamepadIcon } from 'lucide-react';
import { Button } from './button';
import { ScrollArea } from './scroll-area';
import { cn } from '@/lib/utils';
import { UseCurrentUser } from "@/hooks/use-current-user";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Sidebar: React.FC<SidebarProps> = ({ className, ...props }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [openItems, setOpenItems] = useState<string[]>(["navigation"]);
  const user = UseCurrentUser();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Users, label: 'Community', href: '/community' },
    { icon: UserCircle, label: 'Profile', href: '/profile' },
  ];

  // Mock data for joined courses and mini-games (replace with actual data fetching logic)
  const joinedItems = [
    { id: '1', title: 'Course 1', type: 'course' },
    { id: '2', title: 'Mini Game 1', type: 'game' },
    { id: '3', title: 'Course 2', type: 'course' },
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
        <Accordion 
          type="multiple" 
          className="w-full" 
          value={openItems}
          onValueChange={setOpenItems}
        >
          <AccordionItem value="navigation">
            <AccordionTrigger
              className={cn(
                "hover:no-underline flex items-center justify-between",
                isCollapsed ? "px-2" : "px-4"
              )}
            >
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
            <AccordionTrigger
              className={cn(
                "hover:no-underline flex items-center justify-between",
                isCollapsed ? "px-2" : "px-4"
              )}
            >
              <div className="flex items-center">
                <BookOpen className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
                {!isCollapsed && <span>Courses</span>}
              </div>
              {!isCollapsed && <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />}
            </AccordionTrigger>
            <AccordionContent>
              <nav className="space-y-2">
                <Link href="/explore">
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      isCollapsed ? "px-2" : "px-4"
                    )}
                  >
                    <Compass className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
                    {!isCollapsed && <span>Explore Courses</span>}
                  </Button>
                </Link>
                {joinedItems.map((item) => (
                  <Link key={item.id} href={`/courses/${item.id}`}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start",
                        isCollapsed ? "px-2" : "px-4"
                      )}
                    >
                      {item.type === 'course' ? (
                        <GraduationCap className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
                      ) : (
                        <GamepadIcon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
                      )}
                      {!isCollapsed && <span className="truncate">{item.title}</span>}
                    </Button>
                  </Link>
                ))}
              </nav>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;