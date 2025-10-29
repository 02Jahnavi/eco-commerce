import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // ✅ Load user's cart/orders
  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    const token =
      localStorage.getItem('access_token') || localStorage.getItem('token');

    if (!token) {
      alert('⚠️ Please login first');
      navigate('/login');
      return;
    }

    try {
      const res = await api.get('/orders/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      console.error('❌ Failed to load cart:', err.response || err);
      alert('Failed to load cart');
    }
  }

  // ✅ Calculate total price
  const total = cart.reduce(
    (sum, c) => sum + (c.product?.price || 0) * (c.quantity || 1),
    0
  );

  // ✅ Place order for all cart items
  async function placeOrder() {
    try {
      const token =
        localStorage.getItem('access_token') || localStorage.getItem('token');

      // Loop through cart and create order per product
      for (const item of cart) {
        await api.post(
          '/orders',
          {
            productId: item.product?.id || item.id,
            quantity: item.quantity || 1,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      alert('✅ Order placed successfully!');
      navigate('/order-success');
    } catch (err) {
      console.error('❌ Order failed:', err.response || err);
      alert('❌ Order failed');
    }
  }

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">🧾 Checkout</h2>

      {cart.length === 0 ? (
        <p className="text-center">No items to checkout.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((c, i) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={i}
              >
                <span>{c.product?.name}</span>
                <span>
                  ₹ {c.product?.price} × {c.quantity}
                </span>
              </li>
            ))}
          </ul>

          <h4 className="text-end mb-4">Total: ₹ {total.toFixed(2)}</h4>

          <div className="text-center">
            <button className="btn btn-success px-4" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
