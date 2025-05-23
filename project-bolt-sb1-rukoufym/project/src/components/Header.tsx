import React from 'react';
import { Layers } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Layers className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-bold text-gray-800">多步骤表单向导</h1>
        </div>
        <div className="text-sm text-gray-600">
          教学演示与研究
        </div>
      </div>
    </header>
  );
};

export default Header;