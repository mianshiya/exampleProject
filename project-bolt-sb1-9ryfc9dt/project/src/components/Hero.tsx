import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-4xl font-bold mb-4">如何拦截Web页面的请求</h1>
        <p className="text-xl opacity-90">
          了解并掌握三种主要的Web请求拦截技术，提升前端开发能力
        </p>
      </div>
    </div>
  );
};