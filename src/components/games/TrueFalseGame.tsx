
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "../ui/GlassCard";
import { toast } from "sonner";
import { Coins, Trophy, RefreshCw, Lightbulb, Check, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { saveGameResult, calculateTokensEarned } from "@/services/gameService";

// True/False statements
const statements = [
  {
    statement: "The Great Wall of China is visible from space with the naked eye.",
    isTrue: false,
    explanation: "It's a common myth, but the Great Wall is barely visible even from low Earth orbit, and impossible to see with the naked eye from the Moon."
  },
  {
    statement: "Mount Everest is the tallest mountain in the world.",
    isTrue: true,
    explanation: "Mount Everest is the tallest mountain above sea level at 29,032 feet (8,849 meters)."
  },
  {
    statement: "A group of flamingos is called a flamboyance.",
    isTrue: true,
    explanation: "Yes, a group of flamingos is indeed called a flamboyance."
  },
  {
    statement: "The language with the most native speakers in the world is English.",
    isTrue: false,
    explanation: "Mandarin Chinese has the most native speakers in the world, not English."
  },
  {
    statement: "Humans share 50% of their DNA with bananas.",
    isTrue: true,
    explanation: "Humans actually share about 60% of their DNA with bananas due to our common evolutionary ancestry."
  },
  {
    statement: "Lightning never strikes the same place twice.",
    isTrue: false,
    explanation: "Lightning can and often does strike the same place multiple times. The Empire State Building is struck about 25 times per year."
  },
  {
    statement: "Goldfish have a memory span of only three seconds.",
    isTrue: false,
    explanation: "Goldfish can actually remember things for months, not just seconds. They can be trained to respond to certain sounds."
  },
  {
    statement: "An octopus has three hearts.",
    isTrue: true,
    explanation: "Octopuses have three hearts: two pump blood through the gills, while the third pumps blood through the body."
  },
  {
    statement: "A day on Venus is longer than a year on Venus.",
    isTrue: true,
    explanation: "Venus rotates very slowly, taking 243 Earth days to complete one rotation, while it orbits the Sun in only 225 Earth days."
  },
  {
    statement: "Albert Einstein failed math as a student.",
    isTrue: false,
    explanation: "Einstein actually excelled in mathematics and physics from a young age, contrary to popular belief."
  },
  {
    statement: "The Sahara Desert is the largest desert in the world.",
    isTrue: false,
    explanation: "Antarctica is actually the largest desert in the world. A desert is defined by its low precipitation, not its temperature."
  },
  {
    statement: "Blood in your veins is blue until exposed to oxygen.",
    isTrue: false,
    explanation: "Blood is always red. Deoxygenated blood is a darker red, but never blue. Veins appear blue due to how light penetrates skin."
  },
  {
    statement: "The Great Barrier Reef is the largest living structure on Earth.",
    isTrue: true,
    explanation: "The Great Barrier Reef is the world's largest coral reef system and the largest living structure on Earth, visible from space."
  },
  {
    statement: "Bats are blind.",
    isTrue: false,
    explanation: "Bats can actually see quite well. Most bat species have well-developed eyes and use vision along with echolocation."
  },
  {
    statement: "The Eiffel Tower can be 15 cm taller during the summer.",
    isTrue: true,
    explanation: "The iron in the Eiffel Tower expands in the heat, making it grow taller in summer and shrink in winter."
  }
];

export const TrueFalseGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [earnedTokens, setEarnedTokens] = useState(0);
  const [isSaving, setSaving] = useState(false);
  const [gameStatements, setGameStatements] = useState<typeof statements>([]);
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
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setEarnedTokens(0);
    setSaving(false);
    
    // Select random statements (8 per game)
    const randomStatements = shuffleArray(statements).slice(0, 8);
    setGameStatements(randomStatements);
  };
  
  // Start game
  const startGame = () => {
    resetGame();
    setGameStarted(true);
  };
  
  // Handle answer selection
  const handleAnswer = (answer: boolean) => {
    if (showExplanation) return;
    
    setSelectedAnswer(answer);
    const currentStatement = gameStatements[currentIndex];
    
    if (answer === currentStatement.isTrue) {
      setScore(prevScore => prevScore + 1);
      toast.success("Correct! +1 point", { duration: 2000 });
    } else {
      toast.error("Incorrect!", { duration: 2000 });
    }
    
    setShowExplanation(true);
    
    // Move to next question after showing explanation
    setTimeout(() => {
      setShowExplanation(false);
      setSelectedAnswer(null);
      
      if (currentIndex < gameStatements.length - 1) {
        setCurrentIndex(prevIndex => prevIndex + 1);
      } else {
        endGame();
      }
    }, 3000);
  };
  
  // End the game
  const endGame = () => {
    setGameOver(true);
    const tokens = calculateTokensEarned("True or False", score);
    setEarnedTokens(tokens);
    toast.success(`Game Over! You earned ${tokens} TQT tokens!`, {
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
      const tokens = calculateTokensEarned("True or False", score);
      await saveGameResult(user.id, "True or False", score, tokens);
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
            <h3 className="font-bold text-lg">True or False</h3>
            <p className="text-sm text-muted-foreground">Test your knowledge of facts</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Score</div>
              <div className="font-bold text-lg">{score}/{gameStatements.length}</div>
            </div>
            
            <div>
              <div className="text-xs text-muted-foreground mb-1">Question</div>
              <div className="font-bold text-lg">{gameStarted ? `${currentIndex + 1}/${gameStatements.length}` : '-'}</div>
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
              <Lightbulb className="w-12 h-12 text-token-blue mb-2 mx-auto" />
              <h3 className="text-xl font-bold mb-2">True or False</h3>
              <p className="text-muted-foreground max-w-xs">
                Test your knowledge by determining if statements are true or false, and earn tokens for correct answers!
              </p>
            </div>
            <Button onClick={startGame} className="rounded-full">Start Game</Button>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Game Over!</h3>
              <p className="text-lg mb-1">Your score: <span className="font-bold">{score}/{gameStatements.length}</span></p>
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
        
        {gameStarted && !gameOver && gameStatements.length > 0 && (
          <div className="p-6">
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-6 text-center">{gameStatements[currentIndex].statement}</h3>
              
              <div className="flex justify-center gap-4 mb-6">
                <Button
                  variant="outline"
                  className={`py-6 px-8 ${
                    selectedAnswer === true 
                      ? gameStatements[currentIndex].isTrue 
                        ? "bg-green-500 hover:bg-green-500 text-white" 
                        : "bg-red-500 hover:bg-red-500 text-white" 
                      : ""
                  }`}
                  onClick={() => handleAnswer(true)}
                  disabled={showExplanation}
                >
                  <Check className="w-6 h-6 mr-2" />
                  True
                </Button>
                
                <Button
                  variant="outline"
                  className={`py-6 px-8 ${
                    selectedAnswer === false 
                      ? !gameStatements[currentIndex].isTrue 
                        ? "bg-green-500 hover:bg-green-500 text-white" 
                        : "bg-red-500 hover:bg-red-500 text-white" 
                      : ""
                  }`}
                  onClick={() => handleAnswer(false)}
                  disabled={showExplanation}
                >
                  <X className="w-6 h-6 mr-2" />
                  False
                </Button>
              </div>
              
              {showExplanation && (
                <div className={`p-4 rounded-lg ${
                  selectedAnswer === gameStatements[currentIndex].isTrue 
                    ? "bg-green-500/10 border border-green-500/30" 
                    : "bg-red-500/10 border border-red-500/30"
                }`}>
                  <p className="text-sm">
                    <span className="font-medium">
                      {gameStatements[currentIndex].isTrue ? "TRUE: " : "FALSE: "}
                    </span>
                    {gameStatements[currentIndex].explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Game info */}
      <GlassCard className="p-4">
        <h4 className="font-medium mb-2">Game Rules</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Determine if each statement is true or false</li>
          <li>• Each correct answer earns you 1 point</li>
          <li>• Learn interesting facts from the explanations</li>
          <li>• Earn 4 TQT tokens for each correct answer</li>
          <li>• Statements are randomly selected each game</li>
        </ul>
      </GlassCard>
    </div>
  );
};
