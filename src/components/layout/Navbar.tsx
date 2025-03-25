
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavbarActions } from "./NavbarActions";
import { useAuth } from "@/contexts/AuthContext";
import { UserProfile } from "@/components/wallet/UserProfile";
import { ConnectWallet } from "@/components/wallet/ConnectWallet";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Games", path: "/games" },
    { title: "Marketplace", path: "/nft" },
    { title: "Token Exchange", path: "/exchange" },
    { title: "Chat Assistant", path: "/chat" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold flex items-center gap-2 text-foreground"
        >
          <div className="w-10 h-10 rounded-full bg-token-blue flex items-center justify-center text-white font-bold">
            <Zap className="w-6 h-6" />
          </div>
          <span className="animate-fade-in">S1st Token</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm transition-all duration-300 hover:text-token-blue",
                location.pathname === link.path
                  ? "text-token-blue font-medium"
                  : "text-foreground/80"
              )}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <NavbarActions />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-md p-4 border-t animate-slide-down">
          <nav className="flex flex-col gap-4 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 text-sm transition-all duration-300 rounded-md",
                  location.pathname === link.path
                    ? "bg-token-blue/10 text-token-blue font-medium"
                    : "text-foreground/80 hover:bg-muted"
                )}
              >
                {link.title}
              </Link>
            ))}
            <div className="pt-2 border-t">
              {user ? (
                <>
                  <UserProfile />
                  <ConnectWallet />
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/login" className="w-full">
                    <Button variant="ghost" className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" className="w-full">
                    <Button variant="default" className="w-full justify-start">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
