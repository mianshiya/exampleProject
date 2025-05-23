import React from 'react';
import { List } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <List size={24} className="mr-2" />
          <span className="font-semibold text-lg">虚拟列表演示</span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-blue-200 transition-colors">演示</a></li>
            <li><a href="#" className="hover:text-blue-200 transition-colors">原理</a></li>
            <li><a href="#" className="hover:text-blue-200 transition-colors">代码</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;