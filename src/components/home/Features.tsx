
import React from "react";
import { GlassCard } from "../ui/GlassCard";
import { Gamepad2, Coins, Wallet, Store, Trophy, Users } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: <Gamepad2 className="w-6 h-6 text-token-blue" />,
      title: "Play Mini-Games",
      description:
        "Enjoy a variety of engaging games designed to test your skills and strategies.",
    },
    {
      icon: <Coins className="w-6 h-6 text-token-blue" />,
      title: "Earn Tokens",
      description:
        "Win games to mint TokenQuest coins directly to your connected wallet.",
    },
    {
      icon: <Store className="w-6 h-6 text-token-blue" />,
      title: "NFT Marketplace",
      description:
        "Buy, sell, and trade unique digital collectibles using your earned tokens.",
    },
    {
      icon: <Wallet className="w-6 h-6 text-token-blue" />,
      title: "Token Exchange",
      description:
        "Swap your TokenQuest coins for NFTs or convert them to USDT.",
    },
    {
      icon: <Trophy className="w-6 h-6 text-token-blue" />,
      title: "Tournaments",
      description:
        "Compete in regular tournaments for massive token rewards and exclusive NFTs.",
    },
    {
      icon: <Users className="w-6 h-6 text-token-blue" />,
      title: "Community",
      description:
        "Join a thriving community of gamers, collectors, and Web3 enthusiasts.",
    },
  ];

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Complete Web3 Gaming Experience
          </h2>
          <p className="text-muted-foreground">
            TokenQuest brings together gaming, cryptocurrency, and NFTs in one
            seamless platform. Play, earn, and trade all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <GlassCard className="h-full p-6">
                <div className="w-12 h-12 rounded-xl bg-token-blue/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
