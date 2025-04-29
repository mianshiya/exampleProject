import React from 'react';
import { SectionContainer } from './SectionContainer';
import { CodeBlock } from './CodeBlock';

export const StyledTooltips: React.FC = () => {
  const styledTooltipCode = `/* 带箭头的提示框 */
.tooltip-arrow {
  position: relative;
}

.tooltip-arrow::after,
.tooltip-arrow::before {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
}

.tooltip-arrow::after {
  background-color: #333;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  white-space: nowrap;
  margin-bottom: 10px;
  z-index: 1;
}

.tooltip-arrow::before {
  content: "";
  border-width: 6px;
  border-style: solid;
  border-color: #333 transparent transparent transparent;
  margin-bottom: -2px;
  z-index: 1;
}

.tooltip-arrow:hover::after,
.tooltip-arrow:hover::before {
  opacity: 1;
  visibility: visible;
}

/* 渐变背景提示框 */
.tooltip-gradient::after {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

/* 自定义形状 */
.tooltip-rounded::after {
  border-radius: 20px;
}

/* 自定义宽度 */
.tooltip-wide::after {
  white-space: normal;
  width: 200px;
  text-align: center;
}`;

  return (
    <SectionContainer
      id="styles"
      title="提示框样式"
      description="使用自定义样式、形状和视觉效果来增强提示框的外观，使其与你的设计系统相匹配。"
    >
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">自定义选项</h3>
            <p className="mb-4">
              提示框可以通过多种方式进行样式定制，以提升视觉效果并匹配你的设计系统。
              以下是一些自定义示例：
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>带箭头提示框</strong> - 添加方向指示器</li>
              <li><strong>渐变背景</strong> - 创造现代感</li>
              <li><strong>自定义形状</strong> - 改变圆角或添加独特形状</li>
              <li><strong>多行提示框</strong> - 支持较长的文本内容</li>
            </ul>
            
            <CodeBlock code={styledTooltipCode} />
          </div>
          
          <div className="flex flex-col justify-center space-y-12">
            {/* 带箭头提示框 */}
            <div className="flex justify-center">
              <div className="relative group">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  带箭头
                </button>
                <span className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded transition-all duration-300 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-gray-800">
                  带指示箭头的提示框
                </span>
              </div>
            </div>
            
            {/* 渐变提示框 */}
            <div className="flex justify-center">
              <div className="relative group">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  渐变
                </button>
                <span className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm rounded shadow-lg transition-all duration-300">
                  渐变背景效果
                </span>
              </div>
            </div>
            
            {/* 圆角提示框 */}
            <div className="flex justify-center">
              <div className="relative group">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  圆角
                </button>
                <span className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-full transition-all duration-300">
                  完全圆角效果
                </span>
              </div>
            </div>
            
            {/* 多行提示框 */}
            <div className="flex justify-center">
              <div className="relative group">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  多行文本
                </button>
                <span className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded transition-all duration-300 w-48 text-center">
                  这是一个较宽的提示框，包含多行文本内容，用于演示如何处理较长的提示信息。
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};