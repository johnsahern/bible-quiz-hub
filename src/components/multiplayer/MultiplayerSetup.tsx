
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Plus, LogIn, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMultiplayerRoom } from '@/hooks/useMultiplayerRoom';
import { useAuth } from '@/contexts/AuthContext';
import { getThemes } from '@/data/themes';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const MultiplayerSetup: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createRoom, joinRoom, loading } = useMultiplayerRoom();
  
  // État pour créer une salle
  const [createForm, setCreateForm] = useState({
    theme: '',
    difficulty: 'moyen',
    questionCount: 10
  });
  
  // État pour rejoindre une salle
  const [roomCode, setRoomCode] = useState('');

  const themes = getThemes();

  const handleCreateRoom = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!createForm.theme) {
      toast({
        title: "Thème requis",
        description: "Veuillez sélectionner un thème pour votre quiz",
        variant: "destructive",
      });
      return;
    }

    const room = await createRoom(createForm.theme, createForm.difficulty, createForm.questionCount);
    if (room) {
      navigate(`/quiz-multijoueur/${room.id}`);
    }
  };

  const handleJoinRoom = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!roomCode.trim()) {
      toast({
        title: "Code requis",
        description: "Veuillez entrer un code de salle",
        variant: "destructive",
      });
      return;
    }

    const success = await joinRoom(roomCode.trim());
    if (success) {
      // La navigation sera gérée par le hook après avoir rejoint avec succès
      // Nous devons récupérer l'ID de la salle
      const { data: roomData } = await supabase
        .from('quiz_rooms')
        .select('id')
        .eq('room_code', roomCode.toUpperCase())
        .single();
      
      if (roomData) {
        navigate(`/quiz-multijoueur/${roomData.id}`);
      }
    }
  };

  if (!user) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6 text-center">
          <Gamepad2 className="w-12 h-12 text-white/60 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Quiz Multijoueur</h3>
          <p className="text-white/70 mb-4">
            Connectez-vous pour jouer avec vos amis !
          </p>
          <Button onClick={() => navigate('/auth')} className="w-full">
            Se connecter
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="w-5 h-5" />
          Quiz Multijoueur
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="create">Créer une salle</TabsTrigger>
            <TabsTrigger value="join">Rejoindre une salle</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme" className="text-white">Thème du quiz</Label>
              <Select value={createForm.theme} onValueChange={(value) => setCreateForm(prev => ({ ...prev, theme: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez un thème" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id}>
                      {theme.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="difficulty" className="text-white">Difficulté</Label>
                <Select value={createForm.difficulty} onValueChange={(value) => setCreateForm(prev => ({ ...prev, difficulty: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facile">Facile</SelectItem>
                    <SelectItem value="moyen">Moyen</SelectItem>
                    <SelectItem value="difficile">Difficile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="questions" className="text-white">Questions</Label>
                <Select value={createForm.questionCount.toString()} onValueChange={(value) => setCreateForm(prev => ({ ...prev, questionCount: parseInt(value) }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 questions</SelectItem>
                    <SelectItem value="10">10 questions</SelectItem>
                    <SelectItem value="15">15 questions</SelectItem>
                    <SelectItem value="20">20 questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleCreateRoom} disabled={loading} className="w-full bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              {loading ? 'Création...' : 'Créer la salle'}
            </Button>
          </TabsContent>
          
          <TabsContent value="join" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="roomCode" className="text-white">Code de la salle</Label>
              <Input
                id="roomCode"
                placeholder="Entrez le code à 6 caractères"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                maxLength={6}
                className="text-center font-mono text-lg tracking-wider"
              />
            </div>

            <Button onClick={handleJoinRoom} disabled={loading || !roomCode.trim()} className="w-full">
              <LogIn className="w-4 h-4 mr-2" />
              {loading ? 'Connexion...' : 'Rejoindre la salle'}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MultiplayerSetup;
