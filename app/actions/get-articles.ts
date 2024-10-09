'use server'

import { db } from '@/lib/db'

export async function getArticles() {
  try {
    const articles = await db.article.findMany({
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
      orderBy: {
        createdAt: 'desc',
      },
    })
    return articles
  } catch (error) {
    console.error('Failed to fetch articles:', error)
    return []
  }
}