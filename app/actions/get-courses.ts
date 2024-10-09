import { db } from "@/lib/db";

export interface Course {
  id: number;
  title: string;
  description: string | null;
  level: string;
  thumbnail: string | null;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

export async function getCourses(): Promise<Course[]> {
  try {
    const courses = await db.course.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return courses as Course[];
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    throw new Error("Failed to fetch courses");
  }
}