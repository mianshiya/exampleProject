import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>响应式布局教学演示 © {new Date().getFullYear()}</p>
          <p>本站仅用于教学演示和研究目的</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;