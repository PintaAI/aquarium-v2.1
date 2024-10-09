'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { addModule } from '@/app/actions/add-module'
import Editor from './editor/editor'
import { JSONContent } from 'novel'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'
import { ScrollArea } from './ui/scroll-area'

interface AddModuleFormProps {
  courseId: number
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

export default function AddModuleForm({ courseId }: AddModuleFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [jsonContent, setJsonContent] = useState<JSONContent>(defaultEditorValue)
  const [htmlContent, setHtmlContent] = useState('')
  const [pending, setPending] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !description || !jsonContent || !htmlContent) {
      toast.error('Please fill in all fields')
      return
    }

    setPending(true)

    try {
      const result = await addModule({
        courseId,
        title,
        description,
        jsonContent: JSON.stringify(jsonContent),
        htmlContent,
      })

      if (!result.success) {
        throw new Error(result.error || 'Failed to add module')
      }

      toast.success('Module added successfully')
      router.refresh()
      setTitle('')
      setDescription('')
      setJsonContent(defaultEditorValue)
      setHtmlContent('')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add module')
    } finally {
      setPending(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle>Add New Module</CardTitle>
        <CardDescription>Create a new module for your course</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Module Title</label>
              <Input
                id="title"
                type="text"
                placeholder="Enter module title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Module Description</label>
              <Textarea
                id="description"
                placeholder="Enter module description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={1}
                className="w-full resize-none"
              />
            </div>
          </div>
          <div className="space-y-5">
            <label htmlFor="content" className="text-sm font-medium">Module Content</label>
            <ScrollArea className="w-full h-[60vh] ">
              <div className="">
                <Editor
                  initialValue={defaultEditorValue}
                  onChange={(content) => {
                    setJsonContent(content.json)
                    setHtmlContent(content.html)
                  }}
                />
              </div>
            </ScrollArea>
          </div>
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Adding...' : 'Add Module'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}