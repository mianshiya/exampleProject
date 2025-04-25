"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// PC端应用组件
function DesktopApp() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold">PC端应用</h2>
        <div className="flex space-x-6 mt-4">
          <span className="cursor-pointer">仪表盘</span>
          <span className="cursor-pointer">项目</span>
          <span className="cursor-pointer">报告</span>
          <span className="cursor-pointer">设置</span>
        </div>
      </div>

      <div className="flex">
        <div className="w-1/4 bg-slate-50 p-6 min-h-[300px]">
          <h3 className="font-medium mb-4">导航菜单</h3>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-blue-600">概览</li>
            <li className="cursor-pointer hover:text-blue-600">分析</li>
            <li className="cursor-pointer hover:text-blue-600">用户管理</li>
            <li className="cursor-pointer hover:text-blue-600">高级设置</li>
          </ul>
        </div>

        <div className="w-3/4 p-6">
          <h3 className="text-xl font-medium mb-4">数据概览</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-blue-600 font-medium">总用户</div>
              <div className="text-2xl font-bold">12,345</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-green-600 font-medium">活跃用户</div>
              <div className="text-2xl font-bold">8,901</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-purple-600 font-medium">转化率</div>
              <div className="text-2xl font-bold">23.5%</div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">详细数据表格</h4>
            <p>在PC端显示更详细的数据分析和图表</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// 移动端应用组件
function MobileApp() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-emerald-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">移动端应用</h2>
          <span className="text-2xl">☰</span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">快速访问</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 p-3 rounded-lg text-center">
              <div className="text-emerald-600 font-medium">我的账户</div>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg text-center">
              <div className="text-emerald-600 font-medium">最近活动</div>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg text-center">
              <div className="text-emerald-600 font-medium">通知</div>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg text-center">
              <div className="text-emerald-600 font-medium">设置</div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium mb-3">今日概览</h3>
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>活跃用户</span>
              <span className="font-bold">1,234</span>
            </div>
            <div className="flex justify-between">
              <span>转化率</span>
              <span className="font-bold">18.2%</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-slate-500">移动端简化界面，专注核心功能</p>
        </div>
      </div>
    </div>
  )
}

