import React from 'react';
import { Code } from 'lucide-react';

export const IntroSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">
            CSS 提示框：交互式指南
          </h1>
          <p className="text-xl mb-8">
            学习如何使用纯 CSS 创建美观、可访问的提示框效果。
            探索不同的位置、样式和动画，提升用户体验。
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#basics"
              className="px-6 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors"
            >
              浏览示例
            </a>
            <a
              href="#playground"
              className="px-6 py-3 border border-white rounded-md font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Code className="h-5 w-5" />
              试用调试器
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};