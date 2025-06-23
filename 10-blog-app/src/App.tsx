import { useState, useEffect } from 'react';
import type { Post } from './types';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    const stored = localStorage.getItem('posts');
    if (stored) setPosts(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = () => {
    const newPost: Post = {
      id: Date.now(),
      title: form.title,
      content: form.content,
      date: new Date().toLocaleDateString(),
    };
    setPosts(prev => [newPost, ...prev]);
    setForm({ title: '', content: '' });
  };

  const deletePost = (id: number) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Mini Blog</h2>
      <input
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
      <br />
      <textarea
        placeholder="Content"
        value={form.content}
        onChange={e => setForm({ ...form, content: e.target.value })}
      />
      <br />
      <button onClick={addPost}>Post</button>

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title} <small>({post.date})</small></h3>
            <p>{post.content}</p>
            <button onClick={() => deletePost(post.id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
