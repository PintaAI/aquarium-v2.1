'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { CourseLevel } from '@prisma/client'

interface UpdateCourseData {
  title: string
  description: string
  level: CourseLevel
  jsonDescription: string
  htmlDescription: string
  thumbnail: string | null
}

export async function updateCourse(courseId: number, data: UpdateCourseData) {
  try {
    const updatedCourse = await db.course.update({
      where: { id: courseId },
      data: {
        title: data.title,
        description: data.description,
        level: data.level,
        jsonDescription: data.jsonDescription,
        htmlDescription: data.htmlDescription,
        thumbnail: data.thumbnail,
      },
    })

    revalidatePath(`/courses/${courseId}`)
    return { success: true, courseId: updatedCourse.id }
  } catch (error) {
    console.error('Failed to update course:', error)
    return { success: false, error: 'Failed to update course' }
  }
}
