
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlassCard } from "../ui/GlassCard";
import { Gamepad2, Coins, Trophy, ArrowRight } from "lucide-react";

export const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current) return;
      
      const elements = parallaxRef.current.querySelectorAll(".parallax-element");
      const x = (window.innerWidth - e.pageX) / 100;
      const y = (window.innerHeight - e.pageY) / 100;
      
      elements.forEach((el) => {
        const depth = parseFloat((el as HTMLElement).dataset.depth || "0.1");
        const moveX = x * depth;
        const moveY = y * depth;
        (el as HTMLElement).style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden" data-lov-id="home/Hero">
      {/* Background graphics */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background/80"
        aria-hidden="true"
      ></div>
      <div
        className="absolute top-1/3 left-0 w-72 h-72 bg-token-blue/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-70"
        aria-hidden="true"
      ></div>
      <div
        className="absolute top-0 right-0 w-72 h-72 bg-token-blue/10 rounded-full translate-x-1/3 -translate-y-1/4 blur-3xl opacity-60"
        aria-hidden="true"
      ></div>
      
      <div ref={parallaxRef} className="max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 z-10">
            <div className="space-y-6 max-w-xl">
              <div className="parallax-element" data-depth="0.2">
                <GlassCard
                  variant="light"
                  className="inline-flex items-center gap-2 py-1 px-3"
                  hoverEffect={false}
                >
                  <span className="animate-pulse-subtle text-token-blue text-xs font-medium">
                    LAUNCHING SOON
                  </span>
                </GlassCard>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] parallax-element" data-depth="0.1">
                Play <span className="text-token-blue">Games</span>.
                <br />
                Earn <span className="text-token-blue">Tokens</span>.
                <br />
                Trade <span className="text-token-blue">NFTs</span>.
              </h1>
              
              <p className="text-lg text-muted-foreground parallax-element" data-depth="0.15">
                Join the most innovative Web3 gaming platform. Play exciting games,
                earn tokens, and trade unique NFTs in our marketplace.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2 parallax-element" data-depth="0.2">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/games">
                    Start Playing
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link to="/nft">
                    Explore NFTs
                  </Link>
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-start gap-6 pt-4 parallax-element" data-depth="0.2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-token-blue/10 flex items-center justify-center">
                    <Gamepad2 className="w-5 h-5 text-token-blue" />
                  </div>
                  <div>
                    <div className="text-foreground font-medium">10+ Games</div>
                    <div className="text-xs text-muted-foreground">Play & Earn</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-token-blue/10 flex items-center justify-center">
                    <Coins className="w-5 h-5 text-token-blue" />
                  </div>
                  <div>
                    <div className="text-foreground font-medium">Token Economy</div>
                    <div className="text-xs text-muted-foreground">Earn & Exchange</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-token-blue/10 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-token-blue" />
                  </div>
                  <div>
                    <div className="text-foreground font-medium">Tournaments</div>
                    <div className="text-xs text-muted-foreground">Compete & Win</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end parallax-element" data-depth="0.3">
            <div className="relative w-full max-w-md md:max-w-lg">
              <div className="animate-float">
                <GlassCard
                  variant="light"
                  className="overflow-hidden rounded-3xl border border-token-blue/30 shadow-xl"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-token-blue/90 to-token-blue/40 p-6 flex items-center justify-center">
                    <div className="relative w-48 h-48 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-spin-slow"></div>
                      <div className="w-40 h-40 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">S1</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-muted-foreground">Strategy First</div>
                        <div className="text-lg font-bold">S1st Token</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Value</div>
                        <div className="text-lg font-bold">0.05 ETH</div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="text-muted-foreground">Total Supply</div>
                      <div className="font-medium">1,000,000 S1T</div>
                    </div>
                  </div>
                </GlassCard>
              </div>
              
              <div
                className="absolute -bottom-6 -right-6 w-24 h-24 bg-token-blue/30 rounded-full blur-2xl"
                aria-hidden="true"
              ></div>
              <div
                className="absolute -top-6 -left-6 w-24 h-24 bg-token-blue/20 rounded-full blur-2xl"
                aria-hidden="true"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
