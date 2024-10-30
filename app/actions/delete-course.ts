'use server'

import { revalidatePath } from 'next/cache'
import { db } from "@/lib/db"
import { auth } from "@/auth"

export async function deleteCourse(courseId: number) {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new Error("Unauthorized")
    }

    // Verify user owns the course
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        authorId: session.user.id,
      },
    })

    if (!course) {
      throw new Error("Unauthorized")
    }

    // Delete course and its modules in a transaction
    await db.$transaction([
      // First delete all modules
      db.module.deleteMany({
        where: {
          courseId,
        },
      }),
      // Then delete the course
      db.course.delete({
        where: {
          id: courseId,
        },
      }),
    ])

    revalidatePath('/courses')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete course:', error)
    return { success: false, error: 'Failed to delete course' }
  }
}
