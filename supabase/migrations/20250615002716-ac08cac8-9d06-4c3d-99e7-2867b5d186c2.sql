
-- Supprimer TOUTES les politiques existantes pour recommencer proprement
DROP POLICY IF EXISTS "Enable read access for room participants" ON quiz_room_players;
DROP POLICY IF EXISTS "Enable read access for room participants" ON quiz_rooms;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON quiz_room_players;
DROP POLICY IF EXISTS "Enable update for own player record" ON quiz_room_players;
DROP POLICY IF EXISTS "Enable delete for own player record" ON quiz_room_players;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON quiz_rooms;
DROP POLICY IF EXISTS "Enable update for host" ON quiz_rooms;
DROP POLICY IF EXISTS "Enable delete for host" ON quiz_rooms;

-- Politiques très simples pour quiz_rooms (pas de référence circulaire)
CREATE POLICY "Allow authenticated users to read quiz rooms"
ON quiz_rooms FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to create quiz rooms"
ON quiz_rooms FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Allow hosts to update their rooms"
ON quiz_rooms FOR UPDATE
TO authenticated
USING (auth.uid() = host_id);

CREATE POLICY "Allow hosts to delete their rooms"
ON quiz_rooms FOR DELETE
TO authenticated
USING (auth.uid() = host_id);

-- Politiques très simples pour quiz_room_players (pas de référence circulaire)
CREATE POLICY "Allow authenticated users to read players"
ON quiz_room_players FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to join rooms"
ON quiz_room_players FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own player data"
ON quiz_room_players FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Allow users to leave rooms"
ON quiz_room_players FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Politiques simples pour quiz_room_answers
CREATE POLICY "Allow authenticated users to read answers"
ON quiz_room_answers FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow users to submit their answers"
ON quiz_room_answers FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their answers"
ON quiz_room_answers FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);
