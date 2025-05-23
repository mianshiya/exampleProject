import React from 'react';

const Explanation: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
        实现原理
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">1. CSS 媒体查询 + 布局技术</h3>
          <p className="text-gray-700 leading-relaxed">
            我们使用媒体查询（Media Queries）检测设备屏幕宽度，在小屏设备上隐藏传统表格视图，
            显示为卡片式垂直列表。这种方式无需JavaScript，完全依靠CSS实现响应式布局变化。
          </p>
          <div className="mt-3 bg-gray-50 p-3 rounded-md overflow-x-auto">
            <pre className="text-sm text-gray-700">
{`/* 大屏幕设备显示表格布局 */
.table-view {
  display: none;
}

/* 小屏幕设备显示列表布局 */
.list-view {
  display: block;
}

/* 媒体查询：当屏幕宽度大于768px时 */
@media (min-width: 768px) {
  .table-view {
    display: block;
  }
  .list-view {
    display: none;
  }
}`}
            </pre>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">2. HTML 结构设计</h3>
          <p className="text-gray-700 leading-relaxed">
            通过合理的HTML结构设计，我们准备了两套视图：表格视图和列表视图。在表格视图中使用传统的
            <code className="bg-gray-100 px-1 rounded">&lt;table&gt;</code> 标签，
            而在列表视图中使用 <code className="bg-gray-100 px-1 rounded">&lt;div&gt;</code> 
            构建卡片式布局，每张卡片包含该行的所有数据。
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">3. 使用Tailwind CSS实现</h3>
          <p className="text-gray-700 leading-relaxed">
            在本示例中，我们使用Tailwind CSS的响应式类来控制显示和隐藏：
            <code className="bg-gray-100 px-1 ml-1 rounded">hidden md:block</code> 和
            <code className="bg-gray-100 px-1 ml-1 rounded">block md:hidden</code>。
            这些类指定在不同断点下元素的显示状态，使我们能够轻松地切换两种布局。
          </p>
          <div className="mt-3 bg-gray-50 p-3 rounded-md overflow-x-auto">
            <pre className="text-sm text-gray-700">
{`<!-- 桌面端表格视图 -->
<div className="hidden md:block">
  <table>...</table>
</div>

<!-- 移动端卡片视图 -->
<div className="block md:hidden">
  <div>卡片内容...</div>
</div>`}
            </pre>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">4. 卡片式布局优化</h3>
          <p className="text-gray-700 leading-relaxed">
            在移动设备上，我们采用卡片式布局，每张卡片清晰地展示一行数据。通过使用网格布局
            （Grid Layout）将标签和值并排显示，提高了移动设备上的可读性。同时，卡片顶部添加
            了操作按钮，确保用户交互体验不受影响。
          </p>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-2">其他实现方式</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>
            <span className="font-medium">CSS Grid实现</span>：使用Grid布局可以更灵活地控制移动端的垂直布局
          </li>
          <li>
            <span className="font-medium">JavaScript动态转换</span>：对于更复杂的表格，可以使用JS动态生成不同设备上的布局
          </li>
          <li>
            <span className="font-medium">表格属性方案</span>：利用data-*属性为每个单元格添加标签，在小屏幕上通过CSS显示
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Explanation;