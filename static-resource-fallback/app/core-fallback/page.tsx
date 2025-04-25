"use client"

import { useState } from "react"
import { CodeBlock } from "@/components/code-block"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCcw } from "lucide-react"

export default function CoreFallbackPage() {
  const [demoState, setDemoState] = useState<"full" | "loading" | "basic">("full")

  const showFullVersion = () => {
    setDemoState("full")
  }

  const showBasicVersion = () => {
    setDemoState("loading")

    // 模拟加载失败，显示基础版本
    setTimeout(() => {
      setDemoState("basic")
    }, 2000)
  }

  const featureFallbackCode = `// 核心功能降级处理示例
// 定义功能可用性状态
const featureAvailability = {
  charts: false,
  interactiveMap: false,
  advancedFilters: false,
  realTimeUpdates: false
};

// 尝试加载高级功能
async function loadAdvancedFeatures() {
  try {
    // 尝试加载图表库
    await loadScript('https://cdn.example.com/chart-library.js', 5000);
    featureAvailability.charts = true;
    initializeCharts();
    
    // 尝试加载地图组件
    await loadScript('https://cdn.example.com/map-component.js', 5000);
    featureAvailability.interactiveMap = true;
    initializeMap();
    
    // 尝试加载高级筛选器
    await loadScript('https://cdn.example.com/advanced-filters.js', 5000);
    featureAvailability.advancedFilters = true;
    initializeFilters();
    
    // 尝试加载实时更新功能
    await loadScript('https://cdn.example.com/realtime-updates.js', 5000);
    featureAvailability.realTimeUpdates = true;
    initializeRealTimeUpdates();
    
    console.log('所有高级功能加载成功');
  } catch (error) {
    console.warn('部分高级功能加载失败:', error);
    // 显示功能降级通知
    showFeatureLimitedNotice();
  }
}

// 检查特定功能是否可用
function isFeatureAvailable(featureName) {
  return featureAvailability[featureName] === true;
}

// 根据功能可用性渲染适当的UI组件
function renderDashboard() {
  // 始终渲染核心内容
  renderCoreContent();
  
  // 有条件地渲染高级功能
  if (isFeatureAvailable('charts')) {
    renderCharts();
  } else {
    renderBasicStats(); // 降级为基础统计数据
  }
  
  if (isFeatureAvailable('interactiveMap')) {
    renderInteractiveMap();
  } else {
    renderStaticMap(); // 降级为静态地图图片
  }
  
  if (isFeatureAvailable('advancedFilters')) {
    renderAdvancedFilters();
  } else {
    renderBasicFilters(); // 降级为基础筛选选项
  }
  
  if (isFeatureAvailable('realTimeUpdates')) {
    enableRealTimeUpdates();
  } else {
    setupManualRefresh(); // 降级为手动刷新按钮
  }
}

// 初始化应用
function initializeApp() {
  // 首先渲染基础版本确保核心功能可用
  renderCoreContent();
  renderBasicStats();
  renderStaticMap();
  renderBasicFilters();
  setupManualRefresh();
  
  // 然后尝试加载高级功能
  loadAdvancedFeatures().finally(() => {
    // 无论成功与否，都重新渲染以反映当前可用功能
    renderDashboard();
  });
}

// 启动应用
initializeApp();
`

  const progressiveEnhancementCode = `// 渐进式增强实现示例
document.addEventListener('DOMContentLoaded', function() {
  // 基础功能初始化 - 不依赖外部JS库
  initBasicFunctionality();
  
  // 检测浏览器能力
  const browserCapabilities = detectBrowserCapabilities();
  
  // 根据浏览器能力决定加载哪些增强功能
  if (browserCapabilities.supportsModernJS) {
    loadModernFeatures();
  } else {
    // 对于不支持现代JS的浏览器，保持基础功能
    showBrowserLimitationsNotice();
  }
});

// 基础功能初始化
function initBasicFunctionality() {
  // 实现核心业务逻辑，使用原生JS
  setupBasicNavigation();
  setupBasicForms();
  loadStaticContent();
}

// 加载现代增强功能
function loadModernFeatures() {
  // 动态加载现代JS库和组件
  Promise.all([
    loadScript('modern-framework.js'),
    loadScript('interactive-components.js'),
    loadStylesheet('enhanced-styles.css')
  ])
  .then(() => {
    // 增强UI和交互
    enhanceUserInterface();
    setupAdvancedInteractions();
    enableAnimations();
  })
  .catch(error => {
    console.warn('无法加载增强功能，保持基础体验', error);
    // 用户仍然可以使用基础功能
  });
}

// 检测浏览器能力
function detectBrowserCapabilities() {
  return {
    supportsModernJS: 'Promise' in window && 'fetch' in window,
    supportsGrid: CSS.supports('display', 'grid'),
    supportsWebGL: detectWebGLSupport(),
    // 其他能力检测...
  };
}

// 根据浏览器能力应用不同的样式
function applyAppropriateStyles() {
  const capabilities = detectBrowserCapabilities();
  
  if (capabilities.supportsGrid) {
    document.body.classList.add('grid-layout');
  } else {
    document.body.classList.add('flex-layout'); // 降级为flexbox布局
  }
  
  if (!capabilities.supportsWebGL) {
    document.body.classList.add('no-3d'); // 禁用3D效果
  }
}

// 初始化时应用适当的样式
applyAppropriateStyles();
`

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">核心功能降级</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>核心功能降级演示</CardTitle>
            <CardDescription>模拟关键 JS 资源加载失败时，降级为基础功能版本</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-2">
                <Button variant="default" onClick={showFullVersion} disabled={demoState === "full"}>
                  完整版本
                </Button>

                <Button
                  variant="outline"
                  onClick={showBasicVersion}
                  disabled={demoState === "basic" || demoState === "loading"}
                >
                  模拟降级
                </Button>
              </div>

              <div className="w-full border rounded-md overflow-hidden">
                {demoState === "full" && (
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-4">数据分析仪表板（完整版）</h3>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-950 dark:to-blue-900 rounded-md p-4 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">交互式图表</div>
                          <div className="text-sm text-blue-500 dark:text-blue-400">支持缩放和筛选</div>
                        </div>
                      </div>

                      <div className="aspect-video bg-gradient-to-br from-green-100 to-green-50 dark:from-green-950 dark:to-green-900 rounded-md p-4 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-300">实时地图</div>
                          <div className="text-sm text-green-500 dark:text-green-400">支持缩放和平移</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div className="flex gap-2">
                        <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">高级筛选</div>
                        <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">数据导出</div>
                        <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">自定义视图</div>
                      </div>

                      <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        实时更新中
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-muted rounded-md p-3">
                          <div className="font-medium">指标 {i + 1}</div>
                          <div className="text-2xl font-bold">{Math.floor(Math.random() * 1000)}</div>
                          <div className="text-xs text-muted-foreground">详细数据可用</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {demoState === "loading" && (
                  <div className="p-4 flex flex-col items-center justify-center" style={{ minHeight: "350px" }}>
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
                    <p>加载高级功能中...</p>
                  </div>
                )}

                {demoState === "basic" && (
                  <div className="p-4">
                    <Alert
                      variant="warning"
                      className="mb-4 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800"
                    >
                      <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <AlertTitle className="text-amber-800 dark:text-amber-200">高级功能不可用</AlertTitle>
                      <AlertDescription className="text-amber-700 dark:text-amber-300">
                        无法加载部分高级功能，已切换到基础版本。
                        <Button
                          variant="link"
                          className="p-0 h-auto text-amber-700 dark:text-amber-300"
                          onClick={showBasicVersion}
                        >
                          <RefreshCcw className="h-3 w-3 mr-1" />
                          重试
                        </Button>
                      </AlertDescription>
                    </Alert>

                    <h3 className="text-lg font-medium mb-4">数据分析仪表板（基础版）</h3>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="aspect-video bg-muted rounded-md p-4 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xl font-medium">基础数据表格</div>
                          <div className="text-sm text-muted-foreground">静态数据展示</div>
                        </div>
                      </div>

                      <div className="aspect-video bg-muted rounded-md p-4 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xl font-medium">静态地图图片</div>
                          <div className="text-sm text-muted-foreground">无交互功能</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div className="flex gap-2">
                        <div className="px-3 py-1 bg-muted rounded-full text-sm">基础筛选</div>
                      </div>

                      <Button size="sm" variant="outline" className="text-sm">
                        <RefreshCcw className="h-3 w-3 mr-1" />
                        手动刷新
                      </Button>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-muted rounded-md p-3">
                          <div className="font-medium">指标 {i + 1}</div>
                          <div className="text-2xl font-bold">{Math.floor(Math.random() * 1000)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>实现方法</CardTitle>
              <CardDescription>关键 JS 资源加载失败时，展示简化版页面或降级为静态内容</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="feature">
                <TabsList className="mb-4">
                  <TabsTrigger value="feature">功能降级</TabsTrigger>
                  <TabsTrigger value="progressive">渐进式增强</TabsTrigger>
                </TabsList>
                <TabsContent value="feature">
                  <CodeBlock code={featureFallbackCode} />
                </TabsContent>
                <TabsContent value="progressive">
                  <CodeBlock code={progressiveEnhancementCode} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>最佳实践</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>采用"渐进式增强"策略，先确保基础功能可用，再加载高级功能</li>
                <li>对功能进行分层，明确区分核心功能和增强功能</li>
                <li>使用特性检测而非浏览器检测，确保兼容性</li>
                <li>为用户提供明确的功能降级提示，避免困惑</li>
                <li>提供手动刷新或重试选项，让用户可以尝试恢复完整功能</li>
                <li>记录功能降级事件，便于后续分析和优化</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
