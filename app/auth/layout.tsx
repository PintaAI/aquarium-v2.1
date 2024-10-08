import type { Metadata } from "next"
import "../globals.css"
import { Navigation } from "@/components/Navigation"

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