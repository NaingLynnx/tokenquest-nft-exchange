
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, ArrowDown, RefreshCw, History, 
  TrendingUp, TrendingDown, Info, BarChart3, Coins
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const TokenExchange = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromToken, setFromToken] = useState("SFT");
  const [toToken, setToToken] = useState("USDT");
  
  // Token exchange rates (simplified)
  const exchangeRates = {
    "SFT-USDT": 0.12,
    "USDT-SFT": 8.33,
    "SFT-ETH": 0.00007,
    "ETH-SFT": 14285.71,
    "USDT-ETH": 0.0006,
    "ETH-USDT": 1666.67,
    "SFT-BTC": 0.000003,
    "BTC-SFT": 330000,
    "USDT-BTC": 0.000025,
    "BTC-USDT": 40000,
    "ETH-BTC": 0.05,
    "BTC-ETH": 20,
    "SFT-SOL": 0.001,
    "SOL-SFT": 1000,
    "USDT-SOL": 0.0083,
    "SOL-USDT": 120,
    "ETH-SOL": 15,
    "SOL-ETH": 0.066,
    "BTC-SOL": 300,
    "SOL-BTC": 0.0033,
    "SFT-XRP": 0.15,
    "XRP-SFT": 6.67,
    "USDT-XRP": 1.25,
    "XRP-USDT": 0.8,
  };
  
  // Available tokens - updated with more options
  const tokens = ["SFT", "USDT", "ETH", "BTC", "SOL", "XRP"];
  
  // Recent transactions (mock data) - updated with SF Token (SFT)
  const recentTransactions = [
    { 
      type: "swap", 
      from: { amount: "500", token: "SFT" }, 
      to: { amount: "60", token: "USDT" },
      time: "2 hours ago",
      status: "completed"
    },
    { 
      type: "swap", 
      from: { amount: "0.02", token: "ETH" }, 
      to: { amount: "285.71", token: "SFT" },
      time: "5 hours ago",
      status: "completed"
    },
    { 
      type: "swap", 
      from: { amount: "120", token: "USDT" }, 
      to: { amount: "1000", token: "SFT" },
      time: "1 day ago",
      status: "completed"
    },
  ];
  
  // Get exchange rate for selected token pair
  const getExchangeRate = () => {
    const key = `${fromToken}-${toToken}`;
    return exchangeRates[key] || 0;
  };
  
  // Handle input change
  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromAmount(value);
    
    // Calculate to amount
    if (value && !isNaN(parseFloat(value))) {
      const calculatedAmount = parseFloat(value) * getExchangeRate();
      setToAmount(calculatedAmount.toFixed(6));
    } else {
      setToAmount("");
    }
  };
  
  // Handle token swap
  const handleSwapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };
  
  // Handle exchange
  const handleExchange = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    // Check if user has enough balance (in a real app, this would check the wallet)
    toast.success("Exchange completed", {
      description: `Exchanged ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`,
    });
    
    // Reset form
    setFromAmount("");
    setToAmount("");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
          </Link>
          
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Token Exchange</h1>
            <p className="text-muted-foreground">
              Swap SF Token coins for other cryptocurrencies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <GlassCard className="p-6 overflow-hidden">
                <Tabs defaultValue="swap">
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="swap">Swap</TabsTrigger>
                    <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="swap" className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl border">
                        <div className="flex justify-between mb-2">
                          <div className="text-sm text-muted-foreground">From</div>
                          <div className="text-xs text-muted-foreground">
                            Balance: 0 {fromToken}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="text-lg font-medium border-none shadow-none focus-visible:ring-0 p-0 h-auto"
                            value={fromAmount}
                            onChange={handleFromAmountChange}
                          />
                          
                          <div className="relative min-w-[110px]">
                            <select
                              className="w-full h-10 rounded-lg border bg-background px-3 py-2 text-sm appearance-none"
                              value={fromToken}
                              onChange={(e) => setFromToken(e.target.value)}
                            >
                              {tokens.map((token) => (
                                <option key={token} value={token}>
                                  {token}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full bg-muted"
                          onClick={handleSwapTokens}
                        >
                          <ArrowDown className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="p-4 rounded-xl border">
                        <div className="flex justify-between mb-2">
                          <div className="text-sm text-muted-foreground">To</div>
                          <div className="text-xs text-muted-foreground">
                            Balance: 0 {toToken}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="text-lg font-medium border-none shadow-none focus-visible:ring-0 p-0 h-auto"
                            value={toAmount}
                            readOnly
                          />
                          
                          <div className="relative min-w-[110px]">
                            <select
                              className="w-full h-10 rounded-lg border bg-background px-3 py-2 text-sm appearance-none"
                              value={toToken}
                              onChange={(e) => setToToken(e.target.value)}
                            >
                              {tokens.map((token) => (
                                <option key={token} value={token} disabled={token === fromToken}>
                                  {token}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-muted/30 text-sm">
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Exchange Rate</span>
                        <span>
                          1 {fromToken} = {getExchangeRate()} {toToken}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fee</span>
                        <span>0.5%</span>
                      </div>
                    </div>
                    
                    <Button className="w-full rounded-full" onClick={handleExchange}>
                      Swap Tokens
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="liquidity" className="h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <Coins className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Liquidity Pools Coming Soon</h3>
                      <p className="text-muted-foreground max-w-md">
                        Soon you'll be able to provide liquidity to earn passive income through trading fees.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </GlassCard>
              
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
                
                {recentTransactions.length === 0 ? (
                  <div className="text-center py-6">
                    <History className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No recent transactions</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentTransactions.map((tx, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-token-blue/10 flex items-center justify-center">
                          <RefreshCw className="w-5 h-5 text-token-blue" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="font-medium">Swap</span>
                            <span className="text-sm text-muted-foreground">
                              {tx.from.amount} {tx.from.token} to {tx.to.amount} {tx.to.token}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">{tx.time}</div>
                        </div>
                        
                        <div className="text-xs font-medium uppercase text-token-success">
                          {tx.status}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            </div>
            
            <div className="space-y-6">
              <GlassCard className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">SF Token Price</h2>
                  <RefreshCw className="w-4 h-4 text-muted-foreground" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="text-2xl font-bold">$0.12</div>
                      <div className="flex items-center text-token-success text-sm">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +5.2%
                      </div>
                    </div>
                    
                    <div className="w-full h-24 bg-muted/50 rounded-lg flex items-end justify-between px-2 pb-2">
                      {[...Array(20)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-2 bg-token-blue rounded-t-sm" 
                          style={{ 
                            height: `${30 + Math.random() * 50}px`,
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground mb-1">24h Volume</div>
                      <div className="font-medium">$452,892</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Market Cap</div>
                      <div className="font-medium">$120M</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">All-time High</div>
                      <div className="font-medium">$0.18</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard className="p-6">
                <h2 className="text-lg font-bold mb-4">Token Stats</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="text-muted-foreground">Total Supply</div>
                    <div className="font-medium">1,000,000 SFT</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-muted-foreground">Circulating</div>
                    <div className="font-medium">250,000 SFT</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-muted-foreground">Token Holders</div>
                    <div className="font-medium">1,235</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-muted-foreground">Contract</div>
                    <div className="font-medium text-token-blue">0x1a2...</div>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mt-1">
                    <Info className="w-5 h-5 text-muted-foreground" />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">About Token Exchange</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      The SF Token Exchange allows you to swap SFT tokens for other cryptocurrencies.
                      Exchange rates are determined by our liquidity pools and market demand.
                    </p>
                    
                    <Button variant="outline" className="text-xs w-full rounded-full">
                      <BarChart3 className="w-3 h-3 mr-1" />
                      View Tokenomics
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TokenExchange;
