
import React from "react";
import { Link } from "react-router-dom";
import { ConnectWallet } from "@/components/wallet/ConnectWallet";
import { UserProfile } from "@/components/wallet/UserProfile";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export const NavbarActions = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <UserProfile />
          <ConnectWallet />
        </>
      ) : (
        <>
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="default" size="sm">
              Sign Up
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};
