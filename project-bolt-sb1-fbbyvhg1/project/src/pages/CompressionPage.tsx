import React from 'react';
import SectionTitle from '../components/SectionTitle';
import ImageComparison from '../components/ImageComparison';
import CodeBlock from '../components/CodeBlock';

const CompressionPage: React.FC = () => {
  const compressionToolsCode = `# 使用命令行工具压缩图片
  
# 使用ImageMagick压缩JPEG
convert input.jpg -quality 80 output.jpg

# 使用OptiPNG优化PNG
optipng -o5 input.png -out output.png

# 使用cwebp转换为WebP
cwebp -q 80 input.jpg -o output.webp`;

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">图片压缩技术</h1>
          <p className="text-xl text-blue-100">
            通过有效压缩减小图片体积，同时保持良好的视觉质量
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <SectionTitle 
            title="图片压缩的类型" 
            subtitle="图片压缩主要分为有损压缩和无损压缩两种方式，它们各有优缺点和适用场景。"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">有损压缩</h3>
              <p className="mb-4">
                有损压缩通过丢弃部分图像数据来减小文件大小，会导致一定程度的质量损失，但通常可以显著减小文件体积。
              </p>
              <h4 className="font-medium mb-2">特点：</h4>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>文件大小减小效果显著</li>
                <li>会损失部分图像质量</li>
                <li>压缩率越高，质量损失越明显</li>
                <li>适合照片类内容</li>
              </ul>
              <h4 className="font-medium mb-2">常见格式：</h4>
              <p>JPEG、WebP（有损模式）、AVIF（有损模式）</p>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">无损压缩</h3>
              <p className="mb-4">
                无损压缩通过优化编码方式减小文件大小，不会损失图像质量，但压缩效果通常不如有损压缩显著。
              </p>
              <h4 className="font-medium mb-2">特点：</h4>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>完全保持原始图像质量</li>
                <li>文件大小减小效果有限</li>
                <li>适合需要精确还原细节的图像</li>
                <li>适合包含文字、线条的图像</li>
              </ul>
              <h4 className="font-medium mb-2">常见格式：</h4>
              <p>PNG、WebP（无损模式）、AVIF（无损模式）、GIF</p>
            </div>
          </div>
          
          <SectionTitle title="压缩效果对比" />
          
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">JPEG不同质量级别对比</h3>
                <p className="mb-4">
                  JPEG格式使用质量参数（通常为0-100）控制压缩级别。较低的质量值会产生更小的文件，但视觉质量也会降低。在大多数情况下，质量设置为70-80可以在文件大小和视觉质量之间取得良好平衡。
                </p>
              </div>
              
              <ImageComparison 
                beforeImage="https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                afterImage="https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                beforeLabel="JPEG质量100" 
                afterLabel="JPEG质量75" 
                beforeSize="420KB" 
                afterSize="120KB" 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ImageComparison 
                beforeImage="https://images.pexels.com/photos/1563256/pexels-photo-1563256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                afterImage="https://images.pexels.com/photos/1563256/pexels-photo-1563256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                beforeLabel="PNG原图" 
                afterLabel="无损压缩PNG" 
                beforeSize="1.5MB" 
                afterSize="980KB" 
              />
              
              <div>
                <h3 className="text-xl font-semibold mb-4">PNG无损压缩对比</h3>
                <p className="mb-4">
                  PNG格式可以通过无损压缩工具（如OptiPNG、PNGQuant）优化文件大小。这些工具通过改进内部编码方式减小文件大小，同时保持完全相同的视觉质量和透明度。
                </p>
              </div>
            </div>
          </div>
          
          <SectionTitle title="压缩工具与方法" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">在线压缩工具</h3>
              <p className="mb-4">
                有许多在线工具可以帮助压缩图片，它们通常易于使用且不需要安装任何软件。
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-medium mb-3">推荐的在线压缩工具：</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li><a href="#" className="text-blue-500 hover:underline">TinyPNG/TinyJPG</a> - 针对PNG和JPEG的优秀压缩</li>
                  <li><a href="#" className="text-blue-500 hover:underline">Squoosh</a> - Google开发的先进图像压缩工具</li>
                  <li><a href="#" className="text-blue-500 hover:underline">Compressor.io</a> - 提供有损和无损压缩</li>
                  <li><a href="#" className="text-blue-500 hover:underline">ImageOptim Web</a> - 简单高效的图像压缩</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">命令行工具</h3>
              <p className="mb-4">
                对于需要批量处理图片或自动化工作流程的开发者，命令行工具是更好的选择。
              </p>
              
              <CodeBlock 
                code={compressionToolsCode}
                title="常用命令行压缩工具示例"
                language="bash"
              />
            </div>
          </div>
          
          <SectionTitle title="自适应压缩" />
          
          <div className="mb-12">
            <p className="mb-6">
              自适应压缩是一种根据用户设备和网络条件动态调整图片质量的技术。这可以为使用移动数据的用户提供更小的图片，同时为宽带用户提供更高质量的图片。
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-4">实现自适应压缩的方法</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>使用Client Hints检测用户网络速度和屏幕分辨率</li>
                <li>通过CDN服务（如Cloudinary、Imgix）动态调整图片质量</li>
                <li>使用Service Worker检测网络状况并选择适当的图片资源</li>
                <li>通过JavaScript检测网络速度并动态加载不同质量的图片</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold mb-2">压缩最佳实践</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>为JPEG和WebP等有损格式，质量设置为70-80通常是最佳平衡点</li>
                <li>移除图片中的EXIF元数据以减小文件大小</li>
                <li>为不同的使用场景准备不同压缩级别的图片</li>
                <li>在开发工作流程中集成自动化图片压缩工具</li>
                <li>始终在部署前压缩生产环境的图片资源</li>
                <li>对大型网站考虑使用专业的图片管理服务(如Cloudinary)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompressionPage;