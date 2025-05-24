import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">JavaScript 事件总线教学演示</h3>
            <p className="text-gray-400">一个用于演示组件间通信的教学网站</p>
          </div>
          
          <div className="flex items-center">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors duration-200 mr-4"
            >
              <Github className="h-5 w-5" />
            </a>
            <div className="text-gray-400 flex items-center">
              <span className="mr-1">使用</span>
              <Heart className="h-4 w-4 text-red-500 mx-1" />
              <span>和 React 制作</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} 教学演示项目 | 仅用于学习目的
        </div>
      </div>
    </footer>
  );
};

export default Footer;