
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { GameShowcase } from "@/components/home/GameShowcase";
import { TokenExplainer } from "@/components/home/TokenExplainer";
import { NFTPreview } from "@/components/home/NFTPreview";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <GameShowcase />
        <TokenExplainer />
        <NFTPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
