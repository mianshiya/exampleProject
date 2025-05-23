import React, { useState, useRef, useEffect } from 'react';
import './FlashButton.css';

interface FlashButtonProps {
  onClick: () => Promise<void>;
  disabled?: boolean;
  text: string;
  loadingText?: string;
  successText?: string;
  errorText?: string;
}

// 防抖延迟时间（毫秒）
const DEBOUNCE_DELAY = 300;

const FlashButton: React.FC<FlashButtonProps> = ({
  onClick,
  disabled = false,
  text,
  loadingText = '处理中...',
  successText = '操作成功',
  errorText = '操作失败'
}) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const clickTimeRef = useRef<number>(0);

  // 组件卸载时清除timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = async () => {
    // 防抖处理
    const now = Date.now();
    if (now - clickTimeRef.current < DEBOUNCE_DELAY) {
      console.log('点击过于频繁，请稍后再试');
      return;
    }
    
    clickTimeRef.current = now;
    
    if (disabled || status === 'loading') {
      return;
    }
    
    // 按钮动画效果
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    setStatus('loading');
    
    try {
      await onClick();
      setStatus('success');
      
      // 成功状态持续一段时间后恢复
      timeoutRef.current = window.setTimeout(() => {
        setStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('操作失败:', error);
      setStatus('error');
      
      // 错误状态持续一段时间后恢复
      timeoutRef.current = window.setTimeout(() => {
        setStatus('idle');
      }, 2000);
    }
  };

  const getButtonText = () => {
    switch (status) {
      case 'loading':
        return loadingText;
      case 'success':
        return successText;
      case 'error':
        return errorText;
      default:
        return text;
    }
  };

  const getButtonClass = () => {
    let className = 'flash-button';
    
    if (disabled) {
      className += ' disabled';
    } else {
      className += ` ${status}`;
    }
    
    if (isAnimating) {
      className += ' animating';
    }
    
    return className;
  };

  return (
    <button
      className={getButtonClass()}
      onClick={handleClick}
      disabled={disabled || status === 'loading'}
    >
      {status === 'loading' && <span className="loader"></span>}
      <span className="button-text">{getButtonText()}</span>
    </button>
  );
};

export default FlashButton;