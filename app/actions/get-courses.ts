import { db } from "@/lib/db";

export async function getCourses() {
  try {
    const courses = await db.course.findMany({
      include: {
        author: true,
      },
    });
    return courses;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    throw new Error("Failed to fetch courses");
  }
}