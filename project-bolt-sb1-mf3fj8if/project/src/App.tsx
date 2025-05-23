import React from 'react';
import Header from './components/Header';
import ResponsiveTable from './components/ResponsiveTable';
import Explanation from './components/Explanation';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ResponsiveTable />
          <Explanation />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;