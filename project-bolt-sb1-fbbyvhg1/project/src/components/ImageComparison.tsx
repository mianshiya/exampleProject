import React, { useState, useRef, useEffect } from 'react';

interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeSize?: string;
  afterSize?: string;
}

const ImageComparison: React.FC<ImageComparisonProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = '优化前',
  afterLabel = '优化后',
  beforeSize,
  afterSize
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const containerWidth = rect.width;
    
    const position = Math.max(0, Math.min(100, (x / containerWidth) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const containerWidth = rect.width;
    
    const position = Math.max(0, Math.min(100, (x / containerWidth) * 100));
    setSliderPosition(position);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-auto overflow-hidden rounded-lg border border-gray-200 select-none"
      style={{ maxWidth: '100%', aspectRatio: '16/9' }}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <img 
          src={afterImage} 
          alt="优化后" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div 
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={beforeImage} 
          alt="优化前" 
          className="w-full h-full object-cover"
          style={{ width: `${100 / (sliderPosition / 100)}%`, maxWidth: 'none', objectPosition: 'left' }}
        />
      </div>
      
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `calc(${sliderPosition}% - 0.5px)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center cursor-ew-resize">
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>
      
      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 text-sm rounded">
        {beforeLabel} {beforeSize && <span className="text-xs">({beforeSize})</span>}
      </div>
      
      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 text-sm rounded">
        {afterLabel} {afterSize && <span className="text-xs">({afterSize})</span>}
      </div>
    </div>
  );
};

export default ImageComparison;