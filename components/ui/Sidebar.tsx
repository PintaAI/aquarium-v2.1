"use client";  // Make sure this is at the top of your file

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, ChevronRight, BookOpen } from 'lucide-react';
import { Button } from './button';
import { ScrollArea } from './scroll-area';
import { cn } from '@/lib/utils';
import { getCourseWithModules } from '@/app/actions/get-course-with-modules';

interface Module {
  id: number;
  title: string;
  order: number;
}

interface Course {
  id: number;
  title: string;
  modules: Module[];
}

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Ensure courseId is parsed correctly from the URL path
        const courseId = parseInt(pathname.split('/')[2], 10);
        if (pathname.startsWith('/courses/') && !isNaN(courseId)) {
          console.log('Fetching course data for courseId:', courseId);
          const courseData = await getCourseWithModules(courseId);
          if (courseData) {
            setCourse(courseData);
            console.log('Course data fetched:', courseData);
          } else {
            console.log('No course data found');
          }
        }
      } catch (error) {
        console.error('Failed to fetch course data:', error);
      }
    };

    fetchCourseData();
  }, [pathname]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <aside className={cn(
      "bg-background p-4 transition-all duration-300 ease-in-out",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between mb-6">
        {!isCollapsed && (
          <Image 
            src="/images/logoo.png" 
            alt="Logo" 
            width={50} 
            height={50}
            className="rounded-lg border"
          />
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isCollapsed ? <Menu /> : <X />}
        </Button>
      </div>

      {!isCollapsed && course && (
        <ScrollArea className="h-[calc(100vh-100px)]">
          <h3 className="font-semibold mb-2">{course.title}</h3>
          <ul>
            {course.modules.map((module) => (
              <li key={module.id} className="mb-2">
                <Link href={`/courses/${course.id}/modules/${module.id}`} className="flex items-center text-sm hover:text-primary">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>{module.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}

      {isCollapsed && (
        <div className="flex flex-col items-center">
          <Button variant="ghost" size="icon" className="mb-2">
            <ChevronRight />
          </Button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
