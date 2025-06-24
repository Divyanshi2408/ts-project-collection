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

  if (loading)
    return (
      <div style={styles.centered}>
        <p>⏳ Loading posts...</p>
      </div>
    );

  if (error)
    return (
      <div style={styles.centered}>
        <p style={{ color: 'red' }}>❌ Error: {error}</p>
      </div>
    );

  if (!posts || posts.length === 0)
    return (
      <div style={styles.centered}>
        <p>No posts available.</p>
      </div>
    );

  return (
    <div style={styles.container}>
      <h2>📚 Latest Posts</h2>
      <ul style={styles.postList}>
        {posts.slice(0, 5).map(post => (
          <li key={post.id} style={styles.card}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

const styles = {
  container: {
    padding: '20px',
    maxWidth: '700px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  } as React.CSSProperties,
  postList: {
    listStyle: 'none',
    padding: 0,
  } as React.CSSProperties,
  card: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
  centered: {
    textAlign: 'center' as const,
    marginTop: '40px',
    fontSize: '18px',
  } as React.CSSProperties,
};
