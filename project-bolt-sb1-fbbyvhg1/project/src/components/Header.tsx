import React from 'react';
import { ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <ImageIcon className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-gray-800">图片优化教学演示</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-500 transition-colors">
              首页
            </Link>
            <Link to="/formats" className="text-gray-700 hover:text-blue-500 transition-colors">
              图片格式
            </Link>
            <Link to="/compression" className="text-gray-700 hover:text-blue-500 transition-colors">
              压缩技术
            </Link>
            <Link to="/responsive" className="text-gray-700 hover:text-blue-500 transition-colors">
              响应式加载
            </Link>
            <Link to="/lazy-loading" className="text-gray-700 hover:text-blue-500 transition-colors">
              懒加载策略
            </Link>
            <Link to="/cdn" className="text-gray-700 hover:text-blue-500 transition-colors">
              CDN分发
            </Link>
          </nav>
          
          <div className="md:hidden">
            <button className="p-2 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;