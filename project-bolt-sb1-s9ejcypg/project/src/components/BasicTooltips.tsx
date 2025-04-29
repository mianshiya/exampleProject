import React from 'react';
import { SectionContainer } from './SectionContainer';
import { CodeBlock } from './CodeBlock';

export const BasicTooltips: React.FC = () => {
  const basicTooltipCode = `.tooltip {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
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
}`;

  return (
    <SectionContainer
      id="basics"
      title="基础提示框实现"
      description="基本的提示框实现使用 CSS 伪元素和 attr() 函数在悬停时显示内容。"
    >
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">工作原理</h3>
            <p className="mb-4">
              基础提示框依赖于三个关键的 CSS 特性：
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>伪元素 (::before/::after)</strong> - 无需额外 HTML 即可创建提示框</li>
              <li><strong>attr() 函数</strong> - 从数据属性中获取内容</li>
              <li><strong>定位</strong> - 相对于父元素进行定位</li>
              <li><strong>过渡效果</strong> - 添加平滑的显示/隐藏效果</li>
            </ul>
            
            <CodeBlock code={basicTooltipCode} />
          </div>
          
          <div className="flex-1 flex flex-col justify-center items-center bg-gray-50 rounded-lg p-8">
            <p className="mb-6 text-center text-gray-600">将鼠标悬停在下面的按钮上查看提示框效果：</p>
            
            <div 
              className="relative inline-block"
              style={{ cursor: 'pointer' }}
            >
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                悬停查看
              </button>
              <span 
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                style={{
                  content: "这是一个提示框！",
                  position: "absolute",
                  bottom: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#333",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  whiteSpace: "nowrap",
                  visibility: "hidden",
                  opacity: 0,
                  transition: "opacity 0.3s, visibility 0.3s"
                }}
              >
                这是一个提示框！
              </span>
            </div>
            
            <div className="mt-16 w-full">
              <p className="text-center text-gray-600 mb-4">HTML 结构：</p>
              <CodeBlock 
                code={`<div class="tooltip" data-tooltip="这是一个提示框！">
  悬停查看
</div>`} 
                language="html" 
              />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};