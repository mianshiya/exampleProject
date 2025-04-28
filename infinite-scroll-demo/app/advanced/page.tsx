import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CodeBlock from "@/components/code-block"

export default function AdvancedPage() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">无限滚动加载 - 高级技巧</h1>
        <p className="text-gray-600 mb-8">本页面提供了实现无限滚动加载的高级技巧和最佳实践</p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>性能优化技巧</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-semibold">1. 虚拟列表</h3>
              <p>
                对于大量数据，考虑使用虚拟列表（如 react-window 或 react-virtualized）只渲染可见区域的项目，
                减少DOM节点数量，提高性能。
              </p>

              <CodeBlock
                title="使用 react-window 的示例"
                code={`import { FixedSizeList } from 'react-window';

const Example = () => {
  const items = /* 大量数据 */;
  
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].title}
    </div>
  );
  
  return (
    <FixedSizeList
      height={500}
      width="100%"
      itemCount={items.length}
      itemSize={50}
    >
      {Row}
    </FixedSizeList>
  );
};`}
              />

              <h3 className="font-semibold">2. 防抖与节流</h3>
              <p>对于使用 scroll 事件的实现，应用防抖或节流技术可以减少事件处理函数的调用频率。</p>

              <CodeBlock
                title="使用节流函数"
                code={`// 节流函数
function throttle(fn, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
}

// 使用节流的滚动处理
window.addEventListener('scroll', throttle(() => {
  // 检查是否滚动到底部
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
    loadMoreItems();
  }
}, 200));`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>错误处理与重试机制</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">在网络不稳定的情况下，加载可能会失败。实现重试机制可以提高用户体验。</p>

              <CodeBlock
                code={`const loadMoreItems = async (retryCount = 0) => {
  if (loading || !hasMore) return;
  
  setLoading(true);
  try {
    const newItems = await fetchItems(page);
    setItems(prevItems => [...prevItems, ...newItems]);
    setPage(prevPage => prevPage + 1);
  } catch (error) {
    console.error("加载失败:", error);
    
    // 最多重试3次
    if (retryCount < 3) {
      setTimeout(() => {
        loadMoreItems(retryCount + 1);
      }, 1000 * (retryCount + 1)); // 递增重试延迟
    } else {
      setError("加载失败，请检查网络连接后重试");
    }
  } finally {
    setLoading(false);
  }
};`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>不同实现方式比较</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        实现方式
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        优点
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        缺点
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Scroll 事件</td>
                      <td className="px-6 py-4">
                        <ul className="list-disc pl-5">
                          <li>实现简单</li>
                          <li>浏览器兼容性好</li>
                        </ul>
                      </td>
                      <td className="px-6 py-4">
                        <ul className="list-disc pl-5">
                          <li>频繁触发，性能较差</li>
                          <li>需要手动计算滚动位置</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Intersection Observer</td>
                      <td className="px-6 py-4">
                        <ul className="list-disc pl-5">
                          <li>性能更好</li>
                          <li>代码更简洁</li>
                          <li>不阻塞主线程</li>
                        </ul>
                      </td>
                      <td className="px-6 py-4">
                        <ul className="list-disc pl-5">
                          <li>较老浏览器需要polyfill</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">分页按钮 + 无限滚动</td>
                      <td className="px-6 py-4">
                        <ul className="list-disc pl-5">
                          <li>兼顾自动加载和手动控制</li>
                          <li>提供更好的用户控制</li>
                        </ul>
                      </td>
                      <td className="px-6 py-4">
                        <ul className="list-disc pl-5">
                          <li>实现复杂度增加</li>
                          <li>UI设计需要考虑两种交互方式</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
