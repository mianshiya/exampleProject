import React from 'react';
import { GraduationCap, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <GraduationCap className="h-6 w-6 mr-2" />
            <span className="text-lg font-medium">Web请求拦截演示</span>
          </div>
          
          <div className="flex items-center">
            <a 
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white flex items-center"
            >
              <Github className="h-5 w-5 mr-1" />
              <span>教学项目</span>
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700 text-sm text-center text-gray-400">
          <p>此网站仅供教学演示和研究使用</p>
          <p className="mt-2">© 2025 Web请求拦截演示</p>
        </div>
      </div>
    </footer>
  );
};