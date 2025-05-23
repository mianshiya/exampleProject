import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotAuthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full py-12">
      <div className="text-red-500 text-6xl mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3V8m0 0V5m0 3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">权限不足</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        很抱歉，您没有访问此页面的权限。请联系管理员或切换到具有适当权限的账户。
      </p>
      
      <div className="space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          返回上一页
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          返回仪表盘
        </button>
      </div>
    </div>
  );
};