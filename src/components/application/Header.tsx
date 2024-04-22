import { loggedUser } from '@/stores/UserStore';
import React, { useState } from 'react'

export const Header = () => {

  const [menuToggle, setMenuToggle] = useState(false);

  const toggleMenu = () => {
    setMenuToggle(!menuToggle);
  }

  const user = loggedUser.get();

  if (user === null) return;

  const { Name, LastName, UserName, Email } = user;

  const avatarURL = `https://ui-avatars.com/api/?name=${Name}+${LastName}&background=random`;

  // const avatarImageEl = <img className="rounded-full" src={avatarURL} alt="" />;

  const userFeedInfo = <>
    <p className="text-white text-xl">{UserName}</p>
    <img className="rounded-full" src={avatarURL} alt="" />
  </>;

  return (
    <header className="bg-brand-blue-800 p-2">
      <section className="flex justify-between items-center">
        <section className="flex gap-2 items-center">
          <img width={64} className="aspect-square" src="/brand-logo-shape.svg" alt="Opus brand logo" />
          <h1 className="text-brand-yellow sfont-bold text-3xl">Opus</h1>
        </section>
        <section className="flex flex-row p-2 gap-2 items-center">
          <section className="hidden lg:flex items-center gap-2 ">
            {userFeedInfo}
          </section>
          <section></section>
          <span onClick={toggleMenu} className="fas fa-bars text-white fa-xl lg:hidden"></span>
        </section>
      </section>
    </header>
  )
}
