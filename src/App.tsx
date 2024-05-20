import './App.css'
import { useGetPostsQuery, useNewPostMutation } from './redux/api.ts'
import PostsCard from './components/PostsCard.tsx';
import { FormEvent, useState } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function App() {
  const { isLoading, isError, isSuccess, data, error } = useGetPostsQuery("");
  const [newPost] = useNewPostMutation();

  console.log("isLoading", isLoading);
  console.log("isError", isError);
  console.log("isSuccess", isSuccess);
  console.log("data", data);
  console.log("error", error);

  {/**

  isLoading false
  isError false
  isSuccess true
  data [
    {
        "title": "Post1",
        "body": "Some random posts 1",
        "userId": 23,
        "id": "1"
    },
    {
        "title": "Post2",
        "body": "Some random posts 2",
        "userId": 24,
        "id": "2"
    }
]
  error undefined

 */}

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const post: Post = {
      title,
      body,
      userId: Math.random() * 1000,
      id: Math.random() * 1000
    }

    newPost(post);
    setTitle("");
    setBody("");
  }



  return (
    <>
      <p>My App</p>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type='text'
          placeholder='Body'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type='submit'>Add</button>

      </form>

      {isSuccess && data?.length > 0 && data.map((post: Post) => (
        <PostsCard key={post.id} post={post} />
      ))}

    </>
  )
}

export default App
