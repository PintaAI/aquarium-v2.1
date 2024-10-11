'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function updateModule(moduleId: number, data: {
  title: string
  description: string
  jsonDescription: string
  htmlDescription: string
}) {
  try {
    await db.module.update({
      where: { id: moduleId },
      data: {
        title: data.title,
        description: data.description,
        jsonDescription: data.jsonDescription,
        htmlDescription: data.htmlDescription,
      },
    })
    revalidatePath('/courses/[courseId]')
  } catch (error) {
    console.error('Failed to update module:', error)
    throw new Error('Failed to update module')
  }
}
