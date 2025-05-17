import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import SuccessPage from './pages/SuccessPage';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;