import React from 'react';
import { Layout } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Layout size={24} />
            <h1>响应式布局演示</h1>
          </div>
          <nav className="nav">
            <a href="#原理">原理</a>
            <a href="#实现">实现</a>
            <a href="#示例">示例</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;