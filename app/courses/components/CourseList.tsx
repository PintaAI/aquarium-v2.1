'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpenIcon, PlusIcon, UserIcon, SearchIcon } from "lucide-react";
import { Course } from "@/app/actions/get-courses";

interface CourseListProps {
  initialCourses: Course[];
  userRole: string | undefined;
  error: string | null;
}

const getLevelColor = (level: string) => {
  const levelColors: Record<string, string> = {
    beginner: 'text-green-500',
    intermediate: 'text-yellow-500',
    advanced: 'text-red-500',
  };
  return levelColors[level.toLowerCase()] || 'text-gray-500';
};

export default function CourseList({ initialCourses, userRole, error }: CourseListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  const sortCourses = (courses: Course[], order: string) => {
    return [...courses].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return order === 'newest' ? dateB - dateA : dateA - dateB;
    });
  };

  const filteredAndSortedCourses = useMemo(() => {
    const filtered = initialCourses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLevel = selectedLevel === 'all' || course.level.toLowerCase() === selectedLevel;
      return matchesSearch && matchesLevel;
    });
    return sortCourses(filtered, sortOrder);
  }, [initialCourses, searchTerm, selectedLevel, sortOrder]);

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Input
            type="text"
            placeholder="Cari kursus di sini..."
            className="pl-10 pr-4 py-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <div className="flex gap-4">
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {error && (
          <div className="text-red-500 mb-4 col-span-full" role="alert">
            {error}
          </div>
        )}

        {!error && filteredAndSortedCourses.length === 0 && (
          <p className="text-gray-900 col-span-full">No courses found matching your criteria.</p>
        )}
        {userRole === 'GURU' && <AddCourseCard />}

        {filteredAndSortedCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

const CourseCard = ({ course }: { course: Course }) => (
  <Link href={`/courses/${course.id}`} aria-label={`View details for ${course.title}`}>
    <Card className="flex flex-col rounded-lg h-full transition-all duration-300 hover:shadow-md cursor-pointer transform hover:-translate-y-1 hover:scale-105">
      <div className="relative h-40 w-full">
        <Image
          src={course.thumbnail || '/images/course.jpg'}
          alt={`${course.title} thumbnail`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <CardContent className="flex flex-col justify-between p-4">
        <div>
          <CardTitle className="text-lg font-semibold mb-2">{course.title}</CardTitle>
          <CardDescription className="text-sm text-gray-500 mb-4">
            {course.description || 'No description available'}
          </CardDescription>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className={`flex items-center ${getLevelColor(course.level)}`}>
            <BookOpenIcon className="h-4 w-4 mr-2" aria-hidden="true" />
            <span>{course.level}</span>
          </div>
          <div className="flex items-center text-gray-500">
            {course.author.image ? (
              <img
                src={course.author.image}
                alt={course.author.name || 'Unknown'}
                className="h-6 w-6 rounded-full mr-2"
              />
            ) : (
              <UserIcon className="h-6 w-6 text-gray-400 mr-2" aria-hidden="true" />
            )}
            <span>{course.author.name || 'Unknown'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);

const AddCourseCard = () => (
  <Link href="/courses/create-course" passHref>
    <Card className="flex flex-col h-full items-center justify-center text-center p-6 transition-all duration-300 hover:shadow-md cursor-pointer transform hover:-translate-y-1 hover:scale-105">
      <PlusIcon className="h-12 w-12 text-gray-400 mb-4" aria-hidden="true" />
      <CardTitle className="text-lg font-semibold mb-2">Add New Course</CardTitle>
      <CardDescription className="text-sm text-gray-500">
        Create a new course for students
      </CardDescription>
    </Card>
  </Link>
);