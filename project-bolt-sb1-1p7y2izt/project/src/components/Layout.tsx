import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import ServerTime from './ServerTime';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <div className="container header-container">
          <Link to="/" className="logo">
            <h1>闪购优选</h1>
          </Link>
          <div className="server-time">
            <Clock size={18} />
            <ServerTime />
          </div>
        </div>
      </header>
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>秒杀系统前端优化演示</h3>
              <p>本网站仅用于教学演示和研究目的</p>
            </div>
            <div className="footer-section">
              <h3>优化要点</h3>
              <ul>
                <li>页面静态化和资源优化</li>
                <li>倒计时与活动状态同步</li>
                <li>按钮防抖与限流</li>
                <li>接口请求优化</li>
                <li>排队与反馈机制</li>
                <li>异常与降级处理</li>
                <li>防刷与安全措施</li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            &copy; {new Date().getFullYear()} 秒杀系统前端优化演示 - 教学用途
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;