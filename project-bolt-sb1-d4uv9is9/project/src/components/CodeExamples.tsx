import React, { useState } from 'react';
import { Code, Copy, Check } from 'lucide-react';

const CodeExamples: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (index: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const examples = [
    {
      title: '事件总线实现',
      code: `// eventBus.js
class EventBus {
  constructor() {
    this.events = new Map();
  }

  // 订阅事件
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
  }

  // 发布事件
  emit(event, data) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(callback => callback(data));
    }
  }

  // 取消订阅
  off(event, callback) {
    if (!callback) {
      this.events.delete(event);
      return;
    }

    const callbacks = this.events.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
      if (callbacks.length === 0) {
        this.events.delete(event);
      }
    }
  }
}

// 创建单例实例
export default new EventBus();`
    },
    {
      title: '组件A：发送消息',
      code: `// SenderComponent.jsx
import React, { useState } from 'react';
import eventBus from './eventBus';

function SenderComponent() {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    // 发送消息到事件总线
    eventBus.emit('new-message', {
      sender: '组件A',
      content: message,
      timestamp: new Date().toLocaleTimeString()
    });
    setMessage('');
  };

  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="输入消息内容..."
      />
      <button onClick={sendMessage}>发送</button>
    </div>
  );
}`
    },
    {
      title: '组件B：接收消息',
      code: `// ReceiverComponent.jsx
import React, { useState, useEffect } from 'react';
import eventBus from './eventBus';

function ReceiverComponent() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // 订阅事件
    const handleNewMessage = (data) => {
      setMessages(prev => [...prev, data]);
    };

    eventBus.on('new-message', handleNewMessage);

    // 组件卸载时取消订阅
    return () => {
      eventBus.off('new-message', handleNewMessage);
    };
  }, []);

  return (
    <div>
      <h3>接收到的消息：</h3>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.sender}: {msg.content} ({msg.timestamp})
          </li>
        ))}
      </ul>
    </div>
  );
}`
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <Code className="mr-2" />
        代码示例
      </h2>

      <div className="space-y-6">
        {examples.map((example, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3 bg-gray-100 border-b">
              <h3 className="text-lg font-medium text-gray-800">{example.title}</h3>
              <button
                onClick={() => handleCopy(index, example.code)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {copiedIndex === index ? (
                  <>
                    <Check size={16} className="mr-1 text-green-600" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy size={16} className="mr-1" />
                    复制代码
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 bg-gray-50 overflow-x-auto text-sm">
              <code className="language-javascript">{example.code}</code>
            </pre>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4">
        <h3 className="font-semibold text-blue-800 mb-2">最佳实践</h3>
        <ul className="list-disc list-inside space-y-1 text-blue-700">
          <li>组件卸载时记得取消订阅事件，避免内存泄漏</li>
          <li>使用具体的事件名称，避免事件名冲突</li>
          <li>事件数据结构保持一致，便于组件间通信</li>
          <li>在大型应用中，考虑结合状态管理工具如Redux、MobX使用</li>
        </ul>
      </div>
    </section>
  );
};

export default CodeExamples;