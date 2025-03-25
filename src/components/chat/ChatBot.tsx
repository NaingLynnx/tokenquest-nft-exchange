
import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ChatKnowledgeBase } from "./ChatKnowledgeBase";

type ChatMessage = {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
};

export type ChatCategory = "guide" | "crypto" | "tech" | "faq" | "general";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [currentCategory, setCurrentCategory] = useState<ChatCategory>("general");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "bot",
          content: "👋 Hello! I'm your S1st Token assistant. How can I help you today?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Process and respond
    setTimeout(() => {
      const botResponse = generateResponse(input, currentCategory);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "bot",
          content: botResponse,
          timestamp: new Date(),
        },
      ]);
    }, 500);
  };

  const generateResponse = (userInput: string, category: ChatCategory): string => {
    const normalizedInput = userInput.toLowerCase();
    
    // Find relevant response from knowledge base
    const response = ChatKnowledgeBase.find(entry => {
      return (
        (entry.category === category || entry.category === "general") &&
        (entry.keywords.some(keyword => normalizedInput.includes(keyword)) ||
         normalizedInput.includes(entry.question.toLowerCase()))
      );
    });

    if (response) {
      return response.answer;
    }

    // Fallback responses based on category
    const fallbacks = {
      guide: "I don't have specific information about that yet. For beginners, I recommend starting with our 'Getting Started with S1st Token' guide in the Help section.",
      crypto: "I don't have the latest information on that. For updated crypto news, check our News section or visit reliable sources like CoinDesk or CoinTelegraph.",
      tech: "I don't have details on that technology topic. For the latest tech news, visit our Resources section or tech publications like TechCrunch.",
      faq: "That's not in our FAQ yet. Please check the Help section for more information or contact our support team.",
      general: "I'm not sure about that. Could you try rephrasing your question or select a specific category for more focused help?"
    };

    return fallbacks[category];
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0 bg-token-blue text-white shadow-lg hover:shadow-xl transition-all"
        size="icon"
      >
        <Bot className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 bg-background border rounded-lg shadow-lg transition-all duration-200 flex flex-col z-50",
        isMinimized ? "w-72 h-14" : "w-[350px] sm:w-[400px] h-[500px]"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b bg-token-blue text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <h3 className="font-medium">S1st Token Assistant</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMinimize}
            className="h-7 w-7 rounded-full hover:bg-white/20 text-white"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleOpen}
            className="h-7 w-7 rounded-full hover:bg-white/20 text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Category tabs */}
          <Tabs
            defaultValue="general"
            value={currentCategory}
            onValueChange={(value) => setCurrentCategory(value as ChatCategory)}
            className="w-full"
          >
            <TabsList className="w-full justify-between px-1 py-1 h-auto">
              <TabsTrigger value="guide" className="text-xs py-1 px-2">Guide</TabsTrigger>
              <TabsTrigger value="crypto" className="text-xs py-1 px-2">Crypto</TabsTrigger>
              <TabsTrigger value="tech" className="text-xs py-1 px-2">Tech</TabsTrigger>
              <TabsTrigger value="faq" className="text-xs py-1 px-2">FAQ</TabsTrigger>
              <TabsTrigger value="general" className="text-xs py-1 px-2">General</TabsTrigger>
            </TabsList>

            {/* Chat messages container */}
            <div className="flex-1 overflow-y-auto p-3 h-[350px]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "mb-3 max-w-[85%] rounded-lg p-3",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted mr-auto"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <div
                    className={cn(
                      "text-[10px] mt-1 opacity-70",
                      message.role === "user" ? "text-right" : "text-left"
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </Tabs>

          {/* Input area */}
          <form onSubmit={handleSendMessage} className="border-t p-3 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </>
      )}
    </div>
  );
};
