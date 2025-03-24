
// Simple localStorage-based database service for demo purposes
// In a production app, this would connect to a real database like Supabase, Firebase, etc.

// User type
export interface User {
  id: string;
  email: string;
  username: string;
  password: string; // NOTE: Storing passwords in localStorage is NOT secure
  tokens: number;
  createdAt: string;
  gender?: string;
  dob?: string;
  profession?: string;
  country?: string;
}

// Game result type
export interface GameResult {
  id: string;
  userId: string;
  gameName: string;
  score: number;
  tokensEarned: number;
  timestamp: string;
}

// Database key constants
const USERS_KEY = 'tokenquest_users';
const CURRENT_USER_KEY = 'tokenquest_current_user';
const GAME_RESULTS_KEY = 'tokenquest_game_results';

// Initialize database if it doesn't exist
export function initDatabase(): void {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(GAME_RESULTS_KEY)) {
    localStorage.setItem(GAME_RESULTS_KEY, JSON.stringify([]));
  }
  
  // Add console logs to debug database initialization
  console.log('Database initialized');
  console.log('Users:', getAllUsers());
}

// User functions
export function getAllUsers(): User[] {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

export function getUserById(id: string): User | null {
  const users = getAllUsers();
  return users.find(user => user.id === id) || null;
}

export function getUserByEmail(email: string): User | null {
  const users = getAllUsers();
  // Make email comparison case-insensitive
  return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
}

export function getUserByUsername(username: string): User | null {
  const users = getAllUsers();
  // Make username comparison case-insensitive
  return users.find(user => user.username.toLowerCase() === username.toLowerCase()) || null;
}

export function createUser(userData: Omit<User, 'id' | 'tokens' | 'createdAt'>): User {
  const users = getAllUsers();
  
  // Check if email already exists (case-insensitive)
  if (users.some(user => user.email.toLowerCase() === userData.email.toLowerCase())) {
    throw new Error('Email already exists');
  }
  
  // Check if username already exists (case-insensitive)
  if (users.some(user => user.username.toLowerCase() === userData.username.toLowerCase())) {
    throw new Error('Username already exists');
  }
  
  const newUser: User = {
    ...userData,
    id: crypto.randomUUID(),
    tokens: 0,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  // Log the user creation for debugging
  console.log('User created:', newUser);
  console.log('All users after creation:', getAllUsers());
  
  return newUser;
}

export function updateUser(userId: string, updates: Partial<Omit<User, 'id'>>): User {
  const users = getAllUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...updates
  };
  
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  // If current user is being updated, update that too
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    setCurrentUser(users[userIndex]);
  }
  
  return users[userIndex];
}

// Auth functions
export function getCurrentUser(): User | null {
  const currentUser = localStorage.getItem(CURRENT_USER_KEY);
  return currentUser ? JSON.parse(currentUser) : null;
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export function login(email: string, password: string): User {
  // Try to find user by email first
  let user = getUserByEmail(email);
  
  // If not found by email, try by username
  if (!user) {
    user = getUserByUsername(email);
  }
  
  // If user is still not found or password doesn't match
  if (!user || user.password !== password) {
    console.log('Login attempt failed:', { email, foundUser: !!user });
    throw new Error('Invalid email or password');
  }
  
  console.log('Login successful:', user);
  setCurrentUser(user);
  return user;
}

export function logout(): void {
  setCurrentUser(null);
}

// Game results functions
export function getAllGameResults(): GameResult[] {
  const results = localStorage.getItem(GAME_RESULTS_KEY);
  return results ? JSON.parse(results) : [];
}

export function getGameResultsByUserId(userId: string): GameResult[] {
  const results = getAllGameResults();
  return results.filter(result => result.userId === userId);
}

export function addGameResult(data: Omit<GameResult, 'id' | 'timestamp'>): GameResult {
  const results = getAllGameResults();
  
  const newResult: GameResult = {
    ...data,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString()
  };
  
  results.push(newResult);
  localStorage.setItem(GAME_RESULTS_KEY, JSON.stringify(results));
  
  // Update user tokens
  const user = getUserById(data.userId);
  if (user) {
    updateUser(user.id, { tokens: user.tokens + data.tokensEarned });
  }
  
  return newResult;
}

// Function to clear database (for debug purposes)
export function clearDatabase(): void {
  localStorage.removeItem(USERS_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(GAME_RESULTS_KEY);
  initDatabase();
  console.log('Database cleared and reinitialized');
}

// Initialize database on import
initDatabase();
