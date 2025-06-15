
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  SkipBack, 
  SkipForward,
  Headphones,
  Loader2
} from 'lucide-react';
import { useBibleAudio } from '@/hooks/useBibleAudio';

interface BibleAudioPlayerProps {
  book: any;
  chapter: number;
  language: string;
}

const BibleAudioPlayer = ({ book, chapter, language }: BibleAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const { audioUrl, isLoading, error } = useBibleAudio(book.key, chapter, language);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newVolume = value[0];
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <Card 
        className="border-0 shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${book.colors.primary}15, ${book.colors.secondary}15)`
        }}
      >
        <CardContent className="flex items-center justify-center p-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Chargement de l'audio...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !audioUrl) {
    return (
      <Card className="border-0 shadow-lg bg-red-50">
        <CardContent className="flex items-center justify-center p-12">
          <div className="text-center">
            <Headphones className="w-8 h-8 mx-auto mb-4 text-red-400" />
            <p className="text-red-600">Audio non disponible</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="border-0 shadow-lg"
      style={{
        background: `linear-gradient(135deg, ${book.colors.primary}10, ${book.colors.secondary}10)`
      }}
    >
      <CardHeader 
        className="pb-4"
        style={{
          background: `linear-gradient(135deg, ${book.colors.primary}, ${book.colors.secondary})`
        }}
      >
        <CardTitle className="flex items-center gap-3 text-white">
          <Headphones className="w-6 h-6" />
          <div>
            <h3 className="text-xl font-bold">
              {language === 'fr' ? book.name.fr : book.name.en}
            </h3>
            <p className="text-sm opacity-90">Chapitre {chapter} - Audio</p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
        
        {/* Progress Bar */}
        <div className="space-y-2 mb-6">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {/* Skip back 30s */}}
            className="rounded-full"
          >
            <SkipBack className="w-4 h-4" />
          </Button>

          <Button
            onClick={togglePlay}
            size="lg"
            className="rounded-full w-14 h-14"
            style={{
              background: `linear-gradient(135deg, ${book.colors.primary}, ${book.colors.secondary})`
            }}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {/* Skip forward 30s */}}
            className="rounded-full"
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          
          <div className="flex-1">
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.1}
              onValueChange={handleVolumeChange}
              className="w-full"
            />
          </div>
          
          <Badge variant="outline" className="text-xs min-w-12 justify-center">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default BibleAudioPlayer;
