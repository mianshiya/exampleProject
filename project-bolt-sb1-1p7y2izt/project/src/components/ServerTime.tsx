import React, { useState, useEffect } from 'react';
import { getServerTime } from '../services/api';

const ServerTime: React.FC = () => {
  const [serverTime, setServerTime] = useState<Date>(new Date());
  
  // 初始化时从服务器获取时间
  useEffect(() => {
    getServerTime().then(time => {
      setServerTime(new Date(time));
    });
  }, []);

  // 更新本地时间，模拟与服务器时间同步
  useEffect(() => {
    const interval = setInterval(() => {
      setServerTime(prevTime => new Date(prevTime.getTime() + 1000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // 格式化显示时间
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return <span>{formatTime(serverTime)}</span>;
};

export default ServerTime;