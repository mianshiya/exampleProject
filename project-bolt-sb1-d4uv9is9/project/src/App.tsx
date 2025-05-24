import React from 'react';
import Header from './components/Header';
import Introduction from './components/Introduction';
import EventBusDemo from './components/EventBusDemo';
import CodeExamples from './components/CodeExamples';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Introduction />
        <EventBusDemo />
        <CodeExamples />
      </main>
      <Footer />
    </div>
  );
}

export default App;