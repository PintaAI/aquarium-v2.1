import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { currentUser } from "@/lib/auth"
import { getCourse } from "@/app/actions/get-course"
import { startCourse } from "@/app/actions/start-course"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, BarChart, Clock, ArrowLeft, Plus, Edit } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import AddModuleForm from "@/components/add-module-form"
import DeleteCourseButton from './components/DeleteCourseButton'
import ModuleList from './components/ModuleList'

export default async function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const user = await currentUser()
  const course = await getCourse(parseInt(params.courseId))

  if (!course) {
    notFound()
  }

  const isAuthor = user?.id === course.authorId
  const hasJoined = course.members.some(member => member.id === user?.id)

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/courses" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>
          </Button>

          {user && <h2 className="text-2xl font-bold mb-8">Hi 👋, {user.name}</h2>}

          <Card className="mb-2 shadow-sm hover:shadow-md transition-shadow duration-300">
            {course.thumbnail && (
              <div className="relative h-40 w-full rounded-t-lg">
                <Image 
                  src={course.thumbnail}
                  alt={`${course.title} thumbnail`} 
                  fill
                  style={{ objectFit: 'cover' }}
                  className='rounded-t-lg' 
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
              <div className="flex justify-between text-sm text-muted-foreground mb-6">
                <div className="flex items-center">
                  <User className="mr-2" size={16} />
                  <span>{course.author.name}</span>
                </div>
                <div className="flex items-center">
                  <BarChart className="mr-2" size={16} />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2" size={16} />
                  <span>{course.modules.length} modules</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                {hasJoined ? (
                  <Button className="w-full mr-2" asChild>
                    <Link href={`/courses/${course.id}/modules/${course.modules[0]?.id}`}>
                      Continue Course
                    </Link>
                  </Button>
                ) : (
                  <form action={async () => {
                    'use server'
                    const result = await startCourse(course.id)
                    if (result.success && result.nextModuleId) {
                      redirect(`/courses/${course.id}/modules/${result.nextModuleId}`)
                    }
                  }}>
                    <Button className="w-full mr-2" type="submit">Start Course</Button>
                  </form>
                )}
                {isAuthor && (
                  <div className="flex">
                    <Button asChild variant="outline" size="icon" className="mr-2">
                      <Link href={`/courses/${course.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteCourseButton courseId={course.id} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {course.htmlDescription && (
            <Card className="mb-12 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent>
                <div
                  className="prose prose-headings:font-title font-default mt-4 dark:prose-invert focus:outline-none"
                  dangerouslySetInnerHTML={{ __html: course.htmlDescription }}
                ></div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1 mt-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Course Modules</h2>
            {isAuthor && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Module
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl w-full overflow-y-auto">
                  <AddModuleForm courseId={course.id} />
                </DialogContent>
              </Dialog>
            )}
          </div>
          <ModuleList 
            modules={course.modules.sort((a, b) => a.order - b.order)} 
            courseId={course.id}
            isAuthor={isAuthor}
          />
        </div>
      </div>
    </div>
  )
}
