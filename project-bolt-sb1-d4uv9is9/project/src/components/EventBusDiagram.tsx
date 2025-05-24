import React from 'react';
import { ArrowRight } from 'lucide-react';

interface EventBusDiagramProps {
  activeMessage: { component: string, message: string } | null;
}

const EventBusDiagram: React.FC<EventBusDiagramProps> = ({ activeMessage }) => {
  return (
    <div className="py-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* 发送方 */}
        <div className="flex flex-col space-y-4 mb-8 md:mb-0">
          <div className={`border rounded-lg p-3 w-36 text-center ${
            activeMessage?.component === '组件A' 
              ? 'bg-green-100 border-green-500 shadow-lg animate-pulse' 
              : 'bg-gray-50 border-gray-200'
          }`}>
            组件A
          </div>
          <div className={`border rounded-lg p-3 w-36 text-center ${
            activeMessage?.component === '组件C' 
              ? 'bg-green-100 border-green-500 shadow-lg animate-pulse' 
              : 'bg-gray-50 border-gray-200'
          }`}>
            组件C
          </div>
        </div>

        {/* 发送箭头 */}
        <div className="flex flex-col items-center mb-8 md:mb-0">
          <ArrowRight className={`h-8 w-8 ${activeMessage ? 'text-blue-500' : 'text-gray-300'}`} />
          <div className="text-xs text-gray-500 mt-1">emit(event, data)</div>
        </div>

        {/* 事件总线 */}
        <div className={`border-2 rounded-lg p-4 mb-8 md:mb-0 w-full md:w-64 text-center ${
          activeMessage ? 'bg-blue-100 border-blue-500 shadow-lg' : 'bg-gray-50 border-gray-300'
        }`}>
          <div className="font-bold mb-2">事件总线 EventBus</div>
          {activeMessage && (
            <div className="bg-white p-2 rounded text-sm border border-blue-200 animate-fadeIn">
              <div className="font-medium">{activeMessage.component} 发送:</div>
              <div className="truncate">{activeMessage.message}</div>
            </div>
          )}
        </div>

        {/* 接收箭头 */}
        <div className="flex flex-col items-center mb-8 md:mb-0">
          <ArrowRight className={`h-8 w-8 ${activeMessage ? 'text-blue-500' : 'text-gray-300'}`} />
          <div className="text-xs text-gray-500 mt-1">on(event, callback)</div>
        </div>

        {/* 接收方 */}
        <div className="flex flex-col space-y-4">
          <div className={`border rounded-lg p-3 w-36 text-center ${
            activeMessage ? 'bg-orange-100 border-orange-500 shadow-lg animate-pulse' : 'bg-gray-50 border-gray-200'
          }`}>
            组件B
          </div>
          <div className={`border rounded-lg p-3 w-36 text-center ${
            activeMessage ? 'bg-orange-100 border-orange-500 shadow-lg animate-pulse' : 'bg-gray-50 border-gray-200'
          }`}>
            组件D
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">工作原理</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
          <li>发送方组件通过 <code className="bg-gray-100 px-1 rounded">eventBus.emit('事件名', 数据)</code> 发布消息</li>
          <li>事件总线接收消息并查找订阅了该事件的回调函数</li>
          <li>接收方组件通过 <code className="bg-gray-100 px-1 rounded">eventBus.on('事件名', 回调函数)</code> 订阅消息</li>
          <li>事件总线将消息分发给所有订阅者</li>
        </ol>
      </div>
    </div>
  );
};

export default EventBusDiagram;