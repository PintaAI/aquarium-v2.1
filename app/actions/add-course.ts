"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

interface AddCourseData {
  courseTitle: string
  courseDescription: string
  moduleTitle: string
}

export async function addCourse(data: AddCourseData) {
  try {
    const { courseTitle, courseDescription, moduleTitle } = data

    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      throw new Error("User not authenticated")
    }

    const course = await db.course.create({
      data: {
        title: courseTitle,
        description: courseDescription,
        level: "BEGINNER",
        author: {
          connect: { id: session.user.id }
        },
        modules: {
          create: [
            {
              title: moduleTitle,
              order: 1,
              description: "",
              jsonDescription: "",
              htmlDescription: "",
            },
          ],
        },
      },
    })

    revalidatePath("/courses")
    return { success: true, courseId: course.id }
  } catch (error) {
    console.error("Failed to add course:", error)
    return { success: false, error: "Failed to add course. Please try again." }
  }
}