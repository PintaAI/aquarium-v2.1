import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function startCourse(courseId: number) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    const course = await db.course.findUnique({
      where: { id: courseId },
      include: { modules: { orderBy: { order: 'asc' } } },
    });

    if (!course) {
      throw new Error("Course not found");
    }

    // Add user to course members
    await db.course.update({
      where: { id: courseId },
      data: {
        members: {
          connect: { id: user.id }
        }
      }
    });

    return { success: true, nextModuleId: course.modules[0]?.id };
  } catch (error) {
    console.error(`Failed to start course ${courseId}:`, error);
    throw error;
  }
}
