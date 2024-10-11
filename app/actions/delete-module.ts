'use server'

import { db } from '../../lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteModule(moduleId: number, courseId: number) {
  try {
    await db.module.delete({
      where: { id: moduleId },
    })
    revalidatePath(`/courses/${courseId}`)
    redirect(`/courses/${courseId}`)
  } catch (error) {
    console.error('Failed to delete module:', error)
    throw new Error('Failed to delete module')
  }
}
