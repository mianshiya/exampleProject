import React from 'react';
import SectionTitle from '../components/SectionTitle';
import CodeBlock from '../components/CodeBlock';

const ResponsivePage: React.FC = () => {
  const srcsetCode = `<img 
  src="image-800w.jpg"
  srcset="image-400w.jpg 400w,
          image-800w.jpg 800w,
          image-1200w.jpg 1200w"
  sizes="(max-width: 600px) 400px,
         (max-width: 1200px) 800px,
         1200px"
  alt="响应式图片示例"
/>`;

  const pictureCode = `<picture>
  <source 
    media="(max-width: 600px)" 
    srcset="small.webp" 
    type="image/webp"
  />
  <source 
    media="(max-width: 600px)" 
    srcset="small.jpg" 
  />
  <source 
    media="(max-width: 1200px)" 
    srcset="medium.webp" 
    type="image/webp"
  />
  <source 
    media="(max-width: 1200px)" 
    srcset="medium.jpg" 
  />
  <source 
    srcset="large.webp" 
    type="image/webp"
  />
  <img 
    src="large.jpg" 
    alt="响应式图片示例"
  />
</picture>`;

  const cssResponsiveCode = `/* CSS中的响应式图片 */
.hero-image {
  background-image: url('small.jpg');
}

@media (min-width: 768px) {
  .hero-image {
    background-image: url('medium.jpg');
  }
}

@media (min-width: 1200px) {
  .hero-image {
    background-image: url('large.jpg');
  }
}`;

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">响应式图片加载</h1>
          <p className="text-xl text-blue-100">
            为不同设备和屏幕尺寸提供最适合的图片资源
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <SectionTitle 
            title="响应式图片的意义" 
            subtitle="在移动设备普及的今天，为不同尺寸的屏幕提供适当大小的图片至关重要。这不仅可以提升用户体验，还能节省带宽并提高加载速度。"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">响应式图片的挑战</h3>
              <p className="mb-4">
                移动用户不应下载与桌面用户相同的大图片，同时高分辨率屏幕需要更清晰的图片以避免模糊。响应式图片技术解决了这些问题，使浏览器能够选择最合适的图片资源。
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-medium text-yellow-800 mb-2">常见问题</h4>
                <ul className="list-disc pl-5 space-y-1 text-yellow-700">
                  <li>移动设备下载过大的图片，浪费带宽</li>
                  <li>高分辨率屏幕显示低分辨率图片，导致模糊</li>
                  <li>不同设备需要不同的图片裁剪或艺术指导</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">响应式图片的优势</h3>
              <ul className="list-disc pl-5 space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong className="text-green-700">带宽节省</strong> - 移动设备只下载适合其屏幕大小的图片</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong className="text-green-700">加载速度</strong> - 更小的图片意味着更快的加载时间</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong className="text-green-700">高清显示</strong> - 根据设备像素比提供适当的图片分辨率</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong className="text-green-700">艺术指导</strong> - 可以为不同设备提供不同裁剪的图片</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong className="text-green-700">格式回退</strong> - 为不支持新格式的浏览器提供替代方案</span>
                </li>
              </ul>
            </div>
          </div>
          
          <SectionTitle title="响应式图片技术" />
          
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">使用srcset和sizes属性</h3>
                <p className="mb-4">
                  srcset属性允许为img元素提供多个不同尺寸的图片源，并通过宽度描述符(w)指定每个图片的宽度。sizes属性定义图片在不同视口宽度下的显示大小。
                </p>
                <p className="mb-4">
                  浏览器会根据当前设备的特性（屏幕大小、像素密度）和sizes定义，从srcset中选择最适合的图片资源。
                </p>
                
                <CodeBlock 
                  code={srcsetCode}
                  title="使用srcset和sizes的响应式图片"
                />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-medium mb-3">srcset和sizes工作原理</h4>
                <ol className="list-decimal pl-5 space-y-3">
                  <li>
                    <strong>srcset:</strong> 列出可用的图片资源及其宽度
                    <ul className="list-disc pl-5 mt-1 text-gray-600">
                      <li>image-400w.jpg 400w: 宽度为400px的图片</li>
                      <li>image-800w.jpg 800w: 宽度为800px的图片</li>
                      <li>image-1200w.jpg 1200w: 宽度为1200px的图片</li>
                    </ul>
                  </li>
                  <li>
                    <strong>sizes:</strong> 定义图片在不同视口大小下的显示宽度
                    <ul className="list-disc pl-5 mt-1 text-gray-600">
                      <li>(max-width: 600px) 400px: 如果视口≤600px，图片显示为400px宽</li>
                      <li>(max-width: 1200px) 800px: 如果视口≤1200px，图片显示为800px宽</li>
                      <li>1200px: 其他情况下，图片显示为1200px宽</li>
                    </ul>
                  </li>
                  <li>
                    <strong>浏览器逻辑:</strong> 考虑设备像素比
                    <ul className="list-disc pl-5 mt-1 text-gray-600">
                      <li>在2x屏幕上，400px的尺寸需要800px宽的图片</li>
                      <li>在3x屏幕上，800px的尺寸可能需要更大的图片</li>
                    </ul>
                  </li>
                </ol>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md order-2 lg:order-1">
                <h4 className="font-medium mb-3">picture元素的主要特点</h4>
                <ul className="list-disc pl-5 space-y-3">
                  <li>
                    <strong>媒体查询支持:</strong> 可以基于视口宽度、高度等条件选择不同图片
                  </li>
                  <li>
                    <strong>格式回退:</strong> 为每种尺寸提供多种格式，如WebP和JPEG
                  </li>
                  <li>
                    <strong>艺术指导:</strong> 可以为不同设备提供不同裁剪或布局的图片
                  </li>
                  <li>
                    <strong>优雅降级:</strong> 包含常规img元素作为所有浏览器的后备方案
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-blue-700 text-sm">
                  <strong>注意:</strong> source元素必须在img元素之前，浏览器会使用第一个匹配的source。
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <h3 className="text-xl font-semibold mb-4">使用picture元素</h3>
                <p className="mb-4">
                  picture元素提供了一种更强大的方式来实现响应式图片。它允许使用媒体查询为不同设备提供不同的图片，同时还支持多种图片格式。
                </p>
                
                <CodeBlock 
                  code={pictureCode}
                  title="使用picture元素的响应式图片"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl font-semibold mb-4">CSS中的响应式图片</h3>
                <p className="mb-4">
                  除了HTML方法外，CSS媒体查询也可以用来实现响应式图片，特别是对于背景图片。这种方法特别适合装饰性图片或需要灵活控制的场景。
                </p>
                
                <CodeBlock 
                  code={cssResponsiveCode}
                  title="CSS媒体查询实现响应式背景图片"
                  language="css"
                />
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">响应式图片的实践建议</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>为每个图片准备至少3种尺寸版本(小、中、大)</li>
                  <li>对每种尺寸考虑提供WebP和传统格式(JPEG/PNG)版本</li>
                  <li>使用一致的命名约定(如image-small.jpg, image-medium.jpg)</li>
                  <li>在sizes属性中使用与CSS布局匹配的媒体查询</li>
                  <li>考虑使用自动化工具来生成不同尺寸和格式的图片</li>
                  <li>使用现代图片CDN服务可以大大简化响应式图片的实现</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-2">响应式图片总结</h3>
            <p className="mb-4">
              响应式图片技术是现代Web开发的重要组成部分，它能大幅提高用户体验并优化性能。选择合适的实现方式取决于具体需求：
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>srcset和sizes</strong>: 适合需要根据屏幕大小和分辨率提供不同大小相同内容的图片</li>
              <li><strong>picture元素</strong>: 适合需要针对不同设备提供不同裁剪或不同格式的情况</li>
              <li><strong>CSS媒体查询</strong>: 适合背景图片和纯装饰性图片</li>
              <li><strong>图片CDN服务</strong>: 对于大型网站，考虑使用专业的图片服务可以简化实现和维护</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResponsivePage;