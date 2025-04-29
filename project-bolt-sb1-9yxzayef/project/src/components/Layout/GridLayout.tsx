import React from 'react';
import CodeBlock from '../UI/CodeBlock';
import LayoutDemo from '../UI/LayoutDemo';
import { gridCode } from '../../utils/codeSnippets';

const GridLayout: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-purple-600 mb-4">Grid 实现方法</h3>
        <p className="text-gray-700 mb-6">
          Grid 是一个二维布局系统，非常适合创建网格结构。对于三栏布局，
          我们可以使用 grid-template-columns 属性定义三列，并使用 fr 单位让中间列自动占据剩余空间。
        </p>
        
        <div className="mb-8">
          <LayoutDemo type="grid" />
        </div>
        
        <h4 className="text-lg font-medium text-gray-800 mb-3">HTML 结构</h4>
        <CodeBlock code={gridCode.html} language="html" />
        
        <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">CSS 样式</h4>
        <CodeBlock code={gridCode.css} language="css" />
        
        <div className="mt-6 p-4 bg-purple-50 rounded-md border border-purple-100">
          <h4 className="text-md font-medium text-purple-800 mb-2">技术要点：</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>容器设置 <code className="bg-gray-100 px-1 rounded">display: grid</code> 创建网格容器</li>
            <li>使用 <code className="bg-gray-100 px-1 rounded">grid-template-columns</code> 定义三列布局</li>
            <li>左右两列固定宽度（如 200px），中间列使用 <code className="bg-gray-100 px-1 rounded">1fr</code> 单位自动占据剩余空间</li>
            <li>这种方法代码简洁，维护方便，但需要现代浏览器支持</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GridLayout;