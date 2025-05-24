import React from 'react';
import './Sidebar.css';

const LeftSidebar: React.FC = () => {
  return (
    <aside className="sidebar left-sidebar">
      <h2>导航栏</h2>
      <div className="sidebar-content">
        <div className="menu">
          <div className="menu-item">响应式设计简介</div>
          <div className="menu-item">媒体查询基础</div>
          <div className="menu-item">Flexbox 布局</div>
          <div className="menu-item">Grid 布局</div>
          <div className="menu-item">视口单位</div>
          <div className="menu-item">常见布局方案</div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;