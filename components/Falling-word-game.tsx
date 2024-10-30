"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

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

const presetWordList: Word[] = [
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
  const [customWords, setCustomWords] = useState<Word[]>([]);
  const [newTerm, setNewTerm] = useState('');
  const [newDefinition, setNewDefinition] = useState('');
  const [isUsingCustomWords, setIsUsingCustomWords] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dictionarySearch, setDictionarySearch] = useState('');
  const [searchResults, setSearchResults] = useState<DictionaryResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const wordList = isUsingCustomWords ? customWords : presetWordList;

  const searchDictionary = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(`/api/korean-dictionary?q=${encodeURIComponent(query)}`);
      const xmlText = await response.text();
      
      // Parse XML response
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      
      // Extract items from XML
      const items = xmlDoc.getElementsByTagName('item');
      const results: DictionaryResult[] = [];
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const term = item.getElementsByTagName('word')[0]?.textContent || '';
        const definition = item.getElementsByTagName('trans_word')[0]?.textContent || '';
        
        if (term && definition) {
          results.push({ term, definition });
        }
      }
      
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching dictionary:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const addCustomWord = () => {
    if (newTerm.trim() && newDefinition.trim()) {
      setCustomWords(prev => [
        ...prev,
        {
          id: Date.now(),
          term: newTerm.trim(),
          definition: newDefinition.trim()
        }
      ]);
      setNewTerm('');
      setNewDefinition('');
    }
  };

  const addFromDictionary = (result: DictionaryResult) => {
    setCustomWords(prev => [
      ...prev,
      {
        id: Date.now(),
        term: result.term,
        definition: result.definition
      }
    ]);
  };

  const removeCustomWord = (id: number) => {
    setCustomWords(prev => prev.filter(word => word.id !== id));
  };

  // Start game
  const startGame = () => {
    if (isUsingCustomWords && customWords.length === 0) {
      return; // Don't start if using custom words but none are added
    }
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimer(120);
    setFallingWords([]);
    setUserInput('');
    setDialogOpen(false);
  };

  // Add new words every 2 seconds
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const addWordInterval = setInterval(() => {
      const unusedWords = wordList.filter(word => 
        !fallingWords.some(falling => falling.id === word.id)
      );
      
      const wordsToAdd = Math.min(3, unusedWords.length);
      
      if (wordsToAdd > 0) {
        const newWords = Array.from({ length: wordsToAdd }, () => {
          const randomWord = unusedWords[Math.floor(Math.random() * unusedWords.length)];
          unusedWords.splice(unusedWords.indexOf(randomWord), 1);
          
          const positionX = Math.floor(Math.random() * (80 - 20 + 1) + 20);
          const speed = Math.random() * (2 - 0.5) + 0.5;
          
          return { ...randomWord, positionX, positionY: 0, speed };
        });

        setFallingWords(prevWords => [...prevWords, ...newWords]);
      }
    }, 2000);

    return () => clearInterval(addWordInterval);
  }, [gameStarted, gameOver, fallingWords, wordList]);

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
          <Progress value={(timer / 120) * 100} className="mt-2" />
        </CardHeader>

        <CardContent className="flex-1 flex flex-col h-full p-4 gap-4">
          <div 
            className="game-area relative flex-shrink-0 h-[50vh] md:flex-1 md:h-auto border-0 rounded-lg overflow-hidden"
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
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm gap-4">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                          onChange={(e) => setDictionarySearch(e.target.value)}
                        />
                        <Button 
                          onClick={() => searchDictionary(dictionarySearch)}
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
                                onClick={() => addFromDictionary(result)}
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
                        <Button onClick={addCustomWord}>Add</Button>
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
                              onClick={() => removeCustomWord(word.id)}
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
                            setIsUsingCustomWords(false);
                            setDialogOpen(false);
                          }}
                        >
                          Use Preset Words
                        </Button>
                        <Button
                          onClick={() => {
                            setIsUsingCustomWords(true);
                            setDialogOpen(false);
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
                  onClick={startGame}
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
                  onClick={startGame}
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
