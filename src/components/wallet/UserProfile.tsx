
import React from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "../ui/GlassCard";
import { User, Coins, LogOut, ChevronDown, Settings, History } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { formatTokens } from "@/services/gameService";

export const UserProfile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/login">
          <Button variant="outline" className="rounded-full">Log In</Button>
        </Link>
        <Link to="/signup">
          <Button className="rounded-full">Sign Up</Button>
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full border border-input">
          <GlassCard
            variant="light"
            className="flex items-center gap-2 py-0.5 px-2"
            hoverEffect={false}
          >
            <div className="w-6 h-6 rounded-full bg-token-blue/20 flex items-center justify-center">
              <User className="w-3 h-3 text-token-blue" />
            </div>
            <span className="text-sm font-medium">{user.username}</span>
            <div className="flex items-center gap-1 text-xs bg-muted/50 py-0.5 px-2 rounded-full">
              <Coins className="w-3 h-3 text-token-blue" />
              <span>{formatTokens(user.tokens)}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </GlassCard>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex flex-col p-2">
          <div className="text-xs font-medium text-muted-foreground">Logged in as</div>
          <div className="font-medium">{user.username}</div>
          <div className="text-xs text-muted-foreground mt-1">{user.email}</div>
          <div className="flex items-center gap-1 mt-2 text-sm font-medium">
            <Coins className="w-3 h-3 text-token-blue" />
            <span>{formatTokens(user.tokens)} TQT</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <Link to="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <User className="w-4 h-4 mr-2" />
            My Profile
          </DropdownMenuItem>
        </Link>
        <Link to="/profile?tab=history">
          <DropdownMenuItem className="cursor-pointer">
            <History className="w-4 h-4 mr-2" />
            Game History
          </DropdownMenuItem>
        </Link>
        <Link to="/profile?tab=settings">
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
