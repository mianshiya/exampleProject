import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { MarkdownGuide } from '../types';

const markdownGuides: MarkdownGuide[] = [
  {
    title: '标题',
    syntax: '# 一级标题\n## 二级标题\n### 三级标题',
    description: '使用 # 符号创建标题，符号数量表示标题级别（1-6级）'
  },
  {
    title: '强调',
    syntax: '**粗体文本**\n*斜体文本*\n~~删除线文本~~',
    description: '使用 * 或 _ 包围文本进行强调'
  },
  {
    title: '列表',
    syntax: '- 无序列表项\n- 另一个项目\n\n1. 有序列表项\n2. 另一个项目',
    description: '使用 - 或数字创建列表'
  },
  {
    title: '链接和图片',
    syntax: '[链接文本](https://example.com)\n![图片描述](图片URL)',
    description: '使用 [] 和 () 创建链接，图片前加 !'
  },
  {
    title: '引用',
    syntax: '> 这是一个引用\n> 这是引用的第二行',
    description: '使用 > 符号创建引用块'
  },
  {
    title: '代码',
    syntax: '`行内代码`\n\n```javascript\n// 代码块\nfunction hello() {\n  console.log("你好");\n}\n```',
    description: '使用反引号创建行内代码或代码块'
  },
  {
    title: '表格',
    syntax: '| 标题1 | 标题2 |\n| ----- | ----- |\n| 单元格1 | 单元格2 |\n| 单元格3 | 单元格4 |',
    description: '使用 | 和 - 创建表格'
  }
];

const SyntaxGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 mt-6 overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-50 p-4 flex items-center justify-between text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center">
          <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
          <h3 className="font-medium">Markdown 语法指南</h3>
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div className="p-4 animate-fade-in">
          <p className="text-gray-600 mb-4">下面是一些常用的 Markdown 语法示例：</p>
          
          <div className="space-y-6">
            {markdownGuides.map((guide, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                <h4 className="font-medium text-blue-700 mb-2">{guide.title}</h4>
                <pre className="bg-gray-50 p-3 rounded-md text-gray-800 text-sm font-mono mb-2 whitespace-pre-wrap">{guide.syntax}</pre>
                <p className="text-gray-600 text-sm">{guide.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SyntaxGuide;