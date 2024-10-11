'use server'

import { db } from '@/lib/db'
import { CourseLevel } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { currentUser } from '@/lib/auth'

interface AddCourseParams {
  title: string
  description: string
  level: CourseLevel
  jsonDescription: string
  htmlDescription: string
  thumbnail?: string | null
}

export async function addCourse({
  title,
  description,
  level,
  jsonDescription,
  htmlDescription,
  thumbnail,
}: AddCourseParams) {
  try {
    const user = await currentUser()

    if (!user || user.role !== 'GURU') {
      throw new Error('Unauthorized')
    }

    const course = await db.course.create({
      data: {
        title,
        description,
        level,
        jsonDescription,
        htmlDescription,
        thumbnail: thumbnail || null,
        authorId: user.id,
      },
    })

    revalidatePath('/courses')
    return { success: true, courseId: course.id }
  } catch (error) {
    console.error('Failed to add course:', error)
    return { success: false, error: 'Failed to add course' }
  }
}
