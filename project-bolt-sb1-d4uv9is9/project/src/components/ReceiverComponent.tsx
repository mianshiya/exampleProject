import React, { useState, useEffect } from 'react';
import eventBus from '../utils/eventBus';
import { MessageSquare } from 'lucide-react';

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

interface ReceiverProps {
  name: string;
}

const ReceiverComponent: React.FC<ReceiverProps> = ({ name }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<boolean>(false);

  useEffect(() => {
    // 订阅事件
    const handleNewMessage = (data: Message) => {
      setMessages(prev => [...prev, data]);
      setNewMessage(true);
      setTimeout(() => setNewMessage(false), 1000);
    };

    eventBus.on('new-message', handleNewMessage);

    // 组件卸载时取消订阅
    return () => {
      eventBus.off('new-message', handleNewMessage);
    };
  }, []);

  return (
    <div className={`p-4 rounded-lg shadow-md bg-white border-l-4 ${name === '组件B' ? 'border-orange-500' : 'border-blue-500'}`}>
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        {name}
        {newMessage && (
          <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
        )}
      </h3>
      <div className="bg-gray-50 rounded p-3 min-h-[120px] max-h-[200px] overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-400 flex items-center justify-center h-full">
            <MessageSquare size={16} className="mr-2" />
            等待接收消息...
          </p>
        ) : (
          <ul className="space-y-2">
            {messages.map((msg, index) => (
              <li 
                key={index} 
                className={`p-2 rounded text-sm ${
                  newMessage && index === messages.length - 1 
                    ? 'bg-green-100 animate-fadeIn' 
                    : 'bg-gray-100'
                }`}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{msg.sender}</span>
                  <span className="text-xs text-gray-500">{msg.timestamp}</span>
                </div>
                <p>{msg.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="text-sm text-gray-500 mt-2">
        通过 eventBus.on('new-message', callback) 接收消息
      </p>
    </div>
  );
};

export default ReceiverComponent;