import type { BasePost } from "@/types"
import { getAPIURL, getTimeDifferenceString, getUserAvatarURL } from "@/utils"
import { Category } from "./Category";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { loggedUser } from "@/stores/UserStore";
import type { Comment as CommentType } from '@/types';
import { Comment as CommentComponent } from "../Comment";
import { CreateComment } from "../CreateComment";

export const Post = ({ id, Title, Content, CreationDate, Categories, User, UpdateDate }: BasePost) => {
  const [toggleCategories, setToggleCategories] = useState(false);
  const [toggleComments, setToggleComments] = useState(false);
  // TODO: import the type from the backend project :P
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const currentUser = useStore(loggedUser);

  const date = new Date(CreationDate);

  const handleCategoriesToggle = () => {
    setToggleCategories(!toggleCategories);
  }

  const handleCommentsToggle = () => {
    setToggleComments(!toggleComments);
  }

  const fetchComments = useCallback(async () => {
    const apiURL = `${getAPIURL()}/comments/${id}`;

    try {

      const response = await fetch(apiURL);

      const data = await response.json();

      const { comments } = data;

      setComments(comments);
    }
    catch (err) {
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const isUserOwner = currentUser && currentUser.id === User.id;

  const validUser = currentUser && currentUser.id && currentUser.Name && currentUser.LastName && currentUser.Email && currentUser.Role != null && currentUser.UserName;

  return (
    <article className="rounded-md bg-brand-black-800 p-2 flex flex-col w-full max-w-screen-xs gap-2">
      <section className="flex justify-between">
        <h3>{Title}</h3>
        <img src={getUserAvatarURL(User.Name, User.LastName)} alt={`${User.UserName} Avtar image`} width={24} height={24} className="rounded-full" />
      </section>

      <p className="text-slate-500 text-right text-xs">{getTimeDifferenceString(date)}</p>

      <textarea title={`${User.UserName} post`} className="bg-transparent rounded-md p-2" name="postContent" id={`post-${id}`} value={Content} readOnly></textarea>

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <h4>Categorías</h4>
          <button onClick={handleCategoriesToggle}>
            {
              toggleCategories ? <span className="fas fa-eye-slash text-red-400"></span> : <span className="fas fa-eye"></span>
            }
          </button>
        </div>
        <div>
          {
            toggleCategories && (
              <>
                <div className="flex overflow-hidden overflow-x-auto gap-2">
                  {Categories.map(cat => <Category key={cat.id} name={cat.Name} id={cat.id} />)}
                </div>
              </>
            )
          }
        </div>

      </section>

      <section className="flex gap-2">
        <h4>Comentarios</h4>
        <button onClick={handleCommentsToggle}>
          {
            toggleComments ? <span className="fas fa-comment-slash text-red-500"></span> : <span className="fas fa-comment"></span>
          }
        </button>
      </section>

      {
        toggleComments && (
          <section className="flex flex-col gap-2">
            {
              comments && comments.length === 0 && <p className="bg-blue-500 rounded-md p-2">No hay posts, se el primero en comentar</p>
            }
            {
              comments && comments.map((comment) => {
                return <CommentComponent id={comment.id} Content={comment.Content} CreatedAt={comment.CreatedAt} User={comment.User} userId={comment.userId} key={comment.id} postId={comment.postId} />
              })
            }
          </section>
        )
      }

      {
        validUser && <CreateComment triggerCommentsFetch={fetchComments} User={currentUser} PostId={id} />
      }
    </article>
  )
}