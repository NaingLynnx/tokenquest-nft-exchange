
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Gamepad2, Users, Trophy, Clock, Star, ArrowRight } from "lucide-react";

export const GameShowcase = () => {
  const [activeGame, setActiveGame] = useState(0);
  
  const games = [
    {
      title: "Crypto Racer",
      description: "Race against other players in this fast-paced blockchain racing game.",
      image: "bg-gradient-to-br from-purple-500 to-blue-600",
      players: "2,345",
      rewards: "Up to 50 TQT",
      difficulty: 4,
      duration: "5-10 min",
    },
    {
      title: "Token Blast",
      description: "Blast through puzzles to mine tokens in this addictive puzzle game.",
      image: "bg-gradient-to-br from-green-500 to-emerald-600",
      players: "1,892",
      rewards: "Up to 30 TQT",
      difficulty: 3,
      duration: "3-5 min",
    },
    {
      title: "NFT Defenders",
      description: "Protect your NFT collection in this strategic tower defense game.",
      image: "bg-gradient-to-br from-orange-500 to-red-600",
      players: "3,210",
      rewards: "Up to 45 TQT",
      difficulty: 5,
      duration: "10-15 min",
    },
  ];

  return (
    <section className="py-20 px-6 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(0,113,227,0.1),rgba(255,255,255,0))]"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <GlassCard 
            variant="light" 
            className="inline-flex items-center gap-2 py-1 px-3 mb-6"
            hoverEffect={false}
          >
            <Gamepad2 className="w-4 h-4 text-token-blue" />
            <span className="text-xs font-medium">PLAY TO EARN</span>
          </GlassCard>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Exciting Games with Real Rewards
          </h2>
          
          <p className="text-muted-foreground">
            Play our collection of engaging mini-games to test your skills and earn
            TokenQuest coins that have real value in our ecosystem.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              {games.map((game, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer transition-all duration-300 ${activeGame === index ? 'scale-[1.02]' : 'opacity-80 hover:opacity-100'}`}
                  onClick={() => setActiveGame(index)}
                >
                  <GlassCard 
                    variant={activeGame === index ? "light" : "default"}
                    className={`p-6 ${activeGame === index ? 'border-token-blue/30 shadow-lg' : ''}`}
                  >
                    <div className="flex gap-4">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${game.image}`}>
                        <Gamepad2 className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-lg mb-1">{game.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          {game.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-muted-foreground" />
                            <span>{game.players} Players</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Trophy className="w-3 h-3 text-muted-foreground" />
                            <span>{game.rewards}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span>{game.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${i < game.difficulty ? 'text-token-blue' : 'text-muted'}`}
                                  fill={i < game.difficulty ? 'currentColor' : 'none'}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              ))}
              
              <div className="pt-4 flex justify-center lg:justify-start">
                <Button asChild className="rounded-full">
                  <Link to="/games">
                    Explore All Games
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative max-w-md mx-auto lg:mr-0">
              <div className="absolute inset-0 bg-gradient-to-r from-token-blue/20 to-transparent rounded-3xl blur-3xl opacity-30 -z-10 transform rotate-6"></div>
              
              <div className="bg-gradient-to-br from-[#fafafa] to-[#f5f5f7] dark:from-[#1a1a1a] dark:to-[#0d0d0d] rounded-3xl shadow-lg border border-muted p-1">
                <div className="rounded-2xl overflow-hidden">
                  <div className={`aspect-[4/3] ${games[activeGame].image} relative p-6`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex justify-between items-start">
                        <h3 className="text-white text-xl font-bold">{games[activeGame].title}</h3>
                        <GlassCard className="px-2 py-1 text-xs text-white font-medium">
                          Featured Game
                        </GlassCard>
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                          <Gamepad2 className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-white/80 text-sm">
                        <div>Reward: {games[activeGame].rewards}</div>
                        <div>{games[activeGame].duration}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="font-medium mb-4">Game Mechanics</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-token-blue/20 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-token-blue"></div>
                        </div>
                        <span>Connect your wallet to track your earnings</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-token-blue/20 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-token-blue"></div>
                        </div>
                        <span>Complete levels to earn token rewards</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-token-blue/20 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-token-blue"></div>
                        </div>
                        <span>Compete in tournaments for bonus rewards</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-token-blue/20 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-token-blue"></div>
                        </div>
                        <span>Earn special NFTs for high scores</span>
                      </li>
                    </ul>
                    
                    <div className="mt-6">
                      <Button className="w-full rounded-full">Play Now</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
