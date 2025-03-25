
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from 'next-themes';

import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Games from './pages/Games';
import NFTMarketplace from './pages/NFTMarketplace';
import TokenExchange from './pages/TokenExchange';
import Profile from './pages/Profile';
import ChatPage from './components/chat/ChatPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/games" element={<Games />} />
            <Route path="/nft" element={<NFTMarketplace />} />
            <Route path="/exchange" element={<TokenExchange />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster richColors />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
