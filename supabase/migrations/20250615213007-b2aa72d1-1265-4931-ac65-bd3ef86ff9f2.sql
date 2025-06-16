
-- Ajouter une colonne pour les points Vrai/Faux dans le profil
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS true_false_points INTEGER DEFAULT 0;

-- Supprimer l'ancienne fonction si elle existe
DROP FUNCTION IF EXISTS public.update_true_false_points();

-- Fonction corrigée pour mettre à jour les points Vrai/Faux
CREATE OR REPLACE FUNCTION public.update_true_false_points()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Mettre à jour les points Vrai/Faux du profil avec total_points au lieu de points_earned
  UPDATE public.profiles
  SET 
    true_false_points = true_false_points + NEW.total_points,
    updated_at = NOW()
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$;

-- Créer une table pour stocker l'historique des parties Vrai/Faux
CREATE TABLE IF NOT EXISTS public.true_false_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  theme TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  total_points INTEGER NOT NULL,
  time_spent INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS sur la table d'historique
ALTER TABLE public.true_false_history ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Users can view their own true false history" ON public.true_false_history;
DROP POLICY IF EXISTS "Users can create their own true false history" ON public.true_false_history;

-- Politique pour que les utilisateurs voient seulement leur historique
CREATE POLICY "Users can view their own true false history" 
  ON public.true_false_history 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Politique pour que les utilisateurs créent leur historique
CREATE POLICY "Users can create their own true false history" 
  ON public.true_false_history 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Supprimer l'ancien trigger s'il existe
DROP TRIGGER IF EXISTS on_true_false_game_completed ON public.true_false_history;

-- Trigger pour mettre à jour automatiquement les points Vrai/Faux
CREATE TRIGGER on_true_false_game_completed
  AFTER INSERT ON public.true_false_history
  FOR EACH ROW EXECUTE FUNCTION public.update_true_false_points();
