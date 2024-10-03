import Link from 'next/link'
import { currentUser } from "@/lib/auth"
import { getCourses } from "@/app/actions/get-courses"

export default async function CoursesPage() {
  const user = await currentUser()
  const courses = await getCourses()

  return (
    <div className="container mx-auto px-4 py-8">
      {user && <h2 className="text-2xl font-semibold mb-4">Welcome, {user.name}!</h2>}
      <h1 className="text-3xl font-bold mb-6">Available Korean Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-2">{course.description}</p>
            <p className="text-sm text-gray-500 mb-4">Level: {course.level}</p>
            <p className="text-sm text-gray-500 mb-4">Instructor: {course.author.name}</p>
            <Link href={`/courses/${course.id}`} className="text-blue-500 hover:underline">
              View Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}