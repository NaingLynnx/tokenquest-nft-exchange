
import React, { useState, useEffect } from "react";
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
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { updateUser } from "@/services/database";

const NFTMarketplace = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const { user } = useAuth();
  
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
      price: "250 S1T",
      priceValue: 250,
      creator: "Strategy First University",
      category: "courses",
      rarity: "Premium",
      color: "from-purple-500 to-blue-600",
      likes: 86,
      icon: <Code className="w-16 h-16 text-white" />,
      image: "/assets/web-dev-course.jpg"
    },
    {
      id: 2,
      name: "Data Science Certificate",
      price: "420 S1T",
      priceValue: 420,
      creator: "SFU Academy",
      category: "certificates",
      rarity: "Elite",
      color: "from-red-500 to-orange-600",
      likes: 124,
      icon: <BookOpen className="w-16 h-16 text-white" />,
      image: "/assets/data-science-cert.jpg"
    },
    {
      id: 3,
      name: "Blockchain Fundamentals",
      price: "180 S1T",
      priceValue: 180,
      creator: "Strategy First Labs",
      category: "courses",
      rarity: "Standard",
      color: "from-teal-500 to-green-600",
      likes: 53,
      icon: <Laptop className="w-16 h-16 text-white" />,
      image: "/assets/blockchain-course.jpg"
    },
    {
      id: 4,
      name: "Exclusive Mentorship",
      price: "1200 S1T",
      priceValue: 1200,
      creator: "SFU Mentors",
      category: "mentorship",
      rarity: "Legendary",
      color: "from-blue-500 to-indigo-600",
      likes: 192,
      icon: <Gem className="w-16 h-16 text-white" />,
      image: "/assets/mentorship.jpg"
    },
    {
      id: 5,
      name: "Programming Handbook",
      price: "320 S1T",
      priceValue: 320,
      creator: "Strategy First University",
      category: "resources",
      rarity: "Premium",
      color: "from-gray-500 to-gray-700",
      likes: 77,
      icon: <Code className="w-16 h-16 text-white" />,
      image: "/assets/programming-book.jpg"
    },
    {
      id: 6,
      name: "Advanced AI Course",
      price: "520 S1T",
      priceValue: 520,
      creator: "SFU Academy",
      category: "courses",
      rarity: "Elite",
      color: "from-yellow-400 to-amber-600",
      likes: 145,
      icon: <BookOpen className="w-16 h-16 text-white" />,
      image: "/assets/ai-course.jpg"
    },
  ];
  
  const filteredNFTs = activeCategory === "all" 
    ? nfts 
    : nfts.filter(nft => nft.category === activeCategory);
    
  // Sort NFTs based on selected option
  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.priceValue - b.priceValue;
      case "price-desc":
        return b.priceValue - a.priceValue;
      case "popularity":
        return b.likes - a.likes;
      default:
        return b.id - a.id; // Recently added (newest first)
    }
  });

  // Handle NFT purchase
  const handleBuyNFT = (nft) => {
    if (!user) {
      toast.error("Please login to make a purchase", {
        description: "You need to be logged in to buy NFTs",
        action: {
          label: "Login",
          onClick: () => window.location.href = "/login"
        }
      });
      return;
    }

    // Check if user has enough tokens
    if (user.tokens < nft.priceValue) {
      toast.error("Insufficient tokens", {
        description: `You need ${nft.priceValue} S1T tokens to buy this NFT. You currently have ${user.tokens} S1T.`,
        action: {
          label: "Get Tokens",
          onClick: () => window.location.href = "/exchange"
        }
      });
      return;
    }

    // Deduct tokens from user balance
    try {
      // Update user's token balance
      const updatedUser = updateUser(user.id, {
        tokens: user.tokens - nft.priceValue
      });
      
      // Here we would also save the NFT to the user's collection
      // For now we just show a success message
      
      toast.success("Purchase successful!", {
        description: `You've successfully purchased ${nft.name}`,
      });
      
      // Refresh the page after a short delay to show the updated token balance
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error("Purchase failed", {
        description: "There was an error processing your purchase. Please try again."
      });
      console.error("Purchase error:", error);
    }
  };

  useEffect(() => {
    console.log("NFT Marketplace loaded");
  }, []);

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
                <div className="text-sm font-medium">{user ? `${user.tokens} S1T` : '0 S1T'}</div>
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
                    {/* Always display the icon container with an optional image */}
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
                    <Button 
                      className="flex-1 rounded-full"
                      onClick={() => handleBuyNFT(nft)}
                    >
                      Buy Now
                    </Button>
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
