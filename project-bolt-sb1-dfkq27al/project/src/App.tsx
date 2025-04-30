import React from 'react';
import { Github } from 'lucide-react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PrincipleSection from './components/PrincipleSection';
import Footer from './components/Footer';
import { principles } from './data/principles';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <HeroSection />
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {principles.map((principle, index) => (
              <PrincipleSection 
                key={principle.id}
                principle={principle}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
          
          <div className="mt-24 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">构建你自己的 CLI 工具</h2>
            <p className="text-lg text-gray-700 mb-6">
              现在你已经了解了 Vue CLI 的核心原理，可以将这些概念应用到创建自己的项目脚手架工具中。
            </p>
            <div className="flex justify-center mt-8">
              <a 
                href="https://github.com/vuejs/vue-cli" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                <Github className="w-5 h-5 mr-2" />
                在 GitHub 上探索 Vue CLI
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;