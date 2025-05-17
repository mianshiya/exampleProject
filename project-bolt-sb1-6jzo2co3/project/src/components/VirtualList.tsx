import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ListItem } from '../types';

interface VirtualListProps {
  items: ListItem[];
  itemHeight: number;
  bufferSize: number;
  onRenderedItemsChange?: (count: number) => void;
}

const VirtualList: React.FC<VirtualListProps> = ({ 
  items, 
  itemHeight, 
  bufferSize,
  onRenderedItemsChange 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  
  // 计算需要渲染的项
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - bufferSize);
  const endIndex = Math.min(
    items.length - 1,
    Math.floor((scrollTop + clientHeight) / itemHeight) + bufferSize
  );
  
  // 计算总高度和偏移量
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;
  
  // 实际渲染的元素数量
  const visibleItems = items.slice(startIndex, endIndex + 1);
  
  useEffect(() => {
    if (onRenderedItemsChange) {
      onRenderedItemsChange(visibleItems.length);
    }
  }, [visibleItems.length, onRenderedItemsChange]);
  
  // 滚动事件处理
  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
      setClientHeight(containerRef.current.clientHeight);
    }
  }, []);
  
  // 组件挂载和卸载时初始化滚动监听
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      setClientHeight(container.clientHeight);
      container.addEventListener('scroll', handleScroll);
      
      // 初始触发一次滚动事件以计算初始渲染项
      handleScroll();
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);
  
  return (
    <div 
      ref={containerRef}
      className="h-full overflow-auto custom-scrollbar"
      style={{ position: 'relative', overflowAnchor: 'none' }}
    >
      {/* 容器和高度占位 */}
      <div 
        style={{ 
          height: `${totalHeight}px`, 
          position: 'relative' 
        }}
      >
        {/* 可视区域的项目 */}
        <div 
          style={{ 
            position: 'absolute', 
            top: 0,
            transform: `translateY(${offsetY}px)`,
            width: '100%'
          }}
        >
          {visibleItems.map((item, index) => (
            <div 
              key={item.id}
              className="border-b border-gray-200 px-4 flex items-center list-item-new"
              style={{ 
                height: `${itemHeight}px`,
                backgroundColor: (startIndex + index) % 2 === 0 ? '#f9fafb' : 'white',
              }}
            >
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 w-16 text-center">
                    #{item.id}
                  </span>
                  <span className="font-medium">{item.title}</span>
                </div>
                <p className="text-gray-500 text-sm mt-1 truncate">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 渲染范围指示器 */}
      <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-bl opacity-70">
        渲染: {startIndex} - {endIndex}
      </div>
    </div>
  );
};

export default VirtualList;