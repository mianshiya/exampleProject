import React from 'react';
import { Cpu } from 'lucide-react';
import VirtualListDemo from './components/VirtualListDemo';
import TheoryExplanation from './components/TheoryExplanation';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            前端无限滚动与内容回收演示
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            本演示展示了如何在保持良好性能的前提下实现无限滚动，通过仅渲染可视区域内容并自动回收不可见内容
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VirtualListDemo />
          </div>
          
          <div className="lg:col-span-1">
            <TheoryExplanation />
          </div>
        </div>
        
        <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-100">
          <div className="flex items-center mb-4">
            <Cpu className="text-blue-500 mr-2" size={24} />
            <h2 className="text-xl font-semibold text-blue-800">技术要点</h2>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>通过计算滚动位置，只渲染可见区域附近的元素</li>
            <li>使用空白占位符维持正确的滚动条高度</li>
            <li>滚动时动态添加和移除DOM元素，保持DOM树的轻量</li>
            <li>缓冲区设计可以提前渲染即将进入视口的内容，增强滚动体验</li>
            <li>适用于长列表、无限滚动加载等大数据量展示场景</li>
          </ul>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>教学演示网站 © {new Date().getFullYear()}</p>
          <p className="text-gray-400 text-sm mt-2">
            本站用于教学与研究目的，演示前端虚拟列表与内容回收技术
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;