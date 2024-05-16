import { loggedUser } from '@/stores/UserStore';
import type { Category, NewPost } from '@/types';
import { convertToPostData, getAPIURL } from '@/utils';
import { useStore } from '@nanostores/react';
import { useEffect, useState, type ChangeEvent, type FormEvent, type MouseEvent } from 'react'

export const CreatePost = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [categoryList, setCategoryList] = useState(new Set<number>());
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();

  const currentUser = useStore(loggedUser);

  let errorsCount = 0;

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formEl = event.target as HTMLFormElement;

    const formData = new FormData(formEl);

    formData.append('Categories', JSON.stringify(Array.from(categoryList)));

    const catErrEl = document.getElementById('categoriesE');

    if (!catErrEl) return;

    if (categoryList.size === 0) {

      catErrEl.textContent = "Antes de crear un post, debes asignarle una categoría.";

      return;
    }

    catErrEl.textContent = "";

    const data = convertToPostData(formData);

    if (!data) throw new Error("Failed to create post");

    await createPost(data);
  }

  const createPost = async (postData: NewPost) => {
    setLoading(true);

    if (errorsCount !== 0) {
      setLoading(false);
      setError(true);
      return;
    }

    try {
      const apiURL = `${getAPIURL()}/posts`;
      const fetchOptions = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      }

      const response = await fetch(apiURL, fetchOptions);

      const data = await response.json();

      setLoading(false);

      setResponse(data);
    }
    catch (err) {
      setLoading(false);
      setError(true);
      throw err;
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const apiURL = `${getAPIURL()}/categories`;

      try {
        const response = await fetch(apiURL);

        if (!response.ok) {
          throw new Error(`api request failed ${response.statusText}`);
        }

        const data = await response.json();

        const { categories } = data;

        setCategories(categories);
      }
      catch (error) {
        throw error;
      }
    }

    fetchCategories();
  }, []);

  const addToCategory = (event: MouseEvent<HTMLButtonElement>) => {
    const el = event.target as HTMLButtonElement;
    const categoryId = parseInt(el.getAttribute('data-category-id') as string);

    if (!el) return;
    if (!categoryId) return;

    const categories = new Set(categoryList);

    const hasCategory = categories.has(categoryId);

    if (hasCategory) {
      el.classList.remove('bg-brand-orange');
      categories.delete(categoryId);
    }
    else {
      el.classList.add('bg-brand-orange');
      categories.add(categoryId);
    }

    setCategoryList(categories);

    const errorEl = document.getElementById('categoriesE');

    if (!errorEl) return;

    if (categoryList.size === 0) errorEl.textContent = "Antes de crear un post, debes asignarle una categoría.";

    if (errorEl.textContent !== "") errorEl.textContent = "";
  }

  const validationChain = [
    {
      id: "Title",
      required: true,
      min: 3,
      max: 40
    },
    {
      id: "Content",
      required: true,
      min: 3
    }
  ]

  const inputValidation = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value.trim();
    const inputId = target.id;

    const field = validationChain.find((item) => item.id === inputId);

    const label = document.querySelector(`label[for=${inputId}]`);
    const errorEl = document.querySelector(`#${inputId} ~ .error`) as HTMLParagraphElement;

    if (!field) {
      return;
    }

    if (!errorEl) {
      return;
    }

    if (!label) {
      return;
    }

    target.classList.remove('border-teal-500');
    label.classList.remove('text-teal-500');

    if (field.required && inputValue.trim() === '') {
      errorsCount++;

      label.classList.add('text-red-500');
      target.classList.add('border-red-500');
      errorEl.textContent = `El campo ${label.textContent} es obligatorio`;

      return;
    }
    else {
      if (errorsCount > 0) errorsCount--;
    }

    if (field.min && inputValue.length < field.min) {
      errorsCount++;

      label.classList.add('text-red-500');
      target.classList.add('border-red-500');
      errorEl.textContent = `El campo ${label.textContent} debe tener al menos ${field.min} caracteres.`;

      return;
    }
    else {
      if (errorsCount > 0) errorsCount--;
    }

    if (field.max && inputValue.length > field.max) {
      errorsCount++;

      label.classList.add('text-red-500');
      target.classList.add('border-red-500');
      errorEl.textContent = `El campo ${label.textContent} no debe exceder los ${field.max} caracteres.`;

      return;
    }
    else {
      if (errorsCount > 0) errorsCount--;
    }

    errorEl.textContent = "";
    target.classList.remove('border-red-500');
    label.classList.remove('text-red-500')

    target.classList.add('border-teal-500');
    label.classList.add('text-teal-500');
  }

  const buttonLoader = <span className="animate-spin w-6 h-6 border-2 rounded-full border-l-black"></span>

  return (
    <form className="bg-brand-black-800 mx-auto w-full max-w-screen-xs p-2 rounded-md flex flex-col gap-2" onSubmit={onSubmit}>
      <section>
        <h2 className="text-center text-xl">¿En que piensas? ¡Postea!</h2>
      </section>
      <section className="hidden">
        {
          currentUser && currentUser.id && <input type="text" name="User" value={currentUser.id} onChange={inputValidation} />
        }
      </section>
      <section className="flex flex-col gap-2">
        <label htmlFor="Title" className="label">Titulo</label>
        <input onChange={inputValidation} required name="Title" id="Title" type="text" className="border rounded-md h-8 bg-transparent px-2" />
        <p className="error text-red-500"></p>
      </section>

      <section className="flex flex-col gap-2">
        <label htmlFor="Content" className="label">Contenido</label>
        <textarea required onChange={inputValidation} className="rounded-md bg-transparent border p-2" name="Content" id="Content"></textarea>
        <p className="error text-red-500"></p>
      </section>

      <section className="flex flex-col gap-2">
        <label htmlFor="">Categorias</label>
        <div className="flex gap-2 overflow-hidden overflow-x-scroll h-fit p-2">
          {
            categories && categories.map((cat, index) => {
              return (
                <button data-category-id={cat.id} type="button" onClick={addToCategory} key={index} className="text-xs bg-brand-blue-300 h-8 px-2 rounded-md">{cat.Name}</button>
              )
            })
          }
        </div>
        <p id="categoriesE" className="error text-red-500"></p>
      </section>

      <section className="flex flex-end w-full items-center justify-end">
        <button className="flex rounded-md h-8 bg-indigo-500 w-fit items-center px-4">
          {
            loading && !error && buttonLoader
          }
          {
            error && !loading && <span className="fas fa-times"></span>
          }
          {
            !error && !loading && response && <span className="fa fa-check"></span>
          }

          {
            loading && !error ? 'Posteando...' : 'Postear'
          }
        </button>
      </section>
    </form>
  )
}
