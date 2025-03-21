
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "../ui/GlassCard";
import { Wallet, LogOut, ChevronDown, Copy, ExternalLink, Check } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/sonner";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const ConnectWallet = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [isConnecting, setIsConnecting] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== "undefined" && !!window.ethereum;
  };

  // Format address to display
  const formatAddress = (address: string): string => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Handle connect wallet
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      toast("MetaMask not detected", {
        description: "Please install MetaMask to connect your wallet",
      });
      // Open MetaMask website in a new tab
      window.open("https://metamask.io/download.html", "_blank");
      return;
    }

    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      
      if (accounts.length > 0) {
        const address = accounts[0];
        setAccount(address);
        
        // Get balance
        const balanceHex = await window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        });
        
        // Convert hex balance to ETH (wei to ETH)
        const balanceInWei = parseInt(balanceHex, 16);
        const balanceInEth = balanceInWei / 1e18;
        setBalance(balanceInEth.toFixed(4));
        
        toast.success("Wallet connected", {
          description: `Connected to ${formatAddress(address)}`,
        });
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet", {
        description: "Please try again",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setBalance("0");
    toast.info("Wallet disconnected");
  };

  // Copy address to clipboard
  const copyAddressToClipboard = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
      toast.success("Address copied to clipboard");
    }
  };

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (isMetaMaskInstalled()) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            
            // Get balance
            const balanceHex = await window.ethereum.request({
              method: "eth_getBalance",
              params: [accounts[0], "latest"],
            });
            
            // Convert hex balance to ETH
            const balanceInWei = parseInt(balanceHex, 16);
            const balanceInEth = balanceInWei / 1e18;
            setBalance(balanceInEth.toFixed(4));
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };

    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (isMetaMaskInstalled()) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          toast.info("Wallet account changed", {
            description: `Connected to ${formatAddress(accounts[0])}`,
          });
        } else {
          setAccount(null);
          setBalance("0");
          toast.info("Wallet disconnected");
        }
      });
    }

    return () => {
      if (isMetaMaskInstalled() && window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", () => {});
      }
    };
  }, []);

  if (!account) {
    return (
      <Button
        className="rounded-full"
        variant="default"
        onClick={connectWallet}
        disabled={isConnecting}
      >
        {isConnecting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Connecting...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            <span>Connect Wallet</span>
          </div>
        )}
      </Button>
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
              <Wallet className="w-3 h-3 text-token-blue" />
            </div>
            <span className="text-sm font-medium">{formatAddress(account)}</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </GlassCard>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex flex-col p-2">
          <div className="text-xs font-medium text-muted-foreground">Connected Wallet</div>
          <div className="font-medium">{formatAddress(account)}</div>
          <div className="text-xs text-muted-foreground mt-1">{balance} ETH</div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyAddressToClipboard} className="cursor-pointer">
          {hasCopied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
          {hasCopied ? "Copied" : "Copy Address"}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => window.open(`https://etherscan.io/address/${account}`, "_blank")}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View on Etherscan
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={disconnectWallet} className="cursor-pointer text-destructive">
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