export default function FrontendRoutingPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [forceView, setForceView] = useState<string | null>(null)

  useEffect(() => {
    // 检测是否为移动设备
    const checkMobile = () => {
      const mobileByUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const mobileByWidth = window.innerWidth < 768
      setIsMobile(mobileByUA || mobileByWidth)
    }

    // 初始检测
    checkMobile()

    // 监听窗口大小变化
    window.addEventListener("resize", checkMobile)

    // 清理监听器
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // 根据设备类型或强制视图选择渲染的组件
  const renderApp = () => {
    if (forceView === "mobile") {
      return <MobileApp />
    } else if (forceView === "desktop") {
      return <DesktopApp />
    } else {
      return isMobile ? <MobileApp /> : <DesktopApp />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-800">
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-slate-800 mb-6">前端路由方案演示</h1>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant={forceView === null ? "default" : "outline"} onClick={() => setForceView(null)}>
            自动检测 ({isMobile ? "移动端" : "PC端"})
          </Button>
          <Button variant={forceView === "mobile" ? "default" : "outline"} onClick={() => setForceView("mobile")}>
            强制移动端视图
          </Button>
          <Button variant={forceView === "desktop" ? "default" : "outline"} onClick={() => setForceView("desktop")}>
            强制PC端视图
          </Button>
        </div>
      </div>

      <div className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>前端路由演示</CardTitle>
            <CardDescription>
              {forceView
                ? `当前强制显示: ${forceView === "mobile" ? "移动端" : "PC端"}视图`
                : `当前自动检测: ${isMobile ? "移动端" : "PC端"}视图`}
            </CardDescription>
          </CardHeader>
          <CardContent>{renderApp()}</CardContent>
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
              <CardTitle>React Router实现代码</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto text-sm">
                {`// App.js
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MobileApp from './MobileApp';
import DesktopApp from './DesktopApp';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // 检测设备类型
    const checkMobile = () => {
      const mobileByUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const mobileByWidth = window.innerWidth < 768;
      setIsMobile(mobileByUA || mobileByWidth);
    };
    
    // 初始检测
    checkMobile();
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkMobile);
    
    // 清理监听器
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <Router>
      <Switch>
        {/* 移动端路由 */}
        <Route path="/mobile">
          <MobileApp />
        </Route>
        
        {/* PC端路由 */}
        <Route path="/desktop">
          <DesktopApp />
        </Route>
        
        {/* 根据设备类型自动重定向 */}
        <Route path="/">
          {isMobile ? <Redirect to="/mobile" /> : <Redirect to="/desktop" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;`}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next.js实现代码</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto text-sm">
                {`// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // 检测设备类型并重定向
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
      || window.innerWidth < 768;
    
    if (isMobile) {
      router.push('/mobile');
    } else {
      router.push('/desktop');
    }
  }, [router]);
  
  return <div>正在检测设备类型...</div>;
}

// pages/mobile.js
export default function MobilePage() {
  return <MobileApp />;
}

// pages/desktop.js
export default function DesktopPage() {
  return <DesktopApp />;
}

// 或者使用条件渲染的方式
// pages/app.js
import { useState, useEffect } from 'react';

export default function AppPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // 检测设备类型
    const mobileByUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const mobileByWidth = window.innerWidth < 768;
    setIsMobile(mobileByUA || mobileByWidth);
    setIsLoading(false);
  }, []);
  
  if (isLoading) {
    return <div>加载中...</div>;
  }
  
  return isMobile ? <MobileApp /> : <DesktopApp />;
}`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="explanation">
          <Card>
            <CardHeader>
              <CardTitle>前端路由原理</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-lg mb-2">客户端路由</h3>
                <p className="text-slate-600">
                  前端路由是在客户端通过JavaScript控制页面内容的显示，而不需要向服务器请求新页面。
                  这种方法可以根据设备类型动态决定显示哪个组件或页面，提供更流畅的用户体验。
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">实现方式</h3>
                <ol className="list-decimal list-inside space-y-2 text-slate-600">
                  <li>
                    <strong>条件渲染：</strong> 根据设备类型条件渲染不同的组件。
                    <pre className="bg-slate-100 p-3 rounded mt-1 text-xs">
                      {`return isMobile ? <MobileApp /> : <DesktopApp />;`}
                    </pre>
                  </li>
                  <li>
                    <strong>路由重定向：</strong> 检测设备类型后重定向到相应的路由。
                    <pre className="bg-slate-100 p-3 rounded mt-1 text-xs">
                      {`if (isMobile) {
  router.push('/mobile');
} else {
  router.push('/desktop');
}`}
                    </pre>
                  </li>
                  <li>
                    <strong>嵌套路由：</strong> 使用嵌套路由结构，为不同设备提供不同的子路由。
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">常用路由库</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>
                    <strong>React Router：</strong> React应用中最常用的路由库，提供声明式路由功能。
                  </li>
                  <li>
                    <strong>Next.js Router：</strong> Next.js内置的路由系统，支持文件系统路由和动态路由。
                  </li>
                  <li>
                    <strong>Vue Router：</strong> Vue.js的官方路由库，支持嵌套路由、动态路由等功能。
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded">
                <h3 className="font-medium text-purple-800 mb-1">优势与注意事项</h3>
                <div className="text-purple-700">
                  <p className="mb-2">
                    <strong>优势：</strong>
                  </p>
                  <ul className="list-disc list-inside mb-3 space-y-1">
                    <li>提供更流畅的用户体验，无需完全刷新页面</li>
                    <li>可以根据设备类型提供完全不同的UI和功能</li>
                    <li>减少服务器负载，提高应用性能</li>
                  </ul>

                  <p className="mb-2">
                    <strong>注意事项：</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>需要考虑SEO优化，纯客户端路由可能对搜索引擎不友好</li>
                    <li>初始加载时可能需要下载较大的JavaScript文件</li>
                    <li>应考虑使用代码分割和懒加载优化性能</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
