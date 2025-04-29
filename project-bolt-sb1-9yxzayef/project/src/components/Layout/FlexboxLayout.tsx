import React from 'react';
import CodeBlock from '../UI/CodeBlock';
import LayoutDemo from '../UI/LayoutDemo';
import { flexboxCode } from '../../utils/codeSnippets';

const FlexboxLayout: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-blue-600 mb-4">Flexbox 实现方法</h3>
        <p className="text-gray-700 mb-6">
          Flexbox 是一种一维布局模型，特别适合用于在行或列方向上分配元素之间的空间。
          在三栏布局中，我们可以设置容器为 flex 容器，然后为左右两栏设置固定宽度，
          中间栏使用 flex: 1 来占据剩余空间。
        </p>
        
        <div className="mb-8">
          <LayoutDemo type="flexbox" />
        </div>
        
        <h4 className="text-lg font-medium text-gray-800 mb-3">HTML 结构</h4>
        <CodeBlock code={flexboxCode.html} language="html" />
        
        <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">CSS 样式</h4>
        <CodeBlock code={flexboxCode.css} language="css" />
        
        <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
          <h4 className="text-md font-medium text-blue-800 mb-2">技术要点：</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>容器设置 <code className="bg-gray-100 px-1 rounded">display: flex</code> 创建 flex 容器</li>
            <li>左右两栏使用 <code className="bg-gray-100 px-1 rounded">width</code> 固定宽度</li>
            <li>中间栏使用 <code className="bg-gray-100 px-1 rounded">flex: 1</code> 占据所有剩余空间</li>
            <li>这种方法兼容性好，适用于大多数现代浏览器</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FlexboxLayout;