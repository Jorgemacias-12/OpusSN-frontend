import type { PostsReponse } from '@/types'
import { getAPIURL } from '@/utils'
import React, { useEffect, useState } from 'react'
import Post from './application/Post';

export const Posts = () => {

  const [posts, setPosts] = useState<PostsReponse | null>(null);

  useEffect(() => {

    const fetchPosts = async () => {
      const apiURL = `${getAPIURL()}/posts`;

      try {
        const response = await fetch(apiURL);

        const data = await response.json();

        setPosts(data);
      }
      catch (err) {
        throw err;
      }
    }

    fetchPosts();
  })

  return (
    <section className="flex flex-col gap-4 items-center">
      {
        posts && posts.posts && posts.posts.map(post => {
          return <Post id={post.id} Title={post.Title} Content={post.Content} CreationDate={post.CreationDate} userId={post.userId} categories={post.Categories} />
        })
      }
    </section>
  )
}
