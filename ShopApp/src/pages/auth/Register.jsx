import React, { useState } from 'react';
import { register } from '../../requests/authAPI';
import { Link, useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate()
  const handleRegister = async () => {
    const newUser = {
    username,
    password,
    email
    }
    try {
      res = await register(newUser)
      console.log(res)
      navigate('/login')
    } catch (error) {
      
    }

  };

  return (
    <div>
      <h2>Register</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleRegister}>Register</button> <br />
      <Link to={'/login'} >login</Link>
    </div>
  );
};

export default RegisterComponent;
