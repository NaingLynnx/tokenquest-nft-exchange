
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatBot, ChatCategory } from "./ChatBot";
import { ChatKnowledgeBase } from "./ChatKnowledgeBase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bot, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const ChatPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof ChatKnowledgeBase>([]);
  const [currentCategory, setCurrentCategory] = useState<ChatCategory>("guide");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const results = ChatKnowledgeBase.filter(
      entry =>
        entry.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.keywords.some(keyword => keyword.includes(searchQuery.toLowerCase())) ||
        entry.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
  };

  // Group knowledge base entries by category
  const categories: Record<ChatCategory, typeof ChatKnowledgeBase> = {
    guide: ChatKnowledgeBase.filter(entry => entry.category === "guide"),
    crypto: ChatKnowledgeBase.filter(entry => entry.category === "crypto"),
    tech: ChatKnowledgeBase.filter(entry => entry.category === "tech"),
    faq: ChatKnowledgeBase.filter(entry => entry.category === "faq"),
    general: ChatKnowledgeBase.filter(entry => entry.category === "general"),
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-28 pb-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">S1st Token Assistant</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant answers about S1st Token, crypto trends, and more. Our AI assistant is here to help with any questions you might have.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for answers..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={!searchQuery.trim()}>
              Search
            </Button>
          </form>
        </div>

        {/* Search results */}
        {searchResults.length > 0 && (
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
            <div className="grid gap-4">
              {searchResults.map((result, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{result.question}</CardTitle>
                      <span className="text-xs uppercase bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {result.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{result.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Categorized knowledge base */}
        <Tabs
          defaultValue="guide"
          value={currentCategory}
          onValueChange={(value) => setCurrentCategory(value as ChatCategory)}
          className="max-w-4xl mx-auto"
        >
          <TabsList className="w-full justify-between mb-6">
            <TabsTrigger value="guide">Beginner Guide</TabsTrigger>
            <TabsTrigger value="crypto">Crypto News</TabsTrigger>
            <TabsTrigger value="tech">Tech News</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>

          {Object.entries(categories).map(([category, entries]) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {entries.map((entry, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{entry.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{entry.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        {/* Chat with AI prompt */}
        <div className="max-w-4xl mx-auto mt-16 bg-token-blue/5 rounded-lg p-8 border border-token-blue/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-token-blue flex items-center justify-center text-white">
              <Bot className="w-10 h-10" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Have more questions?</h3>
              <p className="text-muted-foreground mb-4">
                Our AI assistant is ready to help with personalized answers to all your questions about S1st Token, crypto, and more.
              </p>
              <Button className="gap-2">
                Start Chatting <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatPage;
