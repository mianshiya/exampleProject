import React from 'react';
import { LayoutGrid, LayoutList, Smartphone } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-3 bg-white p-2 rounded-full">
              <div className="flex text-blue-600">
                <LayoutGrid size={24} className="hidden md:block" />
                <LayoutList size={24} className="block md:hidden" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">响应式表格转换演示</h1>
              <p className="text-blue-100 text-sm mt-1">从横向表格到垂直列表的自适应设计</p>
            </div>
          </div>
          <div className="flex items-center bg-blue-700 px-4 py-2 rounded-full">
            <Smartphone size={16} className="mr-2" />
            <span className="text-sm">请尝试调整窗口大小查看效果</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;