import React from 'react';
import LeftSidebar from './LeftSidebar';
import Content from './Content';
import RightSidebar from './RightSidebar';
import './MainContent.css';

const MainContent: React.FC = () => {
  return (
    <main className="main-content">
      <div className="container">
        <div className="responsive-layout">
          <LeftSidebar />
          <Content />
          <RightSidebar />
        </div>
      </div>
    </main>
  );
};

export default MainContent;