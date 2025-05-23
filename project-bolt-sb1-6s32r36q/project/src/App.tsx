import React from 'react';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <LoginPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;