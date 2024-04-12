import React from 'react'

export const Footer = () => {
  return (
    <footer className='bg-slate-800 text-white p-2'>
      <section></section>
      <section></section>
      <section className='text-center'>&copy;{new Date().getFullYear()} - Opus social network </section>
    </footer>
  )
}
