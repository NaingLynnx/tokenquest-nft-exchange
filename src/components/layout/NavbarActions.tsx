
import React from "react";
import { ConnectWallet } from "@/components/wallet/ConnectWallet";
import { UserProfile } from "@/components/wallet/UserProfile";

export const NavbarActions = () => {
  return (
    <div className="flex items-center gap-4">
      <UserProfile />
      <ConnectWallet />
    </div>
  );
};
