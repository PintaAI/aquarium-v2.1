'use server'

import { db } from "@/lib/db"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function reorderModules(courseId: number, moduleIds: number[]) {
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

    // Update all module orders in a transaction
    await db.$transaction(
      moduleIds.map((id, index) =>
        db.module.update({
          where: {
            id,
            courseId, // Add courseId to ensure module belongs to the course
          },
          data: {
            order: index,
            updatedAt: new Date(), // Update the timestamp
          },
        })
      )
    )

    revalidatePath(`/courses/${courseId}`)
    return { success: true }
  } catch (error) {
    console.error("[REORDER_MODULES]", error)
    throw new Error("Failed to reorder modules")
  }
}
