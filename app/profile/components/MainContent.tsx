import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck, Book, GraduationCap, TrendingUp } from "lucide-react";
import { SignOutButton } from "@/components/SignOutButton";

interface Course {
  id: number;
  name: string;
  progress: number;
}

interface MainContentProps {
  user: {
    name?: string | null;
    image?: string | null;
  };
  courses: Course[];
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export const MainContent: React.FC<MainContentProps> = ({ user, courses }) => (
  <main className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto">
    <header className="mb-8 flex flex-col sm:flex-row items-center justify-between sm:space-y-0 space-y-4">
      <div className="flex items-center w-full sm:w-auto">
        <Avatar className="mr-4 h-12 w-12 sm:h-16 sm:w-16">
          <AvatarImage src={user.image || undefined} alt={user.name || 'Profil pengguna'} />
          <AvatarFallback>{user.name ? getInitials(user.name) : 'U'}</AvatarFallback>
        </Avatar>
        <div>
          {/* Mengubah ukuran font untuk header */}
          <h1 className="text-xl sm:text-3xl font-bold text-foreground">Halo, {user.name || 'Pengguna'}!</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Pelajar Tingkat Menengah · Jakarta</p>
        </div>
      </div>

      {/* Tombol di mobile akan tampil di bawah, bukan di sebelah avatar */}
      <div className="flex w-full sm:w-auto sm:space-x-2 space-x-0 space-y-2 sm:space-y-0 flex-col sm:flex-row">
        <Button variant="outline" className="text-sm sm:text-base w-full sm:w-auto">Edit Profil</Button>
        <SignOutButton />
      </div>
    </header>


    <section className="mb-8 rounded-lg bg-card p-4 sm:p-6 shadow-md">
      <h2 className="mb-4 text-lg sm:text-xl font-semibold text-foreground">Kemajuan Belajar</h2>
      <div className="space-y-4">
        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-sm font-medium text-foreground">Kemajuan Keseluruhan</span>
            <span className="text-sm font-medium text-foreground">75%</span>
          </div>
          <Progress value={75} className="h-2 w-full" />
        </div>
        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-sm font-medium text-foreground">Target Minggu Ini</span>
            <span className="text-sm font-medium text-foreground">5/7 hari</span>
          </div>
          <Progress value={71} className="h-2 w-full" />
        </div>
      </div>
    </section>

    <section className="mb-8 grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Kursus yang Sedang Diikuti</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {courses.map((course) => (
              <li key={course.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Book className="mr-2 h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">{course.name}</span>
                </div>
                <span className="text-xs font-medium text-muted-foreground">{course.progress}% selesai</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Pencapaian Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-center">
              <BadgeCheck className="mr-2 h-5 w-5 text-yellow-500 dark:text-yellow-400" />
              <span className="text-sm font-medium text-foreground">100 hari belajar berturut-turut!</span>
            </li>
            <li className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-500 dark:text-green-400" />
              <span className="text-sm font-medium text-foreground">Skor tes meningkat 20 poin</span>
            </li>
            <li className="flex items-center">
              <GraduationCap className="mr-2 h-5 w-5 text-blue-500 dark:text-blue-400" />
              <span className="text-sm font-medium text-foreground">Menyelesaikan kursus 'Pemahaman Budaya'</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>

    <section className="rounded-lg bg-card p-4 sm:p-6 shadow-md">
      <h2 className="mb-4 text-lg sm:text-xl font-semibold text-foreground">Rekomendasi Pembelajaran Berikutnya</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {['Penguasaan Tata Bahasa Lanjutan', 'Eksplorasi Sejarah', 'Bahasa Bisnis Lanjutan'].map((course, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <h3 className="mb-2 text-base sm:text-lg font-medium text-foreground">{course}</h3>
              <p className="mb-4 text-xs sm:text-sm text-muted-foreground">
                {index === 0 && 'Kuasai struktur tata bahasa yang kompleks.'}
                {index === 1 && 'Pelajari sejarah dan budaya yang kaya.'}
                {index === 2 && 'Pelajari bahasa tingkat lanjut untuk digunakan di tempat kerja.'}
              </p>
              <Button className="w-full text-xs sm:text-sm">Mulai</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  </main>
);

