
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CreditCard, Loader2 } from 'lucide-react';

interface QuizErrorStateProps {
  error: string;
  onRetry: () => void;
}

const QuizErrorState = ({ error, onRetry }: QuizErrorStateProps) => {
  const isQuotaError = error.includes('Quota') || error.includes('quota') || error.includes('429');

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white shadow-lg">
        <CardContent className="p-8 text-center">
          {isQuotaError ? (
            <CreditCard className="w-12 h-12 mx-auto mb-4 text-orange-500" />
          ) : (
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          )}
          
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {isQuotaError ? 'Quota Gemini 1.5 dépassé' : 'Erreur de génération'}
          </h2>
          
          <p className="text-red-600 mb-4">{error}</p>
          
          {isQuotaError && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-orange-800">
                <strong>Solution :</strong> Vérifiez votre plan de facturation Gemini 1.5 ou attendez la réinitialisation de votre quota.
              </p>
            </div>
          )}
          
          <div className="space-y-2">
            <Button
              onClick={onRetry}
              className="w-full"
              variant={isQuotaError ? "outline" : "default"}
            >
              <Loader2 className="w-4 h-4 mr-2" />
              Réessayer
            </Button>
            <p className="text-xs text-gray-500">
              {isQuotaError
                ? "Peut nécessiter d'attendre quelques minutes"
                : "Vérifiez votre connexion internet"
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizErrorState;
