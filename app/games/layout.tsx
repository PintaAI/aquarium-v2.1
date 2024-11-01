"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex flex-col">
      <Button variant="ghost" asChild className="w-fit">
        <Link href="/games" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </Button>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
