import React from 'react';

const Introduction: React.FC = () => {
  return (
    <section className="mb-12 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">什么是事件总线？</h2>
      <p className="mb-4 text-gray-700">
        事件总线是一种用于组件间通信的设计模式，它通过一个中心化的事件处理对象（通常是一个实例化的类或对象）来实现消息的发布和订阅。
      </p>
      <p className="mb-4 text-gray-700">
        在大型应用程序中，组件可能相距很远（在组件树的不同分支中），通过事件总线可以避免层层传递事件或状态，实现组件间的解耦合通信。
      </p>
      
      <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">事件总线的核心功能</h3>
      <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
        <li><strong>on(event, callback)</strong> - 订阅事件，当事件被触发时执行回调函数</li>
        <li><strong>emit(event, data)</strong> - 发布事件，并传递相关数据</li>
        <li><strong>off(event, callback)</strong> - 取消订阅事件</li>
      </ul>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
        <p className="text-blue-700">
          <strong>提示：</strong> 事件总线模式在没有状态管理工具（如 Redux、Vuex）的情况下特别有用，但在大型应用中可能会导致事件难以追踪，谨慎使用。
        </p>
      </div>
    </section>
  );
};

export default Introduction;