'use server'

import { db } from '@/lib/db'
import { currentUser } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

interface ArticleData {
  title: string
  description: string | null
  htmlDescription: string
  jsonDescription: string
}

export async function createArticle(data: ArticleData) {
  const user = await currentUser()

  if (!user) {
    throw new Error('You must be logged in to create an article')
  }

  try {
    const article = await db.article.create({
      data: {
        ...data,
        authorId: user.id,
      },
    })

    revalidatePath('/articles')
    return article
  } catch (error) {
    console.error('Failed to create article:', error)
    throw new Error('Failed to create article')
  }
}

export async function updateArticle(id: number, data: ArticleData) {
  const user = await currentUser()

  if (!user) {
    throw new Error('You must be logged in to update an article')
  }

  try {
    const article = await db.article.findUnique({
      where: { id },
    })

    if (!article) {
      throw new Error('Article not found')
    }

    if (article.authorId !== user.id) {
      throw new Error('You do not have permission to update this article')
    }

    const updatedArticle = await db.article.update({
      where: { id },
      data,
    })

    revalidatePath(`/articles/${id}`)
    revalidatePath('/articles')
    return updatedArticle
  } catch (error) {
    console.error('Failed to update article:', error)
    throw new Error('Failed to update article')
  }
}

export async function deleteArticle(id: number) {
  const user = await currentUser()

  if (!user) {
    throw new Error('You must be logged in to delete an article')
  }

  try {
    const article = await db.article.findUnique({
      where: { id },
    })

    if (!article) {
      throw new Error('Article not found')
    }

    if (article.authorId !== user.id) {
      throw new Error('You do not have permission to delete this article')
    }

    await db.article.delete({
      where: { id },
    })

    revalidatePath('/articles')
  } catch (error) {
    console.error('Failed to delete article:', error)
    throw new Error('Failed to delete article')
  }
}