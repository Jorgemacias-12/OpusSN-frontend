import type { CommentCreationResponse, CommentData, CommentError, SafeUser } from "@/types"
import { convertToCommentData, getAPIURL, getUserAvatarURL } from "@/utils"
import { useState, type ChangeEvent, type FormEvent } from "react";

import styles from '@/styles/form.module.css';

interface CreateCommentProps {
  User: SafeUser;
  PostId: number;
  triggerCommentsFetch: () => Promise<void>
}

export const CreateComment = ({ User, PostId, triggerCommentsFetch }: CreateCommentProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState<CommentCreationResponse | null>(null);
  const [errors, setErrors] = useState<CommentError | null>(null);

  const validationChain = [
    {
      id: 'Content',
      required: true,
    }
  ]

  let errorsCount = 0;

  const inputValidation = async (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value.trim();
    const inputId = target.id;

    const field = validationChain.find((item) => item.id === inputId);

    const errorEl = document.querySelector(`.${styles.formFieldInputError}`);

    if (!field) return;
    if (!errorEl) return;

    if (field.required && inputValue.trim() === '') {
      errorsCount++;

      target.classList.add('border-red-500');
      errorEl.textContent = `El campo de Comentario es obligatorio`;
      return;
    }
    else {
      if (errorsCount > 0) errorsCount--;
    }

    errorEl.textContent = "";
    target.classList.remove('border-red-500');
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formEl = event.target as HTMLFormElement;

    const formData = new FormData(formEl);

    const newComment = convertToCommentData(formData);

    if (!newComment) { return; }

    await createComment(newComment);
  }

  const createComment = async (commentData: CommentData) => {
    if (errorsCount !== 0) return;
    
    setError(false);
    setLoading(true);
    setResponse(null);


    const apiURL = `${getAPIURL()}/comments`;

    const fetchOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData)
    }

    setLoading(true);

    try {
      const response = await fetch(apiURL, fetchOptions);

      if (!response.ok) {
        const errors = await response.json();

        setError(true);
        setErrors(errors);
        setLoading(false);

        return;
      }

      setLoading(false);

      const data = await response.json();

      setResponse(data);
    }
    catch (error) {
      throw error;
    }
    finally {
      setLoading(false);
    }

    await triggerCommentsFetch();
  }

  const buttonLoader = <span className="animate-spin w-6 h-6 border-2 rounded-full border-l-black"></span>

  return (
    <form onSubmit={onSubmit} className="bg-brand-black-700 p-2 rounded-md flex items-center gap-2 flex-wrap justify-end">
      <div className="flex gap-2 w-full">
        <img src={getUserAvatarURL(User.Name, User.LastName)} alt={`${User.Name} ${User.LastName} avatar`} width={32} height={32} className="rounded-full" />
        <input required onInput={inputValidation} name="Content" id="Content" type="text" className="bg-transparent border rounded-md h-8 px-2 w-full" />
        <input className="hidden" readOnly value={PostId} type="text" name="postId" />
        <input className="hidden" readOnly value={User.id} type="text" name="userId" />
      </div>
      <p className={`text-xs text-left ${styles.formFieldInputError}`}>
        {
          errors && errors.error && errors.error
        }
      </p>
      <button type="submit" className="flex items-center gap-2 w-fit bg-indigo-600 px-2 h-8 rounded-md active:bg-indigo-500">
        {
          loading && !error && buttonLoader
        }
        {
          error && !loading && <span className="fas fa-times"></span>
        }
        {
          !error && !loading && response && response.message !== null && <span className="fa fa-check"></span>

        }

        {
          loading && !error ? 'Comentando...' : "Comentar"
        }
      </button>
    </form>
  )
}
