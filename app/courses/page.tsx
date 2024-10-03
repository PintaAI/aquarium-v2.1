import Link from 'next/link'
import { Button } from "@/components/ui/button"

const courseStructure = [
  {
    id: 1,
    title: "Getting Started with React",
    icon: "🚀",
    description: "Learn the basics of React and set up your development environment.",
  },
  {
    id: 2,
    title: "React Fundamentals",
    icon: "🧱",
    description: "Dive into core React concepts like JSX, props, state, and event handling.",
  },
  {
    id: 3,
    title: "Advanced React Concepts",
    icon: "🏗️",
    description: "Explore advanced topics like hooks, context API, and performance optimization.",
  },
  {
    id: 4,
    title: "Building Real-World Applications",
    icon: "🌐",
    description: "Apply your knowledge to create production-ready React applications.",
  },
]

export default function CoursesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">React Mastery Course</h1>
      <p className="text-lg mb-8">Welcome to the React Mastery Course. Choose a module to begin your learning journey.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courseStructure.map((module) => (
          <div key={module.id} className="border rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{module.icon}</span>
              <h2 className="text-xl font-semibold">{module.title}</h2>
            </div>
            <p className="text-muted-foreground mb-4">{module.description}</p>
            <Link href={`/courses/${module.id}`}>
              <Button>Start Module</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}