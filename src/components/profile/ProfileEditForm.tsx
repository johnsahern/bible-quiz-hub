
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EditData {
  username: string;
  full_name: string;
}

interface ProfileEditFormProps {
  editData: EditData;
  onDataChange: (data: EditData) => void;
  onSave: () => Promise<void>;
  loading: boolean;
}

const ProfileEditForm = ({ editData, onDataChange, onSave, loading }: ProfileEditFormProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="username" className="text-sm font-medium text-gray-700">Nom d'utilisateur</Label>
          <Input
            id="username"
            value={editData.username}
            onChange={(e) => onDataChange({ ...editData, username: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="fullname" className="text-sm font-medium text-gray-700">Nom complet</Label>
          <Input
            id="fullname"
            value={editData.full_name}
            onChange={(e) => onDataChange({ ...editData, full_name: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>
      <Button onClick={onSave} disabled={loading} className="w-full sm:w-auto">
        {loading ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
      </Button>
    </div>
  );
};

export default ProfileEditForm;
