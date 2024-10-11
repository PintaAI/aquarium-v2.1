'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deleteCourse } from "@/app/actions/delete-course"

export default function DeleteCourseButton({ courseId }: { courseId: number }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const result = await deleteCourse(courseId)
      if (result.success) {
        router.push('/courses')
        router.refresh()
      } else {
        console.error('Failed to delete course:', result.error)
        setIsDeleting(false)
      }
    } catch (error) {
      console.error('Error deleting course:', error)
      setIsDeleting(false)
    }
  }

  return (
    <Button 
      onClick={handleDelete} 
      disabled={isDeleting}
      variant="destructive" 
      size="icon"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
