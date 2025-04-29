import React from 'react';
import { Columns } from 'lucide-react';

const PageHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Columns className="w-8 h-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">布局教学</h1>
          </div>
          <div className="text-sm text-gray-500">CSS 布局技术演示</div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;