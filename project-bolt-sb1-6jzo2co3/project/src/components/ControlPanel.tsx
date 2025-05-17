import React from 'react';
import { Sliders } from 'lucide-react';

interface ControlPanelProps {
  totalItems: number;
  setTotalItems: (value: number) => void;
  itemHeight: number;
  setItemHeight: (value: number) => void;
  bufferSize: number;
  setBufferSize: (value: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  totalItems, 
  setTotalItems, 
  itemHeight, 
  setItemHeight, 
  bufferSize, 
  setBufferSize 
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
      <div className="flex items-center mb-3">
        <Sliders size={16} className="text-blue-500 mr-2" />
        <h3 className="font-medium text-gray-700">参数控制面板</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            总数据量
          </label>
          <div className="flex items-center">
            <input
              type="range"
              min="100"
              max="100000"
              step="100"
              value={totalItems}
              onChange={(e) => setTotalItems(Number(e.target.value))}
              className="w-full mr-2"
            />
            <span className="text-sm text-gray-600 w-16 text-right">{totalItems.toLocaleString()}</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            项目高度 (px)
          </label>
          <div className="flex items-center">
            <input
              type="range"
              min="30"
              max="150"
              value={itemHeight}
              onChange={(e) => setItemHeight(Number(e.target.value))}
              className="w-full mr-2"
            />
            <span className="text-sm text-gray-600 w-16 text-right">{itemHeight}px</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            缓冲区大小
          </label>
          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max="20"
              value={bufferSize}
              onChange={(e) => setBufferSize(Number(e.target.value))}
              className="w-full mr-2"
            />
            <span className="text-sm text-gray-600 w-16 text-right">{bufferSize} 项</span>
          </div>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        提示: 调整参数查看不同配置下的性能表现和内容回收效果
      </div>
    </div>
  );
};

export default ControlPanel;