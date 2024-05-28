import React, { useState, useEffect } from 'react';
import { login } from '../../requests/authAPI';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const LoginComponent = ({getAuth}) => {
  useEffect(() => {
    // Clear cookies when the component mounts
    Cookies.remove('accessToken');
    Cookies.remove('_id');
    Cookies.remove('role');
  }, []);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()


  const handleLogin = async () => {
      const user = {
        username,
        password
      }
      try {
        const {accessToken, _id, role} = await login(user)

        getAuth(accessToken, _id, role)
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
