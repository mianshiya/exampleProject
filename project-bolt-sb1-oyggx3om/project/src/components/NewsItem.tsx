import React from 'react';
import { NewsData } from '../utils/mockData';

interface NewsItemProps {
  data: NewsData;
}

export const NewsItem: React.FC<NewsItemProps> = ({ data }) => {
  return (
    <div className="border-b border-gray-200 py-3 animate-fadeIn">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-medium text-gray-900">{data.title}</h3>
        <span className="text-xs text-gray-500">{data.time}</span>
      </div>
      <p className="text-sm text-gray-700 mb-2">{data.content}</p>
      <div className="flex items-center text-xs text-gray-500">
        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
          {data.category}
        </span>
        <span className="ml-2">阅读: {data.views}</span>
      </div>
    </div>
  );
};