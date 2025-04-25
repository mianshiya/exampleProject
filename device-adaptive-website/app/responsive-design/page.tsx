import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResponsiveDesignPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-800">
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-slate-800 mb-6">响应式设计方案演示</h1>

      <div className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>响应式布局演示</CardTitle>
            <CardDescription>调整浏览器窗口大小查看效果</CardDescription>
          </CardHeader>
          <CardContent>
            {/* 响应式演示区域 */}
            <div className="responsive-demo">
              <header className="bg-blue-600 text-white p-4 md:p-6 rounded-t-lg">
                <h2 className="text-xl md:text-2xl font-bold">响应式网站</h2>
                <div className="hidden md:flex mt-2 space-x-4">
                  <span>首页</span>
                  <span>关于</span>
                  <span>服务</span>
                  <span>联系我们</span>
                </div>
                <div className="md:hidden mt-2">
                  <span>菜单 ☰</span>
                </div>
              </header>

              <div className="flex flex-col md:flex-row">
                <aside className="bg-slate-100 p-4 md:w-1/4 hidden md:block">
                  <h3 className="font-medium mb-3">侧边栏导航</h3>
                  <ul className="space-y-2">
                    <li>选项 1</li>
                    <li>选项 2</li>
                    <li>选项 3</li>
                  </ul>
                </aside>

                <main className="bg-white p-4 md:p-6 md:w-3/4">
                  <h3 className="text-lg md:text-xl font-medium mb-4">主要内容区域</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-slate-50 p-4 rounded">内容卡片 1</div>
                    <div className="bg-slate-50 p-4 rounded">内容卡片 2</div>
                    <div className="bg-slate-50 p-4 rounded">内容卡片 3</div>
                  </div>
                </main>
              </div>

              <footer className="bg-slate-800 text-white p-4 text-center rounded-b-lg">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">© 2023 响应式演示</div>
                  <div className="flex flex-col md:flex-row md:space-x-4">
                    <span>隐私政策</span>
                    <span>使用条款</span>
                  </div>
                </div>
              </footer>
            </div>

            <div className="mt-6 text-center text-slate-600">
              <p className="text-sm">
                当前视图: <span className="inline-block md:hidden font-medium text-emerald-600">移动端</span>
                <span className="hidden md:inline-block font-medium text-blue-600">PC端</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="code" className="max-w-3xl mx-auto">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="code">实现代码</TabsTrigger>
          <TabsTrigger value="explanation">原理解析</TabsTrigger>
        </TabsList>

        <TabsContent value="code" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CSS媒体查询代码</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto text-sm">
                {`/* 基础样式 - 适用于所有设备 */
.container {
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
}

.header {
  background-color: #3b82f6;
  color: white;
  padding: 1rem;
}

.content {
  display: flex;
  flex-direction: column;
}

.sidebar {
  background-color: #f1f5f9;
  padding: 1rem;
  display: none; /* 移动端默认隐藏侧边栏 */
}

.main {
  background-color: white;
  padding: 1rem;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* 平板设备 (768px 及以上) */
@media screen and (min-width: 768px) {
  .container {
    max-width: 720px;
  }
  
  .header {
    padding: 1.5rem;
  }
  
  .mobile-menu {
    display: none; /* 隐藏移动端菜单 */
  }
  
  .desktop-menu {
    display: flex; /* 显示桌面端菜单 */
  }
  
  .content {
    flex-direction: row; /* 改为水平布局 */
  }
  
  .sidebar {
    display: block; /* 显示侧边栏 */
    width: 25%;
  }
  
  .main {
    width: 75%;
    padding: 1.5rem;
  }
  
  .card-grid {
    grid-template-columns: repeat(2, 1fr); /* 两列卡片 */
  }
}

/* 桌面设备 (1024px 及以上) */
@media screen and (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
  
  .card-grid {
    grid-template-columns: repeat(3, 1fr); /* 三列卡片 */
  }
}

/* 大屏设备 (1280px 及以上) */
@media screen and (min-width: 1280px) {
  .container {
    max-width: 1200px;
  }
}`}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>HTML结构</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto text-sm">
                {`<div class="container">
  <header class="header">
    <h1>响应式网站</h1>
    <nav class="desktop-menu">
      <!-- 桌面端菜单 -->
      <a href="#">首页</a>
      <a href="#">关于</a>
      <a href="#">服务</a>
      <a href="#">联系我们</a>
    </nav>
    <div class="mobile-menu">
      <!-- 移动端菜单 -->
      <span>菜单 ☰</span>
    </div>
  </header>
  
  <div class="content">
    <aside class="sidebar">
      <!-- 侧边栏内容 -->
      <h2>侧边栏导航</h2>
      <ul>
        <li>选项 1</li>
        <li>选项 2</li>
        <li>选项 3</li>
      </ul>
    </aside>
    
    <main class="main">
      <h2>主要内容区域</h2>
      <div class="card-grid">
        <div class="card">内容卡片 1</div>
        <div class="card">内容卡片 2</div>
        <div class="card">内容卡片 3</div>
      </div>
    </main>
  </div>
  
  <footer class="footer">
    <div class="footer-content">
      <div>© 2023 响应式演示</div>
      <div class="footer-links">
        <a href="#">隐私政策</a>
        <a href="#">使用条款</a>
      </div>
    </div>
  </footer>
</div>`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="explanation">
          <Card>
            <CardHeader>
              <CardTitle>响应式设计原理</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-lg mb-2">媒体查询 (Media Queries)</h3>
                <p className="text-slate-600">
                  媒体查询是响应式设计的核心技术，它允许我们根据设备特性（如屏幕宽度、高度、分辨率等）应用不同的CSS样式。
                  通过设置断点（如768px、1024px等），我们可以为不同尺寸的屏幕定义不同的布局和样式。
                </p>
                <pre className="bg-slate-100 p-3 rounded mt-2 text-xs">
                  {`@media screen and (min-width: 768px) {
  /* 平板和桌面端样式 */
}`}
                </pre>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">流式布局 (Fluid Layout)</h3>
                <p className="text-slate-600">
                  使用百分比而非固定像素值来定义元素宽度，使布局能够根据视口大小自动调整。
                  这种方法确保内容能够在不同尺寸的屏幕上自然流动。
                </p>
                <pre className="bg-slate-100 p-3 rounded mt-2 text-xs">
                  {`.container {
  width: 100%;
  max-width: 1200px;
}`}
                </pre>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">弹性盒子 (Flexbox)</h3>
                <p className="text-slate-600">
                  Flexbox是一种强大的CSS布局模型，特别适合响应式设计。
                  它允许容器根据可用空间调整其子元素的大小、顺序和对齐方式。
                </p>
                <pre className="bg-slate-100 p-3 rounded mt-2 text-xs">
                  {`.content {
  display: flex;
  flex-direction: column; /* 移动端垂直排列 */
}

@media (min-width: 768px) {
  .content {
    flex-direction: row; /* 桌面端水平排列 */
  }
}`}
                </pre>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">网格布局 (Grid Layout)</h3>
                <p className="text-slate-600">
                  CSS Grid提供了二维布局系统，非常适合创建复杂的响应式布局。
                  通过定义网格列数和行数，我们可以轻松控制元素在不同屏幕尺寸下的排列方式。
                </p>
                <pre className="bg-slate-100 p-3 rounded mt-2 text-xs">
                  {`.card-grid {
  display: grid;
  grid-template-columns: 1fr; /* 移动端单列 */
  gap: 1rem;
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr); /* 平板双列 */
  }
}

@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr); /* 桌面三列 */
  }
}`}
                </pre>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <h3 className="font-medium text-blue-800 mb-1">最佳实践</h3>
                <ul className="list-disc list-inside text-blue-700 space-y-1">
                  <li>采用移动优先 (Mobile First) 的设计方法</li>
                  <li>使用相对单位 (em, rem, %) 而非固定像素</li>
                  <li>设置合理的断点，通常为 576px, 768px, 992px, 1200px</li>
                  <li>测试各种设备和屏幕尺寸</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
