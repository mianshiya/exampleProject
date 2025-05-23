import React from 'react';
import { KeyRound } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <KeyRound className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">登录界面错误提示演示</h1>
        </div>
        <div className="text-sm text-gray-600">
          教学演示与研究
        </div>
      </div>
    </header>
  );
};

export default Header;