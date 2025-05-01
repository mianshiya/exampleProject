import React from 'react';
import SectionTitle from '../components/SectionTitle';
import ImageComparison from '../components/ImageComparison';
import CodeBlock from '../components/CodeBlock';

const FormatComparisonCard: React.FC<{
  format: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
}> = ({ format, pros, cons, bestFor }) => (
  <div className="card">
    <h3 className="text-xl font-semibold mb-4">{format}</h3>
    
    <div className="mb-4">
      <h4 className="font-medium text-green-600 mb-2">优点：</h4>
      <ul className="list-disc pl-5 space-y-1">
        {pros.map((pro, index) => (
          <li key={index} className="text-gray-700">{pro}</li>
        ))}
      </ul>
    </div>
    
    <div className="mb-4">
      <h4 className="font-medium text-red-600 mb-2">缺点：</h4>
      <ul className="list-disc pl-5 space-y-1">
        {cons.map((con, index) => (
          <li key={index} className="text-gray-700">{con}</li>
        ))}
      </ul>
    </div>
    
    <div>
      <h4 className="font-medium text-blue-600 mb-2">最适合：</h4>
      <ul className="list-disc pl-5 space-y-1">
        {bestFor.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

const FormatsPage: React.FC = () => {
  const webpHtmlCode = `<!-- 使用picture元素提供WebP格式和后备格式 -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="示例图片" width="800" height="600">
</picture>`;

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">图片格式选择</h1>
          <p className="text-xl text-blue-100">
            选择正确的图片格式可以在保持视觉质量的同时显著减小文件大小
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <SectionTitle 
            title="图片格式的重要性" 
            subtitle="不同的图片格式具有不同的优缺点，了解它们的特性可以帮助我们为特定用途选择最佳格式。"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">为什么格式选择很重要？</h3>
              <p className="mb-4">
                选择合适的图片格式可以显著减少图片体积，同时保持良好的视觉质量。例如，将JPEG格式换成WebP格式通常可以减少25-35%的文件大小。
              </p>
              <p>
                不同的图片格式适合不同类型的图像内容。例如，照片类内容通常适合JPEG/WebP，而图标和简单图形则更适合SVG格式。
              </p>
            </div>
            
            <div>
              <ImageComparison 
                beforeImage="https://images.pexels.com/photos/1054289/pexels-photo-1054289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                afterImage="https://images.pexels.com/photos/1054289/pexels-photo-1054289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                beforeLabel="PNG格式" 
                afterLabel="WebP格式" 
                beforeSize="1.2MB" 
                afterSize="320KB" 
              />
            </div>
          </div>
          
          <SectionTitle title="主要图片格式对比" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <FormatComparisonCard 
              format="WebP"
              pros={[
                "比JPEG小25-35%",
                "比PNG小80%",
                "支持有损和无损压缩",
                "支持透明度和动画"
              ]}
              cons={[
                "在较老的浏览器中不受支持",
                "某些图像编辑工具支持有限"
              ]}
              bestFor={[
                "现代网站的通用格式",
                "照片和复杂图像",
                "需要透明度的图像"
              ]}
            />
            
            <FormatComparisonCard 
              format="AVIF"
              pros={[
                "比WebP再小20%",
                "更好的色彩表现",
                "支持透明度和动画",
                "优秀的压缩率"
              ]}
              cons={[
                "目前浏览器支持有限",
                "编码速度较慢",
                "工具支持较少"
              ]}
              bestFor={[
                "对最新技术有要求的网站",
                "照片和详细图像",
                "配合其他格式作为渐进增强"
              ]}
            />
            
            <FormatComparisonCard 
              format="JPEG/JPG"
              pros={[
                "几乎所有设备和浏览器都支持",
                "文件大小适中",
                "适合照片类内容"
              ]}
              cons={[
                "不支持透明度",
                "压缩会损失质量",
                "不适合文字和线条图像"
              ]}
              bestFor={[
                "照片类内容",
                "不需要透明度的图像",
                "需要广泛兼容性的场景"
              ]}
            />
            
            <FormatComparisonCard 
              format="PNG"
              pros={[
                "支持透明度",
                "无损压缩",
                "保留锐利边缘和文本"
              ]}
              cons={[
                "文件体积通常较大",
                "不适合照片类内容",
                "不支持动画"
              ]}
              bestFor={[
                "需要透明度的图像",
                "包含文字或锐利边缘的图像",
                "需要无损压缩的图像"
              ]}
            />
            
            <FormatComparisonCard 
              format="SVG"
              pros={[
                "矢量格式，任意缩放不失真",
                "文件大小通常很小",
                "可通过CSS和JavaScript交互"
              ]}
              cons={[
                "不适合照片类内容",
                "复杂SVG可能性能较差",
                "需要额外的技术知识创建"
              ]}
              bestFor={[
                "图标和简单图形",
                "需要不同尺寸的Logo",
                "需要动画或交互的图形"
              ]}
            />
            
            <FormatComparisonCard 
              format="GIF"
              pros={[
                "支持简单动画",
                "广泛兼容",
                "支持透明度"
              ]}
              cons={[
                "色彩限制（最多256色）",
                "文件大小通常较大",
                "不适合照片类内容"
              ]}
              bestFor={[
                "简单动画",
                "色彩少的小图标",
                "需要广泛兼容的简单动画"
              ]}
            />
          </div>
          
          <SectionTitle title="格式选择的实际应用" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">使用WebP并提供后备方案</h3>
              <p className="mb-4">
                现代Web开发中，最佳实践是使用WebP格式并为不支持WebP的浏览器提供JPEG或PNG后备方案。这可以通过HTML的picture元素轻松实现。
              </p>
              
              <CodeBlock 
                code={webpHtmlCode}
                title="HTML中使用WebP的例子"
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">SVG用于图标和简单图形</h3>
              <p className="mb-4">
                对于图标、logo和简单图形，SVG是最佳选择。它可以无限缩放而不失真，文件大小通常很小，并且可以通过CSS和JavaScript进行样式设置和交互。
              </p>
              
              <div className="bg-gray-100 p-6 rounded-lg flex justify-center">
                <div className="flex items-center space-x-8">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-2">最佳实践总结</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>照片和复杂图像：首选WebP，提供JPEG作为后备</li>
              <li>需要透明度的图像：使用WebP，提供PNG作为后备</li>
              <li>图标和简单图形：使用SVG</li>
              <li>动画内容：短小简单的用WebP或GIF，复杂的考虑视频格式</li>
              <li>新网站项目：考虑使用AVIF作为渐进增强，始终提供后备方案</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormatsPage;