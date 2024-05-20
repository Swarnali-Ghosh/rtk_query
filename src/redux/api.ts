// src/services/myApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Post[], void

export const myApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  tagTypes: ["BlogPosts"],
  endpoints: (builder) => ({

    getPosts: builder.query<Post[], string>({
      query: () => 'posts',
      providesTags: ["BlogPosts"]
    }),

    newPost: builder.mutation<Post, Post>({
      query: (post) => ({
        url: "posts",
        method: "POST",
        body: post
      }),
      invalidatesTags: ["BlogPosts"]
    })
  }),
});

{/**

using javascript

export const myApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
    }),
  }),
});

 */}
export const {
  useGetPostsQuery,
  useNewPostMutation
} = myApi;

// export const { getPosts } = myApi.endpoints;
