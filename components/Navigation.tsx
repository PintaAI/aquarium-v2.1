"use client"

import * as React from "react"
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
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
import { cn } from "@/lib/utils"
import { Modal } from "@/components/ui/modal"
import AuthCard from "@/components/AuthCard"

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} passHref>
      <Button 
        variant="ghost" 
        className={cn(
          isActive && "bg-accent text-accent-foreground",
          "transition-colors hover:bg-accent hover:text-accent-foreground w-full justify-start"
        )}
      >
        {children}
      </Button>
    </Link>
  )
}

export function Navigation() {
  const user = UseCurrentUser()

  const handleLogout = () => {
    signOut()
  }

  const NavItems = () => (
    <>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/courses">Kursus</NavLink>
      <NavLink href="/community">komunitas</NavLink>
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

  const LoginModal = () => (
    <Modal
      trigger={<Button variant="default">Login</Button>}
      className="sm:max-w-[400px]"
    >
      <AuthCard />
    </Modal>
  )

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 dark:bg-black/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logoo.png"
                alt="PejuangKorea Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="text-xl md:text-2xl font-bold text-foreground">Pejuangkorea</span>
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
              <LoginModal />
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
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <Image
                      src="/images/logoo.png"
                      alt="PejuangKorea Logo"
                      width={32}
                      height={32}
                      className="mr-2"
                    />
                    <span className="text-xl font-bold text-foreground">PejuangKorea</span>
                  </div>
                  <nav className="flex flex-col space-y-4 flex-grow">
                    <NavItems />
                    {user ? (
                      <>
                        <Link href="/profile" passHref>
                          <Button variant="ghost" className="justify-start w-full">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Button>
                        </Link>
                        {user.role === 'GURU' && (
                          <Link href="/courses/manage" passHref>
                            <Button variant="ghost" className="justify-start w-full">
                              <GraduationCapIcon className="mr-2 h-4 w-4" />
                              Manage Courses
                            </Button>
                          </Link>
                        )}
                      </>
                    ) : (
                      <LoginModal />
                    )}
                  </nav>
                  {user && (
                    <Button variant="ghost" className="justify-start w-full text-red-600 hover:bg-red-100 hover:text-red-600 mt-auto" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}