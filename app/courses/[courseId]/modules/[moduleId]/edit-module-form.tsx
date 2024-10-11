'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Edit } from 'lucide-react'
import Editor from '@/components/editor/editor'
import { JSONContent } from '@tiptap/react'
import { updateModule } from '@/app/actions/update-module'
import { toast } from 'sonner'

interface EditModuleFormProps {
  moduleId: number
  initialTitle: string
  initialDescription: string
  initialJsonContent: JSONContent
  initialHtmlContent: string
}

export default function EditModuleForm({
  moduleId,
  initialTitle,
  initialDescription,
  initialJsonContent,
  initialHtmlContent,
}: EditModuleFormProps) {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [jsonContent, setJsonContent] = useState<JSONContent>(initialJsonContent)
  const [htmlContent, setHtmlContent] = useState(initialHtmlContent)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await updateModule(moduleId, {
        title,
        description,
        jsonDescription: JSON.stringify(jsonContent),
        htmlDescription: htmlContent,
      })
      toast.success('Module updated successfully')
      setIsOpen(false)
      router.refresh()
    } catch (error) {
      toast.error('Failed to update module')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Module</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Module Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Module Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">Module Content</label>
            <Editor
              initialValue={initialJsonContent}
              onChange={(content) => {
                setJsonContent(content.json)
                setHtmlContent(content.html)
              }}
            />
          </div>
          <Button type="submit" className="w-full">Update Module</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
