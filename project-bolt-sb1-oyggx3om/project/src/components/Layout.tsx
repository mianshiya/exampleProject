import React from 'react';
import { GraduationCap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <GraduationCap size={28} className="mr-2" />
          <h1 className="text-xl font-semibold">移动端交互演示</h1>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">上拉加载与下拉刷新功能演示</h2>
          <p className="text-gray-700 mb-2">
            本演示展示了如何在移动端网页中实现两个常见的交互功能：
          </p>
          <ul className="list-disc pl-5 mb-4 text-gray-700">
            <li>下拉刷新：从顶部下拉页面可以刷新内容</li>
            <li>上拉加载：滚动到底部可以加载更多内容</li>
          </ul>
          <p className="text-gray-700 mb-4">
            请在下方的模拟手机界面中尝试这些交互：
          </p>
        </div>
        
        {children}
        
        <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-2">技术实现说明</h3>
          <p className="text-gray-700 mb-2">
            本演示采用了原生 JavaScript 方法实现上述功能，主要通过以下技术：
          </p>
          <ul className="list-disc pl-5 mb-2 text-gray-700">
            <li>监听 <code>touchstart</code>、<code>touchmove</code> 和 <code>touchend</code> 事件实现下拉刷新</li>
            <li>监听 <code>scroll</code> 事件，结合元素位置计算实现上拉加载</li>
            <li>使用 CSS 过渡和变换实现平滑的视觉反馈</li>
          </ul>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© 2025 移动端交互演示 - 仅用于教学目的</p>
        </div>
      </footer>
    </div>
  );
};