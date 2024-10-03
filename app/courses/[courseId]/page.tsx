import { notFound } from 'next/navigation'
import Link from 'next/link'
import { currentUser } from "@/lib/auth"
import { getCourse } from "@/app/actions/get-course"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { User, BarChart, Clock, ArrowLeft } from "lucide-react"

export default async function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const user = await currentUser()
  const course = await getCourse(parseInt(params.courseId))

  if (!course) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div>
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/courses" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Link>
      </Button>

      {user && <h2 className="text-2xl font-bold mb-8">Welcome, {user.name}</h2>}
      
      <Card className="mb-12 shadow-sm hover:shadow-md transition-shadow duration-300">
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
          <Button className="w-full">Start Course</Button>
        </CardContent>
      </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Course Modules</h2>
      <div className="space-y-4">
        {course.modules.map((module, index) => (
          <Card key={module.id} className="shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  {index + 1}. {module.title}
                </h3>
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/courses/${course.id}/modules/${module.id}`}>
                    Start
                  </Link>
                </Button>
              </div>
              <Separator className="my-2" />
              <p className="text-sm text-muted-foreground">{module.description}</p>
            </CardContent>
          </Card>
        
        ))}
      </div>
    </div>
  )
}