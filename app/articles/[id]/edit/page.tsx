import { getArticle } from '@/app/actions/get-article'
import ArticleForm from '@/components/article-form'
import { notFound, redirect } from 'next/navigation'
import { currentUser } from '@/lib/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Edit Article | Aquarium',
  description: 'Edit an existing article about aquarium care and maintenance.',
}

interface EditArticlePageProps {
  params: { id: string }
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const user = await currentUser()
  if (!user) {
    redirect('/login')
  }

  const article = await getArticle(parseInt(params.id))
  if (!article) {
    notFound()
  }

  if (article.authorId !== user.id) {
    redirect('/articles')
  }

  return (
    <div className="space-y-6">
      <Link href={`/articles/${params.id}`} passHref>
        <Button variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Article
        </Button>
      </Link>
      <h1 className="text-3xl font-bold">Edit Article</h1>
      <ArticleForm article={article} />
    </div>
  )
}