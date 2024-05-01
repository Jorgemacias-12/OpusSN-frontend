import { loggedUser } from '@/stores/UserStore'
import { type PostCreationReponse, type CategoryAPIResponse, type NewPost, type SafeUser } from '@/types';
import { convertToPostData, getAPIURL, getUserAvatarURL } from '@/utils';
import { persistentAtom } from '@nanostores/persistent';
import { useStore } from '@nanostores/react';
import { useEffect, useState, type ChangeEvent, type MouseEvent, type FormEvent } from 'react';


export const CreatePost = () => {
  const user = useStore(loggedUser);
  const userAvatar = user ? getUserAvatarURL(user.Name, user.LastName) : undefined;

  const [categoryList, setCategoryList] = useState(new Set());
  const [categoriesResponse, setCategories] = useState<CategoryAPIResponse | null>(null);

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<PostCreationReponse | null>(null);

  let errorsCount = 0;

  useEffect(() => {
    const fetchAPI = async () => {
      const apiUrl = getAPIURL();
  
      try {
        const response = await fetch(`${apiUrl}/categories`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setCategories(data);
      }
      catch (err: any) {
        throw err;
      }
    }

    fetchAPI();
  }, [])

  const addToCategory = (event: MouseEvent<HTMLButtonElement>) => {
    const el = event.target as HTMLButtonElement;
    const categoryId = el.getAttribute('data-category-id');

    if (!el) return;
    if (!categoryId) return;

    el.classList.add('bg-[#f3722c]');
    
    const updatedSelectedCategories = new Set(categoryList);
    
    if (updatedSelectedCategories.has(categoryId)) {
      el.classList.remove('bg-[#f3722c]');
      updatedSelectedCategories.delete(categoryId);
    } else {
      updatedSelectedCategories.add(categoryId);
    }

    setCategoryList(updatedSelectedCategories);
  }

  const createPost = async (post: NewPost) => {
    
    setIsLoading(true);
    
    if (errorsCount != 0){
      setIsLoading(false);
      setError(true);
      return;
    }
    
    try {
      const apiURL = `${getAPIURL()}/posts`
     
      const fetchOptions = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      }

      const response = await fetch(apiURL, fetchOptions)

      const data = await response.json();

      setIsLoading(false);

      setResponse(data);

      alert("Funciona!")
    }
    catch (err) {
      setIsLoading(false);
      setError(true);
      throw err;
    }

    // console.table(post);
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!user) return;

    const formEl = event.target as HTMLFormElement;

    const formData = new FormData(formEl);

    formData.set('User', `${user.id}`);
    formData.append('Categories', JSON.stringify(Array.from(categoryList)));

    const newPost = convertToPostData(formData);

    if (!newPost) return;

    await createPost(newPost);
  }

  const validationChain = [
    {
      id: "Title",
      required: true,
      min: 5,
      max: 40
    },
    {
      id: "Content",
      required: true
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
      console.log("aca 1")
      return;
    }

    if (!errorEl) {
      console.log("aca 2")
      return;
    }

    if (!label) {
      console.log("aca 3")
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
    <section className='bg-brand-slate w-full p-4 rounded-lg mt-2 flex flex-col gap-2 border border-slate-600'>
      <section className="flex gap-10 justify-between">
        <h3>¿Que quieres postear hoy?</h3>

        {
          user && userAvatar && <img className="rounded-full" width={32} height={32} src={userAvatar} alt={`${user.Name} ${user.LastName} avatar photo`} />
        }
      </section>

      <form className="flex flex-col gap-4" method="POST" onSubmit={onSubmit}>
        <section className="flex flex-col gap-2">
          <label className="label" htmlFor="Title">Titulo</label>
          <input onChange={inputValidation} required className="bg-transparent px-2 border border-indigo-500 h-8 rounded-md" type="text" name='Title' id="Title" />
          <p className="text-red-500 error"></p>
        </section>
        <section className="flex flex-col gap-2">
          <label className="label" htmlFor="Content">Contenido</label>
          <textarea onChange={inputValidation} required className="bg-transparent border border-indigo-500 rounded-md p-2" name="Content" id="Content"></textarea>
          <p className="text-red-500 error"></p>
        </section>

        <section className="flex flex-col overflow-scroll-x overflow-y-hidden gap-2 ">
          <h3>Categorías</h3>
          <div className="flex gap-2">
            {
              categoriesResponse && categoriesResponse.categories.map((el, index) => {
                return (
                  <button type="button" onClick={addToCategory} key={index} data-category-id={el.id} className={"flex items-center gap-2 bg-indigo-500 h-8 overflow-hidden text-xs text-ellipsis rounded-md w-fit"}>
                    {el.Name}
                  </button>
                );
              })
            }
          </div>
        </section>

        <section className="flex justify-between items-center gap-4">
          
          <p id="result" className=""></p>

          <button className="bg-indigo-600 rounded-md p-2 px-4" disabled={isLoading}>
            {
              isLoading && !error && buttonLoader
            }
            {
              error && !isLoading && <span className='fas fa-times'></span>
            }

            {/* {
              !error && !isLoading && response?.message === null && <span className="fa fa-check"></span>
            } */}

            {
              isLoading && !error ? 'Publicando post...' : 'Publicar'
            }            
          </button>
        </section>

        {/* <p className="text-xs"></p> */}
      </form>
    </section>
  );
}
