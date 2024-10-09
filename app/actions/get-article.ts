'use server'

import { db } from '@/lib/db'

export async function getArticle(id: number) {
  try {
    const article = await db.article.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        jsonDescription: true,
        htmlDescription: true,
        createdAt: true,
        updatedAt: true,
        authorId: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })
    return article
  } catch (error) {
    console.error('Failed to fetch article:', error)
    return null
  }
}