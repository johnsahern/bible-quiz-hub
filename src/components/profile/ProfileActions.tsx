
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Save, Share2, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileActionsProps {
  isEditing: boolean;
  loading: boolean;
  onToggleEdit: () => void;
  onSave: () => Promise<void>;
  onShare: () => Promise<void>;
  onSignOut: () => Promise<void>;
}

const ProfileActions = ({ 
  isEditing, 
  loading, 
  onToggleEdit, 
  onSave, 
  onShare, 
  onSignOut 
}: ProfileActionsProps) => {
  return (
    <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
      <Button
        variant="outline"
        onClick={isEditing ? onSave : onToggleEdit}
        disabled={loading}
        className="flex-1 sm:flex-initial text-blue-600 border-blue-200 hover:bg-blue-50"
        size="sm"
      >
        {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
        {isEditing ? 'Sauvegarder' : 'Modifier'}
      </Button>
      
      <Button
        variant="outline"
        onClick={onShare}
        className="flex-1 sm:flex-initial text-green-600 border-green-200 hover:bg-green-50"
        size="sm"
      >
        <Share2 className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Partager</span>
      </Button>
      
      <Button
        variant="outline"
        onClick={onSignOut}
        className="flex-1 sm:flex-initial text-red-600 border-red-200 hover:bg-red-50"
        size="sm"
      >
        <LogOut className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Déconnexion</span>
      </Button>
    </div>
  );
};

export default ProfileActions;
