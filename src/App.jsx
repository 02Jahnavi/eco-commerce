import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout'; // ✅ Add this import
import OrderSuccess from './pages/OrderSuccess'; // ✅ Already imported

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} /> {/* ✅ Add this line */}
        <Route path="/order-success" element={<OrderSuccess />} /> {/* ✅ Keep this line */}
      </Routes>
    </Router>
  );
}

export default App;
