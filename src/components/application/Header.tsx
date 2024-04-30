import { loggedUser } from '@/stores/UserStore';
import { getUserAvatarURL } from '@/utils';
import { useState } from 'react'
import { Menu } from '../Menu';

export const Header = () => {


  return (
    <header className="bg-brand-blue-800 p-2 items-center justify-between flex">
      <section className="flex items-center gap-2">
        <img src="/brand-logo-shape.svg" width={64} alt="" />
        <h1 className="text-brand-yellow font-bold text-3xl">Opus</h1>
      </section>

      <section className="text-white pr-4">
        <Menu />
      </section>
      {/* <section className="flex justify-between items-center">
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
      </section> */}
    </header>
  )
}
