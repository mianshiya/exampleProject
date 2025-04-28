import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClickableSidebar } from "@/components/clickable-sidebar"
import { HoverSidebar } from "@/components/hover-sidebar"
import { CheckboxSidebar } from "@/components/checkbox-sidebar"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">CSS 侧边栏折叠展开演示</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  首页
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  文档
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  关于
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">CSS 侧边栏折叠展开实现方法</h2>
          <p className="mb-4 text-gray-700">
            本演示网站展示了三种不同的方法来实现可折叠的侧边栏菜单，每种方法都使用了 CSS 过渡效果来实现平滑的动画。
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold">点击触发方法</h3>
              <p className="text-sm text-gray-600">
                使用 JavaScript 切换类名来控制侧边栏的状态，结合 CSS transition 实现过渡效果。
              </p>
            </div>
            <div className="rounded-lg border bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold">悬停触发方法</h3>
              <p className="text-sm text-gray-600">纯 CSS 实现，通过 :hover 伪类来触发侧边栏展开，无需 JavaScript。</p>
            </div>
            <div className="rounded-lg border bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold">Checkbox 技巧</h3>
              <p className="text-sm text-gray-600">
                使用隐藏的 checkbox 和 :checked 伪类来控制侧边栏状态，完全不依赖 JavaScript。
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="click" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="click">点击触发</TabsTrigger>
            <TabsTrigger value="hover">悬停触发</TabsTrigger>
            <TabsTrigger value="checkbox">Checkbox 技巧</TabsTrigger>
          </TabsList>
          <TabsContent value="click" className="rounded-lg border bg-white p-4 shadow-md">
            <h3 className="mb-4 text-xl font-semibold">点击触发侧边栏</h3>
            <p className="mb-4 text-gray-700">
              这种方法使用 JavaScript 来切换一个类名，从而控制侧边栏的展开和折叠状态。CSS transition
              属性用于创建平滑的过渡效果。
            </p>
            <div className="relative h-[500px] overflow-hidden rounded-lg border">
              <ClickableSidebar />
              <div className="ml-[60px] p-6 transition-all duration-300">
                <h4 className="mb-2 text-lg font-medium">主要内容区域</h4>
                <p className="text-gray-600">
                  点击左侧的菜单图标可以展开或折叠侧边栏。侧边栏的宽度从 60px 变为
                  240px，同时内容区域的边距也会相应调整。
                </p>
                <div className="mt-4 rounded-lg bg-gray-100 p-4">
                  <h5 className="mb-2 font-medium">核心代码</h5>
                  <pre className="overflow-x-auto rounded bg-gray-800 p-3 text-sm text-white">
                    <code>{`.sidebar {
  width: 60px;
  transition: width 0.3s ease;
}

.sidebar.expanded {
  width: 240px;
}

.main-content {
  margin-left: 60px;
  transition: margin-left 0.3s ease;
}

.sidebar.expanded + .main-content {
  margin-left: 240px;
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="hover" className="rounded-lg border bg-white p-4 shadow-md">
            <h3 className="mb-4 text-xl font-semibold">悬停触发侧边栏</h3>
            <p className="mb-4 text-gray-700">
              这种方法完全使用 CSS 实现，通过 :hover
              伪类来触发侧边栏的展开。当用户将鼠标悬停在侧边栏上时，它会自动展开。
            </p>
            <div className="relative h-[500px] overflow-hidden rounded-lg border">
              <HoverSidebar />
              <div className="ml-[60px] p-6 transition-all duration-300">
                <h4 className="mb-2 text-lg font-medium">主要内容区域</h4>
                <p className="text-gray-600">
                  将鼠标悬停在左侧的侧边栏上可以展开它。当鼠标移开时，侧边栏会自动折叠回去。
                </p>
                <div className="mt-4 rounded-lg bg-gray-100 p-4">
                  <h5 className="mb-2 font-medium">核心代码</h5>
                  <pre className="overflow-x-auto rounded bg-gray-800 p-3 text-sm text-white">
                    <code>{`.sidebar {
  width: 60px;
  transition: width 0.3s ease;
}

.sidebar:hover {
  width: 240px;
}

.main-content {
  margin-left: 60px;
  transition: margin-left 0.3s ease;
}

.sidebar:hover ~ .main-content {
  margin-left: 240px;
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="checkbox" className="rounded-lg border bg-white p-4 shadow-md">
            <h3 className="mb-4 text-xl font-semibold">Checkbox 技巧侧边栏</h3>
            <p className="mb-4 text-gray-700">
              这种方法使用隐藏的 checkbox 和 CSS :checked 伪类来控制侧边栏的状态，是一种纯 CSS 解决方案，不需要任何
              JavaScript。
            </p>
            <div className="relative h-[500px] overflow-hidden rounded-lg border">
              <CheckboxSidebar />
              <div className="ml-[60px] p-6 transition-all duration-300">
                <h4 className="mb-2 text-lg font-medium">主要内容区域</h4>
                <p className="text-gray-600">
                  点击左侧的菜单图标可以展开或折叠侧边栏。这个实现使用了隐藏的 checkbox 和 label 元素来实现切换功能。
                </p>
                <div className="mt-4 rounded-lg bg-gray-100 p-4">
                  <h5 className="mb-2 font-medium">核心代码</h5>
                  <pre className="overflow-x-auto rounded bg-gray-800 p-3 text-sm text-white">
                    <code>{`#sidebar-toggle {
  display: none;
}

.sidebar {
  width: 60px;
  transition: width 0.3s ease;
}

#sidebar-toggle:checked ~ .sidebar {
  width: 240px;
}

.main-content {
  margin-left: 60px;
  transition: margin-left 0.3s ease;
}

#sidebar-toggle:checked ~ .sidebar ~ .main-content {
  margin-left: 240px;
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">实现要点</h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold">1. 设置侧边栏基础样式</h3>
              <p className="text-gray-700">
                固定侧边栏的位置（通常使用 position: fixed 或 absolute），设置高度（通常是 100vh 或
                100%）和初始宽度（折叠状态的宽度）。
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">2. 定义折叠和展开状态</h3>
              <p className="text-gray-700">
                使用 CSS 类或伪类（如 :hover, :checked）来定义侧边栏的展开状态，通常是改变宽度或使用 transform:
                translateX() 来移动侧边栏。
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">3. 添加过渡效果</h3>
              <p className="text-gray-700">
                使用 transition 属性来控制状态变化的动画效果，指定过渡的属性、持续时间和缓动函数，例如 transition: width
                0.3s ease 或 transition: transform 0.3s ease。
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">4. 设置触发机制</h3>
              <p className="text-gray-700">
                根据需求选择合适的触发方式：hover（悬停）、点击事件（需要 JavaScript）或 checkbox 技巧（纯 CSS
                实现点击切换）。
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-8 border-t bg-white p-4 text-center text-gray-600">
        <div className="container mx-auto">
          <p>CSS 侧边栏折叠展开演示网站 © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}
