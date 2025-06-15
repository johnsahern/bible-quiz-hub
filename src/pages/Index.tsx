
import React from 'react';
import QuizCard from '@/components/QuizCard';
import VerseDuJour from '@/components/VerseDuJour';
import ProgressSection from '@/components/ProgressSection';
import { Brain, Users, Gamepad2 } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 animate-fade-in">
            Bible Quiz ✨
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Testez vos connaissances bibliques à travers différents modes de jeu passionnants
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <QuizCard
            icon={<Brain className="w-8 h-8" />}
            title="Quiz Solo"
            description="Questions à choix multiples avec différents niveaux de difficulté"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            delay="0.1s"
            route="/quiz-solo"
          />
          
          <QuizCard
            icon={<Users className="w-8 h-8" />}
            title="Quiz Multijoueur"
            description="Affrontez vos amis en temps réel dans des défis bibliques"
            color="bg-gradient-to-br from-purple-500 to-purple-600"
            delay="0.2s"
            route="/quiz-multijoueur"
          />
          
          <QuizCard
            icon={<Gamepad2 className="w-8 h-8" />}
            title="Centre de Jeux"
            description="Vrai/Faux, Puzzles de versets, Mots croisés et plus encore !"
            color="bg-gradient-to-br from-green-500 to-green-600"
            delay="0.3s"
            route="/games"
          />
        </div>

        <VerseDuJour language="fr" />
        <ProgressSection language="fr" />
      </div>
    </div>
  );
};

export default Index;
