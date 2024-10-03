"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { Menu, MessageSquare, Users, HelpCircle } from "lucide-react"

const courseStructure = [
  {
    id: 1,
    title: "Getting Started with React",
    icon: "🚀",
    lessons: [
      { id: 1, title: "Introduction to React", completed: true },
      { id: 2, title: "Setting Up Your Development Environment", completed: true },
      { id: 3, title: "Your First React Component", completed: false },
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

const discussionChannels = [
  { id: 1, title: "General Discussion", icon: MessageSquare },
  { id: 2, title: "Q&A Forum", icon: HelpCircle },
  { id: 3, title: "Study Groups", icon: Users },
]

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isDiscussionOpen, setIsDiscussionOpen] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const flatLessons = courseStructure.flatMap(module => module.lessons)
  const totalLessons = flatLessons.length
  const completedLessons = flatLessons.filter(lesson => lesson.completed).length
  const progress = (completedLessons / totalLessons) * 100

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const toggleDiscussion = () => {
    setIsDiscussionOpen(!isDiscussionOpen)
  }

  return (
    <div className="flex flex-col h-screen max-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Pejuagkorea Academy</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {completedLessons} of {totalLessons} lessons completed
          </span>
          <Progress value={progress} className="w-64" />
          <Button variant="ghost" size="icon" onClick={toggleDiscussion}>
            <MessageSquare className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={cn(
            "border-r overflow-hidden flex flex-col transition-all duration-300 ease-in-out",
            isSidebarCollapsed ? "w-16" : "w-64"
          )}
        >
          <ScrollArea className="flex-1">
            <nav className="p-2">
              <TooltipProvider>
                {courseStructure.map((module) => (
                  <Tooltip key={module.id}>
                    <TooltipTrigger asChild>
                      <Link href={`/courses/${module.id}`}>
                        <div
                          className={cn(
                            "flex items-center p-2 rounded-lg mb-1 cursor-pointer",
                            "hover:bg-muted",
                            pathname === `/courses/${module.id}` && "bg-muted"
                          )}
                        >
                          <span className="text-2xl mr-2">{module.icon}</span>
                          {!isSidebarCollapsed && (
                            <span className="text-sm font-medium">{module.title}</span>
                          )}
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                      <p>{module.title}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </nav>
          </ScrollArea>
        </aside>

        {/* Content area */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>

        {/* Right Sidebar - Discussion Channel */}
        {isDiscussionOpen && (
          <aside className="w-80 border-l overflow-hidden flex flex-col">
            <ScrollArea className="flex-1">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Discussion Channels</h2>
                <Accordion type="single" collapsible className="w-full">
                  {discussionChannels.map((channel) => (
                    <AccordionItem value={`channel-${channel.id}`} key={channel.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <channel.icon className="w-5 h-5 mr-2" />
                          <span>{channel.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-7 py-2">
                          {/* Placeholder for discussion content */}
                          <p className="text-sm text-muted-foreground">Discussion threads will appear here.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </ScrollArea>
          </aside>
        )}
      </div>
    </div>
  )
}