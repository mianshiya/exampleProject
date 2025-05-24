import React from 'react';
import './Content.css';

const Content: React.FC = () => {
  return (
    <div className="content">
      <section id="原理" className="section">
        <h2>响应式设计原理</h2>
        <p>
          响应式网页设计（Responsive Web Design，简称RWD）是一种网页设计方法，使得同一个网站能够适应不同的设备和屏幕尺寸。
          它通过使用灵活的网格布局、图片和CSS媒体查询等技术，使网页能够自动调整其布局和内容，以提供最佳的用户体验。
        </p>
        <p>
          响应式设计的核心理念是"移动优先"（Mobile First），即先设计适合移动设备的页面，再逐步增强为适合大屏幕设备的页面。
          这种方法确保了网站在各种设备上都能有良好的表现。
        </p>
        <div className="code-box">
          <h3>响应式设计的三大要素：</h3>
          <ul>
            <li>流式网格（Fluid Grid）：使用相对单位（如百分比）而非固定单位</li>
            <li>灵活图片（Flexible Images）：确保图片不会超出其容器</li>
            <li>媒体查询（Media Queries）：根据设备特性应用不同的样式</li>
          </ul>
        </div>
      </section>

      <section id="实现" className="section">
        <h2>实现方式</h2>
        <p>
          媒体查询是实现响应式设计的关键技术。通过媒体查询，我们可以根据不同的屏幕宽度应用不同的CSS样式，
          从而实现桌面端的三栏布局和移动端的单栏布局。
        </p>
        <div className="code-box">
          <h3>媒体查询示例代码：</h3>
          <pre><code>{`/* 桌面端三栏布局 */
@media (min-width: 769px) {
  .responsive-layout {
    flex-direction: row;
  }
}

/* 移动端单栏布局 */
@media (max-width: 768px) {
  .responsive-layout {
    flex-direction: column;
  }
}`}</code></pre>
        </div>
        <p>
          上面的代码示例中，我们使用媒体查询设置了两个断点：当屏幕宽度大于768px时，使用水平排列（row）的三栏布局；
          当屏幕宽度小于等于768px时，切换为垂直排列（column）的单栏布局。
        </p>
      </section>

      <section id="示例" className="section">
        <h2>本页示例说明</h2>
        <p>
          本页面就是一个响应式布局的实际示例。在桌面端（宽度大于768px）时，页面为三栏布局：
        </p>
        <ul>
          <li>左侧为蓝色的导航栏</li>
          <li>中间为白色的主内容区</li>
          <li>右侧为浅蓝色的相关资源区</li>
        </ul>
        <p>
          而在移动端（宽度小于等于768px）时，页面转变为单栏布局，三个区域依次垂直排列。
          你可以通过调整浏览器窗口大小或在不同设备上查看本页面，观察布局的变化。
        </p>
        <div className="code-box">
          <h3>技术实现要点：</h3>
          <ol>
            <li>使用Flexbox布局实现容器的排列方向控制</li>
            <li>设置合适的断点（768px）来区分移动端和桌面端</li>
            <li>添加平滑过渡效果，增强用户体验</li>
            <li>对不同设备上的字体大小、间距等进行优化调整</li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default Content;