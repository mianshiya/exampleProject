import React, { useState } from 'react';
import { SectionContainer } from './SectionContainer';
import { CodeBlock } from './CodeBlock';
import { Play } from 'lucide-react';

export const CodePlayground: React.FC = () => {
  const [position, setPosition] = useState<'top' | 'right' | 'bottom' | 'left'>('top');
  const [color, setColor] = useState('#333333');
  const [textColor, setTextColor] = useState('#ffffff');
  const [arrowEnabled, setArrowEnabled] = useState(false);
  const [animation, setAnimation] = useState<'fade' | 'slide' | 'scale' | 'rotate'>('fade');
  const [tooltipText, setTooltipText] = useState('Customized tooltip');
  const [borderRadius, setBorderRadius] = useState(4);
  const [duration, setDuration] = useState(300);

  const generateCSS = () => {
    return `.tooltip-custom {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip-custom::after {
  content: attr(data-tooltip);
  position: absolute;
  background-color: ${color};
  color: ${textColor};
  padding: 0.5rem 1rem;
  border-radius: ${borderRadius}px;
  font-size: 0.875rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all ${duration}ms ease;
  
  /* Position: ${position} */
  ${position === 'top' ? `
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%)${animation === 'scale' ? ' scale(0.8)' : animation === 'slide' ? ' translateY(10px)' : animation === 'rotate' ? ' rotateX(90deg)' : ''};
  margin-bottom: 8px;
  ${animation === 'rotate' ? 'transform-origin: bottom center;' : ''}` : ''}
  ${position === 'right' ? `
  top: 50%;
  left: 100%;
  transform: translateY(-50%)${animation === 'scale' ? ' scale(0.8)' : animation === 'slide' ? ' translateX(-10px)' : animation === 'rotate' ? ' rotateY(-90deg)' : ''};
  margin-left: 8px;
  ${animation === 'rotate' ? 'transform-origin: left center;' : ''}` : ''}
  ${position === 'bottom' ? `
  top: 100%;
  left: 50%;
  transform: translateX(-50%)${animation === 'scale' ? ' scale(0.8)' : animation === 'slide' ? ' translateY(-10px)' : animation === 'rotate' ? ' rotateX(-90deg)' : ''};
  margin-top: 8px;
  ${animation === 'rotate' ? 'transform-origin: top center;' : ''}` : ''}
  ${position === 'left' ? `
  top: 50%;
  right: 100%;
  transform: translateY(-50%)${animation === 'scale' ? ' scale(0.8)' : animation === 'slide' ? ' translateX(10px)' : animation === 'rotate' ? ' rotateY(90deg)' : ''};
  margin-right: 8px;
  ${animation === 'rotate' ? 'transform-origin: right center;' : ''}` : ''}
}

${arrowEnabled ? `.tooltip-custom::before {
  content: "";
  position: absolute;
  border-width: 6px;
  border-style: solid;
  opacity: 0;
  visibility: hidden;
  transition: all ${duration}ms ease;
  
  /* Arrow position: ${position} */
  ${position === 'top' ? `
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-color: ${color} transparent transparent transparent;
  margin-bottom: 2px;` : ''}
  ${position === 'right' ? `
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  border-color: transparent ${color} transparent transparent;
  margin-left: 2px;` : ''}
  ${position === 'bottom' ? `
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-color: transparent transparent ${color} transparent;
  margin-top: 2px;` : ''}
  ${position === 'left' ? `
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  border-color: transparent transparent transparent ${color};
  margin-right: 2px;` : ''}
}` : ''}

.tooltip-custom:hover::after${arrowEnabled ? ', .tooltip-custom:hover::before' : ''} {
  opacity: 1;
  visibility: visible;
  transform: ${position === 'top' ? 'translateX(-50%)' : 
              position === 'right' ? 'translateY(-50%)' : 
              position === 'bottom' ? 'translateX(-50%)' : 
              'translateY(-50%)'}${animation === 'scale' ? ' scale(1)' : 
                                  animation === 'slide' ? (
                                    position === 'top' || position === 'bottom' ? ' translateY(0)' : ' translateX(0)'
                                  ) : 
                                  animation === 'rotate' ? (
                                    position === 'top' || position === 'bottom' ? ' rotateX(0)' : ' rotateY(0)'
                                  ) : ''};
}`;
  };

  const cssCode = generateCSS();
  const htmlCode = `<div class="tooltip-custom" data-tooltip="${tooltipText}">
  Hover over me
</div>`;

  return (
    <SectionContainer
      id="playground"
      title="Interactive Playground"
      description="Customize your tooltip styles and see the results in real-time. Experiment with different positions, colors, and animations."
    >
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-6">Customize Your Tooltip</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tooltip Text
                </label>
                <input
                  type="text"
                  value={tooltipText}
                  onChange={(e) => setTooltipText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['top', 'right', 'bottom', 'left'] as const).map((pos) => (
                    <button
                      key={pos}
                      onClick={() => setPosition(pos)}
                      className={`px-4 py-2 border rounded-md text-sm capitalize ${
                        position === pos
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Background Color
                </label>
                <div className="flex">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-10 w-10 rounded-l-md border border-gray-300"
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text Color
                </label>
                <div className="flex">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="h-10 w-10 rounded-l-md border border-gray-300"
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Border Radius
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                    className="flex-1 mr-3"
                  />
                  <span className="text-gray-700 w-10 text-right">{borderRadius}px</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Animation Duration
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="flex-1 mr-3"
                  />
                  <span className="text-gray-700 w-16 text-right">{duration}ms</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Animation Type
                </label>
                <select
                  value={animation}
                  onChange={(e) => setAnimation(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="fade">Fade</option>
                  <option value="slide">Slide</option>
                  <option value="scale">Scale</option>
                  <option value="rotate">Rotate</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="arrow"
                  checked={arrowEnabled}
                  onChange={(e) => setArrowEnabled(e.target.checked)}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="arrow" className="ml-2 block text-sm text-gray-700">
                  Show Arrow
                </label>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6">Preview</h3>
              <div className="flex items-center justify-center min-h-[240px] bg-gray-50 rounded-lg border border-gray-200 p-8 relative">
                <div
                  className="relative inline-block"
                  style={{ perspective: '600px' }}
                >
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                    Hover over me
                  </button>
                  
                  {/* Preview tooltip */}
                  <span
                    className="absolute pointer-events-none"
                    style={{
                      // Position
                      ...(position === 'top' ? {
                        bottom: '100%',
                        left: '50%',
                        transform: `translateX(-50%)${animation === 'scale' ? ' scale(0.8)' : animation === 'slide' ? ' translateY(10px)' : animation === 'rotate' ? ' rotateX(90deg)' : ''}`,
                        marginBottom: '8px',
                        transformOrigin: animation === 'rotate' ? 'bottom center' : undefined,
                      } : {}),
                      ...(position === 'right' ? {
                        top: '50%',
                        left: '100%',
                        transform: `translateY(-50%)${animation === 'scale' ? ' scale(0.8)' : animation === 'slide' ? ' translateX(-10px)' : animation === 'rotate' ? ' rotateY(-90deg)' : ''}`,
                        marginLeft: '8px',
                        transformOrigin: animation === 'rotate' ? 'left center' : undefined,
                      } : {}),
                      ...(position === 'bottom' ? {
                        top: '100%',
                        left: '50%',
                        transform: `translateX(-50%)${animation === 'scale' ? ' scale(0.8)' : animation === 'slide' ? ' translateY(-10px)' : animation === 'rotate' ? ' rotateX(-90deg)' : ''}`,
                        marginTop: '8px',
                        transformOrigin: animation === 'rotate' ? 'top center' : undefined,
                      } : {}),
                      ...(position === 'left' ? {
                        top: '50%',
                        right: '100%',
                        transform: `translateY(-50%)${animation === 'scale' ? ' scale(0.8)' : animation === 'slide' ? ' translateX(10px)' : animation === 'rotate' ? ' rotateY(90deg)' : ''}`,
                        marginRight: '8px',
                        transformOrigin: animation === 'rotate' ? 'right center' : undefined,
                      } : {}),
                      
                      // Styling
                      backgroundColor: color,
                      color: textColor,
                      padding: '0.5rem 1rem',
                      borderRadius: `${borderRadius}px`,
                      fontSize: '0.875rem',
                      whiteSpace: 'nowrap',
                      
                      // Visibility
                      opacity: 0,
                      visibility: 'hidden',
                      transition: `all ${duration}ms ease`,
                    }}
                  >
                    {tooltipText}
                  </span>
                  
                  {/* Preview arrow */}
                  {arrowEnabled && (
                    <span
                      className="absolute w-0 h-0 pointer-events-none"
                      style={{
                        // Position
                        ...(position === 'top' ? {
                          bottom: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          marginBottom: '2px',
                          borderWidth: '6px',
                          borderStyle: 'solid',
                          borderColor: `${color} transparent transparent transparent`,
                        } : {}),
                        ...(position === 'right' ? {
                          top: '50%',
                          left: '100%',
                          transform: 'translateY(-50%)',
                          marginLeft: '2px',
                          borderWidth: '6px',
                          borderStyle: 'solid',
                          borderColor: `transparent ${color} transparent transparent`,
                        } : {}),
                        ...(position === 'bottom' ? {
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          marginTop: '2px',
                          borderWidth: '6px',
                          borderStyle: 'solid',
                          borderColor: `transparent transparent ${color} transparent`,
                        } : {}),
                        ...(position === 'left' ? {
                          top: '50%',
                          right: '100%',
                          transform: 'translateY(-50%)',
                          marginRight: '2px',
                          borderWidth: '6px',
                          borderStyle: 'solid',
                          borderColor: `transparent transparent transparent ${color}`,
                        } : {}),
                        
                        // Visibility
                        opacity: 0,
                        visibility: 'hidden',
                        transition: `all ${duration}ms ease`,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Generated Code</h3>
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-700 mb-2">HTML</h4>
                <CodeBlock code={htmlCode} language="html" />
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-2">CSS</h4>
                <CodeBlock code={cssCode} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};