
import { 
  User, 
  GameResult, 
  addGameResult, 
  getGameResultsByUserId, 
  updateUser 
} from './database';

interface GameScore {
  score: number;
  tokensEarned: number;
}

// Save game result and update user tokens
export async function saveGameResult(
  userId: string, 
  gameName: string, 
  score: number, 
  tokensEarned: number
): Promise<GameResult> {
  return addGameResult({
    userId,
    gameName,
    score,
    tokensEarned
  });
}

// Get user's game history
export function getUserGameHistory(userId: string): GameResult[] {
  return getGameResultsByUserId(userId);
}

// Get user's total tokens
export function getUserTokens(user: User): number {
  return user.tokens;
}

// Format tokens for display
export function formatTokens(tokens: number): string {
  return tokens.toLocaleString();
}

// Calculate tokens earned based on game score
export function calculateTokensEarned(gameName: string, score: number): number {
  switch (gameName) {
    case 'Token Clicker':
      // 2 tokens per point in Token Clicker
      return score * 2;
    default:
      return score;
  }
}
