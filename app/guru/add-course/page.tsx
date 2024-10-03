
import { auth } from "@/auth"
import { AddCourseForm } from "@/components/AddCourseForm"
import { redirect } from "next/navigation"

export default async function AddCoursePage() {
  const session = await auth()

  if (!session || !session.user || session.user.role !== "GURU") {
    redirect("/login?callbackUrl=/guru/add-course")
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Add New Course</h1>
      <AddCourseForm />
    </div>
  )
}