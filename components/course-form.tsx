'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import Editor from './editor/editor'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card, CardContent } from './ui/card'
import { CourseLevel } from '@prisma/client'
import { addCourse } from '@/app/actions/add-course'
import { JSONContent } from 'novel'
import { User, BarChart, Clock } from "lucide-react"

const defaultEditorValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: []
    }
  ]
}

interface CourseFormProps {
  username: string;
}

export default function CourseForm({ username }: CourseFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [level, setLevel] = useState<CourseLevel>(CourseLevel.BEGINNER) // Default value
  const [jsonDescription, setJsonDescription] = useState<JSONContent>(defaultEditorValue)
  const [htmlDescription, setHtmlDescription] = useState('')
  const [pending, setPending] = useState(false)
  const router = useRouter()

  async function handleSubmit() {
    if (!title || !description || !level || !jsonDescription || !htmlDescription) {
      toast.error('Please fill in all fields')
      return
    }

    setPending(true)

    try {
      console.log({
        title,
        description,
        level,
        jsonDescription,
        htmlDescription
      })

      const result = await addCourse({
        title,
        description,
        level,
        jsonDescription: JSON.stringify(jsonDescription), // Convert to string
        htmlDescription,
      })

      if (!result.success) {
        throw new Error(result.error || 'Failed to create course')
      }

      toast.success('Course created successfully')
      router.push(`/courses/${result.courseId}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create course')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className=''>
      <Card className="border-none shadow-md">
        <CardContent className='p-4 md:p-6'>
          <div className='flex flex-col gap-4 md:gap-6'>
            <Input
              type='text'
              placeholder='Tulis Judul di sini...'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl md:text-3xl font-bold border-none p-0 text-white"
            />
            
            <Textarea
              placeholder='Tambahkan deskripsi singkat di sini...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="text-base md:text-lg text-muted-foreground border-none"
            />
            
            <div className="flex flex-col md:flex-row justify-between text-sm text-muted-foreground gap-4 md:gap-0">
              <div className="flex items-center">
                <User className="mr-2" size={16} />
                <span>{username}</span>
              </div>
              <div className="flex items-center">
                <BarChart className="mr-2" size={16} />
                <Select value={level} onValueChange={(value) => setLevel(value as CourseLevel)}>
                  <SelectTrigger className="w-full md:w-[140px] border-none">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BEGINNER">Beginner</SelectItem>
                    <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                    <SelectItem value="ADVANCED">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2" size={16} />
                <span>0 modules</span>
              </div>
            </div>
            <Button onClick={handleSubmit} disabled={pending} className="w-full">
              {pending ? 'Creating...' : 'Create Course'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Detailed Description</h2>
        <Editor
          initialValue={defaultEditorValue}
          onChange={(content) => {
            setJsonDescription(content.json) // Assuming content.json is JSONContent type
            setHtmlDescription(content.html) // Assuming content.html is a string of HTML
          }}
        />
      </div>
    </div>
  )
}
