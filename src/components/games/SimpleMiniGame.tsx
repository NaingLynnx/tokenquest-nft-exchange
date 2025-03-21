
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "../ui/GlassCard";
import { toast } from "@/components/ui/sonner";
import { Coins, Trophy, RefreshCw } from "lucide-react";

export const SimpleMiniGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [earnedTokens, setEarnedTokens] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  
  // Reset game state
  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setTimeLeft(20);
    setEarnedTokens(0);
  };
  
  // Start game
  const startGame = () => {
    resetGame();
    setGameStarted(true);
    moveTarget();
  };
  
  // Move target to random position
  const moveTarget = () => {
    if (!gameAreaRef.current) return;
    
    const gameArea = gameAreaRef.current;
    const gameAreaWidth = gameArea.clientWidth;
    const gameAreaHeight = gameArea.clientHeight;
    
    const targetWidth = 50; // Target size
    const targetHeight = 50;
    
    // Random position within game area boundaries
    const x = Math.floor(Math.random() * (gameAreaWidth - targetWidth));
    const y = Math.floor(Math.random() * (gameAreaHeight - targetHeight));
    
    setTargetPosition({ x, y });
  };
  
  // Handle target click
  const handleTargetClick = () => {
    if (gameOver) return;
    
    // Increase score
    setScore((prevScore) => prevScore + 1);
    
    // Move target to new position
    moveTarget();
    
    // Visual feedback
    toast("Target hit! +1 point", {
      duration: 1000,
    });
  };
  
  // Calculate earned tokens based on score
  const calculateTokens = (score: number) => {
    // Simple formula: 2 tokens per point
    return score * 2;
  };
  
  // Game timer
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setGameOver(true);
          const tokens = calculateTokens(score);
          setEarnedTokens(tokens);
          toast.success(`Game Over! You earned ${tokens} TQT tokens!`, {
            duration: 5000,
          });
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameStarted, gameOver, score]);
  
  return (
    <div className="flex flex-col">
      {/* Game header */}
      <GlassCard className="mb-6 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">Token Clicker</h3>
            <p className="text-sm text-muted-foreground">Click targets to earn tokens</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Score</div>
              <div className="font-bold text-lg">{score}</div>
            </div>
            
            <div>
              <div className="text-xs text-muted-foreground mb-1">Time</div>
              <div className="font-bold text-lg">{timeLeft}s</div>
            </div>
          </div>
        </div>
      </GlassCard>
      
      {/* Game area */}
      <div 
        ref={gameAreaRef}
        className="relative w-full bg-muted/30 rounded-xl overflow-hidden mb-6"
        style={{ height: "300px" }}
      >
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="mb-4">
              <Trophy className="w-12 h-12 text-token-blue mb-2 mx-auto" />
              <h3 className="text-xl font-bold mb-2 text-center">Token Clicker</h3>
              <p className="text-muted-foreground text-center max-w-xs">
                Click on the targets as fast as you can to earn TokenQuest coins!
              </p>
            </div>
            <Button onClick={startGame} className="rounded-full">Start Game</Button>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Game Over!</h3>
              <p className="text-lg mb-1">Your score: <span className="font-bold">{score}</span></p>
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
              <Button variant="outline" className="rounded-full">Claim Tokens</Button>
            </div>
          </div>
        )}
        
        {gameStarted && !gameOver && (
          <div
            className="absolute w-12 h-12 bg-token-blue rounded-full flex items-center justify-center cursor-pointer animate-pulse-subtle"
            style={{
              left: `${targetPosition.x}px`,
              top: `${targetPosition.y}px`,
              transition: "opacity 0.1s",
            }}
            onClick={handleTargetClick}
          >
            <Coins className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
      
      {/* Game info */}
      <GlassCard className="p-4">
        <h4 className="font-medium mb-2">Game Rules</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Click on the blue tokens as they appear</li>
          <li>• Each hit earns you 1 point</li>
          <li>• You have 20 seconds to score as many points as possible</li>
          <li>• Earn 2 TQT tokens for each point scored</li>
        </ul>
      </GlassCard>
    </div>
  );
};
