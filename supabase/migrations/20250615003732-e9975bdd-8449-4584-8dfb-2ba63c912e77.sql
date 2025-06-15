
-- Désactiver complètement RLS temporairement pour diagnostiquer
ALTER TABLE quiz_rooms DISABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_room_players DISABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_room_answers DISABLE ROW LEVEL SECURITY;

-- Supprimer TOUTES les politiques existantes
DROP POLICY IF EXISTS "Allow authenticated users to read quiz rooms" ON quiz_rooms;
DROP POLICY IF EXISTS "Allow authenticated users to create quiz rooms" ON quiz_rooms;
DROP POLICY IF EXISTS "Allow hosts to update their rooms" ON quiz_rooms;
DROP POLICY IF EXISTS "Allow hosts to delete their rooms" ON quiz_rooms;
DROP POLICY IF EXISTS "Allow authenticated users to read players" ON quiz_room_players;
DROP POLICY IF EXISTS "Allow authenticated users to join rooms" ON quiz_room_players;
DROP POLICY IF EXISTS "Allow users to update their own player data" ON quiz_room_players;
DROP POLICY IF EXISTS "Allow users to leave rooms" ON quiz_room_players;
DROP POLICY IF EXISTS "Allow authenticated users to read answers" ON quiz_room_answers;
DROP POLICY IF EXISTS "Allow users to submit their answers" ON quiz_room_answers;
DROP POLICY IF EXISTS "Allow users to update their answers" ON quiz_room_answers;

-- Supprimer les fonctions de sécurité qui pourraient causer des problèmes
DROP FUNCTION IF EXISTS public.user_in_room(uuid, uuid);
DROP FUNCTION IF EXISTS public.user_is_host(uuid, uuid);

-- Réactiver RLS avec des politiques ultra-simples
ALTER TABLE quiz_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_room_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_room_answers ENABLE ROW LEVEL SECURITY;

-- Politiques ultra-basiques - AUCUNE référence entre tables
CREATE POLICY "quiz_rooms_select" ON quiz_rooms FOR SELECT TO authenticated USING (true);
CREATE POLICY "quiz_rooms_insert" ON quiz_rooms FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "quiz_rooms_update" ON quiz_rooms FOR UPDATE TO authenticated USING (true);
CREATE POLICY "quiz_rooms_delete" ON quiz_rooms FOR DELETE TO authenticated USING (true);

CREATE POLICY "quiz_room_players_select" ON quiz_room_players FOR SELECT TO authenticated USING (true);
CREATE POLICY "quiz_room_players_insert" ON quiz_room_players FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "quiz_room_players_update" ON quiz_room_players FOR UPDATE TO authenticated USING (true);
CREATE POLICY "quiz_room_players_delete" ON quiz_room_players FOR DELETE TO authenticated USING (true);

CREATE POLICY "quiz_room_answers_select" ON quiz_room_answers FOR SELECT TO authenticated USING (true);
CREATE POLICY "quiz_room_answers_insert" ON quiz_room_answers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "quiz_room_answers_update" ON quiz_room_answers FOR UPDATE TO authenticated USING (true);
