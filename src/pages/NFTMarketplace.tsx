
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, Search, Sliders, ChevronDown, Gem, 
  ArrowUpDown, RefreshCw, ShoppingCart, Heart, Laptop, Code, BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const NFTMarketplace = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  
  const categories = [
    { id: "all", name: "All NFTs" },
    { id: "courses", name: "Courses" },
    { id: "certificates", name: "Certificates" },
    { id: "mentorship", name: "Mentorship" },
    { id: "resources", name: "Resources" },
  ];
  
  const sortOptions = [
    { id: "recent", name: "Recently Added" },
    { id: "price-asc", name: "Price: Low to High" },
    { id: "price-desc", name: "Price: High to Low" },
    { id: "popularity", name: "Most Popular" },
  ];
  
  const nfts = [
    {
      id: 1,
      name: "Web Development Mastery",
      price: "250 SF",
      creator: "Strategy First University",
      category: "courses",
      rarity: "Premium",
      color: "from-purple-500 to-blue-600",
      likes: 86,
      icon: <Code className="w-16 h-16 text-white" />
    },
    {
      id: 2,
      name: "Data Science Certificate",
      price: "420 SF",
      creator: "SFU Academy",
      category: "certificates",
      rarity: "Elite",
      color: "from-red-500 to-orange-600",
      likes: 124,
      icon: <BookOpen className="w-16 h-16 text-white" />
    },
    {
      id: 3,
      name: "Blockchain Fundamentals",
      price: "180 SF",
      creator: "Strategy First Labs",
      category: "courses",
      rarity: "Standard",
      color: "from-teal-500 to-green-600",
      likes: 53,
      icon: <Laptop className="w-16 h-16 text-white" />
    },
    {
      id: 4,
      name: "Exclusive Mentorship",
      price: "1200 SF",
      creator: "SFU Mentors",
      category: "mentorship",
      rarity: "Legendary",
      color: "from-blue-500 to-indigo-600",
      likes: 192,
      icon: <Gem className="w-16 h-16 text-white" />
    },
    {
      id: 5,
      name: "Programming Handbook",
      price: "320 SF",
      creator: "Strategy First University",
      category: "resources",
      rarity: "Premium",
      color: "from-gray-500 to-gray-700",
      likes: 77,
      icon: <Code className="w-16 h-16 text-white" />
    },
    {
      id: 6,
      name: "Advanced AI Course",
      price: "520 SF",
      creator: "SFU Academy",
      category: "courses",
      rarity: "Elite",
      color: "from-yellow-400 to-amber-600",
      likes: 145,
      icon: <BookOpen className="w-16 h-16 text-white" />
    },
  ];
  
  const filteredNFTs = activeCategory === "all" 
    ? nfts 
    : nfts.filter(nft => nft.category === activeCategory);
    
  // Sort NFTs based on selected option
  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return parseInt(a.price) - parseInt(b.price);
      case "price-desc":
        return parseInt(b.price) - parseInt(a.price);
      case "popularity":
        return b.likes - a.likes;
      default:
        return b.id - a.id; // Recently added (newest first)
    }
  });

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
              <h1 className="text-3xl md:text-4xl font-bold mb-2">NFT Marketplace</h1>
              <p className="text-muted-foreground">
                Discover exclusive Strategy First University digital assets.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <GlassCard className="p-2 flex items-center gap-2">
                <div className="text-xs text-muted-foreground">Your Token Balance:</div>
                <div className="text-sm font-medium">0 SF</div>
              </GlassCard>
              
              <Button variant="outline" className="rounded-full">
                <ShoppingCart className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">My Collection</span>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search NFTs..." 
                  className="pl-9 rounded-full min-w-[200px]" 
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Sort By</span>
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.id}
                      className="cursor-pointer"
                      onClick={() => setSortBy(option.id)}
                    >
                      <div className="flex items-center gap-2">
                        {sortBy === option.id && (
                          <div className="w-1.5 h-1.5 rounded-full bg-token-blue"></div>
                        )}
                        <span className={sortBy === option.id ? "font-medium" : ""}>
                          {option.name}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" className="rounded-full">
                <Sliders className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sortedNFTs.map((nft) => (
              <GlassCard 
                key={nft.id} 
                className="overflow-hidden h-full animate-fade-in"
                variant="light"
              >
                <div className={`aspect-square bg-gradient-to-br ${nft.color} relative`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <GlassCard className="px-2 py-1 text-xs text-white font-medium">
                      {nft.rarity}
                    </GlassCard>
                    
                    <Button variant="ghost" size="icon" className="rounded-full bg-white/10 text-white hover:bg-white/20 h-7 w-7">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center">
                      {nft.icon}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{nft.name}</h3>
                      <p className="text-xs text-muted-foreground">By {nft.creator}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Price</div>
                      <div className="font-medium">{nft.price}</div>
                    </div>
                  </div>
                  
                  <div className="pt-2 flex gap-2">
                    <Button className="flex-1 rounded-full">Buy Now</Button>
                    <Button variant="outline" className="rounded-full px-3 aspect-square">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline" className="rounded-full">
              Load More NFTs
              <ChevronDown className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NFTMarketplace;
