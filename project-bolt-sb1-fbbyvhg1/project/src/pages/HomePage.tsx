import React from 'react';
import { FileTypeIcon, Image, ImageIcon, Activity, Loader, Globe } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import TechniqueCard from '../components/TechniqueCard';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Web系统中的图片优化技术
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 text-blue-100">
              提升性能、节省带宽、改善用户体验的最佳实践
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#techniques" 
                className="btn bg-white text-blue-600 hover:bg-blue-50"
              >
                了解技术详情
              </a>
              <a 
                href="#examples" 
                className="btn bg-transparent border border-white text-white hover:bg-white/10"
              >
                查看实例演示
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle 
              title="为什么图片优化至关重要？" 
              subtitle="在当今的网站中，图片通常占总页面大小的50-80%，是影响加载速度和用户体验的最大因素之一。"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-4">
                  <Activity className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">提升性能</h3>
                <p className="text-gray-600">减少图片体积可显著降低加载时间，提高网站性能得分。</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-4">
                  <Loader className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">节省带宽</h3>
                <p className="text-gray-600">优化图片可为移动用户节省大量数据流量，降低服务器成本。</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-4">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">改善体验</h3>
                <p className="text-gray-600">更快的加载速度意味着更低的跳出率和更高的用户满意度。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Optimization Techniques */}
      <section id="techniques" className="section bg-gray-50">
        <div className="container-custom">
          <SectionTitle 
            title="图片优化的核心技术" 
            subtitle="通过以下五种关键技术，你可以显著减小图片体积，同时保持良好的视觉质量。"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TechniqueCard 
              title="图片格式选择"
              description="了解如何为不同类型的图像选择最佳格式，如WebP、AVIF、SVG、JPEG和PNG。"
              icon={<FileTypeIcon className="w-10 h-10" />}
              to="/formats"
            />
            
            <TechniqueCard 
              title="图片压缩技术"
              description="探索有损和无损压缩的区别，以及如何根据需求选择合适的压缩算法。"
              icon={<Image className="w-10 h-10" />}
              to="/compression"
            />
            
            <TechniqueCard 
              title="响应式图片加载"
              description="学习如何使用srcset、sizes和picture元素来适配不同尺寸的屏幕和设备。"
              icon={<ImageIcon className="w-10 h-10" />}
              to="/responsive"
            />
            
            <TechniqueCard 
              title="懒加载策略"
              description="掌握延迟加载技术，仅在图片即将进入视口时才加载它们，提升页面初始加载速度。"
              icon={<Loader className="w-10 h-10" />}
              to="/lazy-loading"
            />
            
            <TechniqueCard 
              title="CDN分发优化"
              description="了解如何利用内容分发网络加速图片资源的传输，减少延迟。"
              icon={<Globe className="w-10 h-10" />}
              to="/cdn"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-blue-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">准备好优化你的网站图片了吗？</h2>
            <p className="text-xl mb-8 text-blue-100">
              从今天开始实施这些优化技术，让你的网站更快、更流畅！
            </p>
            <a 
              href="/formats" 
              className="btn bg-white text-blue-600 hover:bg-blue-50"
            >
              开始学习
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;