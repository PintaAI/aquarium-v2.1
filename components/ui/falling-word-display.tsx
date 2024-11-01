"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Word {
  id: number;
  term: string;
  definition: string;
}

interface WordWithPosition extends Word {
  positionX: number;
  positionY: number;
  speed: number;
}

interface DictionaryResult {
  term: string;
  definition: string;
}

interface FallingWordDisplayProps {
  fallingWords: WordWithPosition[];
  userInput: string;
  timer: number;
  gameOver: boolean;
  score: number;
  gameStarted: boolean;
  customWords: Word[];
  isUsingCustomWords: boolean;
  dialogOpen: boolean;
  dictionarySearch: string;
  searchResults: DictionaryResult[];
  isSearching: boolean;
  onInputChange: (value: string) => void;
  onStart: () => void;
  onDialogOpenChange: (open: boolean) => void;
  onDictionarySearch: (query: string) => void;
  onDictionarySearchChange: (value: string) => void;
  onAddCustomWord: (term: string, definition: string) => void;
  onAddFromDictionary: (result: DictionaryResult) => void;
  onRemoveCustomWord: (id: number) => void;
  onUseCustomWords: (use: boolean) => void;
  onSetGameAreaHeight: (height: number) => void;
}

export function FallingWordDisplay({
  fallingWords,
  userInput,
  timer,
  gameOver,
  score,
  gameStarted,
  customWords,
  isUsingCustomWords,
  dialogOpen,
  dictionarySearch,
  searchResults,
  isSearching,
  onInputChange,
  onStart,
  onDialogOpenChange,
  onDictionarySearch,
  onDictionarySearchChange,
  onAddCustomWord,
  onAddFromDictionary,
  onRemoveCustomWord,
  onUseCustomWords,
  onSetGameAreaHeight,
}: FallingWordDisplayProps) {
  const [newTerm, setNewTerm] = useState('');
  const [newDefinition, setNewDefinition] = useState('');
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const handleAddCustomWord = () => {
    onAddCustomWord(newTerm, newDefinition);
    setNewTerm('');
    setNewDefinition('');
  };

  // Update game area height when component mounts or window resizes
  useEffect(() => {
    const updateGameAreaHeight = () => {
      if (gameAreaRef.current) {
        onSetGameAreaHeight(gameAreaRef.current.clientHeight);
      }
    };

    updateGameAreaHeight();
    window.addEventListener('resize', updateGameAreaHeight);

    return () => {
      window.removeEventListener('resize', updateGameAreaHeight);
    };
  }, [onSetGameAreaHeight]);

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] w-full max-w-2xl mx-auto">
      <Card className="w-full h-full flex flex-col">
        <CardHeader className="flex-shrink-0 p-1">
          <div className="flex justify-between items-center">
            <h2 className=" text-sm md:text-2xl font-bold">Tangkap Kosa Kata</h2>
            <div className="flex gap-4">
              <span className="md:font-medium text-sm">Score: {score}</span>
              <span className="md:font-medium text-sm">Time: {timer}s</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col h-full m:p-4 p-0 gap-4">
          <div 
            ref={gameAreaRef}
            className="game-area relative flex-shrink-0 h-[50vh] md:flex-1 md:h-auto border-2 rounded-lg overflow-hidden"
            style={{ 
              borderColor: 'var(--border)',
              background: 'var(--background)'
            }}
          >
            {/* Ground line */}
            <div 
              className="absolute w-full border-t-2 border-destructive"
              style={{ 
                bottom: '50px',
                left: 0,
                right: 0
              }}
            />
            
            {/* Ground zone indicator */}
            <div 
              className="absolute w-full bg-destructive/10"
              style={{ 
                bottom: 0,
                left: 0,
                right: 0,
                height: '50px'
              }}
            />

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
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm gap-4">
                <Dialog open={dialogOpen} onOpenChange={onDialogOpenChange}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mb-4">
                      {isUsingCustomWords ? 'Edit Kosa-kata' : 'Pilih Kosa-kata'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Tambahkan dan Cari kosakata</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                      {/* Dictionary Search */}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Search Korean Dictionary..."
                          value={dictionarySearch}
                          onChange={(e) => onDictionarySearchChange(e.target.value)}
                        />
                        <Button 
                          onClick={() => onDictionarySearch(dictionarySearch)}
                          disabled={isSearching}
                        >
                          {isSearching ? 'Searching...' : 'Search'}
                        </Button>
                      </div>

                      {/* Dictionary Results */}
                      {searchResults.length > 0 && (
                        <div className="space-y-2 border rounded p-2">
                          <h3 className="font-semibold">Dictionary Results:</h3>
                          {searchResults.map((result, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 border rounded">
                              <span className="flex-1">{result.term}</span>
                              <span className="flex-1">{result.definition}</span>
                              <Button
                                size="sm"
                                onClick={() => onAddFromDictionary(result)}
                              >
                                Add
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Manual Word Addition */}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Term (e.g., 안녕하세요)"
                          value={newTerm}
                          onChange={(e) => setNewTerm(e.target.value)}
                        />
                        <Input
                          placeholder="Definition (e.g., hello)"
                          value={newDefinition}
                          onChange={(e) => setNewDefinition(e.target.value)}
                        />
                        <Button onClick={handleAddCustomWord}>Add</Button>
                      </div>

                      {/* Custom Words List */}
                      <div className="space-y-2">
                        <h3 className="font-semibold">Your Custom Words:</h3>
                        {customWords.map((word) => (
                          <div key={word.id} className="flex items-center gap-2 p-2 border rounded">
                            <span className="flex-1">{word.term}</span>
                            <span className="flex-1">{word.definition}</span>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => onRemoveCustomWord(word.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between mt-4">
                        <Button
                          variant="outline"
                          onClick={() => {
                            onUseCustomWords(false);
                            onDialogOpenChange(false);
                          }}
                        >
                          Use Preset Words
                        </Button>
                        <Button
                          onClick={() => {
                            onUseCustomWords(true);
                            onDialogOpenChange(false);
                          }}
                          disabled={customWords.length === 0}
                        >
                          Done
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  onClick={onStart}
                  size="lg"
                  className="text-lg px-8"
                  disabled={isUsingCustomWords && customWords.length === 0}
                >
                  Start Game
                </Button>
              </div>
            )}

            {gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm gap-4">
                <h3 className="text-2xl font-semibold">
                  Game Selesai! Score: {score}
                </h3>
                <Button 
                  onClick={onStart}
                  size="lg"
                  className="text-lg px-8"
                  disabled={isUsingCustomWords && customWords.length === 0}
                >
                  Main Lagi?
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex-shrink-0">
            <Input
              type="text"
              value={userInput}
              onChange={(e) => onInputChange(e.target.value)}
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
