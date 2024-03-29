import React, { useState } from 'react';
import { login } from '../../requests/authAPI';
import { useNavigate } from 'react-router-dom';


const LoginComponent = ({getAuth}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleLogin = async () => {
      const user = {
        username,
        password
      }
      try {
        const {accessToken, _id} = await login(user)
        console.log(accessToken)
        console.log(_id)
        getAuth(accessToken, _id)
        navigate('/home')
      } catch (error) {
         alert (error)
      }
    

  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginComponent;
