import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QueueModal.css';

interface QueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  queuePosition?: number;
  queueTotal?: number;
}

const QueueModal: React.FC<QueueModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  queuePosition = 0,
  queueTotal = 0
}) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'queuing' | 'processing' | 'success' | 'failed'>('queuing');
  const [progress, setProgress] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(queuePosition);
  const [errorMessage, setErrorMessage] = useState('');

  // 模拟排队进度
  useEffect(() => {
    if (!isOpen || status !== 'queuing') return;
    
    const interval = setInterval(() => {
      setCurrentPosition(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setStatus('processing');
          
          // 模拟处理
          setTimeout(() => {
            const random = Math.random();
            if (random > 0.3) { // 70%成功率
              setStatus('success');
              
              // 成功后导航到成功页面
              setTimeout(() => {
                if (onSuccess) {
                  onSuccess();
                } else {
                  navigate('/success');
                }
              }, 2000);
            } else {
              setStatus('failed');
              setErrorMessage('商品已抢光，请下次再来');
            }
          }, 2000);
          
          return 0;
        }
        return prev - 1;
      });
    }, 800);
    
    return () => clearInterval(interval);
  }, [isOpen, status, navigate, onSuccess]);

  // 更新进度条
  useEffect(() => {
    if (status === 'queuing') {
      const progressPercent = 100 - ((currentPosition / queueTotal) * 100);
      setProgress(progressPercent);
    } else if (status === 'processing') {
      setProgress(100);
    }
  }, [currentPosition, queueTotal, status]);

  if (!isOpen) return null;

  const renderContent = () => {
    switch (status) {
      case 'queuing':
        return (
          <>
            <h3>排队中...</h3>
            <div className="queue-progress">
              <div 
                className="queue-progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="queue-info">
              前方还有 <strong>{currentPosition}</strong> 人，请耐心等待
            </p>
            <p className="queue-tip">排队期间请勿刷新页面，否则可能会失去排队位置</p>
          </>
        );
      case 'processing':
        return (
          <>
            <h3>正在处理...</h3>
            <div className="queue-loader"></div>
            <p className="queue-info">正在为您处理订单，请稍候</p>
          </>
        );
      case 'success':
        return (
          <>
            <div className="queue-success">
              <div className="success-icon">✓</div>
              <h3>抢购成功!</h3>
              <p>商品已加入您的购物车</p>
            </div>
          </>
        );
      case 'failed':
        return (
          <>
            <div className="queue-failed">
              <div className="failed-icon">×</div>
              <h3>抢购失败</h3>
              <p>{errorMessage}</p>
              <button className="try-again-button" onClick={onClose}>
                返回
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="queue-modal-overlay">
      <div className="queue-modal">
        <div className="queue-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default QueueModal;