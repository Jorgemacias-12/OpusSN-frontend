import React from 'react'

interface CategoryProps {
  id: number;
  name: string;
}

export const Category = ({ id, name }: CategoryProps) => {
  // TODO: use id for something :P

  // TODO: change global state of which post are being
  // TODO: fetchted.
  const selectCategory = () => {
    
  }

  return (
    <section className={`flex items-center p-2 bg-indigo-600 text-white rounded-md gap-2 justify-between`}>
      <p>{name}</p>
      <span className="fas fa-tag"></span>
    </section>
  )
}
