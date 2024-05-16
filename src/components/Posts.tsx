import type { PostsReponse } from '@/types'
import { getAPIURL } from '@/utils'
import { useEffect, useState } from 'react'
import { Post } from './application/Post';
import { useStore } from '@nanostores/react';
import { $posts } from '@/stores/PostsStore';

export const Posts = () => {

  const posts = useStore($posts);

  useEffect(() => {

    const fetchPosts = async () => {
      const apiURL = `${getAPIURL()}/posts`;

      try {
        const response = await fetch(apiURL);

        const data = await response.json();

        $posts.set(data);
      }
      catch (err) {
        throw err;
      }
    }

    fetchPosts();
  }, [])

  return (
    <section className="flex flex-col gap-4 items-center">
      {
        posts && posts.posts && posts.posts.reverse().map(post => {
          return <Post key={post.id} id={post.id} Title={post.Title} Content={post.Content} CreationDate={post.CreationDate} userId={post.userId} Categories={post.Categories} User={post.User} UpdateDate={post.UpdateDate} />
        })
      }
      {
        posts && posts.postCount === 0 && <p className="rounded-md p-2 bg-red-500">No se han creado posts</p>
      }
    </section>
  )
}
