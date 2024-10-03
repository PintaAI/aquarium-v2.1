import Link from 'next/link'
import { currentUser } from "@/lib/auth"
import { getCourses } from "@/app/actions/get-courses"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpenIcon, UserIcon } from "lucide-react"

type Course = {
  id: number
  title: string
  description: string | null
  level: string
  author: {
    id: string
    name: string | null
    createdAt: Date
    updatedAt: Date
    email: string
    role: string // Assuming UserRoles is a string type
    plan: string // Assuming UserPlan is a string type
    emailVerified: Date | null
    image: string | null
    password: string | null
  }
}

export default async function CoursesPage() {
  const user = await currentUser()
  let courses: Course[] = []
  let error: string | null = null

  try {
    courses = await getCourses()
  } catch (e) {
    error = "Failed to load courses. Please try again later."
    console.error("Error loading courses:", e)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {user && <h2 className="text-2xl font-semibold mb-4">Welcome, {user.name}!</h2>}
      <h1 className="text-3xl font-bold mb-6">Available Korean Courses</h1>
      
      {error && (
        <div className="text-red-500 mb-4" role="alert">
          {error}
        </div>
      )}

      {!error && courses.length === 0 && (
        <p className="text-gray-500">No courses are currently available. Please check back later.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description || 'No description available'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                <BookOpenIcon className="h-4 w-4" aria-hidden="true" />
                <span>Level: {course.level}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <UserIcon className="h-4 w-4" aria-hidden="true" />
                <span>Instructor: {course.author.name || 'Unknown'}</span>
              </div>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button asChild className="w-full">
                <Link href={`/courses/${course.id}`} aria-label={`View details for ${course.title}`}>
                  View Course
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}