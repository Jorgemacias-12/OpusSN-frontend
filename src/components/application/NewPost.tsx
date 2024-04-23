import { loggedUser } from '@/stores/UserStore'
import { getUserAvatarURL } from '@/utils';
import React from 'react'

export const NewPost = () => {

  const user = loggedUser.get();

  const userAvatar = user ? getUserAvatarURL(user.Name, user.LastName) : '';

  const avatarSection = (
    <section className="flex items-center p-2 gap-2 justify-between">
      <h3 className="text-normal ">¿En que estas pensando?</h3>
      <img src={userAvatar} className="rounded-full" width={32} height={32} alt="" />
    </section>
  );

  return (
    <section className="bg-brand-slate-800 text-white p-4 rounded-lg flex flex-col gap-2 w-full max-w-screen-xs ">
      {avatarSection}
      <section>
        <textarea className="block w-full bg-transparent border border-slate-500 hover:border-blue-500 p-2 rounded-md resize-y" name="post" id="post" defaultValue={""}>
        </textarea>
      </section>
      <section className="flex flex-col items-end">
        <button disabled={user ? true : false} className="bg-blue-600 shadow-lg hover:shadow-blue-500/50 active:shadow-blue-600/75 rounded-md p-2 px-10 w-fit">
          Publicar
        </button>
      </section>
    </section>
  )
}
