"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { CheckCircle, ChevronLeft, ChevronRight, Menu } from "lucide-react"

const courseStructure = [
  {
    id: 1,
    title: "Getting Started with React",
    icon: "🚀",
    lessons: [
      { id: 1, title: "Introduction to React", completed: true },
      { id: 2, title: "Setting Up Your Development", completed: true },
      { id: 3, title: "Your First React Component", completed: true },
    ],
  },
  {
    id: 2,
    title: "React Fundamentals",
    icon: "🧱",
    lessons: [
      { id: 4, title: "JSX and React Elements", completed: false },
      { id: 5, title: "Props and State", completed: false },
      { id: 6, title: "Handling Events in React", completed: false },
    ],
  },
  {
    id: 3,
    title: "Advanced React Concepts",
    icon: "🏗️",
    lessons: [
      { id: 7, title: "React Hooks Deep Dive", completed: false },
      { id: 8, title: "Context API and State Management", completed: false },
      { id: 9, title: "Performance Optimization Techniques", completed: false },
    ],
  },
  {
    id: 4,
    title: "Building Real-World Applications",
    icon: "🌐",
    lessons: [
      { id: 10, title: "Routing in React Applications", completed: false },
      { id: 11, title: "Working with APIs and Data Fetching", completed: false },
      { id: 12, title: "Deploying Your React Application", completed: false },
    ],
  },
]

interface LessonSidebarProps {
  currentModule: number;
  currentLesson: number;
  setCurrentLesson: (lessonId: number) => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

function LessonSidebar({ currentModule, currentLesson, setCurrentLesson, isCollapsed, toggleSidebar }: LessonSidebarProps) {
  const currentModuleData = courseStructure.find(module => module.id === currentModule);

  if (!currentModuleData) {
    return null;
  }

  return (
    <aside
      className={cn(
        "border-r overflow-hidden flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className={cn("font-semibold", isCollapsed && "sr-only")}>Lessons</h2>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-2">
          {currentModuleData.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className={cn(
                "flex items-center p-2 rounded-lg mb-1 cursor-pointer",
                "hover:bg-muted",
                currentLesson === lesson.id && "bg-muted"
              )}
              onClick={() => setCurrentLesson(lesson.id)}
            >
              {lesson.completed && <CheckCircle className="w-4 h-4 text-green-500 mr-2" />}
              {!isCollapsed && (
                <span className="text-sm font-medium">{lesson.title}</span>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  )
}

export default function CoursePage({ params }: { params: { id: string } }) {
  const [currentModule, setCurrentModule] = useState(parseInt(params.id))
  const [currentLesson, setCurrentLesson] = useState(0)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const moduleId = parseInt(params.id)
    setCurrentModule(moduleId)
    const module = courseStructure.find(m => m.id === moduleId)
    if (module && module.lessons.length > 0) {
      setCurrentLesson(module.lessons[0].id)
    }
  }, [params.id])

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const currentModuleData = courseStructure.find(module => module.id === currentModule)
  const currentLessonData = currentModuleData?.lessons.find(lesson => lesson.id === currentLesson)

  const navigateToPrevious = () => {
    if (currentModuleData) {
      const currentLessonIndex = currentModuleData.lessons.findIndex(lesson => lesson.id === currentLesson)
      if (currentLessonIndex > 0) {
        setCurrentLesson(currentModuleData.lessons[currentLessonIndex - 1].id)
      } else if (currentModule > 1) {
        const prevModule = courseStructure[currentModule - 2]
        router.push(`/courses/${prevModule.id}`)
        setCurrentLesson(prevModule.lessons[prevModule.lessons.length - 1].id)
      }
    }
  }

  const navigateToNext = () => {
    if (currentModuleData) {
      const currentLessonIndex = currentModuleData.lessons.findIndex(lesson => lesson.id === currentLesson)
      if (currentLessonIndex < currentModuleData.lessons.length - 1) {
        setCurrentLesson(currentModuleData.lessons[currentLessonIndex + 1].id)
      } else if (currentModule < courseStructure.length) {
        const nextModule = courseStructure[currentModule]
        router.push(`/courses/${nextModule.id}`)
        setCurrentLesson(nextModule.lessons[0].id)
      }
    }
  }

  if (!currentModuleData || !currentLessonData) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-full">
      <LessonSidebar
        currentModule={currentModule}
        currentLesson={currentLesson}
        setCurrentLesson={setCurrentLesson}
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{currentModuleData.title}</h1>
          <h2 className="text-2xl font-semibold mb-6">{currentLessonData.title}</h2>
          <p className="text-lg mb-8">Lesson {currentLessonData.id} of {currentModuleData.lessons.length}</p>
          
          <Card>
            <CardHeader>
              <CardTitle>Lesson Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This is where the main content for the lesson would go. You can add text, images, videos, and interactive elements here to create engaging learning materials.</p>
              {/* Add more lesson content here */}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={navigateToPrevious}
              disabled={currentModule === 1 && currentLesson === currentModuleData.lessons[0].id}
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Previous Lesson
            </Button>
            <Button
              onClick={navigateToNext}
              disabled={currentModule === courseStructure.length && currentLesson === currentModuleData.lessons[currentModuleData.lessons.length - 1].id}
            >
              Next Lesson <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}