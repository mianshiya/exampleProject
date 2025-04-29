import React from 'react';
import { SectionContainer } from './SectionContainer';
import { CodeBlock } from './CodeBlock';

export const AnimatedTooltips: React.FC = () => {
  const animatedTooltipCode = `/* 基础提示框样式 */
.tooltip-animated {
  position: relative;
  display: inline-block;
}

.tooltip-animated::after {
  content: attr(data-tooltip);
  position: absolute;
  background-color: #333;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  white-space: nowrap;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  opacity: 0;
  visibility: hidden;
}

/* 淡入淡出 */
.tooltip-fade::after {
  transition: opacity 0.3s ease;
}

.tooltip-fade:hover::after {
  opacity: 1;
  visibility: visible;
}

/* 滑动效果 */
.tooltip-slide-down::after {
  transform: translateX(-50%) translateY(-10px);
  transition: opacity 0.3s, transform 0.3s, visibility 0s 0.3s;
}

.tooltip-slide-down:hover::after {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
  transition: opacity 0.3s, transform 0.3s;
}

/* 缩放效果 */
.tooltip-scale::after {
  transform: translateX(-50%) scale(0.7);
  transition: opacity 0.3s, transform 0.3s, visibility 0s 0.3s;
}

.tooltip-scale:hover::after {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) scale(1);
  transition: opacity 0.3s, transform 0.3s;
}

/* 旋转效果 */
.tooltip-rotate::after {
  transform: translateX(-50%) rotateX(90deg);
  transform-origin: bottom center;
  transition: opacity 0.3s, transform 0.3s, visibility 0s 0.3s;
}

.tooltip-rotate:hover::after {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) rotateX(0);
  transition: opacity 0.3s, transform 0.3s;
}`;

  return (
    <SectionContainer
      id="animations"
      title="提示框动画"
      description="添加平滑动画效果，提升提示框显示和隐藏时的用户体验。"
    >
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">动画技巧</h3>
            <p className="mb-4">
              动画效果可以让提示框更加精致，提升用户体验。以下是几种可以通过 CSS 过渡和变换实现的动画样式：
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>淡入淡出</strong> - 简单的透明度过渡</li>
              <li><strong>滑动</strong> - 配合淡入淡出的移动效果</li>
              <li><strong>缩放</strong> - 大小变化效果</li>
              <li><strong>旋转</strong> - 3D 旋转效果</li>
            </ul>
            
            <p className="mb-4">
              实现平滑动画的关键是使用 CSS <code>transition</code> 属性，配合适当的时间函数和延迟。
            </p>
            
            <CodeBlock code={animatedTooltipCode} />
          </div>
          
          <div className="flex flex-col justify-center space-y-12">
            {/* 淡入淡出动画 */}
            <div className="flex justify-center">
              <div className="relative group">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  淡入淡出
                </button>
                <span 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300"
                >
                  简单的淡入淡出效果
                </span>
              </div>
            </div>
            
            {/* 滑动动画 */}
            <div className="flex justify-center">
              <div className="relative group">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  滑动
                </button>
                <span 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-4 group-hover:translate-y-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300"
                >
                  滑动显示效果
                </span>
              </div>
            </div>
            
            {/* 缩放动画 */}
            <div className="flex justify-center">
              <div className="relative group">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  缩放
                </button>
                <span 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap invisible opacity-0 scale-75 group-hover:visible group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 origin-bottom"
                >
                  缩放动画效果
                </span>
              </div>
            </div>
            
            {/* 旋转动画 */}
            <div className="flex justify-center">
              <div className="relative group perspective-[600px]">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  旋转
                </button>
                <span 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap invisible opacity-0 group-hover:visible group-hover:opacity-100 [transform:rotateX(90deg)] group-hover:[transform:rotateX(0deg)] transition-all duration-300 origin-bottom"
                >
                  3D 旋转效果
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};