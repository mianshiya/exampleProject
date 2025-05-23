import React from 'react';
import { BookOpen, ArrowDown, ArrowUp, Monitor } from 'lucide-react';

const TheoryExplanation: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-500 text-white p-4">
        <div className="flex items-center mb-2">
          <BookOpen className="mr-2" size={20} />
          <h2 className="text-xl font-semibold">原理解析</h2>
        </div>
        <p className="text-blue-100 text-sm">了解虚拟列表与内容回收的工作原理</p>
      </div>
      
      <div className="p-5 space-y-6">
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">什么是虚拟列表？</h3>
          <p className="text-gray-600">
            虚拟列表（Virtual List）是一种优化技术，用于高效渲染大量数据。其核心思想是只渲染用户当前可见的部分，
            而不是一次性渲染所有数据，从而显著减少DOM节点数量，提高页面性能。
          </p>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">内容回收原理</h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
            <div className="flex justify-center mb-4">
              <div className="relative w-64 h-64 border-2 border-blue-500 rounded-lg overflow-hidden">
                <div className="absolute top-0 w-full h-12 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                  已回收区域
                </div>
                <div className="absolute top-12 w-full h-32 bg-blue-100 flex items-center justify-center border-y-2 border-blue-500">
                  <div className="text-center">
                    <p className="font-medium text-blue-800">可视区域</p>
                    <p className="text-xs text-blue-600 mt-1">仅渲染此处的DOM节点</p>
                  </div>
                </div>
                <div className="absolute top-44 w-full h-20 bg-blue-50 flex items-center justify-center text-xs text-blue-500 border-b-2 border-blue-300">
                  缓冲区
                </div>
                <div className="absolute bottom-0 w-full h-12 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                  已回收区域
                </div>
                
                <div className="absolute right-2 top-20 text-blue-600 animate-bounce">
                  <ArrowDown size={20} />
                </div>
                <div className="absolute right-2 bottom-32 text-blue-600 animate-bounce">
                  <ArrowUp size={20} />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              当用户滚动时，虚拟列表会根据滚动位置动态计算应该显示哪些项目。超出可视区域（和缓冲区）的内容会被"回收"，
              即从DOM中移除，而新进入视口的内容会被动态创建并添加到DOM中。
            </p>
          </div>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">实现要点</h3>
          <ol className="list-decimal pl-5 space-y-2 text-gray-600">
            <li>
              <span className="font-medium">确定项目高度</span>：固定高度可以简化计算，但也可以支持动态高度
            </li>
            <li>
              <span className="font-medium">监听滚动事件</span>：跟踪用户的滚动位置
            </li>
            <li>
              <span className="font-medium">计算可视区域</span>：根据滚动位置和容器高度，计算哪些项应该被渲染
            </li>
            <li>
              <span className="font-medium">维持滚动条</span>：使用一个高度占位元素确保滚动条长度正确
            </li>
            <li>
              <span className="font-medium">动态渲染</span>：只渲染可视区域附近的项目，其余不渲染
            </li>
          </ol>
        </section>
        
        <section className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Monitor size={18} className="text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-blue-800">性能优势</h3>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>大幅减少DOM节点数量，降低内存占用</li>
            <li>减轻浏览器渲染负担，提高页面响应速度</li>
            <li>滚动更加流畅，无卡顿感</li>
            <li>支持渲染几万甚至几十万条数据而不影响性能</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TheoryExplanation;