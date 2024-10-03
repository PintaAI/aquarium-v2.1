import { db } from "@/lib/db";

export async function getCourse(courseId: number) {
  try {
    console.log(`Attempting to fetch course with id: ${courseId}`);
    const course = await db.course.findUnique({
      where: { id: courseId },
      include: {
        author: true,
        modules: true,
      },
    });

    if (!course) {
      console.log(`No course found with id: ${courseId}`);
    } else {
      console.log(`Successfully fetched course: ${JSON.stringify(course, null, 2)}`);
    }

    return course;
  } catch (error) {
    console.error(`Failed to fetch course with id ${courseId}:`, error);
    throw error; // Re-throw the error to be caught by the page component
  }
}