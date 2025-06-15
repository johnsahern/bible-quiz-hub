
-- Ajouter une colonne pour les points Mots Croisés dans le profil
ALTER TABLE public.profiles 
ADD COLUMN crossword_points INTEGER DEFAULT 0;

-- Fonction pour mettre à jour les points Mots Croisés
CREATE OR REPLACE FUNCTION public.update_crossword_points()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Mettre à jour les points Mots Croisés du profil
  UPDATE public.profiles
  SET 
    crossword_points = crossword_points + NEW.total_points,
    updated_at = NOW()
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$;

-- Créer une table pour stocker l'historique des parties Mots Croisés
CREATE TABLE public.crossword_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  theme TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  total_clues INTEGER NOT NULL,
  completed_clues INTEGER NOT NULL,
  total_points INTEGER NOT NULL,
  time_spent INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS sur la table d'historique
ALTER TABLE public.crossword_history ENABLE ROW LEVEL SECURITY;

-- Politique pour que les utilisateurs voient seulement leur historique
CREATE POLICY "Users can view their own crossword history" 
  ON public.crossword_history 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Politique pour que les utilisateurs créent leur historique
CREATE POLICY "Users can create their own crossword history" 
  ON public.crossword_history 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Trigger pour mettre à jour automatiquement les points Mots Croisés
CREATE TRIGGER on_crossword_game_completed
  AFTER INSERT ON public.crossword_history
  FOR EACH ROW EXECUTE FUNCTION public.update_crossword_points();
