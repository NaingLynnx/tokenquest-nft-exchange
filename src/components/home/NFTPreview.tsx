
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Gem, ArrowRight } from "lucide-react";

export const NFTPreview = () => {
  const [activeNFT, setActiveNFT] = useState(0);
  
  const nfts = [
    {
      name: "Cosmic Guardian #42",
      creator: "TokenQuest Studios",
      price: "250 TQT",
      rarity: "Rare",
      attributes: [
        { name: "Strength", value: 80 },
        { name: "Agility", value: 65 },
        { name: "Intelligence", value: 92 },
      ],
      color: "from-purple-500 to-blue-600",
    },
    {
      name: "Digital Samurai #17",
      creator: "Neo Creations",
      price: "420 TQT",
      rarity: "Epic",
      attributes: [
        { name: "Strength", value: 95 },
        { name: "Agility", value: 88 },
        { name: "Intelligence", value: 74 },
      ],
      color: "from-red-500 to-orange-600",
    },
    {
      name: "Mystic Owl #103",
      creator: "Ethereal Arts",
      price: "180 TQT",
      rarity: "Uncommon",
      attributes: [
        { name: "Strength", value: 45 },
        { name: "Agility", value: 60 },
        { name: "Intelligence", value: 98 },
      ],
      color: "from-teal-500 to-green-600",
    },
  ];

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <div className="relative max-w-md mx-auto lg:ml-0">
              <div className="absolute inset-0 bg-gradient-to-r from-token-blue/20 to-transparent rounded-3xl blur-3xl opacity-30 -z-10 transform -rotate-6"></div>
              
              <div className="bg-gradient-to-br from-[#fafafa] to-[#f5f5f7] dark:from-[#1a1a1a] dark:to-[#0d0d0d] rounded-3xl shadow-lg border border-muted p-1">
                <div className="rounded-2xl overflow-hidden">
                  <div className={`aspect-square bg-gradient-to-br ${nfts[activeNFT].color} relative p-6`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex justify-between items-start">
                        <GlassCard className="px-2 py-1 text-xs text-white font-medium">
                          {nfts[activeNFT].rarity}
                        </GlassCard>
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center">
                          <Gem className="w-16 h-16 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{nfts[activeNFT].name}</h3>
                        <p className="text-sm text-muted-foreground">By {nfts[activeNFT].creator}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Price</div>
                        <div className="font-medium">{nfts[activeNFT].price}</div>
                      </div>
                    </div>
                    
                    <h4 className="text-sm font-medium mb-3">Attributes</h4>
                    {nfts[activeNFT].attributes.map((attr, i) => (
                      <div key={i} className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{attr.name}</span>
                          <span>{attr.value}/100</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${nfts[activeNFT].color}`}
                            style={{ width: `${attr.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-6 flex gap-2">
                      <Button className="flex-1 rounded-full">Buy Now</Button>
                      <Button variant="outline" className="rounded-full">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <GlassCard 
              variant="light" 
              className="inline-flex items-center gap-2 py-1 px-3 mb-6"
              hoverEffect={false}
            >
              <Gem className="w-4 h-4 text-token-blue" />
              <span className="text-xs font-medium">NFT MARKETPLACE</span>
            </GlassCard>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Collect Unique NFTs with Real Utility
            </h2>
            
            <p className="text-muted-foreground mb-8 text-lg">
              Our NFT marketplace features exclusive digital collectibles that provide real benefits within the TokenQuest ecosystem.
            </p>
            
            <div className="space-y-4 mb-8">
              {nfts.map((nft, index) => (
                <div
                  key={index}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeNFT === index ? "scale-[1.02]" : "opacity-80 hover:opacity-100"
                  }`}
                  onClick={() => setActiveNFT(index)}
                >
                  <GlassCard
                    variant={activeNFT === index ? "light" : "default"}
                    className={`p-4 flex items-center gap-4 ${
                      activeNFT === index ? "border-token-blue/30 shadow-lg" : ""
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${nft.color} flex items-center justify-center`}>
                      <Gem className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{nft.name}</h3>
                        <span className="text-sm">{nft.price}</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{nft.creator}</span>
                        <span className="text-token-blue font-medium">{nft.rarity}</span>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
            
            <Button asChild className="rounded-full">
              <Link to="/nft-marketplace">
                Explore Marketplace
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
