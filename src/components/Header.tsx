import React, { useState } from 'react'

import styles from '@/styles/header.module.css';

export const Header = () => {

  const [menuToggle, setMenuToggle] = useState(false);

  const onMenuToggle = () => {
    setMenuToggle(!menuToggle);
  }

  const dropdownClassNameState = menuToggle ? "opacity-100 translate-y-0 pointer-events-auto z-10" : "opacity-0 translate-y-[-10px] z-[-1]  pointer-events-none";
  const iconStateEl = menuToggle ? <i className="fas fa-times"/> : <i className="fas fa-bars" />

  return (
    <header className="bg-brand-blue-900 h-20 text-white flex flex-col justify-center items-center poiner">
      <section className="w-full max-w-screen-xl flex justify-between">
        <section className="flex gap-2 items-center p-2">
          <img width={64} className='aspect-square' src={"/brand-logo-shape.svg"} alt="Opus brand logo" />
          <h1>Opus</h1>
        </section>

        <section className="hidden lg:flex items-center gap-4 px-2">
          <a href="/feed" className={`${styles.brandLink}`}>Ir al feed</a>
          <a href="#" className={`${styles.brandLink}`}>item 2</a>
          <a href="#" className={`${styles.brandLink}`}>item 3</a>
        </section>

        <section className="relative flex items-center p-2">
          <section className="hidden lg:flex lg:gap-2">
            <a href="/login" className={`${styles.brandButton}`}>Iniciar sesión</a>
            <a href="/register" className={`${styles.brandButton}`}>Registrarse</a>
          </section>

          <section className={`flex flex-col absolute top-20 right-0 bg-brand-blue-700 rounded-md p-2 w-52 gap-2 divide-y divide-red-800 ${dropdownClassNameState} transition-all duration-300 ease-in-out`}>
            <section className="flex flex-col">
              <a href="/feed" className={`${styles.brandLink}`}>Ir al feed</a>
              <a href="" className={`${styles.brandLink}`}>item 2</a>
              <a href="" className={`${styles.brandLink}`}>item 3</a>
            </section>
            <section className="flex flex-col gap-2 pt-2">
              <a href="/login" className={`${styles.brandButton}`}>Iniciar sesión</a>
              <a href="/register" className={`${styles.brandButton}`}>Registrarse</a>
            </section>
          </section>

          <span onClick={onMenuToggle} className="inline-flex fa-xl lg:hidden transition-all duration-300 ease-in-out mr-4">
            {iconStateEl}
          </span>
        </section>
      </section>
    </header>
  )
}