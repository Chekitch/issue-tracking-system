import React , { useState } from 'react'
import type { FormEvent } from 'react';
import './Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface LoginResponse {
  token: string;
  username: string;
  roles: string[];
}

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {
      const response = await axios.post<LoginResponse>('http://localhost:8080/api/auth/login', {
      username,
      password
    });

    const { token } = response.data;
    localStorage.setItem('token', token);

    navigate('dashboard');

    } catch (error : any) {
      
      if(error.response && error.response.status === 404) { 
        setError(error.response.data.message);
      }
      if(error.response && error.response.status === 403) {
        setError("Bad Credentials");
      }

    }

    setUsername('');
    setPassword('');
    
  };

  return (
    <div className='login-container'>
      <div className='login-form-container'>
        <h1>Welcome</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className='error-message'>{error}</p>}
          <button type='submit'>Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default Login