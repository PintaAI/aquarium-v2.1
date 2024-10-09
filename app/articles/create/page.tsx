import ArticleForm from '@/components/article-form'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Create Article | Aquarium',
  description: 'Create a new article about aquarium care and maintenance.',
}

export default async function CreateArticlePage() {
  const user = await currentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="space-y-6">
      <Link href="/articles" passHref>
        <Button variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
        </Button>
      </Link>
      <h1 className="text-3xl font-bold">Create New Article</h1>
      <ArticleForm />
    </div>
  )
}