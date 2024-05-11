import { getUserAvatarURL } from '@/utils';

interface AvatarProps {
  name: string;
  lastname: string;
}

export const Avatar = ({ name, lastname }: AvatarProps) => {
  return (
    <img 
      src={getUserAvatarURL(name, lastname)} 
      aria-label={`${name} ${lastname} Avatar image`} 
      alt={`${name} ${lastname} Avatar image`}
    >
      Avatar
    </img>
  )
}
