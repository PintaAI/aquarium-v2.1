"use client"

import * as React from "react"
import Link from 'next/link'
import { signOut } from "next-auth/react"
import { UseCurrentUser } from "@/hooks/use-current-user"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, User, LogOut, GraduationCapIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation() {
  const user = UseCurrentUser()

  const handleLogout = () => {
    signOut()
  }

  const NavItems = () => (
    <>
      <Link href="/" passHref>
        <Button variant="ghost">Home</Button>
      </Link>
      <Link href="/courses" passHref>
        <Button variant="ghost">Courses</Button>
      </Link>
      <Link href="/community" passHref>
        <Button variant="ghost">Community</Button>
      </Link>
    </>
  )

  const UserAvatar = () => (
    <Avatar className="h-8 w-8">
      <AvatarImage src={user?.image || ''} alt={user?.name || ''} />
      <AvatarFallback>
        {user?.name ? user.name[0].toUpperCase() : 'U'}
      </AvatarFallback>
    </Avatar>
  )

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              PejuangKorea
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NavItems />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <UserAvatar />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  {user.role === 'GURU' && (
                    <DropdownMenuItem asChild>
                      <Link href="/courses/manage" className="flex items-center">
                        <GraduationCapIcon className="mr-2 h-4 w-4" />
                        <span>Manage Courses</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onSelect={handleLogout} className="text-red-600 focus:bg-red-100 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login" passHref>
                <Button variant="default">Login</Button>
              </Link>
              
            )}
            <ThemeToggle />
          </div>
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  <NavItems />
                  {user ? (
                    <>
                      <Link href="/profile" passHref>
                        <Button variant="ghost" className="justify-start">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Button>
                      </Link>
                      {user.role === 'GURU' && (
                        <Link href="/courses/manage" passHref>
                          <Button variant="ghost" className="justify-start">
                            <GraduationCapIcon className="mr-2 h-4 w-4" />
                            Manage Courses
                          </Button>
                        </Link>
                      )}
                      <Button variant="ghost" className="justify-start text-red-600 hover:bg-red-100 hover:text-red-600" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </>
                  ) : (
                    <Link href="/auth/login" passHref>
                      <Button variant="default">Login</Button>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}