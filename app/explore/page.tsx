import Link from 'next/link'
import { currentUser } from "@/lib/auth"
import { getCourses } from "@/app/actions/get-courses"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpenIcon, PlusIcon, UserIcon, SearchIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Course = {
  id: number
  title: string
  description: string | null
  level: string
  author: {
    id: string
    name: string | null
    image: string | null
  }
}

const getLevelColor = (level: string) => {
  const levelColors: Record<string, string> = {
    beginner: 'text-green-500',
    intermediate: 'text-yellow-500',
    advanced: 'text-red-500',
  }

  return levelColors[level.toLowerCase()] || 'text-gray-500'
}

export default async function ExplorePage() {
  const user = await currentUser()
  const UserAvatar = () => (
    <Avatar className="h-8 w-8">
      <AvatarImage src={user?.image || ''} alt={user?.name || ''} />
      <AvatarFallback>
        {user?.name ? user.name[0].toUpperCase() : 'U'}
      </AvatarFallback>
    </Avatar>
  );

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
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pejuangkorea Academy Courses</h1>
        <p className="dark:text-gray-400">Temukan kursus yang paling cocok buat kamu</p>
        {user &&         <div className="mt-4 flex items-center space-x-2">
          <UserAvatar />
          <span className="text-sm font-medium">Hi,👋 {user?.name || 'User'}</span>
        </div>}
      </header>

      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <SearchComponent />
        <FilterComponent />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {error && (
          <div className="text-red-500 mb-4 col-span-full" role="alert">
            {error}
          </div>
        )}

        {!error && courses.length === 0 && (
          <p className="text-gray-900 col-span-full">No courses are currently available. Please check back later.</p>
        )}

        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}

        {user?.role === 'GURU' && <AddCourseCard />}
      </div>
    </div>
  )
}

const SearchComponent = () => (
  <div className="relative w-full sm:w-64">
    <Input
      type="text"
      placeholder="Cari kursus di sini..."
      className="pl-10 pr-4 py-2 w-full"
    />
    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
  </div>
)

const FilterComponent = () => (
  <Select>
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
)

const CourseCard = ({ course }: { course: Course }) => (
  <Link href={`/courses/${course.id}`} aria-label={`View details for ${course.title}`}>
    <Card className="flex flex-col rounded-lg h-full transition-all duration-300 hover:shadow-md cursor-pointer transform hover:-translate-y-1 hover:scale-105">
      <img
        src="/images/course.jpg"
        alt={`${course.title} thumbnail`}
        className="h-40 w-full object-cover rounded-t-lg"
      />
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
)

const AddCourseCard = () => (
  <Link href="/guru/add-course" passHref>
    <Card className="flex flex-col h-full items-center justify-center text-center p-6 transition-all duration-300 hover:shadow-md cursor-pointer transform hover:-translate-y-1 hover:scale-105">
      <PlusIcon className="h-12 w-12 text-gray-400 mb-4" aria-hidden="true" />
      <CardTitle className="text-lg font-semibold mb-2">Add New Course</CardTitle>
      <CardDescription className="text-sm text-gray-500">
        Create a new course for students
      </CardDescription>
    </Card>
  </Link>
)