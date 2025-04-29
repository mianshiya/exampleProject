import React from 'react';
import { Heart, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold mb-2">CSS 提示框演示</p>
            <p className="text-gray-400">
              学习如何使用 CSS 创建提示框效果的教育资源。
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center mb-2">
              <span className="mr-2">用</span>
              <Heart className="h-4 w-4 text-red-500 mr-2" />
              <span>创作于 2025</span>
            </div>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <Github className="h-4 w-4 mr-1" />
              <span>查看源码</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};