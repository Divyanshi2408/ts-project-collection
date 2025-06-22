import { useFetch } from './hooks/useFetch';

interface Post {
  id: number;
  title: string;
  body: string;
}

function App() {
  const { data: posts, error, loading } = useFetch<Post[]>(
    'https://jsonplaceholder.typicode.com/posts'
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Posts</h2>
      <ul>
        {posts?.slice(0, 5).map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
