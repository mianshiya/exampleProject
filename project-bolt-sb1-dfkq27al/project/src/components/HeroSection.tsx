import React from 'react';
import { Terminal } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              深入理解 Vue CLI 实现原理
            </h1>
            <p className="text-xl opacity-90 mb-8">
              探索 Vue CLI 的内部工作机制，学习如何构建自己的项目脚手架工具。
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#command-line"
                className="px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
              >
                探索原理
              </a>
              <a 
                href="#building-own"
                className="px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 border border-blue-500 transition-colors duration-200"
              >
                动手实践
              </a>
            </div>
          </div>
          <div className="mt-12 md:mt-0 md:w-1/2">
            <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
              <div className="flex items-center bg-gray-800 px-4 py-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-gray-300 text-sm">终端</div>
              </div>
              <div className="p-4 font-mono text-sm text-green-400">
                <div className="flex items-center mb-2">
                  <Terminal className="h-4 w-4 mr-2" />
                  <span className="text-gray-400">$</span>
                  <span className="ml-2">vue create my-project</span>
                </div>
                <div className="mb-2 text-gray-300">? 请选择预设: (使用方向键)</div>
                <div className="mb-2 text-white">❯ 默认配置 (Vue 3)</div>
                <div className="mb-2 text-gray-300">  默认配置 (Vue 2)</div>
                <div className="mb-2 text-gray-300">  手动选择特性</div>
                <div className="animate-pulse">_</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-16 bg-slate-50 -mt-8 rounded-t-[50px]"></div>
    </div>
  );
};

export default HeroSection;