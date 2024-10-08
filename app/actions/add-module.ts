'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { currentUser } from '@/lib/auth'

interface AddModuleParams {
  courseId: number
  title: string
  description: string
  jsonContent: string
  htmlContent: string
}

export async function addModule({
  courseId,
  title,
  description,
  jsonContent,
  htmlContent,
}: AddModuleParams) {
  const user = await currentUser()

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  try {
    const course = await db.course.findUnique({
      where: { id: courseId },
      select: { authorId: true },
    })

    if (!course) {
      return { success: false, error: 'Course not found' }
    }

    if (course.authorId !== user.id) {
      return { success: false, error: 'Not authorized to add modules to this course' }
    }

    // Get the current maximum order for the course
    const maxOrderModule = await db.module.findFirst({
      where: { courseId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = (maxOrderModule?.order ?? 0) + 1

    const newModule = await db.module.create({
      data: {
        title,
        description,
        jsonDescription: jsonContent,
        htmlDescription: htmlContent,
        course: { connect: { id: courseId } },
        order: newOrder,
      },
    })

    revalidatePath(`/courses/${courseId}`)

    return { success: true, moduleId: newModule.id }
  } catch (error) {
    console.error('Failed to add module:', error)
    return { success: false, error: 'Failed to add module' }
  }
}