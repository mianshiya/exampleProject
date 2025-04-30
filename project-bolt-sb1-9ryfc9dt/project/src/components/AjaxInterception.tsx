import React, { useState, useEffect } from 'react';
import { DemoSection } from './DemoSection';
import { CodeBlock } from './CodeBlock';
import { ExternalLink } from 'lucide-react';

export const AjaxInterception: React.FC = () => {
  const [originalResult, setOriginalResult] = useState<string>('');
  const [interceptedResult, setInterceptedResult] = useState<string>('');
  const [isIntercepted, setIsIntercepted] = useState<boolean>(false);

  // 演示用的代码示例
  const ajaxInterceptionCode = `// 原生 XMLHttpRequest 拦截
const originalXHR = window.XMLHttpRequest;

// 定义拦截后的 XMLHttpRequest
function interceptedXHR() {
  const xhr = new originalXHR();
  
  // 保存原始的 open 方法
  const originalOpen = xhr.open;
  
  // 重写 open 方法
  xhr.open = function() {
    console.log('拦截到 XHR 请求:', arguments);
    
    // 在这里可以修改请求参数，例如：URL、方法等
    
    // 调用原始的 open 方法
    return originalOpen.apply(this, arguments);
  };
  
  // 保存原始的 send 方法
  const originalSend = xhr.send;
  
  // 重写 send 方法
  xhr.send = function() {
    console.log('拦截到 XHR 发送:', arguments);
    
    // 在这里可以修改请求体数据
    
    // 调用原始的 send 方法
    return originalSend.apply(this, arguments);
  };
  
  // 添加响应拦截
  const originalSetRequestHeader = xhr.setRequestHeader;
  xhr.setRequestHeader = function() {
    console.log('拦截到设置请求头:', arguments);
    
    // 在这里可以修改请求头
    
    // 调用原始的 setRequestHeader 方法
    return originalSetRequestHeader.apply(this, arguments);
  };
  
  return xhr;
}

// 替换全局的 XMLHttpRequest
window.XMLHttpRequest = interceptedXHR;`;

  const simulateAjaxRequest = (intercept = false) => {
    if (intercept) {
      // 模拟拦截效果
      setTimeout(() => {
        setInterceptedResult('请求已被拦截并修改 - 这是拦截后的响应数据');
      }, 500);
    } else {
      // 模拟原始请求
      setTimeout(() => {
        setOriginalResult('这是原始的响应数据');
      }, 500);
    }
  };

  return (
    <DemoSection
      title="使用Ajax库拦截"
      description="通过重写原生XMLHttpRequest对象来拦截Ajax请求，这是最基础的拦截方式。"
    >
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">原理解析</h3>
        <p className="mb-4">
          Ajax拦截的原理是替换浏览器原生的XMLHttpRequest对象。通过保存原始方法并重写它们，我们可以在请求发送前、发送中和响应返回时执行自定义逻辑。
        </p>
        <p className="mb-4">
          这种技术被各种Ajax库和网络拦截工具广泛使用，比如Axios的拦截器就是基于这个原理实现的。
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">代码实现</h3>
        <CodeBlock code={ajaxInterceptionCode} />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">演示</h3>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            onClick={() => {
              setIsIntercepted(false);
              simulateAjaxRequest(false);
            }}
          >
            发送原始请求
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => {
              setIsIntercepted(true);
              simulateAjaxRequest(true);
            }}
          >
            发送拦截后的请求
          </button>
        </div>

        <div className="border rounded p-4 bg-gray-50">
          <h4 className="text-sm font-medium mb-2">请求结果：</h4>
          {isIntercepted ? (
            <div className="bg-blue-50 border border-blue-200 p-3 rounded">
              {interceptedResult || '等待请求完成...'}
            </div>
          ) : (
            <div className="bg-gray-50 border p-3 rounded">
              {originalResult || '等待请求完成...'}
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">应用场景</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>全局错误处理</li>
          <li>请求/响应数据转换</li>
          <li>身份验证令牌自动添加</li>
          <li>请求取消和超时处理</li>
          <li>日志记录和调试</li>
        </ul>
        
        <div className="mt-4">
          <a 
            href="https://github.com/axios/axios" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            了解更多 Axios 拦截器 <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </DemoSection>
  );
};