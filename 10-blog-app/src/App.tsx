import { useState, useEffect, useCallback } from 'react';
import type { Post } from './types';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState({ title: '', content: '' });

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('posts');
    if (stored) setPosts(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  // Add a new post
  const addPost = useCallback(() => {
    const title = form.title.trim();
    const content = form.content.trim();
    if (!title || !content) return alert('Title and content are required.');

    const newPost: Post = {
      id: Date.now(),
      title,
      content,
      date: new Date().toLocaleDateString(),
    };

    setPosts(prev => [newPost, ...prev]);
    setForm({ title: '', content: '' });
  }, [form]);

  // Delete a post
  const deletePost = useCallback((id: number) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>📝 Mini Blog</h2>
      
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      
      <textarea
        placeholder="Content"
        value={form.content}
        onChange={e => setForm({ ...form, content: e.target.value })}
        style={{ width: '100%', padding: '8px', height: '100px', marginBottom: '10px' }}
      />
      
      <button onClick={addPost} style={{ padding: '8px 16px', marginBottom: '20px' }}>
        ➕ Post
      </button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map(post => (
          <PostItem key={post.id} post={post} onDelete={deletePost} />
        ))}
      </ul>
    </div>
  );
}

function PostItem({ post, onDelete }: { post: Post; onDelete: (id: number) => void }) {
  return (
    <li
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '12px',
        background: '#f9f9f9',
      }}
    >
      <h3 style={{ marginBottom: '4px' }}>
        {post.title} <small style={{ fontWeight: 'normal' }}>({post.date})</small>
      </h3>
      <p style={{ marginBottom: '8px' }}>{post.content}</p>
      <button onClick={() => onDelete(post.id)} style={{ color: 'red' }}>
        ❌ Delete
      </button>
    </li>
  );
}

export default App;
