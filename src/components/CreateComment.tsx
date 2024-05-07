import type { SafeUser } from "@/types"
import { getUserAvatarURL } from "@/utils"
import { useState, type FormEvent } from "react";


export const CreateComment = ({ id, Name, LastName, Email, Role, UserName }: SafeUser) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const createComment = async () => {

  }

  const validationChain = [
    {
      id: 'Content',
      required: true,
    }
  ]

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formEl = event.target as HTMLFormElement;

    const formData = new FormData(formEl);

    const newComment = "";

    if (!newComment) { return; }

    await createComment();
  }

  return (
    <form onSubmit={onSubmit} className="bg-brand-black-700 p-2 rounded-md flex items-center gap-2 flex-wrap justify-end">
      <div className="flex gap-2">
        <img src={getUserAvatarURL(Name, LastName)} alt={`${Name} ${LastName} avatar`} width={32} height={32} className="rounded-full" />
        <input name="Content" id="Content" type="text" className="bg-transparent border rounded-md h-8 px-2 w-full" />
      </div>
      <button className="bg-indigo-600 px-2 h-8 rounded-md active:bg-indigo-500" type="button">Comentar</button>
    </form>
  )
}
