
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, Target, RotateCcw, Home, Share2 } from 'lucide-react';
import { QuizResult } from '@/types/quiz';

interface QuizResultsProps {
  result: QuizResult;
  onPlayAgain: () => void;
  onBackToHome: () => void;
}

const QuizResults = ({ result, onPlayAgain, onBackToHome }: QuizResultsProps) => {
  const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);
  
  const getPerformanceMessage = () => {
    if (percentage === 100) return "Parfait ! Vous maîtrisez parfaitement ce sujet biblique !";
    if (percentage >= 80) return "Excellent ! Vous avez une très bonne connaissance de la Bible.";
    if (percentage >= 60) return "Bien joué ! Continuez à étudier la Parole de Dieu.";
    if (percentage >= 40) return "Bon début ! La pratique vous aidera à progresser.";
    return "Courage ! Chaque étude nous rapproche de la vérité.";
  };

  const getEncouragingVerse = () => {
    if (percentage >= 80) {
      return {
        text: "Ta parole est une lampe à mes pieds, Et une lumière sur mon sentier.",
        ref: "Psaume 119:105"
      };
    } else if (percentage >= 60) {
      return {
        text: "Heureux ceux qui écoutent la parole de Dieu, et qui la gardent !",
        ref: "Luc 11:28"
      };
    } else {
      return {
        text: "Toute Écriture est inspirée de Dieu, et utile pour enseigner, pour convaincre...",
        ref: "2 Timothée 3:16"
      };
    }
  };

  const verse = getEncouragingVerse();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleShare = async () => {
    const shareText = `J'ai obtenu ${result.correctAnswers}/${result.totalQuestions} bonnes réponses au BibleQuiz+ avec ${result.score} points ! Badge: ${result.badge} 🏆`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mon résultat BibleQuiz+',
          text: shareText,
          url: window.location.origin
        });
      } catch (error) {
        console.log('Partage annulé');
      }
    } else {
      // Fallback: copier dans le presse-papier
      navigator.clipboard.writeText(shareText);
      alert('Résultat copié dans le presse-papier !');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Résultat principal */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-blue-900">Quiz Terminé !</CardTitle>
          <p className="text-blue-700">{getPerformanceMessage()}</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Score principal */}
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-900 mb-2">
              {result.correctAnswers}/{result.totalQuestions}
            </div>
            <div className="text-lg text-blue-700 mb-4">
              {percentage}% de bonnes réponses
            </div>
            {result.badge && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-lg px-4 py-2">
                🏆 {result.badge}
              </Badge>
            )}
          </div>

          {/* Statistiques détaillées */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm text-gray-600">Score Final</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{result.score}</div>
              <div className="text-xs text-gray-500">points</div>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm text-gray-600">Temps Total</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{formatTime(result.timeSpent)}</div>
              <div className="text-xs text-gray-500">minutes</div>
            </div>
          </div>

          {/* Verset encourageant */}
          <div className="bg-white rounded-lg p-4 border-l-4 border-blue-400">
            <p className="text-blue-800 italic mb-2">"{verse.text}"</p>
            <p className="text-blue-600 text-sm font-medium">- {verse.ref}</p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          onClick={onPlayAgain}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Rejouer
        </Button>
        
        <Button
          onClick={handleShare}
          variant="outline"
          className="border-blue-500 text-blue-600 hover:bg-blue-50"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Partager
        </Button>
        
        <Button
          onClick={onBackToHome}
          variant="outline"
          className="border-gray-300 text-gray-600 hover:bg-gray-50"
        >
          <Home className="w-4 h-4 mr-2" />
          Accueil
        </Button>
      </div>

      {/* Encouragement pour continuer */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4 text-center">
          <h3 className="font-semibold text-amber-800 mb-2">Continuez votre apprentissage !</h3>
          <p className="text-amber-700 text-sm">
            Essayez d'autres thématiques ou défiez vos amis en mode multijoueur pour approfondir votre connaissance de la Bible.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResults;
