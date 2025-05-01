import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FormatsPage from './pages/FormatsPage';
import CompressionPage from './pages/CompressionPage';
import ResponsivePage from './pages/ResponsivePage';
import LazyLoadingPage from './pages/LazyLoadingPage';
import CdnPage from './pages/CdnPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/formats" element={<FormatsPage />} />
            <Route path="/compression" element={<CompressionPage />} />
            <Route path="/responsive" element={<ResponsivePage />} />
            <Route path="/lazy-loading" element={<LazyLoadingPage />} />
            <Route path="/cdn" element={<CdnPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;