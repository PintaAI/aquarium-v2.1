"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

interface HangulCharacter {
  character: string;
  pronunciation: string;
}

const hangulCharacters: HangulCharacter[] = [
    { character: 'ㄱ', pronunciation: 'G' },
    { character: 'ㄴ', pronunciation: 'N' },
    { character: 'ㄷ', pronunciation: 'D' },
    { character: 'ㄹ', pronunciation: 'R/L' },
    { character: 'ㅁ', pronunciation: 'M' },
    { character: 'ㅂ', pronunciation: 'B' },
    { character: 'ㅅ', pronunciation: 'S' },
    { character: 'ㅇ', pronunciation: 'Diam/Ng' },
    { character: 'ㅈ', pronunciation: 'J' },
    { character: 'ㅊ', pronunciation: 'Ch' },
    { character: 'ㅋ', pronunciation: 'K' },
    { character: 'ㅌ', pronunciation: 'T' },
    { character: 'ㅍ', pronunciation: 'P' },
    { character: 'ㅎ', pronunciation: 'H' },
    { character: 'ㅏ', pronunciation: 'A' },
    { character: 'ㅑ', pronunciation: 'Ya' },
    { character: 'ㅓ', pronunciation: 'Eo' },
    { character: 'ㅕ', pronunciation: 'Yeo' },
    { character: 'ㅗ', pronunciation: 'O' },
    { character: 'ㅛ', pronunciation: 'Yo' },
    { character: 'ㅜ', pronunciation: 'U' },
    { character: 'ㅠ', pronunciation: 'Yu' },
    { character: 'ㅡ', pronunciation: 'Eu' },
    { character: 'ㅣ', pronunciation: 'I' },
    { character: 'ㅐ', pronunciation: 'Ae' },
    { character: 'ㅔ', pronunciation: 'E' },
    { character: 'ㅒ', pronunciation: 'Yae' },
    { character: 'ㅖ', pronunciation: 'Ye' },
    { character: 'ㅘ', pronunciation: 'Wa' },
    { character: 'ㅙ', pronunciation: 'Wae' },
    { character: 'ㅚ', pronunciation: 'Oe' },
    { character: 'ㅝ', pronunciation: 'Weo' },
    { character: 'ㅞ', pronunciation: 'We' },
    { character: 'ㅟ', pronunciation: 'Wi' },
    { character: 'ㅢ', pronunciation: 'Ui' }
  ];
  

const TOTAL_QUESTIONS = 10;
const TIME_PER_QUESTION = 10; // seconds

export default function HangeulGame() {
  const [currentChar, setCurrentChar] = useState<HangulCharacter | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(TIME_PER_QUESTION);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameOver) {
      handleNextQuestion();
    }
  }, [timeLeft, gameOver]);

  const generateQuestion = () => {
    const randomChar = hangulCharacters[Math.floor(Math.random() * hangulCharacters.length)];
    setCurrentChar(randomChar);

    const tempOptions = new Set<string>();
    tempOptions.add(randomChar.pronunciation);

    while (tempOptions.size < 4) {
      const randomOption = hangulCharacters[Math.floor(Math.random() * hangulCharacters.length)].pronunciation;
      tempOptions.add(randomOption);
    }

    setOptions(shuffleArray(Array.from(tempOptions)));
    setFeedback('');
    setTimeLeft(TIME_PER_QUESTION);
  };

  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleOptionClick = (option: string) => {
    if (option === currentChar?.pronunciation) {
      setFeedback('Benar!');
      setScore(score + 1);
    } else {
      setFeedback(`Salah! jawaban yang benar adalah ${currentChar?.pronunciation}.`);
    }
    setTimeout(handleNextQuestion, 1000);
  };

  const handleNextQuestion = () => {
    if (questionNumber < TOTAL_QUESTIONS) {
      setQuestionNumber(questionNumber + 1);
      generateQuestion();
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setQuestionNumber(1);
    setGameOver(false);
    generateQuestion();
  };

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-2xl mx-auto">
      <Card className="w-full h-[500px] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <h2 className="text-2xl text-center font-bold">한글 러시 | Hangeul Rush</h2>
          {!gameOver && (
            <div className="mt-2">
              <Progress value={(questionNumber / TOTAL_QUESTIONS) * 100} className="w-full" />
              <div className="flex justify-between mt-2">
                <span>Pertanyaan {questionNumber}/{TOTAL_QUESTIONS}</span>
                <span>Waktu tersisa: {timeLeft}dtk</span>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!gameOver ? (
              currentChar && (
                <motion.div
                  key={currentChar.character}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center h-full justify-between"
                >
                  <div className="text-8xl font-bold my-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                    {currentChar.character}
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        variant="outline"
                        className="w-full text-lg py-6 hover:bg-blue-100 transition-colors"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`mt-4 text-center p-2 rounded ${
                        feedback === 'Benar!' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      <p className="text-lg font-semibold">{feedback}</p>
                    </motion.div>
                  )}
                </motion.div>
              )
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center flex flex-col items-center justify-center h-full"
              >
                <h3 className="text-2xl font-bold mb-4">Game Over!</h3>
                <p className="text-xl mb-4">Skor mu adalah: {score}/{TOTAL_QUESTIONS}</p>
                <Button onClick={restartGame} className="text-lg py-2 px-4">
                  Main Lagi !
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          {!gameOver && (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">Score: {score}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
