import { Metadata } from 'next'
import { CourseCard } from '@/components/CourseCard'
import { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Explore Courses',
  description: 'Discover and explore available courses',
}

async function getCourses() {
  // TODO: Implement actual course fetching logic
  // Simulating a delay to demonstrate loading state
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    { id: '1', title: 'Introduction to Web Development', description: 'Learn the basics of HTML, CSS, and JavaScript' },
    { id: '2', title: 'Advanced React Techniques', description: 'Master advanced concepts in React development' },
    { id: '3', title: 'Data Structures and Algorithms', description: 'Understand fundamental computer science concepts' },
    { id: '4', title: 'Machine Learning Fundamentals', description: 'Get started with machine learning and AI concepts' },
    { id: '5', title: 'Mobile App Development with React Native', description: 'Build cross-platform mobile apps using React Native' },
    { id: '6', title: 'Cloud Computing and AWS', description: 'Learn cloud computing concepts and AWS services' },
  ]
}

function CourseGrid({ courses }: { courses: Awaited<ReturnType<typeof getCourses>> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="h-48 animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </CardHeader>
          <CardContent>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default async function ExploreCourses() {
  const courses = await getCourses()

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Explore Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Discover a wide range of courses to enhance your skills and knowledge. 
            From web development to machine learning, we have something for everyone.
          </p>
        </CardContent>
      </Card>
      
      <Suspense fallback={<LoadingGrid />}>
        <CourseGrid courses={courses} />
      </Suspense>
    </div>
  )
}