import { notFound } from 'next/navigation'
import Link from 'next/link'
import { currentUser } from '@/lib/auth'
import { getCourse } from '@/app/actions/get-course'
import { getModule } from '@/app/actions/get-module'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronRight, BookOpen, Trash2 } from 'lucide-react'
import EditModuleForm from './edit-module-form'
import { deleteModule } from '@/app/actions/delete-module'

export default async function ModulePage({ params }: { params: { courseId: string, moduleId: string } }) {
  const user = await currentUser()
  const course = await getCourse(parseInt(params.courseId))
  const moduleData = await getModule(parseInt(params.moduleId))

  if (!course || !moduleData) {
    notFound()
  }

  const isAuthor = user?.id === course.authorId

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6 flex items-center text-sm text-muted-foreground">
        <Link href="/courses" className="hover:text-primary">Courses</Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link href={`/courses/${course.id}`} className="hover:text-primary">{course.title}</Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <span className="text-foreground">{moduleData.title}</span>
      </div>
      
      <Card className="mb-8 shadow-lg">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl">{moduleData.title}</CardTitle>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Module {params.moduleId}</span>
              {isAuthor && (
                <>
                  <EditModuleForm
                    moduleId={parseInt(params.moduleId)}
                    initialTitle={moduleData.title}
                    initialDescription={moduleData.description}
                    initialJsonContent={JSON.parse(moduleData.jsonDescription)}
                    initialHtmlContent={moduleData.htmlDescription}
                  />
                  <form action={deleteModule.bind(null, parseInt(params.moduleId), parseInt(params.courseId))}>
                    <Button type="submit" variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <ScrollArea className="h-[calc(100vh-300px)] pr-4">
            <div 
              className="prose max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: moduleData.htmlDescription }}
            />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
