
import { ChatCategory } from "./ChatBot";

type KnowledgeEntry = {
  category: ChatCategory;
  question: string;
  keywords: string[];
  answer: string;
};

export const ChatKnowledgeBase: KnowledgeEntry[] = [
  // Beginner Guide
  {
    category: "guide",
    question: "What is S1st Token?",
    keywords: ["what", "s1st", "token", "about"],
    answer: "S1st Token is a utility token designed for our gaming ecosystem. It can be used for in-game purchases, trading NFTs, and participating in exclusive events. Our token provides seamless integration between games and real-world applications."
  },
  {
    category: "guide",
    question: "How do I get started with S1st Token?",
    keywords: ["get started", "begin", "new", "start", "beginner"],
    answer: "To get started with S1st Token: 1) Create an account 2) Set up your wallet 3) Acquire tokens through purchase or gameplay 4) Explore our games and NFT marketplace. Check our detailed beginner's guide in the Help section for more information."
  },
  {
    category: "guide",
    question: "How do I buy S1st Token?",
    keywords: ["buy", "purchase", "acquire", "get tokens"],
    answer: "You can buy S1st Token on our Token Exchange page using ETH, BTC, or other supported cryptocurrencies. Simply connect your wallet, select the amount you want to purchase, and confirm the transaction. New users may need to complete KYC verification first."
  },
  {
    category: "guide",
    question: "What can I do with S1st Token?",
    keywords: ["use", "utility", "purpose", "do with"],
    answer: "S1st Token has multiple uses: 1) Purchase in-game items and power-ups 2) Buy, sell, and trade NFTs in our marketplace 3) Participate in governance decisions 4) Stake for rewards 5) Enter special tournaments and events with token-based entry fees."
  },
  {
    category: "guide",
    question: "Is S1st Token secure?",
    keywords: ["secure", "safe", "security", "protection"],
    answer: "Yes, S1st Token is built on blockchain technology with state-of-the-art security measures. We conduct regular security audits and follow industry best practices. Always keep your wallet credentials secure and enable two-factor authentication for maximum security."
  },

  // Crypto News
  {
    category: "crypto",
    question: "What's happening with Bitcoin?",
    keywords: ["bitcoin", "btc", "bitcoin price"],
    answer: "Bitcoin has been showing significant volatility recently. While we don't provide financial advice, many analysts are watching the $100K resistance level closely. Remember that crypto markets are highly volatile and you should only invest what you can afford to lose."
  },
  {
    category: "crypto",
    question: "What are the trending cryptocurrencies?",
    keywords: ["trending", "popular", "hot", "best crypto"],
    answer: "Currently trending cryptocurrencies include Bitcoin, Ethereum, Solana, and several AI-related tokens. S1st Token has also been gaining popularity due to our growing ecosystem and upcoming game releases. Always do your own research before investing."
  },
  {
    category: "crypto",
    question: "What's new in NFTs?",
    keywords: ["nft", "non-fungible", "nft trends"],
    answer: "The NFT market has been evolving with more focus on utility and gaming applications. Our marketplace features unique gaming assets with real in-game utility. Recent trends include AI-generated NFTs, music NFTs, and more environmentally friendly minting processes."
  },
  {
    category: "crypto",
    question: "What is the current price of S1st Token?",
    keywords: ["price", "value", "worth", "exchange rate"],
    answer: "S1st Token is currently trading at approximately $0.85, up 15% this month. For real-time pricing, please check our Token Exchange page or popular cryptocurrency tracking websites. Remember that prices can fluctuate rapidly."
  },
  {
    category: "crypto",
    question: "What is the market cap of S1st Token?",
    keywords: ["market cap", "valuation", "total value"],
    answer: "S1st Token currently has a market capitalization of approximately $42 million, placing it in the mid-cap range of gaming tokens. Our token economics include a maximum supply of 100 million tokens with 50% currently in circulation."
  },

  // Tech News
  {
    category: "tech",
    question: "What blockchain does S1st Token use?",
    keywords: ["blockchain", "technology", "network"],
    answer: "S1st Token operates on the Ethereum blockchain as an ERC-20 token. We've also implemented layer 2 scaling solutions to ensure fast and affordable transactions for our users. In the future, we plan to expand to additional blockchains for cross-chain compatibility."
  },
  {
    category: "tech",
    question: "What is Web3?",
    keywords: ["web3", "decentralized web", "dapps"],
    answer: "Web3 refers to the next evolution of the internet built on blockchain technology, focusing on decentralization, token-based economics, and user ownership of data and digital assets. S1st Token is part of this ecosystem, enabling true ownership of in-game assets and player-driven economies."
  },
  {
    category: "tech",
    question: "How does blockchain gaming work?",
    keywords: ["blockchain gaming", "play to earn", "p2e"],
    answer: "Blockchain gaming combines traditional game mechanics with blockchain technology, allowing players to truly own their in-game assets as NFTs. In our ecosystem, players can earn S1st Tokens through gameplay, trade unique items, and participate in a player-owned economy."
  },
  {
    category: "tech",
    question: "What is a smart contract?",
    keywords: ["smart contract", "self-executing", "contract"],
    answer: "A smart contract is a self-executing program on the blockchain that automatically enforces agreements when predefined conditions are met. S1st Token uses smart contracts for secure transactions, NFT ownership verification, and automated rewards distribution in our games."
  },
  {
    category: "tech",
    question: "What are the latest S1st Token updates?",
    keywords: ["updates", "roadmap", "development", "future"],
    answer: "Our latest updates include: 1) Enhanced wallet integration 2) New gaming partnerships 3) Improved NFT marketplace features 4) Preparation for our token staking program. Check our blog or follow us on social media for the most current news and development updates."
  },

  // FAQ
  {
    category: "faq",
    question: "How do I create a wallet?",
    keywords: ["wallet", "create wallet", "setup wallet"],
    answer: "To create a wallet: 1) Click on 'Connect Wallet' in the top navigation 2) Select 'Create New Wallet' 3) Follow the security instructions and save your recovery phrase in a secure location 4) Set a strong password. Never share your recovery phrase with anyone!"
  },
  {
    category: "faq",
    question: "How do I recover my account?",
    keywords: ["recover", "forgot", "password", "lost"],
    answer: "If you've forgotten your password, use the 'Forgot Password' link on the login page. If you need to recover your wallet, you'll need your recovery phrase (seed phrase) that was provided when you created your wallet. For additional help, please contact our support team."
  },
  {
    category: "faq",
    question: "How do I report a problem?",
    keywords: ["report", "problem", "issue", "bug", "help"],
    answer: "To report a problem: 1) Go to your Profile settings 2) Select 'Support' 3) Click 'Report an Issue' 4) Fill out the form with details about your problem. Our support team typically responds within 24 hours on business days."
  },
  {
    category: "faq",
    question: "Are there any fees for using S1st Token?",
    keywords: ["fees", "charges", "gas", "transaction fee"],
    answer: "S1st Token transactions include network gas fees that vary based on network congestion. We've implemented layer 2 solutions to keep these fees minimal. There's also a small 1% fee on NFT marketplace transactions that helps support platform development and community initiatives."
  },
  {
    category: "faq",
    question: "What countries is S1st Token available in?",
    keywords: ["countries", "available", "region", "location"],
    answer: "S1st Token is available globally, with a few exceptions due to regulatory constraints. Users from sanctioned countries or regions with explicit cryptocurrency restrictions may be unable to access all features. Always ensure you're complying with your local laws regarding cryptocurrency usage."
  },

  // General
  {
    category: "general",
    question: "How can I contact support?",
    keywords: ["contact", "support", "help", "assistance"],
    answer: "You can contact our support team through the 'Help' section on our website, by emailing support@s1sttoken.com, or by joining our Discord community where our moderators can assist you. For urgent matters, please include your account email and a detailed description of your issue."
  },
  {
    category: "general",
    question: "Tell me a joke",
    keywords: ["joke", "funny", "humor"],
    answer: "Why don't scientists trust atoms? Because they make up everything! 😄 Just like how our S1st Token is making up the future of gaming!"
  },
  {
    category: "general",
    question: "Thank you",
    keywords: ["thanks", "thank you", "appreciate"],
    answer: "You're welcome! I'm happy to help. If you have any other questions about S1st Token or our platform, feel free to ask anytime!"
  }
];
