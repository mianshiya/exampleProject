import React, { useState } from 'react';
import { DemoSection } from './DemoSection';
import { CodeBlock } from './CodeBlock';
import { ExternalLink } from 'lucide-react';

export const ServiceWorkerInterception: React.FC = () => {
  const [originalResult, setOriginalResult] = useState<string>('');
  const [interceptedResult, setInterceptedResult] = useState<string>('');
  const [isIntercepted, setIsIntercepted] = useState<boolean>(false);

  // 演示用的Service Worker代码
  const serviceWorkerCode = `// sw.js - Service Worker文件
self.addEventListener('install', (event) => {
  console.log('Service Worker安装成功');
  self.skipWaiting(); // 确保新的Service Worker立即激活
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker激活成功');
  event.waitUntil(clients.claim()); // 确保Service Worker控制所有客户端
});

// 拦截所有网络请求
self.addEventListener('fetch', (event) => {
  console.log('拦截到请求:', event.request.url);
  
  // 可以根据URL或其他条件来决定如何处理请求
  if (event.request.url.includes('/api/')) {
    // 处理API请求 - 例如：修改请求或返回缓存
    event.respondWith(handleApiRequest(event.request));
  } else if (event.request.url.includes('/assets/')) {
    // 处理静态资源请求 - 例如：从缓存返回
    event.respondWith(handleAssetRequest(event.request));
  } else {
    // 对其他请求不做拦截，直接发送到网络
    event.respondWith(fetch(event.request));
  }
});

// 处理API请求的函数
async function handleApiRequest(request) {
  // 例如：添加认证头
  const modifiedRequest = new Request(request, {
    headers: {
      ...Object.fromEntries(request.headers.entries()),
      'Authorization': 'Bearer token-from-sw',
      'X-Modified-By': 'Service-Worker'
    }
  });
  
  try {
    // 发送修改后的请求
    const response = await fetch(modifiedRequest);
    
    // 处理响应
    const originalData = await response.json();
    
    // 修改响应数据
    const modifiedData = {
      ...originalData,
      intercepted: true,
      modifiedBy: 'Service Worker',
      timestamp: new Date().toISOString()
    };
    
    // 创建新的响应
    return new Response(JSON.stringify(modifiedData), {
      headers: {
        'Content-Type': 'application/json',
        'X-Intercepted-By': 'Service-Worker'
      }
    });
  } catch (error) {
    console.error('API请求处理错误:', error);
    return new Response(JSON.stringify({ error: '请求失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 处理静态资源请求的函数
async function handleAssetRequest(request) {
  // 检查缓存
  const cache = await caches.open('assets-cache');
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    console.log('从缓存返回资源:', request.url);
    return cachedResponse;
  }
  
  // 缓存中没有，从网络获取并缓存
  try {
    const networkResponse = await fetch(request);
    
    // 克隆响应，因为响应体只能被消费一次
    const responseToCache = networkResponse.clone();
    
    // 将响应存入缓存
    cache.put(request, responseToCache);
    
    return networkResponse;
  } catch (error) {
    console.error('静态资源请求失败:', error);
    return new Response('资源加载失败', { status: 404 });
  }
}`;

  // 注册Service Worker的代码
  const registerServiceWorkerCode = `// 在网页中注册Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker注册成功，作用域:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker注册失败:', error);
      });
  });
}`;

  const simulateRequest = (intercept = false) => {
    if (intercept) {
      // 模拟Service Worker拦截效果
      setTimeout(() => {
        setInterceptedResult('请求已被Service Worker拦截并修改 - 这是修改后的响应数据，包含了额外的请求头和自定义字段');
      }, 500);
    } else {
      // 模拟原始请求
      setTimeout(() => {
        setOriginalResult('这是未被Service Worker拦截的原始响应数据');
      }, 500);
    }
  };

  return (
    <DemoSection
      title="使用Service Worker拦截"
      description="Service Worker是一种在浏览器后台运行的脚本，能够拦截和修改页面的所有网络请求。"
    >
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">原理解析</h3>
        <p className="mb-4">
          Service Worker是PWA的核心技术之一，它在浏览器和网络之间充当代理服务器的角色。与前两种方法不同，Service Worker可以拦截页面上的所有网络请求，包括HTML、CSS、JavaScript、图像、API请求等。
        </p>
        <p className="mb-4">
          Service Worker运行在独立的线程中，即使页面关闭也可以继续运行，这使得它特别适合实现离线功能、缓存管理和推送通知等高级功能。
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Service Worker代码实现</h3>
        <CodeBlock code={serviceWorkerCode} />
        
        <h3 className="text-lg font-medium mt-6 mb-2">注册Service Worker</h3>
        <CodeBlock code={registerServiceWorkerCode} />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">演示</h3>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            onClick={() => {
              setIsIntercepted(false);
              simulateRequest(false);
            }}
          >
            发送普通请求
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => {
              setIsIntercepted(true);
              simulateRequest(true);
            }}
          >
            发送被Service Worker拦截的请求
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
          <li>离线应用功能实现</li>
          <li>资源缓存策略管理</li>
          <li>网络请求的优化和加速</li>
          <li>实现后台同步和推送通知</li>
          <li>网络流量分析和监控</li>
          <li>请求失败时提供备用内容</li>
        </ul>
        
        <div className="mt-4 text-sm text-gray-600">
          <p className="mb-2">注意事项：</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Service Worker只能在HTTPS环境或localhost下运行</li>
            <li>首次注册后，需要刷新页面或等待下一次访问才会生效</li>
            <li>需要妥善处理Service Worker的更新和缓存策略</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <a 
            href="https://developers.google.com/web/fundamentals/primers/service-workers?hl=zh-cn" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            Google开发者文档：Service Worker介绍 <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </DemoSection>
  );
};