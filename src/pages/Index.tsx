
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import QuizCard from '@/components/QuizCard';
import VerseDuJour from '@/components/VerseDuJour';
import ProgressSection from '@/components/ProgressSection';
import { Brain, Users, Gamepad2, BookOpen } from 'lucide-react';

const Index = () => {
  const [language, setLanguage] = useState('fr');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      <Navigation language={language} setLanguage={setLanguage} />
      
      <div className="pt-20"> {/* Espace pour la navigation fixe */}
        <div className="container mx-auto px-4 py-12">
          <header className="text-center mb-16">
            <div className="relative">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-fade-in">
                Bible Quiz ✨
              </h1>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-2 -left-6 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-lg opacity-40 animate-pulse delay-1000"></div>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in">
              Explorez les Écritures à travers des jeux interactifs et enrichissants
            </p>
            <div className="mt-8 flex justify-center">
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </header>

          {/* Verset du Jour - En haut */}
          <div className="mb-16">
            <VerseDuJour language={language} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <QuizCard
              icon={<Brain className="w-8 h-8" />}
              title="Quiz Solo"
              description="Questions approfondies avec niveaux progressifs et analyses détaillées"
              color="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700"
              delay="0.1s"
              route="/quiz-solo"
            />
            
            <QuizCard
              icon={<Users className="w-8 h-8" />}
              title="Quiz Multijoueur"
              description="Défis en temps réel avec classements et récompenses communautaires"
              color="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700"
              delay="0.2s"
              route="/quiz-multijoueur"
            />
            
            <QuizCard
              icon={<Gamepad2 className="w-8 h-8" />}
              title="Centre de Jeux"
              description="Collection variée : Vrai/Faux, Puzzles, Mots croisés et défis quotidiens"
              color="bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600"
              delay="0.3s"
              route="/games"
            />

            <QuizCard
              icon={<BookOpen className="w-8 h-8" />}
              title="Lecture de la Bible et Audio"
              description="Explorez les Écritures par la lecture et l'écoute avec guides audio"
              color="bg-gradient-to-br from-orange-500 via-red-600 to-pink-600"
              delay="0.4s"
              route="/bible-reading"
            />
          </div>

          {/* Section de progression en bas */}
          <div className="space-y-12">
            <ProgressSection language={language} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
