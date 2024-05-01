import { loggedUser } from '@/stores/UserStore'
import type { SafeUser } from '@/types';
import { getUserAvatarURL } from '@/utils';
import React, { useEffect, useState } from 'react'

export const Menu = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [$user, setUser] = useState<SafeUser | null>(null);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  }

  const signout = () => {
    loggedUser.set(null);

    location.href = "/feed";
  }

  const menuIconClass = isMenuVisible ? 'fa-times' : 'fa-bars';
  const dropdownClassNameState = isMenuVisible ? "opacity-100 translate-y-0 pointer-events-auto z-10" : "opacity-0 translate-y-[-10px] z-[-1]  pointer-events-none";

  useEffect(() => {
    setUser(loggedUser.get());
  }, [$user]);

  return (
    <section className="relative flex gap-4 items-center">

      <section className="hidden md:flex items-center justify-center gap-2">
        {
          $user && <h3>{$user.Name} {$user.LastName}</h3>
        }
        {
          $user && <img className="rounded-full" src={getUserAvatarURL($user.Name, $user.LastName)} width={32} height={32} />
        }
      </section>

      <section className={`flex flex-col absolute top-20 right-0 bg-brand-blue-700 rounded-md p-2 w-52 gap-2 divide-y divide-red-800 ${dropdownClassNameState} transition-all duration-300 ease-in-out`}>

        <section className="flex items-center justify-center gap-2 p-2 lg:hidden">
          {
            $user && <h3>{$user.Name} {$user.LastName}</h3>
          }
          {
            $user && <img className="rounded-full" src={getUserAvatarURL($user.Name, $user.LastName)} width={32} height={32} />
          }
        </section>

        <h3 className="text-center p-2">Opciones</h3>

        <section>
          <a className="block text-center bg-brand-yellow rounded-md mt-2 text-black p-2 w-full" href="/">Inicio</a>
          {
            !$user && <a  className="block text-center bg-brand-yellow rounded-md mt-2 text-black p-2 w-full" href="/login">Iniciar sesión</a>
          }
          {
            $user && <button onClick={signout} className="bg-brand-yellow rounded-md mt-2 text-black p-2 w-full">Cerrar sesión</button>
          }
        </section>
      </section>

      <span onClick={toggleMenu} className="inline-flex transition-all duration-300 ease-in-out">
        <i className={`fas fa-xl ${menuIconClass}`}></i>
      </span>
    </section>
  )
}
