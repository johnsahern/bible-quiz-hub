
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import MultiplayerSetup from '@/components/multiplayer/MultiplayerSetup';

const MultiplayerSetupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Quiz Multijoueur</h1>
          <p className="text-white/70">Créez une salle ou rejoignez vos amis pour jouer ensemble</p>
        </div>

        {/* Setup Component */}
        <div className="max-w-md mx-auto">
          <MultiplayerSetup />
        </div>
      </div>
    </div>
  );
};

export default MultiplayerSetupPage;
