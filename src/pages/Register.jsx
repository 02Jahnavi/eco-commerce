import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const navigate = useNavigate();
  async function submit(e){ e.preventDefault();
    try{
      await api.post('/auth/register',{ name, email, password });
      alert('Registered. Please login.');
      navigate('/login');
    }catch(err){ alert('Register failed'); }
  }
  return (
    <div className="container py-4">
      <h2>Register</h2>
      <form onSubmit={submit} style={{maxWidth:400}}>
        <div className="mb-3"><input className="form-control" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} /></div>
        <div className="mb-3"><input className="form-control" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div className="mb-3"><input type="password" className="form-control" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  )
}