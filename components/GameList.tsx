import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Gamepad2, BookOpen, Sparkles } from 'lucide-react';

type Game = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  href: string;
};

const games: Game[] = [
  { 
    id: 'hangeul', 
    name: 'Hangeul Rush', 
    description: 'Cara paling cepet asik dan gampang banget buat ngapalin Hangeul',
    icon: <Gamepad2 className="w-8 h-8" />,
    color: 'bg-blue-500',
    href: '/games/hangeul'
  },
  { 
    id: 'vocabulary', 
    name: 'Hafalan Kosa kata', 
    description: 'Ga ada yang lebih baik ngapalin kosa kata di banding main game ini seru banget asli',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'bg-emerald-500',
    href: '/games/vocabulary'
  },
  { 
    id: 'eps-topik', 
    name: 'Soal Eps-Topik', 
    description: 'Buat yang mau persiapan Ujian Eps Topik wajib banget cba game ini sih',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'bg-rose-500',
    href: '/games/soal-eps-topik'
  },
];

export default function GameList() {
  return (
    <section className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <Link key={game.id} href={game.href}>
            <Card 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
            >
              <CardHeader className={`${game.color} text-white group-hover:bg-opacity-90 transition-colors`}>
                <div className="flex items-center space-x-3">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full">
                    {game.icon}
                  </div>
                  <CardTitle className="text-2xl">{game.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardDescription className="text-base">{game.description}</CardDescription>
              </CardContent>
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
