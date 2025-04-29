import React from 'react';

interface LayoutDemoProps {
  type: 'flexbox' | 'grid';
}

const LayoutDemo: React.FC<LayoutDemoProps> = ({ type }) => {
  return (
    <div 
      className={`rounded-lg border border-gray-200 overflow-hidden`}
      style={{ 
        height: '250px',
        ...(type === 'flexbox' 
          ? { display: 'flex' } 
          : { 
              display: 'grid', 
              gridTemplateColumns: '200px 1fr 200px'
            }
        )
      }}
    >
      <div className="bg-blue-100 p-4 flex flex-col items-center justify-center" style={{ width: type === 'flexbox' ? '200px' : 'auto' }}>
        <div className="text-blue-800 font-medium mb-2">左侧栏</div>
        <div className="text-blue-600 text-sm">固定宽度 200px</div>
      </div>
      
      <div className="bg-gray-100 p-4 flex-1 flex flex-col items-center justify-center">
        <div className="text-gray-800 font-medium mb-2">中间内容区</div>
        <div className="text-gray-600 text-sm">
          {type === 'flexbox' ? 'flex: 1' : '1fr'} 自适应宽度
        </div>
      </div>
      
      <div className="bg-purple-100 p-4 flex flex-col items-center justify-center" style={{ width: type === 'flexbox' ? '200px' : 'auto' }}>
        <div className="text-purple-800 font-medium mb-2">右侧栏</div>
        <div className="text-purple-600 text-sm">固定宽度 200px</div>
      </div>
    </div>
  );
};

export default LayoutDemo;