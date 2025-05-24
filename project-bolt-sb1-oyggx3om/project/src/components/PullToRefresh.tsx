import React, { useState, useRef, useEffect } from 'react';
import { Loader } from './Loader';

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  refreshing: boolean;
  pullDistance?: number;
  pullRate?: number;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  children,
  onRefresh,
  refreshing,
  pullDistance = 100, // 触发刷新需要下拉的距离
  pullRate = 0.4, // 下拉移动的阻尼系数
}) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullY, setPullY] = useState(0);
  const [startY, setStartY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 重置状态
  const resetPullState = () => {
    setPullY(0);
    setIsPulling(false);
  };
  
  // 处理触摸开始
  const handleTouchStart = (e: React.TouchEvent) => {
    // 只有当滚动位置在顶部时才允许下拉
    if (containerRef.current && containerRef.current.scrollTop === 0) {
      setStartY(e.touches[0].clientY);
      setIsPulling(true);
    }
  };
  
  // 处理触摸移动
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling) return;
    
    const containerTop = containerRef.current?.scrollTop === 0;
    if (!containerTop) {
      return;
    }
    
    const touchY = e.touches[0].clientY;
    const diff = touchY - startY;
    
    // 只处理下拉操作
    if (diff > 0) {
      // 应用阻尼效果，使得下拉越来越难
      const newPullY = diff * pullRate;
      setPullY(newPullY);
      
      // 阻止默认滚动行为
      e.preventDefault();
    }
  };
  
  // 处理触摸结束
  const handleTouchEnd = async () => {
    if (!isPulling) return;
    
    // 如果下拉距离足够，触发刷新
    if (pullY >= pullDistance) {
      await onRefresh();
    }
    
    // 重置状态
    resetPullState();
  };
  
  // 监听刷新状态变化
  useEffect(() => {
    if (!refreshing) {
      resetPullState();
    }
  }, [refreshing]);
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 下拉提示区域 */}
      <div 
        className="absolute left-0 w-full flex justify-center items-center transition-transform duration-200"
        style={{ 
          transform: `translateY(${pullY - 60}px)`,
          height: '60px',
          top: 0
        }}
      >
        {refreshing ? (
          <Loader text="刷新中..." />
        ) : (
          <div className="text-blue-600 text-sm flex flex-col items-center">
            <svg 
              className="w-5 h-5 mb-1" 
              fill="none" 
              strokeWidth={2}
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ 
                transform: `rotate(${Math.min(180, pullY * 1.8)}deg)`,
                transition: isPulling ? 'none' : 'transform 0.2s'
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            {pullY >= pullDistance ? '释放刷新' : '下拉刷新'}
          </div>
        )}
      </div>
      
      {/* 内容区域 */}
      <div
        style={{ 
          transform: `translateY(${pullY}px)`,
          transition: isPulling ? 'none' : 'transform 0.2s'
        }}
      >
        {children}
      </div>
    </div>
  );
};