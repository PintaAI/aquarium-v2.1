import { notFound } from 'next/navigation'
import Link from 'next/link'
import { currentUser } from "@/lib/auth"
import { getCourse } from "@/app/actions/get-course"
import { getModule } from "@/app/actions/get-module"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function ModulePage({ params }: { params: { courseId: string, moduleId: string } }) {
  const user = await currentUser()
  const course = await getCourse(parseInt(params.courseId))
  const moduleData = await getModule(parseInt(params.moduleId))

  if (!course || !moduleData) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {user && <h2 className="text-2xl font-bold mb-6">Welcome, {user.name}!</h2>}
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">{moduleData.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{moduleData.description}</p>
          <div className="mb-6">
            <p className="text-sm font-medium">Course</p>
            <p className="text-muted-foreground">{course.title}</p>
          </div>
          {/* Add module content here */}
          <div className="prose max-w-none">
            {/* This is where you would render the module's content */}
            <p>Module content goes here...</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button asChild>
          <Link href={`/courses/${course.id}`}>
            Back to Course
          </Link>
        </Button>
        {/* Add navigation to next/previous module if needed */}
      </div>
    </div>
  )
}