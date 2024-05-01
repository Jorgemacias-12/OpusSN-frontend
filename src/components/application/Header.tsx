// import { loggedUser } from '@/stores/UserStore';
// import { getUserAvatarURL } from '@/utils';
// import { useState } from 'react'
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
    </header>
  )
}
