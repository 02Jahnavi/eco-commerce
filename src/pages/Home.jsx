import React from 'react';
import ProductList from '../components/ProductList';

export default function Home() {
  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Fullstack E-Commerce (Mini)</h2>
      <ProductList />
    </div>
  );
}
