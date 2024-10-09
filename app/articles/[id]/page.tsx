import { getArticle } from '@/app/actions/get-article'
import { ArticleView } from '@/components/articles/article-view'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'
import { currentUser } from '@/lib/auth'

interface ArticlePageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticle(parseInt(params.id))
  if (!article) return { title: 'Article Not Found' }

  return {
    title: article.title,
    description: article.description || undefined,
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(parseInt(params.id))
  const user = await currentUser()

  if (!article) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <Link href="/articles" passHref>
        <Button variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
        </Button>
      </Link>
      <ArticleView article={article} currentUserId={user?.id || null} />
    </div>
  )
}