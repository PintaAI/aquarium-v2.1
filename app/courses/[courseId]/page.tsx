import { notFound } from 'next/navigation'
import Link from 'next/link'
import { currentUser } from "@/lib/auth"
import { getCourse } from "@/app/actions/get-course"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default async function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const user = await currentUser()
  const course = await getCourse(parseInt(params.courseId))

  if (!course) {
    notFound()
  }

  // Calculate progress (this is a placeholder, replace with actual logic)
  const progress = 30

  return (
    <div className="container mx-auto px-4 py-8">
      {user && <h2 className="text-2xl font-bold mb-6">Welcome, {user.name}!</h2>}
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">{course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{course.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm font-medium">Level</p>
              <p className="text-muted-foreground">{course.level}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Instructor</p>
              <p className="text-muted-foreground">{course.author.name}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Course Progress</p>
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-muted-foreground text-right">{progress}% Complete</p>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Course Modules</h2>
      <div className="grid gap-4">
        {course.modules.map((module) => (
          <Card key={module.id}>
            <CardHeader>
              <CardTitle className="text-xl">{module.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{module.description}</p>
              <Button asChild>
                <Link href={`/courses/${course.id}/modules/${module.id}`}>
                  Start Module
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}