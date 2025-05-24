import React from 'react';
import Header from '../components/Header';
import Demo from '../components/Demo';
import Footer from '../components/Footer';

const TableDemo: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Demo />
      </main>
      <Footer />
    </div>
  );
};

export default TableDemo;