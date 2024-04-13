import React, { useState } from 'react';
import { register } from '../../requests/authAPI';
import { Link, useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password || !email || !fname || !lname) {
      alert('Please fill in all fields');
      return;
    }
    const newUser = {
      username,
      password,
      email,
      fname,
      lname,
    };
    try {
      const res = await register(newUser);
      navigate('/login');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="text" placeholder="First Name" value={fname} onChange={(e) => setFirstName(e.target.value)} />
      <input type="text" placeholder="Last Name" value={lname} onChange={(e) => setLastName(e.target.value)} /> <br />
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /> 
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
      <button onClick={handleRegister}>Register</button> <br />
      <Link to={'/login'}>login</Link>
    </div>
  );
};

export default RegisterComponent;
