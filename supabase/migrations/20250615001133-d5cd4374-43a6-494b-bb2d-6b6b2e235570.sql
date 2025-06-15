
-- Supprimer les politiques existantes qui causent la récursion
DROP POLICY IF EXISTS "Users can view quiz room players" ON quiz_room_players;
DROP POLICY IF EXISTS "Users can create quiz room players" ON quiz_room_players;
DROP POLICY IF EXISTS "Users can update quiz room players" ON quiz_room_players;
DROP POLICY IF EXISTS "Users can delete quiz room players" ON quiz_room_players;

DROP POLICY IF EXISTS "Users can view quiz rooms" ON quiz_rooms;
DROP POLICY IF EXISTS "Users can create quiz rooms" ON quiz_rooms;
DROP POLICY IF EXISTS "Users can update quiz rooms" ON quiz_rooms;
DROP POLICY IF EXISTS "Users can delete quiz rooms" ON quiz_rooms;

DROP POLICY IF EXISTS "Users can view quiz room answers" ON quiz_room_answers;
DROP POLICY IF EXISTS "Users can create quiz room answers" ON quiz_room_answers;
DROP POLICY IF EXISTS "Users can update quiz room answers" ON quiz_room_answers;
DROP POLICY IF EXISTS "Users can delete quiz room answers" ON quiz_room_answers;

-- Activer RLS sur toutes les tables
ALTER TABLE quiz_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_room_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_room_answers ENABLE ROW LEVEL SECURITY;

-- Politiques pour quiz_rooms
CREATE POLICY "Enable read access for room participants"
ON quiz_rooms FOR SELECT
USING (
  auth.uid() = host_id OR 
  auth.uid() IN (
    SELECT user_id FROM quiz_room_players WHERE room_id = quiz_rooms.id
  )
);

CREATE POLICY "Enable insert for authenticated users"
ON quiz_rooms FOR INSERT
WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Enable update for host"
ON quiz_rooms FOR UPDATE
USING (auth.uid() = host_id);

CREATE POLICY "Enable delete for host"
ON quiz_rooms FOR DELETE
USING (auth.uid() = host_id);

-- Politiques pour quiz_room_players
CREATE POLICY "Enable read access for room participants"
ON quiz_room_players FOR SELECT
USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM quiz_rooms 
    WHERE quiz_rooms.id = quiz_room_players.room_id 
    AND (quiz_rooms.host_id = auth.uid() OR quiz_rooms.id IN (
      SELECT room_id FROM quiz_room_players WHERE user_id = auth.uid()
    ))
  )
);

CREATE POLICY "Enable insert for authenticated users"
ON quiz_room_players FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for own player record"
ON quiz_room_players FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Enable delete for own player record"
ON quiz_room_players FOR DELETE
USING (auth.uid() = user_id);

-- Politiques pour quiz_room_answers
CREATE POLICY "Enable read access for room participants"
ON quiz_room_answers FOR SELECT
USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM quiz_room_players 
    WHERE quiz_room_players.room_id = quiz_room_answers.room_id 
    AND quiz_room_players.user_id = auth.uid()
  )
);

CREATE POLICY "Enable insert for authenticated users"
ON quiz_room_answers FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for own answers"
ON quiz_room_answers FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Enable delete for own answers"
ON quiz_room_answers FOR DELETE
USING (auth.uid() = user_id);
