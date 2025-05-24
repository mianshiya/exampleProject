import React, { useState, useEffect, useRef } from 'react';
import { NewsItem } from './NewsItem';
import { PullToRefresh } from './PullToRefresh';
import { Loader } from './Loader';
import { generateMockData, NewsData } from '../utils/mockData';

export const MobileDemo: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 初始加载数据
  useEffect(() => {
    loadInitialData();
  }, []);
  
  // 加载初始数据
  const loadInitialData = async () => {
    setLoading(true);
    try {
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = generateMockData(1, 10);
      setNewsItems(data);
      setPage(1);
    } finally {
      setLoading(false);
    }
  };
  
  // 刷新数据
  const handleRefresh = async () => {
    if (refreshing) return;
    
    setRefreshing(true);
    try {
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newData = generateMockData(1, 10, true);
      setNewsItems(newData);
      setPage(1);
      setHasMore(true);
    } finally {
      setRefreshing(false);
    }
  };
  
  // 加载更多数据
  const loadMoreData = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 1200));
      const newData = generateMockData(page + 1, 5);
      
      // 如果没有更多数据了
      if (newData.length === 0 || page >= 5) {
        setHasMore(false);
        return;
      }
      
      setNewsItems(prev => [...prev, ...newData]);
      setPage(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };
  
  // 监听滚动事件
  const handleScroll = () => {
    if (!containerRef.current || loading || !hasMore) return;
    
    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    
    // 当滚动到底部附近时加载更多
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      loadMoreData();
    }
  };
  
  return (
    <div className="mx-auto max-w-md">
      <div className="bg-gray-900 rounded-t-xl p-4 flex items-center justify-center shadow-lg">
        <div className="w-20 h-5 bg-gray-800 rounded-full"></div>
      </div>
      
      <div 
        ref={containerRef}
        className="bg-white border-x-2 border-gray-900 h-[500px] overflow-y-auto"
        onScroll={handleScroll}
      >
        <PullToRefresh onRefresh={handleRefresh} refreshing={refreshing}>
          <div className="p-4">
            {newsItems.length === 0 && !loading ? (
              <div className="text-center py-10 text-gray-500">
                暂无数据
              </div>
            ) : (
              <>
                {newsItems.map(item => (
                  <NewsItem key={item.id} data={item} />
                ))}
                
                {loading && (
                  <div className="flex justify-center py-4">
                    <Loader text="加载中..." />
                  </div>
                )}
                
                {!hasMore && newsItems.length > 0 && (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    —— 已经到底啦 ——
                  </div>
                )}
              </>
            )}
          </div>
        </PullToRefresh>
      </div>
      
      <div className="bg-gray-900 rounded-b-xl p-2 px-4 flex justify-center shadow-lg">
        <div className="w-32 h-5 bg-gray-800 rounded-full"></div>
      </div>
      
      <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h3 className="font-bold mb-2">使用说明</h3>
        <ul className="text-gray-700 space-y-1 text-sm">
          <li>👆 <strong>下拉刷新</strong>：按住屏幕向下拖动</li>
          <li>👇 <strong>上拉加载</strong>：滚动到列表底部</li>
        </ul>
      </div>
    </div>
  );
};