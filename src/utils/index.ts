export const getUserAvatarURL = (name: string, lastname: string): string => {
  return `https://ui-avatars.com/api/?name=${name}+${lastname}&background=random`
}
