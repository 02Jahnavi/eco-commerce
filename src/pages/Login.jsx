import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const navigate = useNavigate();
  async function submit(e){ e.preventDefault();
    try{
      const res = await api.post('/auth/login',{ email, password });
      localStorage.setItem('token', res.data.access_token);
      navigate('/');
    }catch(err){ alert('Login failed'); }
  }
  return (
    <div className="container py-4">
      <h2>Login</h2>
      <form onSubmit={submit} style={{maxWidth:400}}>
        <div className="mb-3"><input className="form-control" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div className="mb-3"><input type="password" className="form-control" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}