import { notFound } from 'next/navigation'
import Link from 'next/link'
import { currentUser } from "@/lib/auth"
import { getCourse } from "@/app/actions/get-course"
import CourseForm from "@/components/course-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function EditCoursePage({ params }: { params: { courseId: string } }) {
  const user = await currentUser()
  const course = await getCourse(parseInt(params.courseId))

  if (!course || user?.id !== course.authorId) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Button asChild variant="ghost" className="mb-6">
        <Link href={`/courses/${course.id}`} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-8">Edit Course</h1>
      <CourseForm 
        username={user.name || ''} 
        initialData={{
          id: course.id,
          title: course.title,
          description: course.description || '',
          level: course.level,
          jsonDescription: course.jsonDescription || '',
          htmlDescription: course.htmlDescription || '',
          thumbnail: course.thumbnail,
        }}
      />
    </div>
  )
}
