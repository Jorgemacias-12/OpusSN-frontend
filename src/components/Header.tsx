import React, { useState } from 'react'

import styles from '@/css/header.module.css';

export const Header = () => {

  const [menuToggle, setMenuToggle] = useState(false);

  const onMenuToggle = () => {
    setMenuToggle(!menuToggle);
  }

  return (
    <header className="bg-slate-800">
      <section className="max-w-screen-xl flex justify-between items-center mx-auto">
        <section className="flex items-center">
          <img className='aspect-square' src="/opus.png" width={64} alt="Opus brand logo" />
          <h1 className="font-bold text-white">
            Opus
          </h1>
        </section>
        <section className='mr-4 flex items-center relative gap-2'>
          <section className={`border absolute top-5 right-0 w-max flex flex-col p-2 bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-md lg:hidden gap-2 ${menuToggle ? '' : 'hidden'}`}>
            <a href='/login' className={`${styles.button}`}>Iniciar sesión</a>
            <a href='/register' className={`${styles.button}`}>Registrarse</a>
          </section>
          <span onClick={onMenuToggle} className="fas fa-bars fa-xl text-white lg:hidden"></span>
          <section className='hidden lg:flex gap-2'>
            <a href='/login' className={`${styles.button}`}>Iniciar sesión</a>
            <a href='/register' className={`${styles.button}`}>Registrarse</a>
          </section>
        </section>
      </section>
    </header>
  )
}