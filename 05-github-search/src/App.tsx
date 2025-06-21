import { useState } from 'react'
import axios from 'axios'
import type { GithubUser } from './types'

function App(){
  const [username,setUsername] = useState('');
  const [user,setUser] = useState<GithubUser | null>(null);
  const [error,setError] = useState<string>('');

  const handleSearch = async () =>{
    try{
      setError('');
      const res =  await axios.get<GithubUser>(`https://api.github.com/users/${username}`);
      setUser(res.data);
    }
    catch{
      setUser(null);
      setError('user not found');
    }  
  };
return(
  <div style={{padding: '20px'}}> 
  <h2>Github User Search</h2>
  <input
  type='text'
  value={username}
  onChange={(e)=>setUsername(e.target.value)}
  placeholder='Enter Github username'
  ></input>
  <button onClick={handleSearch}>Search</button>
  {error && <p style={{color: 'red'}}>{error}</p>}
  {user &&(
    <div style={{marginTop:'20px'}}>
      <img src={user.avtar_url} alt='Avtar' width={100}/>
      <h3>{user.name}</h3>
       <p>{user.bio}</p>
          <p>Followers: {user.followers}</p>
          <p>Repos: {user.public_repos}</p>
    </div>
  )}
  </div>
);
}
export default App;