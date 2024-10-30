import { db } from "@/lib/db"

export async function getModule(moduleId: number) {
  try {
    console.log(`Attempting to fetch module with id: ${moduleId}`)
    const moduleData = await db.module.findFirst({
      where: {
        OR: [
          { id: moduleId },  // Keep original ID-based query
          { order: moduleId }  // Add order-based query
        ]
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    if (!moduleData) {
      console.log(`No module found with id/order: ${moduleId}`)
    } else {
      console.log(`Successfully fetched module: ${JSON.stringify(moduleData, null, 2)}`)
    }

    return moduleData
  } catch (error) {
    console.error(`Failed to fetch module with id/order ${moduleId}:`, error)
    throw error // Re-throw the error to be caught by the page component
  }
}
