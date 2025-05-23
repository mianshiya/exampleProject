import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} 登录界面演示 - 仅用于教学目的</p>
      </div>
    </footer>
  );
};

export default Footer;