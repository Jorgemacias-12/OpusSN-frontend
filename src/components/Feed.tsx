import React, { useEffect, useState } from 'react'
import { Header } from './application/Header'
import { NewPost } from './application/NewPost'
import { loggedUser } from '@/stores/UserStore'
import type { Category, CategoryAPIResponse } from '@/types'
import { Category as CategoryComponent } from './application/Category'

export const Feed = () => {

  const user = loggedUser.get();

  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const url = "http://localhost:4000/categories";

      try {
        const res = await fetch(url);

        const data = await res.json() as CategoryAPIResponse;

        const { categories } = data;

        setCategories(categories);
      }
      catch (err) {
        console.log(err);
      }
    }

    fetchCategories();
  }, [])

  const noAuthenticatedNotice = (<section className="flex flex-col gap-2 bg-brand-slate-800 text-white w-fit p-4 rounded-xl mx-auto">
    <p className="text-xs">¿No tienes una cuenta? puedes registrarte <a className="text-blue-500 hover:underline">aquí</a></p>
    <p className="text-xs">¿Tienes cuenta? incia sesión <a className="text-blue-500 hover:underline">aca</a></p>
  </section>)

  return (
    <>
      <Header />
      <main className="bg-brand-slate p-4 grid grid-cols-1 md:grid-cols-2 justify-items-end md:gap-20">
        <section className="flex flex-col h-fit gap-4">
          {
            user ? <NewPost /> : noAuthenticatedNotice
          }
          <section className="bg-brand-slate-800 p-2 rounded-md text-white max-w-screen-sm w-full">
            <p>Renderizar posts aca utilizando un store</p>
          </section>
        </section>
        <section className="text-white bg-brand-slate-800 p-2 rounded-md md:w-fit flex flex-col gap-2 h-fit pb-10">
          <h2 className="p-2 text-center text-xl">
            Categorias
          </h2>
          <section className="flex flex-col gap-2">
            {
              categories && categories.map(({ id, Name }, index) => {
                return <CategoryComponent key={index} id={id} name={Name} />
              })
            }
          </section>
        </section>
      </main>
    </>
  )
}
