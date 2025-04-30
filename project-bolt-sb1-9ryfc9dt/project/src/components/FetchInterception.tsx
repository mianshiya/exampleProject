import React, { useState } from 'react';
import { DemoSection } from './DemoSection';
import { CodeBlock } from './CodeBlock';
import { ExternalLink } from 'lucide-react';

export const FetchInterception: React.FC = () => {
  const [originalResult, setOriginalResult] = useState<string>('');
  const [interceptedResult, setInterceptedResult] = useState<string>('');
  const [isIntercepted, setIsIntercepted] = useState<boolean>(false);

  // 演示用的代码示例
  const fetchInterceptionCode = `// 保存原始的 fetch 函数
const originalFetch = window.fetch;

// 重写 fetch 函数
window.fetch = async function(input, init) {
  console.log('拦截到 Fetch 请求:', { url: input, options: init });

  // 在这里可以修改请求
  // 例如：添加请求头
  const newInit = {
    ...init,
    headers: {
      ...init?.headers,
      'X-Custom-Header': '拦截器添加的自定义请求头',
    }
  };

  try {
    // 调用原始 fetch 并获取响应
    const response = await originalFetch(input, newInit);
    
    // 创建响应的克隆，因为 response body 只能被消费一次
    const clone = response.clone();
    
    console.log('拦截到 Fetch 响应:', await clone.json());
    
    // 返回原始响应或修改后的响应
    return response;
  } catch (error) {
    console.error('Fetch 请求错误:', error);
    throw error;
  }
};`;

  const simulateFetchRequest = (intercept = false) => {
    if (intercept) {
      // 模拟拦截效果
      setTimeout(() => {
        setInterceptedResult('请求已被拦截并修改 - 这是使用修改后的fetch获取的数据');
      }, 500);
    } else {
      // 模拟原始请求
      setTimeout(() => {
        setOriginalResult('这是原始的fetch响应数据');
      }, 500);
    }
  };

  return (
    <DemoSection
      title="使用Fetch API拦截"
      description="通过重写全局fetch方法来拦截Fetch API请求，这是现代浏览器中常用的拦截方式。"
    >
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">原理解析</h3>
        <p className="mb-4">
          Fetch API是现代浏览器提供的网络请求接口，它使用Promise来处理异步操作。通过保存原始的fetch函数并重写它，我们可以拦截所有使用fetch发起的网络请求。
        </p>
        <p className="mb-4">
          与XMLHttpRequest拦截类似，我们可以在请求发送前修改请求参数，以及在接收到响应后修改响应数据。
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">代码实现</h3>
        <CodeBlock code={fetchInterceptionCode} />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">演示</h3>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            onClick={() => {
              setIsIntercepted(false);
              simulateFetchRequest(false);
            }}
          >
            发送原始Fetch请求
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => {
              setIsIntercepted(true);
              simulateFetchRequest(true);
            }}
          >
            发送拦截后的Fetch请求
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
          <li>添加认证令牌到请求头</li>
          <li>请求重试和错误处理</li>
          <li>缓存响应数据</li>
          <li>监控和分析网络性能</li>
          <li>请求限流和防抖</li>
        </ul>
        
        <div className="mt-4 text-sm text-gray-600">
          <p className="mb-2">注意事项：</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>响应体(response.body)只能被读取一次，如需多次处理，请使用response.clone()</li>
            <li>某些浏览器API(如Beacon)不使用fetch，无法通过此方法拦截</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <a 
            href="https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            MDN Fetch API文档 <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </DemoSection>
  );
};