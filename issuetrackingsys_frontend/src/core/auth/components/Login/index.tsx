import React , { useEffect, useState } from 'react'
import type { FormEvent } from 'react';
import './styles.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {login, logout} from "../../store/authSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks.ts";
import { LoginAPI } from '../../services/authService.ts';


interface LoginResponse {
  token: string;
  username: string;
  authorities: string[];
}

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const isExpired = useAppSelector(state => state.auth.isExpired);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {
      const { token } = await LoginAPI.login({ username, password });
      dispatch(login(token));
      navigate('dashboard');
    } catch (err: any) {
      setError(err.message);
    }

    setUsername('');
    setPassword('');
    
  };

  useEffect( () => {
    if (isExpired){
      dispatch(logout());
      return;
    }

    if(isAuthenticated){
      navigate('dashboard');
    }
  },[]);

  return (
    <div className='container'>
      <div className='formContainer'>
        <h1>Welcome</h1>
        <form onSubmit={handleSubmit}>
          <div className='inputGroup'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='inputGroup'>
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