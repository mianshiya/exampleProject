import React from 'react';
import { Image } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image className="h-6 w-6" />
          <span className="text-xl font-bold">图像处理演示</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-blue-200 transition-colors">
                首页
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-200 transition-colors">
                教程
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-200 transition-colors">
                关于
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;