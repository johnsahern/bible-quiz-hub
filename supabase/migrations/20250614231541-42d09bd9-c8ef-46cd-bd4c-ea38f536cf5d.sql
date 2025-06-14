
-- Table pour les salles de quiz multijoueur
CREATE TABLE public.quiz_rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_code VARCHAR(6) NOT NULL UNIQUE,
  host_id UUID REFERENCES auth.users(id) NOT NULL,
  theme VARCHAR(50) NOT NULL,
  difficulty VARCHAR(20) NOT NULL,
  question_count INTEGER NOT NULL DEFAULT 10,
  status VARCHAR(20) NOT NULL DEFAULT 'waiting', -- 'waiting', 'playing', 'finished'
  max_players INTEGER NOT NULL DEFAULT 8,
  current_question INTEGER DEFAULT 0,
  questions JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  started_at TIMESTAMP WITH TIME ZONE,
  finished_at TIMESTAMP WITH TIME ZONE
);

-- Table pour les participants des salles
CREATE TABLE public.quiz_room_players (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES public.quiz_rooms(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  username VARCHAR(50) NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  current_answer INTEGER,
  answer_time TIMESTAMP WITH TIME ZONE,
  is_ready BOOLEAN NOT NULL DEFAULT false,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(room_id, user_id)
);

-- Table pour les réponses en temps réel
CREATE TABLE public.quiz_room_answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES public.quiz_rooms(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  question_index INTEGER NOT NULL,
  answer_index INTEGER NOT NULL,
  response_time INTEGER NOT NULL, -- en millisecondes
  is_correct BOOLEAN NOT NULL,
  points_earned INTEGER NOT NULL DEFAULT 0,
  answered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS sur toutes les tables
ALTER TABLE public.quiz_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_room_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_room_answers ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour quiz_rooms
CREATE POLICY "Users can view quiz rooms they participate in" 
  ON public.quiz_rooms 
  FOR SELECT 
  USING (
    auth.uid() = host_id OR 
    EXISTS (
      SELECT 1 FROM public.quiz_room_players 
      WHERE room_id = id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create quiz rooms" 
  ON public.quiz_rooms 
  FOR INSERT 
  WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Room hosts can update their rooms" 
  ON public.quiz_rooms 
  FOR UPDATE 
  USING (auth.uid() = host_id);

-- Politiques RLS pour quiz_room_players
CREATE POLICY "Users can view players in their rooms" 
  ON public.quiz_room_players 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.quiz_rooms 
      WHERE id = room_id AND (
        host_id = auth.uid() OR 
        EXISTS (
          SELECT 1 FROM public.quiz_room_players p2 
          WHERE p2.room_id = id AND p2.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Users can join rooms" 
  ON public.quiz_room_players 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own player data" 
  ON public.quiz_room_players 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Politiques RLS pour quiz_room_answers
CREATE POLICY "Users can view answers in their rooms" 
  ON public.quiz_room_answers 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.quiz_rooms 
      WHERE id = room_id AND (
        host_id = auth.uid() OR 
        EXISTS (
          SELECT 1 FROM public.quiz_room_players 
          WHERE room_id = id AND user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Users can insert their own answers" 
  ON public.quiz_room_answers 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Fonction pour générer un code de salle unique
CREATE OR REPLACE FUNCTION public.generate_room_code()
RETURNS VARCHAR(6)
LANGUAGE plpgsql
AS $$
DECLARE
  code VARCHAR(6);
  code_exists BOOLEAN;
BEGIN
  LOOP
    -- Générer un code de 6 caractères alphanumériques
    code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
    
    -- Vérifier si le code existe déjà
    SELECT EXISTS(SELECT 1 FROM public.quiz_rooms WHERE room_code = code) INTO code_exists;
    
    -- Si le code n'existe pas, on peut l'utiliser
    IF NOT code_exists THEN
      EXIT;
    END IF;
  END LOOP;
  
  RETURN code;
END;
$$;

-- Fonction pour nettoyer les salles inactives (plus de 24h)
CREATE OR REPLACE FUNCTION public.cleanup_inactive_rooms()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM public.quiz_rooms 
  WHERE created_at < NOW() - INTERVAL '24 hours'
    AND status IN ('waiting', 'finished');
END;
$$;

-- Index pour améliorer les performances
CREATE INDEX idx_quiz_rooms_room_code ON public.quiz_rooms(room_code);
CREATE INDEX idx_quiz_rooms_status ON public.quiz_rooms(status);
CREATE INDEX idx_quiz_room_players_room_id ON public.quiz_room_players(room_id);
CREATE INDEX idx_quiz_room_players_user_id ON public.quiz_room_players(user_id);
CREATE INDEX idx_quiz_room_answers_room_id ON public.quiz_room_answers(room_id);
