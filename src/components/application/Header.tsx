import { loggedUser } from "@/stores/UserStore"
import { getUserAvatarURL, ofuscateEmail } from "@/utils";
import { useStore } from "@nanostores/react"
import { useEffect, useState } from "react";
import { Menu } from "../Menu";
import { RandomAd } from "../RandomAd";

export const Header = () => {
  const [showUserProfile, setShowUserProfile] = useState(false);
  const user = useStore(loggedUser);
  const showAvatar = user && user.Name && user.LastName;

  const toggleModal = async () => {
    setShowUserProfile(prevState => !prevState);

    // Disable html scroll using classNames method
    // How this works? :C
    if (showUserProfile) {
      document.body.classList.remove('overflow-hidden');
    }
    else {
      document.body.classList.add('overflow-hidden');
    }
  }

  const logout = () => {
    loggedUser.set(null);

    location.href = "/feed";
  }

  useEffect(() => {
  }, []);

  const transitionClasses = "transition-all duration-300"
  const visibleClasses = "scale-100 translate-x-0 opacity-100"
  const hiddenClasses = "scale-80 -translate-x-4 opacity-0 pointer-events-none"

  return (
    <header className="bg-brand-blue-900 text-white flex h-16 p-4">
      <section className="flex w-full justify-between md:hidden items-center">
        <span onClick={toggleModal} className="fas fa-bars fa-xl"></span>


        <h1 className="text-brand-yellow font-bold text-2xl">Opus</h1>

        <a href="/">
          <img src="/favicon.svg" alt="Opus brand logo" width={32} height={32} />
        </a>
      </section>

      <section className="hidden md:flex justify-between w-full">
        <div className="flex gap-2 items-center">
          <a href="/">
            <img src="/favicon.svg" alt="Opus brand logo" className="" width={32} />
          </a>

          <h1 className="text-brand-yellow font-bold text-2xl">Opus</h1>
        </div>

        <div className="flex items-center gap-2 text-yellow-400 font-bold">
          <Menu />
        </div>
      </section>

      <dialog className={`z-10 w-full absolute m-0 bg-brand-blue-900 text-white border border-slate-600 rounded-md min-h-svh md:hidden flex flex-col justify-between top-0 ${showUserProfile ? visibleClasses : hiddenClasses} ${transitionClasses}`}>
        <section className="p-4">
          <section className="flex items-center justify-between p-2 w-full gap-2">
            <div className={`flex gap-2 items-center order-2 ${showAvatar ? 'flex-1' : ''}`}>
              {
                !showAvatar && <a className="p-2 text-black rounded-md bg-brand-yellow" href="/login">Inicia sesión</a>
              }
              {
                !showAvatar && <p>ó</p>
              }
              {
                !showAvatar && <a className="p-2 text-black rounded-md bg-brand-yellow" href="/register">Registrarse</a>
              }

              {
                showAvatar && <h3 className="mx-auto font-bold text-xl">Bienvenido</h3>
              }
            </div>

            <button onClick={toggleModal}>
              <span className="fas fa-times fa-xl"></span>
            </button>
          </section>

        </section>

        <section className={`"p-2 m-4 ${showAvatar ? 'flex-1' : ''}`}>
          {
            !showAvatar && (
              <>
                <h3 className="text-center font-bold text-2xl">Anuncios</h3>
                <RandomAd />
              </>
            )
          }

          {
            showAvatar && (
              <div className="flex flex-col gap-2 bg-brand-blue-400 p-2 rounded-lg overflow-hidden">
                <img className="rounded-full active:border active:border-slate-100 border border-transparent mx-auto" src={getUserAvatarURL(user.Name, user.LastName)} width={128} height={128} />
                <h4 className="text-center text-ellipsis">👋 Hola <span className="font-bold">{user.Name} {user.LastName}</span>👋</h4>
                <h5 className="text-center text-ellipsis">Mejor conocido/a como {user.UserName}</h5>
                <h5 className="text-center text-ellipsis">{ofuscateEmail(user.Email)}</h5>
                <a className="bg-brand-yellow text-black rounded-md h-8 flex items-center justify-center mt-2" href="/">Ir a inicio</a>
              </div>
            )
          }
        </section>

        <section className="p-4">
          {
            showAvatar && (
              <button onClick={logout} className="flex gap-2 items-center bg-brand-yellow text-black p-2 rounded-md w-full justify-center">
                <span className="fas fa-sign-out"></span>
                Cerrar sesión
              </button>
            )
          }
          {
            !showAvatar && (
              <a className="flex gap-2 items-center bg-brand-yellow text-black p-2 rounded-md w-full justify-center" href="/">Ir al inicio</a>
            )
          }
        </section>
      </dialog>
    </header>
  )
}
