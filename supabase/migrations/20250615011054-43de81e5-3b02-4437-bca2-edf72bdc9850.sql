
-- Fix the infinite recursion in RLS policies for quiz_room_players
-- First, drop the existing problematic policies
DROP POLICY IF EXISTS "Users can view players in their rooms" ON public.quiz_room_players;
DROP POLICY IF EXISTS "Users can join rooms" ON public.quiz_room_players;
DROP POLICY IF EXISTS "Users can update their own player data" ON public.quiz_room_players;

-- Create a security definer function to check if user is in a room
CREATE OR REPLACE FUNCTION public.user_is_in_room(room_id uuid, user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.quiz_room_players 
    WHERE quiz_room_players.room_id = user_is_in_room.room_id 
    AND quiz_room_players.user_id = user_is_in_room.user_id
  );
$$;

-- Create a security definer function to check if user is room host
CREATE OR REPLACE FUNCTION public.user_is_room_host(room_id uuid, user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.quiz_rooms 
    WHERE quiz_rooms.id = user_is_room_host.room_id 
    AND quiz_rooms.host_id = user_is_room_host.user_id
  );
$$;

-- Recreate policies without recursion
CREATE POLICY "Users can view players in rooms they participate in" 
  ON public.quiz_room_players 
  FOR SELECT 
  USING (
    auth.uid() = user_id OR 
    public.user_is_in_room(room_id, auth.uid()) OR
    public.user_is_room_host(room_id, auth.uid())
  );

CREATE POLICY "Users can join rooms" 
  ON public.quiz_room_players 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own player data" 
  ON public.quiz_room_players 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own player data" 
  ON public.quiz_room_players 
  FOR DELETE 
  USING (auth.uid() = user_id);
