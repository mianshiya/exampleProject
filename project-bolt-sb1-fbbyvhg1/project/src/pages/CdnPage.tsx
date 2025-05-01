import React from 'react';
import SectionTitle from '../components/SectionTitle';
import CodeBlock from '../components/CodeBlock';

const CdnPage: React.FC = () => {
  const cdnConfigCode = `// CDN配置示例
{
  "cdn": {
    "domain": "cdn.example.com",
    "ttl": 86400,
    "rules": [
      {
        "pattern": "*.jpg",
        "ttl": 604800
      },
      {
        "pattern": "*.webp",
        "ttl": 604800
      }
    ]
  }
}`;

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">CDN分发优化</h1>
          <p className="text-xl text-blue-100">
            利用内容分发网络加速图片资源的传输
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <SectionTitle 
            title="什么是CDN？" 
            subtitle="内容分发网络（CDN）通过将资源部署到世界各地的服务器，使用户可以从最近的节点获取资源，从而加快加载速度。"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">CDN的工作原理</h3>
              <p className="mb-4">
                当用户请求一个图片时，CDN会自动将请求路由到最近的边缘节点。如果该节点有缓存的图片，就直接返回；如果没有，则从源站获取并缓存，以供后续请求使用。
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-medium text-yellow-800 mb-2">CDN优势</h4>
                <ul className="list-disc pl-5 space-y-1 text-yellow-700">
                  <li>减少网络延迟，提高访问速度</li>
                  <li>分散服务器负载，提高可用性</li>
                  <li>节省源站带宽，降低成本</li>
                  <li>提供额外的安全防护</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">CDN配置要点</h3>
              <CodeBlock 
                code={cdnConfigCode}
                title="CDN基础配置示例"
                language="json"
              />
            </div>
          </div>
          
          <SectionTitle title="CDN优化策略" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">缓存策略优化</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>设置合理的缓存时间（TTL）</li>
                <li>使用版本化URL避免缓存问题</li>
                <li>针对不同类型文件设置不同缓存策略</li>
                <li>利用浏览器缓存配合CDN缓存</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">图片处理服务</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>自动格式转换（WebP支持）</li>
                <li>动态裁剪和缩放</li>
                <li>质量调整和压缩</li>
                <li>添加水印等图片处理</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">性能优化</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>启用Gzip/Brotli压缩</li>
                <li>使用HTTP/2或HTTP/3</li>
                <li>配置预加载和预连接</li>
                <li>启用智能压缩</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-2">CDN使用最佳实践</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>使用自定义域名</strong> - 配置CNAME指向CDN域名</li>
              <li><strong>合理设置缓存</strong> - 静态资源设置较长的缓存时间</li>
              <li><strong>启用HTTPS</strong> - 使用CDN提供的SSL证书服务</li>
              <li><strong>监控和告警</strong> - 设置性能监控和异常告警</li>
              <li><strong>备份策略</strong> - 配置多个CDN服务商作为备份</li>
              <li><strong>定期优化</strong> - 根据访问数据调整CDN配置</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CdnPage;