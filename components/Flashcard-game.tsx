"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { TextRevealCard } from './ui/text-reveal-card';


interface Word {
    id: number;
    term: string;
    definition: string;
  }
  
  const wordList: Word[] = [
    { id: 1, term: '안녕하세요', definition: 'Hello' },
    { id: 2, term: '감사합니다', definition: 'Terima kasih' },
    { id: 3, term: '사랑해요', definition: 'aku cinta kamu' },
    { id: 4, term: '미안해요', definition: "maaf" },
    { id: 5, term: '잘자요', definition: 'selamat tidur' },
    // Add more words as needed
  ];
  
  export default function FlashcardGame() {
    const [selectedWords, setSelectedWords] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [sessionStarted, setSessionStarted] = useState<boolean>(false);
    const [rememberedWords, setRememberedWords] = useState<number[]>([]);
    const [notRememberedWords, setNotRememberedWords] = useState<number[]>([]);
  
    const handleWordSelection = (id: number) => {
      if (selectedWords.includes(id)) {
        setSelectedWords(selectedWords.filter((wordId) => wordId !== id));
      } else {
        setSelectedWords([...selectedWords, id]);
      }
    };
  
    const startSession = () => {
      if (selectedWords.length > 0) {
        setSessionStarted(true);
        setCurrentIndex(0);
      } else {
        alert('Please select at least one word to study.');
      }
    };
  
    const handleRemembered = () => {
      setRememberedWords([...rememberedWords, selectedWords[currentIndex]]);
      nextCard();
    };
  
    const handleNotRemembered = () => {
      setNotRememberedWords([...notRememberedWords, selectedWords[currentIndex]]);
      nextCard();
    };
  
    const nextCard = () => {
      if (currentIndex < selectedWords.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Session finished
        setSessionStarted(false);
      }
    };
  
    const restartSession = () => {
      setSessionStarted(false);
      setCurrentIndex(0);
      setRememberedWords([]);
      setNotRememberedWords([]);
      setSelectedWords([]);
    };
  
    const currentWord = wordList.find((word) => word.id === selectedWords[currentIndex]);
  
    return (
      <div className="flex flex-col items-center p-4 w-full max-w-2xl mx-auto">
        <Card className="w-full h-[500px] flex flex-col">
          <CardHeader className="flex-shrink-0">
            <h2 className="text-2xl text-center font-bold">Flashcard Game</h2>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-center relative">
            {!sessionStarted ? (
              <div>
                <h3 className="text-xl font-semibold mb-4">Select words to study:</h3>
                <div className="mb-4 max-h-64 overflow-y-auto">
                  {wordList.map((word) => (
                    <div key={word.id} className="flex items-center mb-2">
                      <Checkbox
                        id={`word-${word.id}`}
                        checked={selectedWords.includes(word.id)}
                        onCheckedChange={() => handleWordSelection(word.id)}
                      />
                      <label htmlFor={`word-${word.id}`} className="ml-2">
                        {word.term} - {word.definition}
                      </label>
                    </div>
                  ))}
                </div>
                <Button onClick={startSession} className="text-lg py-2 px-4">
                  Start Session
                </Button>
              </div>
            ) : (
              <div className="text-center flex flex-col items-center justify-center h-full">
                <AnimatePresence mode="wait">
                  {currentWord && (
                    <motion.div
                    >
                      <TextRevealCard
                        text={currentWord.term}
                        revealText={currentWord.definition}
                      />
                      <div className="flex space-x-4 mt-4">
                        <Button onClick={handleRemembered} className="text-lg py-2 px-4">
                          Remembered
                        </Button>
                        <Button
                          onClick={handleNotRemembered}
                          variant="outline"
                          className="text-lg py-2 px-4"
                        >
                          Didn't Remember
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            {!sessionStarted && rememberedWords.length + notRememberedWords.length > 0 && (
              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold mb-2">Session Summary</h3>
                <p>Remembered: {rememberedWords.length}</p>
                <p>Didn't Remember: {notRememberedWords.length}</p>
                <Button onClick={restartSession} className="mt-4 text-lg py-2 px-4">
                  Restart
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }