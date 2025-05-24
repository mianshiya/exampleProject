import React from 'react';
import './Sidebar.css';

const RightSidebar: React.FC = () => {
  return (
    <aside className="sidebar right-sidebar">
      <h2>相关资源</h2>
      <div className="sidebar-content">
        <div className="resource-list">
          <div className="resource-item">
            <h3>MDN Web 文档</h3>
            <p>CSS 媒体查询官方文档</p>
          </div>
          <div className="resource-item">
            <h3>CSS-Tricks</h3>
            <p>Flexbox 完全指南</p>
          </div>
          <div className="resource-item">
            <h3>W3Schools</h3>
            <p>响应式网页设计教程</p>
          </div>
          <div className="resource-item">
            <h3>Can I Use</h3>
            <p>浏览器兼容性查询</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;