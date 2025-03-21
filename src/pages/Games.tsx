
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SimpleMiniGame } from "@/components/games/SimpleMiniGame";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Gamepad2, Trophy, ArrowLeft, ArrowRight, Users, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Games = () => {
  const games = [
    {
      title: "Crypto Racer",
      description: "Race against other players in this fast-paced blockchain racing game.",
      image: "bg-gradient-to-br from-purple-500 to-blue-600",
      status: "Coming Soon",
      players: "2,345",
      rewards: "Up to 50 TQT",
      difficulty: 4,
    },
    {
      title: "Token Blast",
      description: "Blast through puzzles to mine tokens in this addictive puzzle game.",
      image: "bg-gradient-to-br from-green-500 to-emerald-600",
      status: "Coming Soon",
      players: "1,892",
      rewards: "Up to 30 TQT",
      difficulty: 3,
    },
    {
      title: "NFT Defenders",
      description: "Protect your NFT collection in this strategic tower defense game.",
      image: "bg-gradient-to-br from-orange-500 to-red-600",
      status: "Coming Soon",
      players: "3,210",
      rewards: "Up to 45 TQT",
      difficulty: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Games</h1>
              <p className="text-muted-foreground">
                Play mini-games to earn TokenQuest coins and compete in tournaments.
              </p>
            </div>
            
            <GlassCard className="p-2 flex items-center gap-2">
              <div className="text-xs text-muted-foreground">Your Token Balance:</div>
              <div className="text-sm font-medium">0 TQT</div>
            </GlassCard>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <GlassCard className="p-6 h-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Featured Game</h2>
                  <GlassCard 
                    variant="light" 
                    className="text-xs font-medium py-1 px-3 bg-token-blue/10"
                    hoverEffect={false}
                  >
                    Play Now
                  </GlassCard>
                </div>
                
                <SimpleMiniGame />
              </GlassCard>
            </div>
            
            <div className="lg:col-span-1">
              <GlassCard className="p-6 h-full">
                <h2 className="text-xl font-bold mb-6">Tournament</h2>
                
                <div className="bg-gradient-to-br from-token-blue to-purple-600 rounded-xl p-6 text-white mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold">Weekly Challenge</h3>
                    <Trophy className="w-5 h-5" />
                  </div>
                  
                  <p className="text-white/80 text-sm mb-4">
                    Compete against other players for the highest score and win premium rewards.
                  </p>
                  
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Time Remaining</span>
                    <span className="font-medium">2d 18h 45m</span>
                  </div>
                  
                  <div className="bg-white/20 rounded-full h-2 mb-6">
                    <div className="bg-white rounded-full h-2 w-2/5"></div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Prize Pool</span>
                      <span className="font-medium">5,000 TQT</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Entries</span>
                      <span className="font-medium">342 Players</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Your Rank</span>
                      <span className="font-medium">Not Entered</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-white text-token-blue hover:bg-white/90">
                    Enter Tournament
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Leaderboard</h3>
                  
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">Player{i + 1}ETH</div>
                          <div className="text-xs text-muted-foreground">{1250 - i * 124} points</div>
                        </div>
                        <div className="text-sm font-medium">{1000 - i * 150} TQT</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View Full Leaderboard
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
          
          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold">More Games</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game, index) => (
                <GlassCard key={index} className="overflow-hidden h-full">
                  <div className={`h-40 ${game.image} relative`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 p-4 flex flex-col justify-between">
                      <GlassCard className="self-start px-2 py-1 text-xs text-white font-medium">
                        {game.status}
                      </GlassCard>
                      
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{game.title}</h3>
                        <p className="text-sm text-white/80 line-clamp-2">{game.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-muted-foreground" />
                        <span>{game.players} Players</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="w-3 h-3 text-muted-foreground" />
                        <span>{game.rewards}</span>
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
                    
                    <Button variant="outline" className="w-full rounded-full" disabled>
                      <Clock className="w-4 h-4 mr-2" />
                      Coming Soon
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
          
          <GlassCard className="p-6 text-center">
            <Gamepad2 className="w-12 h-12 text-token-blue mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Want More Games?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              We're constantly developing new games for the TokenQuest platform.
              Subscribe to our newsletter to be the first to know when new games are released.
            </p>
            <Button className="rounded-full">
              Subscribe for Updates
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Games;
