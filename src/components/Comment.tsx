import type { Comment as CommentType } from "@/types"
import { getTimeDifferenceString, getUserAvatarURL } from "@/utils"

export const Comment = ({id, Content, CreatedAt, User, postId}: CommentType) => {
  
  const date = new Date(CreatedAt);

  return (
    <article data-post-id={postId} data-comment-id={id} className="bg-brand-black-700 p-2 rounded-md flex items-center gap-2">
      <img src={getUserAvatarURL(User.Name, User.LastName)} alt={`${User.Name} ${User.LastName} avatar`} width={32} height={32} className="rounded-full" />
      <p className="flex-1 text-xs">
        {
          Content
        }
      </p>
      <p className="text-slate-400 text-xs">
        {
          getTimeDifferenceString(date)
        }
      </p>
    </article>
  )
}
