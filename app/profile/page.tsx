import React from 'react';
import { redirect } from 'next/navigation';
import { currentUser } from "@/lib/auth";
import Sidebar from "@/components/ui/Sidebar";
import { MainContent } from './components/MainContent';

// Types
interface Course {
  id: number;
  name: string;
  progress: number;
}

// Mock data fetching function (replace with real data fetching in the future)
const fetchUserData = async (): Promise<{ courses: Course[] }> => {
  // Simulating API call
  return {
    courses: [
      { id: 1, name: "Persiapan Ujian Tingkat Menengah", progress: 80 },
      { id: 2, name: "Bahasa Bisnis", progress: 45 },
      { id: 3, name: "Belajar Bahasa melalui Musik Pop", progress: 20 },
    ],
  };
};

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { courses } = await fetchUserData();

  return (
    <div className="flex min-h-screen">
      <Sidebar className='hidden md:block'/>
      <MainContent user={{
        name: user.name || null,
        image: user.image || null
      }} courses={courses} />
    </div>
  );
}
