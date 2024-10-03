import { db } from "@/lib/db"

export async function getModule(moduleId: number) {
  try {
    console.log(`Attempting to fetch module with id: ${moduleId}`)
    const module = await db.module.findUnique({
      where: { id: moduleId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    if (!module) {
      console.log(`No module found with id: ${moduleId}`)
    } else {
      console.log(`Successfully fetched module: ${JSON.stringify(module, null, 2)}`)
    }

    return module
  } catch (error) {
    console.error(`Failed to fetch module with id ${moduleId}:`, error)
    throw error // Re-throw the error to be caught by the page component
  }
}