
-- Supprimer les politiques problématiques
DROP POLICY IF EXISTS "Enable read access for room participants" ON quiz_room_players;
DROP POLICY IF EXISTS "Enable read access for room participants" ON quiz_rooms;

-- Créer une fonction de sécurité définie pour vérifier si un utilisateur est dans une salle
CREATE OR REPLACE FUNCTION public.user_in_room(_room_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.quiz_room_players 
    WHERE room_id = _room_id AND user_id = _user_id
  );
$$;

-- Créer une fonction pour vérifier si un utilisateur est hôte d'une salle
CREATE OR REPLACE FUNCTION public.user_is_host(_room_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.quiz_rooms 
    WHERE id = _room_id AND host_id = _user_id
  );
$$;

-- Nouvelle politique simplifiée pour quiz_rooms
CREATE POLICY "Enable read access for room participants"
ON quiz_rooms FOR SELECT
USING (
  auth.uid() = host_id OR 
  public.user_in_room(id, auth.uid())
);

-- Nouvelle politique simplifiée pour quiz_room_players
CREATE POLICY "Enable read access for room participants"
ON quiz_room_players FOR SELECT
USING (
  auth.uid() = user_id OR
  public.user_is_host(room_id, auth.uid())
);
