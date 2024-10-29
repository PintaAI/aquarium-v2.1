"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const questionList: Question[] = [
  {
    id: 1,
    question: '다음 중 한국의 수도는 어디입니까?',
    options: ['서울', '부산', '인천', '대구'],
    answer: '서울'
  },
  {
    id: 2,
    question: '다음 중 "감사합니다"의 의미는 무엇입니까?',
    options: ['안녕하세요', '감사합니다', '사랑해요', '미안해요'],
    answer: '감사합니다'
  },
  {
    id: 3,
    question: '한국 음식 중 발효된 배추로 만든 음식은 무엇입니까?',
    options: ['김치', '불고기', '비빔밥', '떡볶이'],
    answer: '김치'
  },
  {
    id: 4,
    question: '다음 중 한국어로 "사과"는 무엇입니까?',
    options: ['사과', '바나나', '오렌지', '포도'],
    answer: '사과'
  },
  {
    id: 5,
    question: '"미안합니다"의 의미는 무엇입니까?',
    options: ['안녕히 계세요', '감사합니다', '사랑해요', '미안합니다'],
    answer: '미안합니다'
  },
  {
    id: 6,
    question: '"회사"는 무슨 뜻입니까?',
    options: ['학교', '병원', '회사', '가게'],
    answer: '회사'
  },
  {
    id: 7,
    question: '다음 중 한국어로 "아빠"는 무엇입니까?',
    options: ['아빠', '엄마', '할머니', '할아버지'],
    answer: '아빠'
  },
  {
    id: 8,
    question: '한국의 전통 의상은 무엇입니까?',
    options: ['한복', '기모노', '청바지', '치마'],
    answer: '한복'
  },
  {
    id: 9,
    question: '"물"의 뜻은 무엇입니까?',
    options: ['불', '물', '바람', '흙'],
    answer: '물'
  },
  {
    id: 10,
    question: '다음 중 "책"의 의미는 무엇입니까?',
    options: ['연필', '책', '의자', '책상'],
    answer: '책'
  },
];


export default function SoalEpsTopikGame() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (!showResult) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    const currentQuestion = questionList[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption('');
    setShowResult(false);
    if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Quiz completed! Your score: ${score}/${questionList.length}`);
      setCurrentQuestionIndex(0);
      setScore(0);
    }
  };

  const progress = ((currentQuestionIndex + 1) / questionList.length) * 100;

  return (
    <div className="min-h-screen flex w-full items-center justify-center p-4">
      <div className="max-w-4xl mx-auto w-full">
        <Card className="shadow-lg w-full">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">EPS-TOPIK Quiz</CardTitle>
              <div className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {questionList.length}
              </div>
            </div>
            <Progress value={progress} className="w-full" />
            <CardDescription>
              Score: {score}/{questionList.length}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="space-y-8">
              <div className="text-lg font-medium text-center">
                {questionList[currentQuestionIndex].question}
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {questionList[currentQuestionIndex].options.map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    variant={showResult 
                      ? option === questionList[currentQuestionIndex].answer 
                        ? "default"
                        : selectedOption === option 
                          ? "destructive"
                          : "outline"
                      : selectedOption === option
                        ? "default"
                        : "outline"
                    }
                    className="w-full p-4 text-lg relative"
                    disabled={showResult}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              <div className="space-y-4">
                {showResult && (
                  <div className={`text-center text-lg font-medium ${
                    selectedOption === questionList[currentQuestionIndex].answer
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    {selectedOption === questionList[currentQuestionIndex].answer
                      ? '정답입니다! (Correct!)'
                      : `틀렸습니다. 정답은 ${questionList[currentQuestionIndex].answer}입니다.`}
                  </div>
                )}
                
                <div className="flex justify-center">
                  {!showResult ? (
                    <Button 
                      onClick={handleSubmit}
                      disabled={!selectedOption}
                      className="w-full sm:w-auto"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNextQuestion}
                      className="w-full sm:w-auto"
                    >
                      {currentQuestionIndex < questionList.length - 1 
                        ? 'Next Question' 
                        : 'Restart Quiz'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
