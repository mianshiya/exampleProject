import React from 'react';
import { BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <BookOpen className="h-8 w-8 mr-3" />
        <h1 className="text-2xl font-bold">JavaScript 事件总线教学演示</h1>
      </div>
    </header>
  );
};

export default Header;