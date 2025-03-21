
import React from "react";
import { GlassCard } from "../ui/GlassCard";
import { Coins, ArrowRight, RefreshCw, Gem, DollarSign } from "lucide-react";

export const TokenExplainer = () => {
  return (
    <section className="py-20 px-6 relative bg-muted/30">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-20%,rgba(0,113,227,0.1),rgba(255,255,255,0))]"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <GlassCard 
              variant="light" 
              className="inline-flex items-center gap-2 py-1 px-3 mb-6"
              hoverEffect={false}
            >
              <Coins className="w-4 h-4 text-token-blue" />
              <span className="text-xs font-medium">TOKEN ECONOMICS</span>
            </GlassCard>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Earn, Trade, and Utilize <span className="text-token-blue">TokenQuest Coins</span>
            </h2>
            
            <p className="text-muted-foreground mb-8 text-lg">
              Our custom cryptocurrency is at the heart of the TokenQuest ecosystem. Play games to earn tokens, then use them throughout our platform.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-token-blue/10 flex items-center justify-center shrink-0">
                  <Gem className="w-5 h-5 text-token-blue" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Purchase Exclusive NFTs</h3>
                  <p className="text-muted-foreground text-sm">
                    Use your earned tokens to acquire unique digital collectibles from our marketplace.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-token-blue/10 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-5 h-5 text-token-blue" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Swap for Other Currencies</h3>
                  <p className="text-muted-foreground text-sm">
                    Exchange your tokens for USDT or other cryptocurrencies through our swap mechanism.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-token-blue/10 flex items-center justify-center shrink-0">
                  <DollarSign className="w-5 h-5 text-token-blue" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Real-World Value</h3>
                  <p className="text-muted-foreground text-sm">
                    Our token has real economic value, backed by utility and demand within our ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-token-blue/20 to-transparent rounded-3xl blur-3xl opacity-30 -z-10 transform -rotate-6"></div>
              
              <div className="bg-gradient-to-br from-[#fafafa] to-[#f5f5f7] dark:from-[#1a1a1a] dark:to-[#0d0d0d] rounded-3xl shadow-lg border border-muted p-1">
                <div className="rounded-2xl overflow-hidden">
                  <div className="bg-token-blue p-6 flex items-center justify-between">
                    <div>
                      <div className="text-white/80 text-sm">Current Price</div>
                      <div className="text-white text-2xl font-bold">$0.12 USD</div>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">TQ</span>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background/50 p-4 rounded-xl">
                        <div className="text-muted-foreground text-sm">Total Supply</div>
                        <div className="font-medium">1,000,000 TQT</div>
                      </div>
                      <div className="bg-background/50 p-4 rounded-xl">
                        <div className="text-muted-foreground text-sm">Circulation</div>
                        <div className="font-medium">250,000 TQT</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Token Standard</span>
                        <span className="font-medium">ERC-20</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Blockchain</span>
                        <span className="font-medium">Ethereum</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Mint Rate</span>
                        <span className="font-medium">Dynamic</span>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium">Token Distribution</div>
                        <div className="text-xs text-muted-foreground">1,000,000 Total</div>
                      </div>
                      <div className="h-4 w-full bg-muted rounded-full overflow-hidden flex">
                        <div className="h-full bg-token-blue w-[40%]" title="Gaming Rewards (40%)"></div>
                        <div className="h-full bg-token-success w-[25%]" title="NFT Marketplace (25%)"></div>
                        <div className="h-full bg-token-warning w-[20%]" title="Liquidity Pool (20%)"></div>
                        <div className="h-full bg-token-danger w-[15%]" title="Team (15%)"></div>
                      </div>
                      <div className="flex justify-between text-xs pt-2">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-token-blue rounded-full"></div>
                          <span>Gaming</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-token-success rounded-full"></div>
                          <span>NFTs</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-token-warning rounded-full"></div>
                          <span>Liquidity</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-token-danger rounded-full"></div>
                          <span>Team</span>
                        </div>
                      </div>
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
