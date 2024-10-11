'use client'

import { useState, useRef } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import Editor from './editor/editor'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card, CardContent } from './ui/card'
import { CourseLevel } from '@prisma/client'
import { addCourse } from '@/app/actions/add-course'
import { uploadImage } from '@/app/actions/upload-image'
import { JSONContent } from 'novel'
import { User, BarChart, Clock, Upload } from "lucide-react"

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
  const [level, setLevel] = useState<CourseLevel>(CourseLevel.BEGINNER)
  const [jsonDescription, setJsonDescription] = useState<JSONContent>(defaultEditorValue)
  const [htmlDescription, setHtmlDescription] = useState('')
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  async function handleThumbnailUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const imageUrl = await uploadImage(formData)
      setThumbnail(imageUrl)
      toast.success('Thumbnail uploaded successfully')
    } catch (error) {
      toast.error('Failed to upload thumbnail')
      console.error('Error uploading thumbnail:', error)
    }
  }

  async function handleSubmit() {
    if (!title || !description || !level || !jsonDescription || !htmlDescription) {
      toast.error('Please fill in all required fields')
      return
    }

    setPending(true)

    try {
      const result = await addCourse({
        title,
        description,
        level,
        jsonDescription: JSON.stringify(jsonDescription),
        htmlDescription,
        thumbnail,
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

            <div className="flex items-center gap-4">
              <Button onClick={() => fileInputRef.current?.click()} type="button">
                <Upload className="mr-2" size={16} />
                Upload Thumbnail (Optional)
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleThumbnailUpload}
                accept="image/*"
                className="hidden"
              />
              {thumbnail && (
                <div className="relative w-20 h-20">
                  <Image
                    src={thumbnail}
                    alt="Course thumbnail"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              )}
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
            setJsonDescription(content.json)
            setHtmlDescription(content.html)
          }}
        />
      </div>
    </div>
  )
}
