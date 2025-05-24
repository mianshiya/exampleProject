import React, { useState } from 'react';
import SenderComponent from './SenderComponent';
import ReceiverComponent from './ReceiverComponent';
import EventBusDiagram from './EventBusDiagram';

const EventBusDemo: React.FC = () => {
  const [lastMessage, setLastMessage] = useState<{ component: string, message: string } | null>(null);

  const handleMessageSent = (component: string, message: string) => {
    setLastMessage({ component, message });
    // 重置动画效果
    setTimeout(() => setLastMessage(null), 2000);
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">事件总线演示</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">发送方组件</h3>
            <p className="mb-4 text-gray-700">
              这些组件通过事件总线发送消息。输入消息并点击发送，观察接收方组件如何接收到消息。
            </p>
            <SenderComponent 
              name="组件A" 
              onMessageSent={(message) => handleMessageSent("组件A", message)} 
            />
            <SenderComponent 
              name="组件C" 
              onMessageSent={(message) => handleMessageSent("组件C", message)} 
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">接收方组件</h3>
            <p className="mb-4 text-gray-700">
              这些组件订阅了事件总线上的消息事件。任何发送方发送的消息都会被这里显示。
            </p>
            <ReceiverComponent name="组件B" />
            <ReceiverComponent name="组件D" />
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">事件总线工作流程</h3>
        <EventBusDiagram activeMessage={lastMessage} />
      </div>
    </section>
  );
};

export default EventBusDemo;