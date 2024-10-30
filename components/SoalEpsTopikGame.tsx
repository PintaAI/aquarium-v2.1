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
  const [quizCompleted, setQuizCompleted] = useState(false);

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
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption('');
    setShowResult(false);
    setQuizCompleted(false);
    fetchQuestions();
  };

  if (loading || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 border-8 border-secondary rounded-full animate-pulse"></div>
            <div className="absolute inset-0 border-t-8 border-primary rounded-full animate-spin"></div>
          </div>
          <div className="text-xl font-medium">
            Mempersiapkan Soal EPS-TOPIK...
          </div>
          <div className="text-sm text-muted-foreground">
            Mohon tunggu sebentar
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (quizCompleted) {
    const percentage = (score / questions.length) * 100;
    const getFeedback = () => {
      if (percentage === 100) return { message: 'Sempurna! 🎉', color: 'text-green-600' };
      if (percentage >= 80) return { message: 'Sangat Bagus! 🌟', color: 'text-blue-600' };
      if (percentage >= 60) return { message: 'Bagus! 👍', color: 'text-yellow-600' };
      return { message: 'Terus Berlatih! 💪', color: 'text-orange-600' };
    };
    const feedback = getFeedback();

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto w-full">
          <Card className="shadow-lg w-full bg-transparent border-0">
            <CardHeader className="space-y-1 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
                <span className="text-3xl text-primary-foreground">
                  {percentage}%
                </span>
              </div>
              <CardTitle className="text-3xl font-bold">
                Quiz Selesai!
              </CardTitle>
              <CardDescription className="text-xl mt-2">
                Skor Anda: {score}/{questions.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className={`text-center text-xl font-medium ${feedback.color}`}>
                    {feedback.message}
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button 
                    onClick={handleRestartQuiz} 
                    className="w-full sm:w-auto text-lg py-6 px-8"
                  >
                    Coba Lagi
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex w-full items-center justify-center p-4 ">
      <div className="max-w-4xl mx-auto w-full">
        <Card className="shadow-lg w-full">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                EPS-TOPIK Quiz
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">{score}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Soal {currentQuestionIndex + 1}/{questions.length}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Progress value={progress} className="h-2 w-full" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="space-y-8">
              <div className="text-xl font-medium text-center p-6 bg-secondary/20 rounded-lg">
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
                    className={`w-full p-6 text-lg relative transform transition-all ${
                      !showResult && 'hover:scale-[1.02] hover:shadow-md'
                    } ${
                      showResult && option === questions[currentQuestionIndex].answer
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : showResult && selectedOption === option
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : ''
                    }`}
                    disabled={showResult}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              <div className="space-y-4">
                {showResult && (
                  <div className={`text-center text-lg font-medium p-4 rounded-lg ${
                    selectedOption === questions[currentQuestionIndex].answer
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedOption === questions[currentQuestionIndex].answer
                      ? '정답입니다! (Correct!) 🎉'
                      : `틀렸습니다. 정답은 ${questions[currentQuestionIndex].answer}입니다. 😅`}
                  </div>
                )}
                
                <div className="flex justify-center">
                  {!showResult ? (
                    <Button 
                      onClick={handleSubmit}
                      disabled={!selectedOption}
                      className="w-full sm:w-auto text-lg py-6 px-8 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white transform transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      Jawab
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNextQuestion}
                      className="w-full sm:w-auto text-lg py-6 px-8 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white transform transition-all hover:scale-105"
                    >
                      {currentQuestionIndex < questions.length - 1 
                        ? 'Soal Berikutnya →'
                        : 'Lihat Hasil 🎯'}
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
