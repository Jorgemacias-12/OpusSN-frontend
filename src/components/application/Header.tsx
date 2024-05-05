

import { loggedUser } from "@/stores/UserStore"
import { getUserAvatarURL } from "@/utils";
import { useStore } from "@nanostores/react"
import { useEffect, useRef, useState } from "react";
import { Menu } from "../Menu";

export const Header = () => {
  const [showUserProfile, setShowUserProfile] = useState(true);
  const user = useStore(loggedUser);
  const showAvatar = user && user.Name && user.LastName;

  const toggleModal = async () => {
    setShowUserProfile(prevState => !prevState);
  }

  const logout = () => {
    loggedUser.set(null);

    location.href = "/feed";
  }

  useEffect(() => {
  }, []);

  return (
    <header className="bg-brand-blue-900 text-white flex h-16 p-4">
      <section className="flex w-full justify-between md:hidden">
        {
          showAvatar && <img onClick={toggleModal} className="rounded-full active:border active:border-slate-100 border border-transparent" src={getUserAvatarURL(user.Name, user.LastName)} width={32} height={32} />
        }

        <h1 className="text-brand-yellow font-bold text-2xl">Opus</h1>

        <img src="/favicon.svg" alt="Opus brand logo" width={32} height={32} />
      </section>

      <section className="hidden md:flex justify-between w-full">
        <div className="flex gap-2 items-center">
          <img src="/favicon.svg" alt="Opus brand logo" className="" width={32} />

          <h1 className="text-brand-yellow font-bold text-2xl">Opus</h1>
        </div>

        <div className="flex items-center gap-2 text-yellow-400 font-bold">
          <Menu />
        </div>
      </section>

      <dialog className={`absolute m-0 bg-brand-blue-900 text-white border border-slate-600 rounded-md min-h-screen md:hidden flex flex-col justify-between top-0 ${showUserProfile ? 'visible' : 'hidden'} w-full`}>
        <section className="p-4">
          <section className="flex items-center justify-between p-2 w-full">
            <div className="flex gap-2 items-center">
              {
                showAvatar && <img className="rounded-full active:border active:border-slate-100 border border-transparent" src={getUserAvatarURL(user.Name, user.LastName)} width={32} height={32} />
              }

              {
                showAvatar && <h2>{user.Name} {user.LastName}</h2>
              }
            </div>

            <button onClick={toggleModal}>
              <span className="fas fa-times fa-xl"></span>
            </button>
          </section>

        </section>

        <section className="p-4">
          Poner aca cosas
        </section>

        <section className="p-4">
          <button onClick={logout} className="flex gap-2 items-center bg-brand-yellow text-black p-2 rounded-md w-full justify-center">
            <span className="fas fa-sign-out"></span>
            Cerrar sesión
          </button>
        </section>
      </dialog>
    </header>
  )
}
