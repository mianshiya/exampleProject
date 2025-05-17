import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="mb-2">
            图像处理演示应用 - 用于教学和研究目的
          </p>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} 图像处理演示 - 使用 HTML5 Canvas 和 JavaScript 实现
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;