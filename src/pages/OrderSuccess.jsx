import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="container text-center py-5">
      <h2>🎉 Order Placed Successfully!</h2>
      <p>Your order has been placed. (No real payment processed.)</p>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
}
