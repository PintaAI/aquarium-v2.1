import { db } from "@/lib/db"

export async function getCourseWithModules(courseId: number) {
  try {
    const courseData = await db.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          select: {
            id: true,
            title: true,
            order: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    })

    if (!courseData) {
      console.log(`No course found with id: ${courseId}`)
    } else {
      console.log(`Successfully fetched course: ${JSON.stringify(courseData, null, 2)}`)
    }

    return courseData
  } catch (error) {
    console.error(`Failed to fetch course with id ${courseId}:`, error)
    throw error
  }
}