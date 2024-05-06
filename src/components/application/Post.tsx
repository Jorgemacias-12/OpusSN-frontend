import type { BasePost } from "@/types"
import { getTimeDifferenceString, getUserAvatarURL } from "@/utils"
import { Category } from "./Category";
import { useState } from "react";
import { useStore } from "@nanostores/react";
import { loggedUser } from "@/stores/UserStore";


export const Post = ({ id, Title, Content, CreationDate, Categories, User, UpdateDate }: BasePost) => {
  const [toggleCategories, setToggleCategories] = useState(false);
  const [toggleComments, setToggleComments] = useState(false);
  const currentUser = useStore(loggedUser);

  const date = new Date(CreationDate);

  const handleCategoriesToggle = () => {
    setToggleCategories(!toggleCategories);
  }

  const handleCommentsToggle = () => {
    setToggleComments(!toggleComments);
  }

  const isUserOwner = currentUser && currentUser.id === User.id;

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

      {
        isUserOwner && (
          <section className="flex gap-2 items-center justify-end">
            <button className="h-8 px-2 bg-blue-500 rounded-md">Editar</button>
            <button className="h-8 px-2 bg-red-500 rounded-md">Eliminar</button>
          </section>
        )
      }

      <section className="flex gap-2">
        <h4>Comentarios</h4>
        <button onClick={handleCommentsToggle}>
          {
            toggleComments ? <span className="fas fa-comment-slash"></span> : <span className="fas fa-comment"></span>
          }
        </button>  
      </section>
          
      {
        toggleComments && (
          <section>
            
          </section>
        )
      }
    </article>
  )
}

// <article className="rounded-md bg-brand-black-800 p-2 max-w-screen-xs w-full flex flex-col gap-4">
//   <section className="flex justify-between gap-4 items-center text-ellipsis">
//     <h3>{Title}</h3>
//     <p className="text-xs text-ellipsis">Hace {getDifferenceInDays(date, now)} días</p>
//   </section>
//   <section>
//     <textarea readOnly className="w-full bg-transparent rounded-md p-2" name="" id="" value={Content}>
//     </textarea>
//   </section>
//   <section className="flex flex-col gap-2">
//     <h4>Categorias</h4>
//     <div className="flex overflow-y-scroll gap-4">
//       {
//         Categories.map((cat, index) => {
//           return <p className="w-96" key={index}>{cat.Name}</p>
//         })
//       }
//     </div>
//   </section>
// </article>