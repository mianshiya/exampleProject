import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Activity } from 'lucide-react';
import VirtualList from './VirtualList';
import ControlPanel from './ControlPanel';
import { generateItems } from '../utils/dataGenerator';

const VirtualListDemo: React.FC = () => {
  const [totalItems, setTotalItems] = useState(10000);
  const [itemHeight, setItemHeight] = useState(60);
  const [bufferSize, setBufferSize] = useState(5);
  const [items, setItems] = useState(() => generateItems(totalItems));
  const [renderedItems, setRenderedItems] = useState(0);
  
  // 当参数改变时重新生成数据
  useEffect(() => {
    setItems(generateItems(totalItems));
  }, [totalItems]);

  // 监听渲染的项目数量变化
  const handleRenderedItemsChange = useCallback((count: number) => {
    setRenderedItems(count);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-500 text-white p-4">
        <div className="flex items-center mb-2">
          <Activity className="mr-2" size={20} />
          <h2 className="text-xl font-semibold">虚拟列表演示</h2>
        </div>
        <p className="text-blue-100 text-sm">滚动列表查看内容回收效果，观察性能指标变化</p>
      </div>
      
      <div className="p-4">
        <ControlPanel 
          totalItems={totalItems}
          setTotalItems={setTotalItems}
          itemHeight={itemHeight}
          setItemHeight={setItemHeight}
          bufferSize={bufferSize}
          setBufferSize={setBufferSize}
        />
        
        <div className="mt-4 flex justify-between bg-gray-100 p-3 rounded-md text-sm">
          <div className="text-gray-700">
            <span className="font-medium">总数据量: </span>
            <span className="text-blue-600 font-semibold">{totalItems.toLocaleString()}</span> 项
          </div>
          <div className="text-gray-700">
            <span className="font-medium">当前渲染: </span>
            <span className="text-green-600 font-semibold">{renderedItems}</span> 项
          </div>
          <div className="text-gray-700">
            <span className="font-medium">优化比例: </span>
            <span className="text-purple-600 font-semibold">
              {renderedItems ? ((renderedItems / totalItems) * 100).toFixed(2) : 0}%
            </span>
          </div>
        </div>
        
        <div className="mt-4 border border-gray-200 rounded-md h-[500px] relative">
          <VirtualList 
            items={items} 
            itemHeight={itemHeight} 
            bufferSize={bufferSize}
            onRenderedItemsChange={handleRenderedItemsChange}
          />
        </div>
      </div>
    </div>
  );
};

export default VirtualListDemo;