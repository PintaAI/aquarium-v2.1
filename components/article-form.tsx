'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Article } from '@prisma/client'
import { updateArticle, createArticle } from '@/app/actions/article-actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import Editor from './editor/editor'
import { JSONContent } from 'novel'
import { toast } from 'sonner'
import { User, Clock } from "lucide-react"

interface ArticleFormProps {
  article?: Article
}

const defaultEditorValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: []
    }
  ]
}

export default function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(article?.title || '')
  const [description, setDescription] = useState(article?.description || '')
  const [jsonDescription, setJsonDescription] = useState<JSONContent>(article?.jsonDescription ? JSON.parse(article.jsonDescription) : defaultEditorValue)
  const [htmlDescription, setHtmlDescription] = useState(article?.htmlDescription || '')
  const [pending, setPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title || !description || !jsonDescription || !htmlDescription) {
      toast.error('Please fill in all fields')
      return
    }

    setPending(true)

    const articleData = {
      title,
      description,
      htmlDescription,
      jsonDescription: JSON.stringify(jsonDescription),
    }

    try {
      if (article) {
        await updateArticle(article.id, articleData)
        toast.success('Article updated successfully')
      } else {
        await createArticle(articleData)
        toast.success('Article created successfully')
      }
      router.push('/articles')
    } catch (error) {
      console.error('Failed to save article:', error)
      toast.error('Failed to save article. Please try again.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Article Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold border-none px-0"
            />
            <Textarea
              placeholder="Brief description of the article"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <div className="flex items-center text-sm text-gray-500">
              <User className="mr-2 h-4 w-4" />
              <span>Author Name</span>
              <Clock className="ml-4 mr-2 h-4 w-4" />
              <span>{article ? 'Last edited' : 'Created'}: {article ? new Date(article.updatedAt).toLocaleDateString() : new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Article Content</h2>
        <div className="prose max-w-full">
          <Editor
            initialValue={jsonDescription}
            onChange={(content) => {
              setJsonDescription(content.json)
              setHtmlDescription(content.html)
            }}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? (article ? 'Updating...' : 'Creating...') : (article ? 'Update Article' : 'Create Article')}
      </Button>
    </form>
  )
}