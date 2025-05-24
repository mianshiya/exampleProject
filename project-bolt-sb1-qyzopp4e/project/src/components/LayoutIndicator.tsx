import React, { useState, useEffect } from 'react';
import './LayoutIndicator.css';

const LayoutIndicator: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [layoutType, setLayoutType] = useState(
    window.innerWidth > 768 ? '三栏布局 (桌面端)' : '单栏布局 (移动端)'
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setLayoutType(window.innerWidth > 768 ? '三栏布局 (桌面端)' : '单栏布局 (移动端)');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="layout-indicator">
      <div className="container">
        <div className="indicator-content">
          <div className="current-width">
            当前窗口宽度: <span>{windowWidth}px</span>
          </div>
          <div className="layout-type">
            当前布局: <span>{layoutType}</span>
          </div>
          <div className="breakpoint-info">
            布局断点: <span>768px</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutIndicator;