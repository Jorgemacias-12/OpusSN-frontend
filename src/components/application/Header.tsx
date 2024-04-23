import { loggedUser } from '@/stores/UserStore';
import { useState } from 'react'

export const Header = () => {

  const [menuToggle, setMenuToggle] = useState(false);

  const toggleMenu = () => {
    setMenuToggle(!menuToggle);
  }

  const user = loggedUser.get();

  const avatarURL = user ? `https://ui-avatars.com/api/?name=${user.Name}+${user.LastName}&background=random` : '';

  const userInfoSection = <>
    <a className="text-black text-center bg-brand-yellow p-2 rounded-md shadow-lg hover:shadow-yellow-500/50" href="/login">Inicie sesión</a>
  </>;

  const userFeedInfo = user ? (<>
    <p className="text-white text-xl">{user.UserName}</p>
    <img className="rounded-full" src={avatarURL} alt="" />
  </>) : "";

  const dropdownOptionsAuthenticated = (<>

  </>);

  const dropdownOptions = (<section className="flex flex-col gap-2">
    <p className="text-balance text-center mx-auto">Para ver las opciones disponibles, por favor.</p>
    {userInfoSection}
  </section>);

  const iconStateEl = menuToggle ? <i className="fas fa-times" /> : <i className="fas fa-bars" />;

  const dropdownClassNameState = menuToggle ? "opacity-100 translate-y-0 pointer-events-auto z-10" : "opacity-0 translate-y-[-10px] z-[-1]  pointer-events-none";

  const dropdownMenuClasses = `flex flex-col absolute top-20 right-0 bg-brand-blue-700 rounded-md p-2 w-52 gap-2 divide-y divide-red-800 transition all duration-300 ease-in-out ${dropdownClassNameState} mt-2.5`;

  return (
    <header className="bg-brand-blue-800 p-2">
      <section className="flex justify-between items-center">
        <section className="flex gap-2 items-center">
          <img width={64} className="aspect-square" src="/brand-logo-shape.svg" alt="Opus brand logo" />
          <h1 className="text-brand-yellow sfont-bold text-3xl">Opus</h1>
        </section>
        <section className="relative justify-center flex flex-row p-2 gap-2 items-center lg:gap-5">
          <section className="hidden lg:flex items-center gap-2 ">
            {userFeedInfo}
          </section>
          <section className={dropdownMenuClasses}>
            <section className="flex items-center justify-evenly lg:hidden">
              {userFeedInfo}
            </section>
            <section className="p-2 text-white text-balance">
              {
                user ? dropdownOptionsAuthenticated : dropdownOptions
              }
            </section>
          </section>
          <span onClick={toggleMenu} className="inline-flex fa-xl text-white transition-all duration-300 ease-in-out ">
            {iconStateEl}
          </span>
        </section>
      </section>
    </header>
  )
}
