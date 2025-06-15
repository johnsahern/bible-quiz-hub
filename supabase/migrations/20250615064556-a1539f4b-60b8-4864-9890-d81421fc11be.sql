
-- Ajouter une colonne pour les points multijoueur dans le profil
ALTER TABLE public.profiles 
ADD COLUMN multiplayer_points INTEGER DEFAULT 0;

-- Fonction pour mettre à jour les points multijoueur
CREATE OR REPLACE FUNCTION public.update_multiplayer_points()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Mettre à jour les points multijoueur du profil
  UPDATE public.profiles
  SET 
    multiplayer_points = multiplayer_points + NEW.points_earned,
    updated_at = NOW()
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$;

-- Trigger pour mettre à jour automatiquement les points multijoueur
CREATE TRIGGER on_multiplayer_answer_scored
  AFTER INSERT ON public.quiz_room_answers
  FOR EACH ROW EXECUTE FUNCTION public.update_multiplayer_points();
