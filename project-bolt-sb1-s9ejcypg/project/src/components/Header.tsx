import React from 'react';
import { Info } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Info className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-800">CSS 提示框演示</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#basics" className="text-gray-600 hover:text-blue-500 transition-colors">基础实现</a></li>
            <li><a href="#positions" className="text-gray-600 hover:text-blue-500 transition-colors">位置变化</a></li>
            <li><a href="#styles" className="text-gray-600 hover:text-blue-500 transition-colors">样式定制</a></li>
            <li><a href="#animations" className="text-gray-600 hover:text-blue-500 transition-colors">动画效果</a></li>
            <li><a href="#playground" className="text-gray-600 hover:text-blue-500 transition-colors">在线调试</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};