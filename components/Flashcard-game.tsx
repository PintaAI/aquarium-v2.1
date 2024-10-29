"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress'; // Import the Progress component

interface Word {
  id: number;
  term: string;
  definition: string;
}

interface WordWithPosition extends Word {
  positionX: number;
  positionY: number;
  speed: number;  // Added speed property for varying fall rates
}

const wordList: Word[] = [
  { id: 1, term: '안녕하세요', definition: 'hello' },
  { id: 2, term: '감사합니다', definition: 'terima kasih' },
  { id: 3, term: '사랑해요', definition: 'aku cinta kamu' },
  { id: 4, term: '미안해요', definition: 'maaf' },
  { id: 5, term: '잘자요', definition: 'selamat tidur' },
  { id: 6, term: '맛있어요', definition: 'enak' },
  { id: 7, term: '좋아요', definition: 'suka' },
  { id: 8, term: '화이팅', definition: 'semangat' },
  { id: 9, term: '괜찮아요', definition: 'tidak apa-apa' },
  { id: 10, term: '재미있어요', definition: 'menyenangkan' },
];

export default function FallingWordsGame() {
  const [fallingWords, setFallingWords] = useState<WordWithPosition[]>([]);
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(120);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // Start game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimer(120);
    setFallingWords([]);
    setUserInput('');
  };

  // Add new words every 2 seconds (reduced from 3)
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const addWordInterval = setInterval(() => {
      const unusedWords = wordList.filter(word => 
        !fallingWords.some(falling => falling.id === word.id)
      );
      
      // Add up to 2 words at once if available
      const wordsToAdd = Math.min(3, unusedWords.length);
      
      if (wordsToAdd > 0) {
        const newWords = Array.from({ length: wordsToAdd }, () => {
          const randomWord = unusedWords[Math.floor(Math.random() * unusedWords.length)];
          // Remove the selected word from unusedWords to prevent duplicates
          unusedWords.splice(unusedWords.indexOf(randomWord), 1);
          
          const positionX = Math.floor(Math.random() * (80 - 20 + 1) + 20); // Between 20% and 80%
          const speed = Math.random() * (2 - 0.5) + 0.5; // Random speed between 0.5 and 2
          
          return { ...randomWord, positionX, positionY: 0, speed };
        });

        setFallingWords(prevWords => [...prevWords, ...newWords]);
      }
    }, 2000); // Reduced interval to 2 seconds

    return () => clearInterval(addWordInterval);
  }, [gameStarted, gameOver, fallingWords]);

  // Move words down with individual speeds
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveWordsInterval = setInterval(() => {
      setFallingWords(prevWords => {
        if (prevWords.length === 0) return prevWords;
        
        return prevWords.map(word => ({
          ...word,
          positionY: word.positionY + word.speed
        }));
      });
    }, 50);

    return () => clearInterval(moveWordsInterval);
  }, [gameStarted, gameOver]);

  // Check if words reach bottom
  useEffect(() => {
    const gameArea = document.querySelector('.game-area');
    if (!gameArea) return;
    
    const height = gameArea.clientHeight;
    if (fallingWords.some(word => word.positionY >= height - 40)) {
      setGameOver(true);
      setGameStarted(false);
    }
  }, [fallingWords]);

  // Game timer
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const countdown = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          setGameOver(true);
          setGameStarted(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [gameStarted, gameOver]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);

    const matchedWord = fallingWords.find(
      word => value.trim().toLowerCase() === word.definition.trim().toLowerCase()
    );

    if (matchedWord) {
      setScore(prev => prev + 1);
      setFallingWords(prevWords => 
        prevWords.filter(w => w.id !== matchedWord.id)
      );
      setUserInput('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] p-4 w-full max-w-2xl mx-auto">
      <Card className="w-full h-full flex flex-col">
        <CardHeader className="flex-shrink-0 pb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Tangkap Kosa Kata</h2>
            <div className="flex gap-4">
              <span className="font-medium">Score: {score}</span>
              <span className="font-medium">Time: {timer}s</span>
            </div>
          </div>
          <Progress value={(timer / 120) * 100} className="mt-2" /> {/* Add Progress Bar */}

        </CardHeader>

        <CardContent className="flex-1 flex flex-col h-full p-4 gap-4">
          <div 
            className="game-area relative flex-1 border-0 rounded-lg overflow-hidden"
            style={{ 
              borderColor: 'var(--border)',
              background: 'var(--background)'
            }}
          >
            {fallingWords.map((word) => (
              <div
                key={`${word.id}-${word.positionY}`}
                className="absolute px-3 py-1 bg-primary text-primary-foreground rounded-md shadow-md"
                style={{
                  top: `${word.positionY}px`,
                  left: `${word.positionX}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                {word.term}
              </div>
            ))}

            {!gameStarted && !gameOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <Button 
                  onClick={startGame}
                  size="lg"
                  className="text-lg px-8"
                >
                  Start Game
                </Button>
              </div>
            )}

            {gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm gap-4">
                <h3 className="text-2xl font-semibold">
                  Game Over! Final Score: {score}
                </h3>
                <Button 
                  onClick={startGame}
                  size="lg"
                  className="text-lg px-8"
                >
                  Play Again
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex-shrink-0">
            <Input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Type the translation here..."
              className="w-full"
              disabled={!gameStarted || gameOver}
              autoFocus
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
