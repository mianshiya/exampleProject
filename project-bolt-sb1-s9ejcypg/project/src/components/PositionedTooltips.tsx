import React from 'react';
import { SectionContainer } from './SectionContainer';
import { CodeBlock } from './CodeBlock';

export const PositionedTooltips: React.FC = () => {
  const positionedTooltipCode = `/* 基础提示框样式 */
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip::after {
  content: attr(data-tooltip);
  position: absolute;
  background-color: #333;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.tooltip:hover::after {
  opacity: 1;
  visibility: visible;
}

/* 位置变化 */
.tooltip-top::after {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
}

.tooltip-right::after {
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  margin-left: 8px;
}

.tooltip-bottom::after {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
}

.tooltip-left::after {
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  margin-right: 8px;
}`;

  return (
    <SectionContainer
      id="positions"
      title="提示框位置"
      description="提示框可以相对于父元素出现在不同位置—上方、下方、左侧或右侧。"
    >
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">位置变化</h3>
          <p className="mb-4">
            通过调整定位属性，你可以将提示框放置在元素的任何方向。
            关键是使用适当的定位和变换属性组合。
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <div className="relative group p-8">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              上方提示
            </button>
            <span className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded transition-all duration-300">
              显示在元素上方
            </span>
          </div>
          
          <div className="relative group p-8">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              右侧提示
            </button>
            <span className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 top-1/2 left-full -translate-y-1/2 ml-2 px-3 py-1 bg-gray-800 text-white text-sm rounded transition-all duration-300">
              显示在右侧
            </span>
          </div>
          
          <div className="relative group p-8">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              下方提示
            </button>
            <span className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded transition-all duration-300">
              显示在下方
            </span>
          </div>
          
          <div className="relative group p-8">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              左侧提示
            </button>
            <span className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 top-1/2 right-full -translate-y-1/2 mr-2 px-3 py-1 bg-gray-800 text-white text-sm rounded transition-all duration-300">
              显示在左侧
            </span>
          </div>
        </div>
        
        <div className="mt-8">
          <CodeBlock code={positionedTooltipCode} />
          
          <div className="mt-6">
            <h4 className="font-semibold mb-2">使用方法：</h4>
            <CodeBlock 
              code={`<div class="tooltip tooltip-top" data-tooltip="显示在上方">悬停查看</div>
<div class="tooltip tooltip-right" data-tooltip="显示在右侧">悬停查看</div>
<div class="tooltip tooltip-bottom" data-tooltip="显示在下方">悬停查看</div>
<div class="tooltip tooltip-left" data-tooltip="显示在左侧">悬停查看</div>`} 
              language="html" 
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};