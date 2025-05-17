import React, { useState, useEffect, useCallback } from 'react';
import './Countdown.css';

interface CountdownProps {
  endTime: number; // 结束时间戳
  onEnd?: () => void; // 倒计时结束回调
}

const Countdown: React.FC<CountdownProps> = ({ endTime, onEnd }) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });

  const [isActive, setIsActive] = useState<boolean>(true);

  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const difference = endTime - now;
    
    if (difference <= 0) {
      setIsActive(false);
      if (onEnd) {
        onEnd();
      }
      return { hours: 0, minutes: 0, seconds: 0 };
    }
    
    return {
      hours: Math.floor((difference / (1000 * 60 * 60))),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }, [endTime, onEnd]);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  const formatTime = (value: number): string => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  return (
    <div className={`countdown ${!isActive ? 'countdown-ended' : ''}`}>
      <div className="countdown-item">
        <div className="countdown-value">{formatTime(timeLeft.hours)}</div>
        <div className="countdown-label">时</div>
      </div>
      <div className="countdown-divider">:</div>
      <div className="countdown-item">
        <div className="countdown-value">{formatTime(timeLeft.minutes)}</div>
        <div className="countdown-label">分</div>
      </div>
      <div className="countdown-divider">:</div>
      <div className="countdown-item">
        <div className="countdown-value">{formatTime(timeLeft.seconds)}</div>
        <div className="countdown-label">秒</div>
      </div>
    </div>
  );
};

export default Countdown;