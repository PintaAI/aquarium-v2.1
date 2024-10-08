'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import Editor from "@/components/editor/editor"
import { JSONContent } from 'novel'
import { addModule } from '@/app/actions/add-module'

const defaultEditorValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: []
    }
  ]
}

interface AddModuleFormProps {
  courseId: number;
  onSuccess?: () => void;
}

const MAX_TITLE_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 200;

export default function AddModuleForm({ courseId, onSuccess }: AddModuleFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [jsonContent, setJsonContent] = useState<JSONContent>(defaultEditorValue)
  const [htmlContent, setHtmlContent] = useState('')
  const [pending, setPending] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setJsonContent(defaultEditorValue)
    setHtmlContent('')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_TITLE_LENGTH) {
      setTitle(e.target.value)
    }
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(e.target.value)
    }
  }

  async function handleSubmit() {
    if (!title.trim() || !description.trim() || !htmlContent.trim()) {
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

      resetForm()
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error adding module:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to add module')
    } finally {
      setPending(false)
      setIsConfirmDialogOpen(false)
    }
  }

  return (
    <div className='mt-6 flex max-w-2xl flex-col gap-4'>
      <Input
        type='text'
        placeholder='Module Title'
        value={title}
        onChange={handleTitleChange}
        maxLength={MAX_TITLE_LENGTH}
      />
      <small className="text-muted-foreground">{title.length}/{MAX_TITLE_LENGTH}</small>
      <Input
        type='text'
        placeholder='Short Description'
        value={description}
        onChange={handleDescriptionChange}
        maxLength={MAX_DESCRIPTION_LENGTH}
      />
      <small className="text-muted-foreground">{description.length}/{MAX_DESCRIPTION_LENGTH}</small>
      <Editor
        initialValue={defaultEditorValue}
        onChange={(content) => {
          setJsonContent(content.json)
          setHtmlContent(content.html)
        }}
      />
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogTrigger asChild>
          <Button disabled={pending || !title.trim() || !description.trim() || !htmlContent.trim()}>
            {pending ? 'Adding...' : 'Add Module'}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Add Module</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to add this module?</p>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit} disabled={pending}>
              {pending ? 'Adding...' : 'Confirm'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}