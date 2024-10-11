import { Suspense } from 'react';
import { getCourses, Course } from "@/app/actions/get-courses";
import { currentUser } from "@/lib/auth";
import UserHeader from './components/UserHeader';
import CourseList from './components/CourseList';

export default async function CoursesPage() {
  const user = await currentUser();
  let courses: Course[] = [];
  let error: string | null = null;

  try {
    courses = await getCourses();
  } catch (e) {
    error = "Failed to load courses. Please try again later.";
    console.error("Error loading courses:", e);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pejuangkorea Academy Courses</h1>
      <p className="dark:text-gray-400 mb-6">Temukan kursus yang paling cocok buat kamu</p>
      <UserHeader user={user} />
      <Suspense fallback={<div>Loading courses...</div>}>
        <CourseList 
          initialCourses={courses} 
          userRole={user?.role} 
          userId={user?.id}
          error={error} 
        />
      </Suspense>
    </div>
  );
}
