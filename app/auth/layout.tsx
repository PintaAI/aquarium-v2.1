import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { Navigation } from "@/components/Navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication pages for Aquarium",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Navigation />
      <main>
        {children}
      </main>
    </div>
  )
}