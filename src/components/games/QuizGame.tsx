
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "../ui/GlassCard";
import { toast } from "sonner";
import { Coins, Trophy, RefreshCw, BookOpen, Brain } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { saveGameResult, calculateTokensEarned } from "@/services/gameService";

// General knowledge questions for the quiz
const quizQuestions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    correctAnswer: "Mars"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    question: "Which of these is not a primary color?",
    options: ["Red", "Blue", "Green", "Yellow"],
    correctAnswer: "Green"
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare"
  },
  {
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: "Canberra"
  },
  {
    question: "What element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Iron", "Osmium"],
    correctAnswer: "Oxygen"
  },
  {
    question: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "6"
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Thailand", "Japan", "South Korea"],
    correctAnswer: "Japan"
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correctAnswer: "Diamond"
  },
  {
    question: "Which scientist proposed the theory of relativity?",
    options: ["Isaac Newton", "Galileo Galilei", "Albert Einstein", "Stephen Hawking"],
    correctAnswer: "Albert Einstein"
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: "2"
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    options: ["Tiger", "Lion", "Elephant", "Gorilla"],
    correctAnswer: "Lion"
  },
  {
    question: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctAnswer: "Saturn"
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Brain", "Skin"],
    correctAnswer: "Skin"
  }
];

export const QuizGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [earnedTokens, setEarnedTokens] = useState(0);
  const [isSaving, setSaving] = useState(false);
  const [gameQuestions, setGameQuestions] = useState<typeof quizQuestions>([]);
  const { user } = useAuth();
  
  // Function to shuffle array (Fisher-Yates algorithm)
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  // Reset game state
  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setEarnedTokens(0);
    setSaving(false);
    
    // Select random questions (8 questions per game)
    const randomQuestions = shuffleArray(quizQuestions).slice(0, 8);
    setGameQuestions(randomQuestions);
  };
  
  // Start game
  const startGame = () => {
    resetGame();
    setGameStarted(true);
  };
  
  // Handle answer selection
  const handleAnswerSelect = (option: string) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    const currentQuestion = gameQuestions[currentQuestionIndex];
    if (option === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
      toast.success("Correct! +1 point", { duration: 1500 });
    } else {
      toast.error(`Incorrect. The correct answer is ${currentQuestion.correctAnswer}`, { duration: 1500 });
    }
    
    // Move to next question after 1.5 seconds
    setTimeout(() => {
      setIsAnswered(false);
      setSelectedOption(null);
      
      if (currentQuestionIndex < gameQuestions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        endGame();
      }
    }, 1500);
  };
  
  // End the game
  const endGame = () => {
    setGameOver(true);
    const tokens = calculateTokensEarned("Knowledge Quiz", score);
    setEarnedTokens(tokens);
    toast.success(`Quiz Complete! You earned ${tokens} TQT tokens!`, {
      duration: 3000,
    });
  };
  
  // Save game result to database
  const saveGameScore = async () => {
    if (!user) {
      toast.error("Please log in to save your score", {
        description: "Create an account to track your progress"
      });
      return;
    }
    
    try {
      setSaving(true);
      const tokens = calculateTokensEarned("Knowledge Quiz", score);
      await saveGameResult(user.id, "Knowledge Quiz", score, tokens);
      toast.success("Score saved successfully!", {
        description: `${tokens} tokens added to your account`
      });
    } catch (error) {
      console.error("Error saving game result:", error);
      toast.error("Failed to save score", {
        description: "Please try again"
      });
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <div className="flex flex-col">
      {/* Game header */}
      <GlassCard className="mb-6 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">Knowledge Quiz</h3>
            <p className="text-sm text-muted-foreground">Test your general knowledge</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Score</div>
              <div className="font-bold text-lg">{score}/{gameQuestions.length}</div>
            </div>
            
            <div>
              <div className="text-xs text-muted-foreground mb-1">Question</div>
              <div className="font-bold text-lg">{gameStarted ? `${currentQuestionIndex + 1}/${gameQuestions.length}` : '-'}</div>
            </div>
          </div>
        </div>
      </GlassCard>
      
      {/* Game area */}
      <div 
        className="relative w-full bg-muted/30 rounded-xl overflow-hidden mb-6"
        style={{ minHeight: "300px" }}
      >
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm p-6">
            <div className="mb-6 text-center">
              <BookOpen className="w-12 h-12 text-token-blue mb-2 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Knowledge Quiz</h3>
              <p className="text-muted-foreground max-w-xs">
                Test your general knowledge with these questions and earn tokens for each correct answer!
              </p>
            </div>
            <Button onClick={startGame} className="rounded-full">Start Quiz</Button>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
              <p className="text-lg mb-1">Your score: <span className="font-bold">{score}/{gameQuestions.length}</span></p>
              <div className="flex items-center justify-center gap-2 text-token-blue">
                <Coins className="w-5 h-5" />
                <span className="font-bold text-xl">{earnedTokens} TQT</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">earned in rewards</p>
            </div>
            <div className="flex gap-4">
              <Button onClick={startGame} className="rounded-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full"
                onClick={saveGameScore}
                disabled={isSaving || !user}
              >
                {isSaving ? 'Saving...' : 'Claim Tokens'}
              </Button>
            </div>
            {!user && (
              <p className="text-sm text-muted-foreground mt-4">
                <a href="/login" className="text-token-blue hover:underline">Log in</a> or <a href="/signup" className="text-token-blue hover:underline">sign up</a> to save your tokens!
              </p>
            )}
          </div>
        )}
        
        {gameStarted && !gameOver && gameQuestions.length > 0 && (
          <div className="p-6">
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">{gameQuestions[currentQuestionIndex].question}</h3>
              
              <div className="grid grid-cols-1 gap-3">
                {gameQuestions[currentQuestionIndex].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedOption === option 
                      ? option === gameQuestions[currentQuestionIndex].correctAnswer 
                        ? "default" 
                        : "destructive" 
                      : isAnswered && option === gameQuestions[currentQuestionIndex].correctAnswer 
                        ? "default" 
                        : "outline"
                    }
                    className={`justify-start text-left py-4 px-4 ${
                      isAnswered ? 'cursor-default' : 'cursor-pointer'
                    } ${
                      selectedOption === option 
                        ? option === gameQuestions[currentQuestionIndex].correctAnswer 
                          ? "bg-green-500 hover:bg-green-500 text-white" 
                          : "bg-red-500 hover:bg-red-500 text-white" 
                        : isAnswered && option === gameQuestions[currentQuestionIndex].correctAnswer 
                          ? "bg-green-500 hover:bg-green-500 text-white" 
                          : ""
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={isAnswered}
                  >
                    <div className="w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center mr-3 flex-shrink-0">
                      {String.fromCharCode(65 + index)}
                    </div>
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Game info */}
      <GlassCard className="p-4">
        <h4 className="font-medium mb-2">Quiz Rules</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Answer the general knowledge questions</li>
          <li>• Each correct answer earns you 1 point</li>
          <li>• Complete all questions to finish the quiz</li>
          <li>• Earn 5 TQT tokens for each correct answer</li>
          <li>• Questions are randomly selected each game</li>
        </ul>
      </GlassCard>
    </div>
  );
};
