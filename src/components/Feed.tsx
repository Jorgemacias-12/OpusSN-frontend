import { loggedUser } from '@/stores/UserStore';
import { Categories } from './Categories'
import { RandomAd } from './RandomAd'
import { Header } from './application/Header'
import { CreatePost } from './application/NewPost'


import styles from '@/styles/Feed.module.css';
import { useEffect } from 'react';
import { Posts } from './Posts';

export const Feed = () => {

  const $user = loggedUser.get();

  useEffect(() => {

  }, [])

  return (
    <>
      <Header />
      <main className={styles.feedContainer}>

        <section className="relative justify-self-end w-full flex flex-col gap-4 pt-2 pb-2  mr-0  md:max-w-[400px] md:mr-20 order-1 md:order-2">
          <div>
            <h2 className="font-bold text-center text-2xl">Anuncio</h2>
            <RandomAd />
          </div>
          <Categories />
        </section>

        <section className="justify-self-center flex flex-col items-center p-4 w-full order-2 md:order-1 gap-2">
          <h3 className="text-4xl max-w-screen-sm rounded-md text-green-400 p-4 w-full text-center">¡Bienvenido al feed!</h3>

          <section className="max-w-screen-xs w-full">
            {
              $user && <CreatePost />
            }
          </section>

          <section>
            <h3 className="text-4xl max-w-screen-sm rounded-md text-green-400 p-4 w-full text-center">Posts</h3>

            <section className='flex flex-col gap-2'>
              <Posts />
            </section>
          </section>
        </section>
      </main>
    </>
  )
}
// grid grid-cols-1   bg-brand-slate-800 p-4 text-white justify-center gap-5 md:grid-cols-2
// bg-brand-slate-800 p-4 flex flex-col md:flex-row