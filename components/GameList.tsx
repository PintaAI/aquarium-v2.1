import React, { useState } from 'react';
import FlashcardGame from './Flashcard-game';
import HangeulGame from './HangeulGame';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Gamepad2, ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Game = {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType;
  icon: React.ReactNode;
  color: string;
};

const games: Game[] = [
  { 
    id: 'hangeul', 
    name: 'Hangeul Rush', 
    description: 'Cara paling cepet asik dan gampang banget buat ngapalin Hangeul',
    component: HangeulGame,
    icon: <Gamepad2 className="w-8 h-8" />,
    color: 'bg-blue-500'
  },
  { 
    id: 'vocabulary', 
    name: 'Hafalan Kosa kata', 
    description: 'Ga ada yang lebih baik ngapalin kosa kata di banding main game ini seru banget asli',
    component: FlashcardGame, 
    icon: <BookOpen className="w-8 h-8" />,
    color: 'bg-emerald-500' 
  },
  { 
    id: 'vocabulary', 
    name: 'Soal Eps-Topik', 
    description: 'Buat yang mau persiapan Ujian Eps Topik wajib banget cba game ini sih',
    component: () => <div>Coming soon</div>,
    icon: <BookOpen className="w-8 h-8" />,
    color: 'bg-rose-500' 
  },
];


export default function GameList() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handleBackToList = () => {
    setSelectedGame(null);
  };

  if (selectedGame) {
    const game = games.find((g) => g.id === selectedGame);
    if (!game) return null;

    return (
      <section className="w-full max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-primary/20 to-background text-white">
            <CardTitle className="text-2xl">{game.name}</CardTitle>
            <Button
              variant="ghost"
              onClick={handleBackToList}
              className="text-white hover:text-white/80"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Game List
            </Button>
          </CardHeader>
          <CardContent className="p-0 border-none">
            {React.createElement(game.component)}
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <Card 
            key={game.id}
            className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
            onClick={() => setSelectedGame(game.id)}
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
        ))}
      </div>
    </section>
  );
}
