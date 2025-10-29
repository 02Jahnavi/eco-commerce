import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    try {
      const token =
        localStorage.getItem('access_token') || localStorage.getItem('token');

      if (!token) {
        alert('⚠️ Please log in first!');
        navigate('/login');
        return;
      }

      const res = await api.get('/orders/my', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch cart:', err.response || err);
      if (err.response?.status === 401) {
        alert('🚫 Unauthorized! Please log in again.');
        navigate('/login');
      } else {
        alert('❌ Failed to fetch cart');
      }
    }
  }

  async function removeItem(orderId) {
    try {
      const token =
        localStorage.getItem('access_token') || localStorage.getItem('token');

      await api.delete(`/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('🗑️ Item removed');
      fetchCart();
    } catch (err) {
      console.error('❌ Failed to remove item:', err.response || err);
      alert('❌ Failed to remove item');
    }
  }

  const total = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1),
    0
  );

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item) => (
              <div className="col-md-4 mb-3" key={item.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={item.product?.imageUrl || 'https://via.placeholder.com/300'}
                    className="card-img-top"
                    alt={item.product?.name}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.product?.name}</h5>
                    <p>Quantity: {item.quantity}</p>
                    <p className="fw-bold">₹ {item.product?.price}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <h4>Total: ₹ {total.toFixed(2)}</h4>
            <button className="btn btn-success px-4 mt-3" onClick={proceedToCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
