import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© {new Date().getFullYear()} 表格组件教学演示</p>
          </div>
          <div className="text-sm text-gray-400">
            本项目仅用于教学演示和研究目的
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;