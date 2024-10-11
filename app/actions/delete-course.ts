'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'

export async function deleteCourse(courseId: number) {
  try {
    await db.course.delete({
      where: { id: courseId },
    })

    revalidatePath('/courses')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete course:', error)
    return { success: false, error: 'Failed to delete course' }
  }
}
