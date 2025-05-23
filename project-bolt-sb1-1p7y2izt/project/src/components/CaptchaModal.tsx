import React, { useState, useEffect } from 'react';
import './CaptchaModal.css';

interface CaptchaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
}

const CaptchaModal: React.FC<CaptchaModalProps> = ({ isOpen, onClose, onVerify }) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 重置状态
  useEffect(() => {
    if (isOpen) {
      setSliderPosition(0);
      setIsDragging(false);
      setIsVerified(false);
      setErrorMessage('');
    }
  }, [isOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isVerified) return;
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isVerified) return;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isVerified) return;
    
    const container = e.currentTarget as HTMLDivElement;
    const containerRect = container.getBoundingClientRect();
    const maxPosition = containerRect.width - 54; // 滑块宽度
    
    let newPosition = e.clientX - containerRect.left - 27; // 27是滑块一半宽度
    newPosition = Math.max(0, Math.min(newPosition, maxPosition));
    
    setSliderPosition(newPosition);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isVerified) return;
    
    const container = e.currentTarget as HTMLDivElement;
    const containerRect = container.getBoundingClientRect();
    const maxPosition = containerRect.width - 54; // 滑块宽度
    
    const touch = e.touches[0];
    let newPosition = touch.clientX - containerRect.left - 27; // 27是滑块一半宽度
    newPosition = Math.max(0, Math.min(newPosition, maxPosition));
    
    setSliderPosition(newPosition);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const container = e.currentTarget as HTMLDivElement;
    const maxPosition = container.getBoundingClientRect().width - 54;
    
    setIsDragging(false);
    
    // 验证逻辑 - 假设滑动到90%以上为验证成功
    if (sliderPosition > maxPosition * 0.9) {
      setIsVerified(true);
      setErrorMessage('');
      
      // 延迟1秒后调用验证成功回调
      setTimeout(() => {
        onVerify();
      }, 1000);
    } else {
      setSliderPosition(0);
      setErrorMessage('请将滑块拖动到最右侧');
      
      // 1秒后清除错误信息
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const container = e.currentTarget as HTMLDivElement;
    const maxPosition = container.getBoundingClientRect().width - 54;
    
    setIsDragging(false);
    
    // 验证逻辑 - 假设滑动到90%以上为验证成功
    if (sliderPosition > maxPosition * 0.9) {
      setIsVerified(true);
      setErrorMessage('');
      
      // 延迟1秒后调用验证成功回调
      setTimeout(() => {
        onVerify();
      }, 1000);
    } else {
      setSliderPosition(0);
      setErrorMessage('请将滑块拖动到最右侧');
      
      // 1秒后清除错误信息
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="captcha-modal-overlay">
      <div className="captcha-modal">
        <div className="captcha-header">
          <h3>安全验证</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="captcha-content">
          <p>请完成滑动验证</p>
          
          {errorMessage && (
            <div className="captcha-error">{errorMessage}</div>
          )}
          
          <div
            className="slider-container"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="slider-track">
              <div 
                className="slider-progress" 
                style={{ width: `${sliderPosition}px` }}
              ></div>
              <div
                className={`slider-thumb ${isDragging ? 'dragging' : ''} ${isVerified ? 'verified' : ''}`}
                style={{ left: `${sliderPosition}px` }}
              >
                {isVerified ? '✓' : '→'}
              </div>
              <div className="slider-text">
                {isVerified ? '验证成功' : '向右滑动完成验证'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptchaModal;