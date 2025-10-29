import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // 👈 For navigation

  // ✅ Fetch products
  useEffect(() => {
    api
      .get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('❌ Failed to load products:', err));
  }, []);

  // ✅ Add product to cart
  async function addToCart(productId) {
    try {
      const token =
        localStorage.getItem('access_token') || localStorage.getItem('token');

      if (!token) {
        alert('⚠️ Please log in first!');
        return;
      }

      await api.post(
        '/orders',
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('✅ Product added to cart!');
      navigate('/cart'); // 👈 Redirects to cart page
    } catch (err) {
      console.error('❌ Error adding to cart:', err.response || err);
      if (err.response?.status === 401) {
        alert('🚫 Unauthorized! Please log in again.');
      } else {
        alert('❌ Failed to add to cart');
      }
    }
  }

  return (
    <div className="container py-4">
      <h3>Products</h3>
      <div className="row">
        {products.length === 0 && (
          <div className="col-12">No products yet. Add some via backend.</div>
        )}

        {products.map((p) => (
          <div className="col-md-4 mb-3" key={p.id}>
            <div className="card h-100">
              <img
                src={p.imageUrl || 'https://via.placeholder.com/300'}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
                <p className="card-text">
                  <strong>₹ {p.price}</strong>
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(p.id)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
