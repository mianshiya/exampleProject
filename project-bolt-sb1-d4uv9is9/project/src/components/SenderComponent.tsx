import React, { useState } from 'react';
import eventBus from '../utils/eventBus';
import { Send } from 'lucide-react';

interface SenderProps {
  name: string;
  onMessageSent: (message: string) => void;
}

const SenderComponent: React.FC<SenderProps> = ({ name, onMessageSent }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    
    // 发送消息到事件总线
    const messageData = {
      sender: name,
      content: message,
      timestamp: new Date().toLocaleTimeString()
    };
    
    eventBus.emit('new-message', messageData);
    onMessageSent(message);
    
    // 重置状态并显示发送动画
    setTimeout(() => {
      setMessage('');
      setIsSending(false);
    }, 500);
  };

  return (
    <div className={`p-4 rounded-lg shadow-md mb-4 bg-white border-l-4 ${name === '组件A' ? 'border-green-500' : 'border-purple-500'}`}>
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="输入消息内容..."
          className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={!message.trim() || isSending}
          className={`flex items-center justify-center px-4 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none ${
            !message.trim() || isSending ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Send size={16} className="mr-1" />
          发送
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        通过 eventBus.emit('new-message', messageData) 发送消息
      </p>
    </div>
  );
};

export default SenderComponent;