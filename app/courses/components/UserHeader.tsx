import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'next-auth';

type UserHeaderProps = {
  user: User | null | undefined;
};

export default function UserHeader({ user }: UserHeaderProps) {
  if (!user) return null;

  return (
    <div className="mb-6 flex items-center space-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.image || ''} alt={user.name || ''} />
        <AvatarFallback>
          {user.name ? user.name[0].toUpperCase() : 'U'}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">
        Hi, 👋 {user.name || 'User'}
        {user.role && <span className="ml-1 text-xs text-gray-500">({user.role})</span>}
      </span>
    </div>
  );
}