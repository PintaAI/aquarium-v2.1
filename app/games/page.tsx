"use client"
import { redirect } from "next/navigation";
import { UseCurrentUser } from "@/hooks/use-current-user";

export default function GamesPage() {
  const user = UseCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Redirect to games list
  redirect("/home");
}
