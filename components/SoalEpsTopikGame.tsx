'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

interface QuestionsResponse {
  questions: Question[];
}

export default function SoalEpsTopikGame() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/generate-questions', {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data: QuestionsResponse = await response.json();
      setQuestions(data.questions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    if (!showResult) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption('');
    setShowResult(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Quiz completed! Your score: ${score}/${questions.length}`);
      // Reset game
      setCurrentQuestionIndex(0);
      setScore(0);
      fetchQuestions(); // Get new questions for next round
    }
  };

  if (loading || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading questions...</div>
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex w-full items-center justify-center p-4">
      <div className="max-w-4xl mx-auto w-full">
        <Card className="shadow-lg w-full">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">EPS-TOPIK Quiz</CardTitle>
              <div className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>
            <Progress value={progress} className="w-full" />
            <CardDescription>
              Score: {score}/{questions.length}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="space-y-8">
              <div className="text-lg font-medium text-center">
                {questions[currentQuestionIndex]?.question}
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {questions[currentQuestionIndex]?.options.map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    variant={showResult 
                      ? option === questions[currentQuestionIndex].answer 
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
                    selectedOption === questions[currentQuestionIndex].answer
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    {selectedOption === questions[currentQuestionIndex].answer
                      ? '정답입니다! (Correct!)'
                      : `틀렸습니다. 정답은 ${questions[currentQuestionIndex].answer}입니다.`}
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
                      {currentQuestionIndex < questions.length - 1 
                        ? 'Next Question' 
                        : 'Start New Quiz'}
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
