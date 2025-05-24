import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import LayoutIndicator from './components/LayoutIndicator';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <LayoutIndicator />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;