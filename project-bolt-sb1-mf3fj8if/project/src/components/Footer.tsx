import React from 'react';
import { GithubIcon, BookOpen } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-medium text-white mb-1">响应式表格设计演示</h3>
            <p className="text-sm">前端教学演示项目 © 2025</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="flex items-center text-gray-300 hover:text-white transition-colors">
              <BookOpen size={18} className="mr-1" />
              <span>完整教程</span>
            </a>
            <a href="#" className="flex items-center text-gray-300 hover:text-white transition-colors">
              <GithubIcon size={18} className="mr-1" />
              <span>源代码</span>
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-5 border-t border-gray-700 text-sm text-center text-gray-400">
          本项目仅用于教学演示和研究目的，展示响应式表格设计的最佳实践
        </div>
      </div>
    </footer>
  );
};

export default Footer;