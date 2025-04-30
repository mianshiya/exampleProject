import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { AjaxInterception } from './components/AjaxInterception';
import { FetchInterception } from './components/FetchInterception';
import { ServiceWorkerInterception } from './components/ServiceWorkerInterception';
import { Footer } from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState<'ajax' | 'fetch' | 'service-worker'>('ajax');

  return (
    <Layout>
      <Hero />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-wrap mb-6 border-b">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'ajax' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
            onClick={() => setActiveTab('ajax')}
          >
            Ajax库拦截
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'fetch' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
            onClick={() => setActiveTab('fetch')}
          >
            Fetch API拦截
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'service-worker' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
            onClick={() => setActiveTab('service-worker')}
          >
            Service Worker拦截
          </button>
        </div>

        <div className="py-4">
          {activeTab === 'ajax' && <AjaxInterception />}
          {activeTab === 'fetch' && <FetchInterception />}
          {activeTab === 'service-worker' && <ServiceWorkerInterception />}
        </div>
      </div>

      <Footer />
    </Layout>
  );
}

export default App;