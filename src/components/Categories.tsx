import type { CategoryAPIResponse } from '@/types';
import { getAPIURL } from '@/utils';
import { Category } from 'dist/_astro/Category.CpswjASR';
import React, { useEffect, useState } from 'react'

export const Categories = () => {

  const [categoriesResponse, setCategories] = useState<CategoryAPIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {

    const fetchAPI = async () => {
      const apiUrl = getAPIURL();

      setLoading(true);

      try {
        const response = await fetch(`${apiUrl}/categories`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setCategories(data);
        setLoading(false);
        setError(false);
      }
      catch (err: any) {
        setError(true);
        setLoading(false);
        setErrorMessage(err);
      }
    }

    fetchAPI();
  }, [])

  return (
    <section className="bg-brand-slate mx-auto rounded-md">
      <h3 className='text-2xl text-center font-bold'>
        Categorias
      </h3>
      <section className=" p-2 flex flex-col gap-2">

        {
          loading && !error && <span className="border-2 w-8 h-8 rounded-full border-l-indigo-500 animate-spin"></span>
        }

        {
          !loading && error && errorMessage && <p className="text-red-500 text-center">Las categorías no se encuentrán disponibles en este momento</p>
        }

        {
          categoriesResponse && categoriesResponse.categories.map(cat => {
            return <Category id={cat.id} name={cat.Name} key={cat.id} />
          })
        }
      </section>
    </section>
  )
}