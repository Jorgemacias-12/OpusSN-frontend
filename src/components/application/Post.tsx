import React from 'react';
import type { Category } from '@/types'; // Importa la interfaz Category desde '@/types'

interface PostProps {
  id: number;
  Title: string;
  Content: string;
  CreationDate: Date;
  userId: number;
  categories: Category[];
}

const Post: React.FC<PostProps> = ({ id, Title, Content, CreationDate, userId, categories }) => {
  const date = CreationDate instanceof Date ? CreationDate.toLocaleDateString() : '';

  return (
    <section data-post-id={id} className="bg-brand-slate text-white p-4 rounded-sm border-slate-500 flex flex-col gap-4">
      <section className="flex justify-between items-center">
        <h3>{Title}</h3>
        <p className='text-xs'>26/04/2025</p>
      </section>
      <section>
        <p>{Content}</p>
      </section>
      {categories.length > 0 && (
        <section>
          <h4>Categorias:</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2">
            {categories.map((category) => (
              <li className="rounded-full bg-indigo-500 p-2 text-center" key={category.id}>{category.Name}</li>
            ))}
          </ul>
        </section>
      )}

      <form className="" onSubmit={(e) => e.preventDefault()}>
        <textarea className="w-full border rounded-md border-indigo-500 bg-transparent" name="" id="" ></textarea>

        <section>
          <button className="bg-indigo-500 p-2 rounded-md">Haz un comentario</button>
        </section>
      </form>
      
    </section>
  );
};

export default Post;
