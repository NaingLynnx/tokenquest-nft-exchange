
import React from "react";
import { Link } from "react-router-dom";
import { GlassCard } from "../ui/GlassCard";
import { Twitter, Github, MessageSquare, Zap } from "lucide-react";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative pt-20 pb-10 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/80"></div>
      <div 
        className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-token-blue/10 blur-3xl opacity-70"
        aria-hidden="true"
      ></div>
      <div 
        className="absolute -bottom-10 right-0 w-40 h-40 rounded-full bg-token-blue/10 blur-3xl opacity-50"
        aria-hidden="true"
      ></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-2">
            <Link
              to="/"
              className="text-2xl font-bold flex items-center gap-2 mb-4 text-foreground"
            >
              <div className="w-8 h-8 rounded-full bg-token-blue flex items-center justify-center text-white">
                <Zap className="w-5 h-5" />
              </div>
              SF Token
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              Play, earn and trade on the most innovative Web3 gaming platform. 
              Collect NFTs, participate in tournaments and join our community.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-token-blue transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-token-blue transition-colors" aria-label="Github">
                <Github size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-token-blue transition-colors" aria-label="Discord">
                <MessageSquare size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/games" className="text-sm text-muted-foreground hover:text-token-blue transition-colors">
                  Games
                </Link>
              </li>
              <li>
                <Link to="/nft" className="text-sm text-muted-foreground hover:text-token-blue transition-colors">
                  NFT Marketplace
                </Link>
              </li>
              <li>
                <Link to="/exchange" className="text-sm text-muted-foreground hover:text-token-blue transition-colors">
                  Token Exchange
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-token-blue transition-colors">
                  Tournaments
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-token-blue transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-token-blue transition-colors">
                  Whitepaper
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-token-blue transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-token-blue transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <GlassCard className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 bg-token-dark/5">
          <p className="text-sm text-muted-foreground">
            © {year} SF Token. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-token-blue transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-token-blue transition-colors">Terms of Service</a>
          </div>
        </GlassCard>
      </div>
    </footer>
  );
};
