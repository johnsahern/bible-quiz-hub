
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import SoloQuiz from "./pages/SoloQuiz";
import MultiplayerSetup from "./pages/MultiplayerSetup";
import MultiplayerQuiz from "./pages/MultiplayerQuiz";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import GameCenter from "./pages/GameCenter";
import BibleReading from "./pages/BibleReading";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quiz-solo" element={<SoloQuiz />} />
            <Route path="/games" element={<GameCenter />} />
            <Route path="/bible-reading" element={<BibleReading />} />
            <Route path="/quiz-multijoueur" element={<MultiplayerSetup />} />
            <Route path="/quiz-multijoueur/:roomId" element={<MultiplayerQuiz />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
