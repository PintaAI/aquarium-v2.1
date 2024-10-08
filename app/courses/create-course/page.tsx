import Link from 'next/link'
import { currentUser } from "@/lib/auth"
import CourseForm from '@/components/course-form'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function CreateCoursePage() {
  const user = await currentUser()

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-full md:max-w-3xl">
      <Button asChild variant="ghost" className="mb-4 md:mb-6 px-4 py-2">
        <Link href="/courses" className="flex items-center">
          <ArrowLeft className="mr-2 h-5 w-5 md:h-4 md:w-4" />
          Back to Courses
        </Link>
      </Button>

      {user && (
        <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">
          Silahkan Buat Course, {user.name}
        </h2>
      )}

      <CourseForm username={user?.name || ''} />
    </div>
  )
}
