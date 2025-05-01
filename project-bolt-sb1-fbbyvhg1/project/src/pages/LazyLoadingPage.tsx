import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import CodeBlock from '../components/CodeBlock';

const LazyLoadingPage: React.FC = () => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const demoSectionRef = useRef<HTMLDivElement>(null);
  
  // 监测演示中的图片加载情况
  useEffect(() => {
    if (!demoSectionRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.onload = () => {
              setImagesLoaded(prev => prev + 1);
              observer.unobserve(img);
            };
          }
        }
      });
    }, { threshold: 0.1 });
    
    const lazyImages = demoSectionRef.current.querySelectorAll('.lazy-demo-img');
    lazyImages.forEach(img => observer.observe(img));
    
    return () => {
      lazyImages.forEach(img => observer.unobserve(img));
    };
  }, []);

  const nativeLazyLoadingCode = `<img 
  src="placeholder.jpg" 
  data-src="actual-image.jpg" 
  loading="lazy" 
  alt="懒加载示例"
/>`;

  const intersectionObserverCode = `// 使用Intersection Observer API实现懒加载
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.onload = () => {
        img.removeAttribute('data-src');
      };
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));`;

  const reactLazyLoadingCode = `// React中实现懒加载的自定义Hook
import { useState, useEffect, useRef } from 'react';

function useLazyLoad(ref, options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);
  
  return isVisible;
}

// 使用示例
function LazyImage({ src, alt }) {
  const imgRef = useRef(null);
  const isVisible = useLazyLoad(imgRef);
  
  return (
    <img 
      ref={imgRef}
      src={isVisible ? src : 'placeholder.jpg'}
      alt={alt} 
    />
  );
}`;

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">懒加载策略</h1>
          <p className="text-xl text-blue-100">
            延迟加载非关键图片，提升页面初始加载速度
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <SectionTitle 
            title="什么是图片懒加载？" 
            subtitle="懒加载是一种Web性能优化技术，它延迟加载暂时不可见的图片，直到用户滚动到它们接近或进入视口为止。"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">懒加载的主要优势</h3>
              <ul className="list-disc pl-5 space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <div>
                    <strong className="text-green-700">减少初始页面加载时间</strong>
                    <p className="text-sm text-gray-600">仅加载首屏可见内容，延迟加载其他图片</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <div>
                    <strong className="text-green-700">节省带宽</strong>
                    <p className="text-sm text-gray-600">如果用户不滚动到页面底部，那些图片根本不会被加载</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <div>
                    <strong className="text-green-700">改善整体性能</strong>
                    <p className="text-sm text-gray-600">减少同时加载的资源数量，降低浏览器和网络负担</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <div>
                    <strong className="text-green-700">降低服务器负载</strong>
                    <p className="text-sm text-gray-600">减少同时处理的请求数量，特别是在高流量网站上</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">懒加载的工作原理</h3>
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <strong>替代图片源</strong>
                  <p className="text-sm text-gray-600">使用轻量级占位图或模糊缩略图作为初始加载内容</p>
                </li>
                <li>
                  <strong>监测滚动位置</strong>
                  <p className="text-sm text-gray-600">使用JavaScript检测元素是否即将进入视口</p>
                </li>
                <li>
                  <strong>替换图片源</strong>
                  <p className="text-sm text-gray-600">当图片即将可见时，将真实图片URL替换占位符</p>
                </li>
                <li>
                  <strong>显示过渡效果</strong>
                  <p className="text-sm text-gray-600">通常会添加淡入等过渡效果，提升用户体验</p>
                </li>
              </ol>
            </div>
          </div>
          
          <SectionTitle title="懒加载实现方法" />
          
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">原生懒加载</h3>
                <p className="mb-4">
                  现代浏览器已经内置了对图片懒加载的支持，通过在img元素上添加loading="lazy"属性即可启用。这是最简单的实现方式，不需要任何JavaScript代码。
                </p>
                
                <CodeBlock 
                  code={nativeLazyLoadingCode}
                  title="原生懒加载属性"
                />
                
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-yellow-700 text-sm">
                  <strong>注意:</strong> 原生懒加载虽然简单，但在控制加载时机和加载行为方面灵活性较低，且在一些旧版浏览器中不受支持。
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-medium mb-3">原生懒加载的优缺点</h4>
                <div className="mb-4">
                  <h5 className="text-green-600 font-medium mb-2">优点：</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>零JavaScript依赖，减少代码复杂度</li>
                    <li>浏览器优化实现，性能更好</li>
                    <li>无需担心滚动监听的性能问题</li>
                    <li>实现简单，只需添加一个属性</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-red-600 font-medium mb-2">缺点：</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>浏览器兼容性仍有限制</li>
                    <li>不能精确控制加载时机</li>
                    <li>无法自定义加载行为和动画</li>
                    <li>难以与其他自定义功能集成</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md order-2 lg:order-1">
                <h4 className="font-medium mb-3">Intersection Observer的优点</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>性能更好</strong> - 比传统滚动事件监听更高效</li>
                  <li><strong>行为可配置</strong> - 可调整观察阈值、边距等参数</li>
                  <li><strong>异步处理</strong> - 不阻塞主线程</li>
                  <li><strong>更精确的控制</strong> - 可以准确检测元素可见性</li>
                </ul>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-blue-700 text-sm">
                  <strong>提示:</strong> Intersection Observer API已在所有现代浏览器中得到支持，是目前实现懒加载的推荐方式。
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <h3 className="text-xl font-semibold mb-4">使用Intersection Observer API</h3>
                <p className="mb-4">
                  Intersection Observer API是一种更现代的方法，它提供了一种异步观察目标元素与视口交叉状态的方法，性能比传统的滚动事件监听要好得多。
                </p>
                
                <CodeBlock 
                  code={intersectionObserverCode}
                  title="使用Intersection Observer实现懒加载"
                  language="javascript"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl font-semibold mb-4">React中的懒加载实现</h3>
                <p className="mb-4">
                  在React应用中，我们可以创建一个自定义Hook来实现图片懒加载，使其更容易在组件中使用。以下是一个简单的实现示例。
                </p>
                
                <CodeBlock 
                  code={reactLazyLoadingCode}
                  title="React自定义懒加载Hook"
                  language="jsx"
                />
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">第三方懒加载库</h3>
                <p className="mb-4">
                  除了自己实现外，还可以使用成熟的第三方库来简化懒加载实现。这些库通常提供更多功能和更好的兼容性。
                </p>
                <div className="space-y-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <h4 className="font-medium mb-1">lazysizes</h4>
                    <p className="text-sm text-gray-600 mb-2">高性能、SEO友好的懒加载库，无依赖</p>
                    <code className="text-xs bg-gray-100 p-1 rounded">npm install lazysizes</code>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <h4 className="font-medium mb-1">react-lazyload</h4>
                    <p className="text-sm text-gray-600 mb-2">专为React设计的组件懒加载库</p>
                    <code className="text-xs bg-gray-100 p-1 rounded">npm install react-lazyload</code>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <h4 className="font-medium mb-1">lozad.js</h4>
                    <p className="text-sm text-gray-600 mb-2">轻量级、高性能的懒加载库</p>
                    <code className="text-xs bg-gray-100 p-1 rounded">npm install lozad</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <SectionTitle title="懒加载实际演示" />
          
          <div ref={demoSectionRef} className="mb-12">
            <p className="mb-6">
              向下滚动查看懒加载效果。图片只有在接近视口时才会开始加载，可以通过已加载图片数量来观察这一过程。
            </p>
            
            <div className="bg-blue-50 py-3 px-4 rounded-lg mb-8 flex justify-between items-center">
              <span className="font-medium">已加载图片: {imagesLoaded}/6</span>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${imagesLoaded < 6 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                <span className="text-sm">{imagesLoaded < 6 ? '加载中...' : '全部加载完成'}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-lg overflow-hidden shadow-md bg-white">
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                    <img 
                      className="lazy-demo-img w-full h-full object-cover"
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23cccccc'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24px' fill='%23333333'%3E加载中...%3C/text%3E%3C/svg%3E"
                      data-src={`https://picsum.photos/seed/${i+50}/500/300`}
                      alt={`懒加载演示图片 ${i}`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="loading-spinner"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium mb-1">懒加载图片 #{i}</h4>
                    <p className="text-sm text-gray-600">这张图片使用懒加载技术，只有当它接近视口时才会加载</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-2">懒加载最佳实践</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>使用占位符</strong> - 提供低质量占位图或骨架屏避免布局偏移</li>
              <li><strong>预加载关键图片</strong> - 首屏内容不要使用懒加载，应立即加载</li>
              <li><strong>设置合理的触发阈值</strong> - 在图片进入视口前一定距离开始加载</li>
              <li><strong>添加淡入效果</strong> - 使用CSS过渡让图片平滑显示</li>
              <li><strong>考虑回退方案</strong> - 为不支持JavaScript的环境提供替代方案</li>
              <li><strong>处理错误情况</strong> - 添加onerror处理程序来处理图片加载失败</li>
              <li><strong>用于所有非关键图片</strong> - 横幅、缩略图、产品图片等都适合懒加载</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LazyLoadingPage;