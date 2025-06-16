
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import SoloQuiz from "./pages/SoloQuiz";
import GameCenter from "./pages/GameCenter";
import MultiplayerSetup from "./pages/MultiplayerSetup";
import MultiplayerQuiz from "./pages/MultiplayerQuiz";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quiz-solo" element={<SoloQuiz />} />
            <Route path="/centre-jeux" element={<GameCenter />} />
            <Route path="/games" element={<Navigate to="/centre-jeux" replace />} />
            <Route path="/quiz-multijoueur" element={<Navigate to="/quiz-multijoueur-setup" replace />} />
            <Route path="/quiz-multijoueur-setup" element={<MultiplayerSetup />} />
            <Route path="/quiz-multijoueur/:roomId" element={<MultiplayerQuiz />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/profile" element={<Navigate to="/profil" replace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
