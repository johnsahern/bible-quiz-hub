
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Plus, LogIn, Gamepad2, ArrowLeft, Brain, CheckCircle, Puzzle, Grid3X3, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getThemes } from '@/data/themes';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useMultiplayerGameOperations } from '@/hooks/multiplayer/useMultiplayerGameOperations';
import { GameType } from '@/types/multiplayerGameTypes';

const MultiplayerSetup: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { startMultiplayerGame } = useMultiplayerGameOperations(user?.id, undefined, true);
  
  // État pour créer une salle
  const [createForm, setCreateForm] = useState({
    gameType: 'quiz' as GameType,
    theme: '',
    difficulty: 'moyen',
    questionCount: 10
  });
  
  // État pour rejoindre une salle
  const [roomCode, setRoomCode] = useState('');
  const [loading, setLoading] = useState(false);

  const themes = getThemes();

  const gameTypes = [
    { id: 'quiz', name: 'Quiz', icon: Brain, description: 'Questions à choix multiples' },
    { id: 'true-false', name: 'Vrai/Faux', icon: CheckCircle, description: 'Questions vrai ou faux' },
    { id: 'verse-puzzle', name: 'Puzzle de Versets', icon: Puzzle, description: 'Reconstituer des versets' },
    { id: 'crossword', name: 'Mots Croisés', icon: Grid3X3, description: 'Grille de mots croisés' },
    { id: 'word-search', name: 'Mots Cachés', icon: Search, description: 'Trouver des mots cachés' }
  ];

  const handleCreateRoom = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!createForm.theme) {
      toast({
        title: "Thème requis",
        description: "Veuillez sélectionner un thème pour votre jeu",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Générer un code de salle
      const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      // Créer la salle avec le type de jeu sélectionné
      const { data: room, error } = await supabase
        .from('quiz_rooms')
        .insert({
          room_code: roomCode,
          host_id: user.id,
          theme: createForm.theme,
          difficulty: createForm.difficulty,
          question_count: createForm.questionCount,
          status: 'waiting',
          max_players: 6,
          current_question: 0,
          questions: [],
          game_type: createForm.gameType,
          game_data: null,
          game_state: null
        })
        .select()
        .single();

      if (error) throw error;

      // Ajouter l'hôte comme joueur
      const { error: playerError } = await supabase
        .from('quiz_room_players')
        .insert({
          room_id: room.id,
          user_id: user.id,
          username: user.email?.split('@')[0] || 'Joueur',
          score: 0,
          correct_answers: 0,
          is_ready: true
        });

      if (playerError) throw playerError;

      navigate(`/quiz-multijoueur/${room.id}`);
    } catch (error) {
      console.error('Error creating room:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la salle",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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

    setLoading(true);
    try {
      // Vérifier que la salle existe
      const { data: roomData, error: roomError } = await supabase
        .from('quiz_rooms')
        .select('*')
        .eq('room_code', roomCode.toUpperCase())
        .single();

      if (roomError || !roomData) {
        throw new Error('Salle introuvable');
      }

      // Vérifier si l'utilisateur est déjà dans la salle
      const { data: existingPlayer } = await supabase
        .from('quiz_room_players')
        .select('*')
        .eq('room_id', roomData.id)
        .eq('user_id', user.id)
        .single();

      if (!existingPlayer) {
        // Ajouter le joueur à la salle
        const { error: playerError } = await supabase
          .from('quiz_room_players')
          .insert({
            room_id: roomData.id,
            user_id: user.id,
            username: user.email?.split('@')[0] || 'Joueur',
            score: 0,
            correct_answers: 0,
            is_ready: false
          });

        if (playerError) throw playerError;
      }

      navigate(`/quiz-multijoueur/${roomData.id}`);
    } catch (error) {
      console.error('Error joining room:', error);
      toast({
        title: "Erreur",
        description: "Impossible de rejoindre la salle",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-md mx-auto mt-20">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Gamepad2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Jeux Multijoueur</h3>
              <p className="text-gray-600 mb-4">
                Connectez-vous pour jouer avec vos amis !
              </p>
              <Button onClick={() => navigate('/auth')} className="w-full">
                Se connecter
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button onClick={() => navigate('/centre-jeux')} variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au centre de jeux
          </Button>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Jeux Multijoueur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="create" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="create">Créer une salle</TabsTrigger>
                <TabsTrigger value="join">Rejoindre une salle</TabsTrigger>
              </TabsList>
              
              <TabsContent value="create" className="space-y-4">
                {/* Sélection du type de jeu */}
                <div className="space-y-2">
                  <Label>Type de jeu</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {gameTypes.map((gameType) => {
                      const IconComponent = gameType.icon;
                      return (
                        <button
                          key={gameType.id}
                          onClick={() => setCreateForm(prev => ({ ...prev, gameType: gameType.id as GameType }))}
                          className={`p-3 rounded-lg border-2 transition-all text-left ${
                            createForm.gameType === gameType.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <IconComponent className="w-4 h-4" />
                            <span className="font-medium text-sm">{gameType.name}</span>
                          </div>
                          <p className="text-xs text-gray-600">{gameType.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Thème du jeu</Label>
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
                    <Label htmlFor="difficulty">Difficulté</Label>
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
                    <Label htmlFor="questions">
                      {createForm.gameType === 'verse-puzzle' ? 'Puzzles' : 'Questions'}
                    </Label>
                    <Select value={createForm.questionCount.toString()} onValueChange={(value) => setCreateForm(prev => ({ ...prev, questionCount: parseInt(value) }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {createForm.gameType === 'verse-puzzle' ? (
                          <>
                            <SelectItem value="3">3 puzzles</SelectItem>
                            <SelectItem value="5">5 puzzles</SelectItem>
                            <SelectItem value="7">7 puzzles</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="5">5 questions</SelectItem>
                            <SelectItem value="10">10 questions</SelectItem>
                            <SelectItem value="15">15 questions</SelectItem>
                            <SelectItem value="20">20 questions</SelectItem>
                          </>
                        )}
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
                  <Label htmlFor="roomCode">Code de la salle</Label>
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
      </div>
    </div>
  );
};

export default MultiplayerSetup;
