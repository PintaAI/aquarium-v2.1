"use client";

import { UseCurrentUser } from "@/hooks/use-current-user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameList from "@/components/GameList";
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const user = UseCurrentUser();
  const router = useRouter();

  if (!user) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  const handleTabChange = (value: string) => {
    if (value === 'courses') {
      router.push('/courses');
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">hi👋, {user.name}</h1>
      <Tabs defaultValue="mini-games" className="w-full" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mini-games">Mini Games</TabsTrigger>
          <TabsTrigger value="courses">Kursus / materi</TabsTrigger>
        </TabsList>
        <TabsContent value="mini-games">
          <div className="mt-4">
            <GameList />
          </div>
        </TabsContent>
        <TabsContent value="courses">
          <div className="mt-4">
            <h2 className="text-xl font-medium mb-3">Tunggu sebentar</h2>
            <p>Redirecting to courses page...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
