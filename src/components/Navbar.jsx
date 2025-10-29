import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(){
  const navigate = useNavigate();
  const logged = !!localStorage.getItem('token');
  function logout(){ localStorage.removeItem('token'); navigate('/'); }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Ecom</Link>
        <div>
          <Link className="btn btn-outline-primary me-2" to="/checkout">Cart</Link>
          {logged ? <button className="btn btn-danger" onClick={logout}>Logout</button> : <Link className="btn btn-primary" to="/login">Login</Link>}
        </div>
      </div>
    </nav>
  )
}