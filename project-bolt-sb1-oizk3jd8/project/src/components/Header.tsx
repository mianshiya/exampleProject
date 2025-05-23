import React from 'react';
import { BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <h1 className="text-xl font-bold">Markdown 编辑器示例</h1>
        </div>
        <div className="text-sm">
          <span className="opacity-75">教学演示和研究</span>
        </div>
      </div>
    </header>
  );
};

export default Header;