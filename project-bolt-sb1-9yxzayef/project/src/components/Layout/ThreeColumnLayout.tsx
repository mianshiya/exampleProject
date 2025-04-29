import React, { useState } from 'react';
import FlexboxLayout from './FlexboxLayout';
import GridLayout from './GridLayout';
import LayoutToggle from '../UI/LayoutToggle';
import PageHeader from '../UI/PageHeader';

const ThreeColumnLayout: React.FC = () => {
  const [activeLayout, setActiveLayout] = useState<'flexbox' | 'grid'>('flexbox');

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            三栏布局：左右固定宽度，中间自适应
          </h2>
          
          <p className="text-gray-700 mb-8">
            实现三栏布局（左右固定宽度，中间自适应）有多种方法，主要可以通过 Flexbox 和 Grid 两种现代布局技术来实现。
            以下展示了这两种方法的具体实现，您可以通过切换按钮查看不同的实现方式。
          </p>
          
          <LayoutToggle 
            activeLayout={activeLayout} 
            onChange={setActiveLayout} 
          />
          
          <div className="mt-6 transition-all duration-300">
            {activeLayout === 'flexbox' ? <FlexboxLayout /> : <GridLayout />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThreeColumnLayout;