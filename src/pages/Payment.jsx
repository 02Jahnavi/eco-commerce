import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Payment(){
  const navigate = useNavigate();
  function pay(){ alert('Payment successful (mock)'); navigate('/'); }
  return (
    <div className="container py-4">
      <h2>Payment (Mock)</h2>
      <p>This is a fake payment screen. Click Pay to simulate a successful payment.</p>
      <button className="btn btn-primary" onClick={pay}>Pay ₹ 0.00</button>
    </div>
  )
}