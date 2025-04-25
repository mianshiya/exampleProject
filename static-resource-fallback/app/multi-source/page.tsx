"use client"

import { useState } from "react"
import { CodeBlock } from "@/components/code-block"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function MultiSourcePage() {
  const [demoStatus, setDemoStatus] = useState<"idle" | "primary" | "fallback1" | "fallback2" | "error">("idle")
  const [loadingStep, setLoadingStep] = useState(0)

  const simulateMultiSourceLoading = () => {
    setDemoStatus("primary")
    setLoadingStep(1)

    // 模拟主源加载失败
    setTimeout(() => {
      setDemoStatus("fallback1")
      setLoadingStep(2)

      // 模拟第一个备用源加载失败
      setTimeout(() => {
        setDemoStatus("fallback2")
        setLoadingStep(3)

        // 模拟第二个备用源加载成功
        setTimeout(() => {
          setLoadingStep(4)
        }, 1500)
      }, 1500)
    }, 1500)
  }

  const simulateAllFailure = () => {
    setDemoStatus("primary")
    setLoadingStep(1)

    // 模拟主源加载失败
    setTimeout(() => {
      setDemoStatus("fallback1")
      setLoadingStep(2)

      // 模拟第一个备用源加载失败
      setTimeout(() => {
        setDemoStatus("fallback2")
        setLoadingStep(3)

        // 模拟第二个备用源也加载失败
        setTimeout(() => {
          setDemoStatus("error")
          setLoadingStep(4)
        }, 1500)
      }, 1500)
    }, 1500)
  }

  const resetDemo = () => {
    setDemoStatus("idle")
    setLoadingStep(0)
  }

  const multiSourceCode = `// 多源加载策略实现
const CDN_SOURCES = [
  'https://cdn-primary.example.com',   // 主要 CDN
  'https://cdn-backup1.example.com',   // 备用 CDN 1
  'https://cdn-backup2.example.com',   // 备用 CDN 2
  'https://cdn-fallback.example.com',  // 最终备用 CDN
];

// 从多个源加载资源的函数
function loadFromMultipleSources(path, type = 'script', timeout = 5000) {
  return new Promise((resolve, reject) => {
    let currentIndex = 0;
    
    // 尝试从当前源加载资源
    function trySource() {
      if (currentIndex >= CDN_SOURCES.length) {
        return reject(new Error('All sources failed to load resource'));
      }
      
      const currentSource = CDN_SOURCES[currentIndex];
      const url = \`\${currentSource}\${path}\`;
      
      console.log(\`Attempting to load from source \${currentIndex + 1}: \${url}\`);
      
      // 创建超时计时器
      const timeoutId = setTimeout(() => {
        console.warn(\`Source \${currentIndex + 1} timed out: \${url}\`);
        currentIndex++;
        trySource(); // 尝试下一个源
      }, timeout);
      
      if (type === 'script') {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        
        script.onload = () => {
          clearTimeout(timeoutId);
          console.log(\`Successfully loaded from source \${currentIndex + 1}: \${url}\`);
          resolve(script);
        };
        
        script.onerror = () => {
          clearTimeout(timeoutId);
          console.warn(\`Source \${currentIndex + 1} failed: \${url}\`);
          currentIndex++;
          trySource(); // 尝试下一个源
        };
        
        document.head.appendChild(script);
      } else if (type === 'stylesheet') {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        
        link.onload = () => {
          clearTimeout(timeoutId);
          console.log(\`Successfully loaded from source \${currentIndex + 1}: \${url}\`);
          resolve(link);
        };
        
        link.onerror = () => {
          clearTimeout(timeoutId);
          console.warn(\`Source \${currentIndex + 1} failed: \${url}\`);
          currentIndex++;
          trySource(); // 尝试下一个源
        };
        
        document.head.appendChild(link);
      } else if (type === 'image') {
        const img = new Image();
        img.src = url;
        
        img.onload = () => {
          clearTimeout(timeoutId);
          console.log(\`Successfully loaded from source \${currentIndex + 1}: \${url}\`);
          resolve(img);
        };
        
        img.onerror = () => {
          clearTimeout(timeoutId);
          console.warn(\`Source \${currentIndex + 1} failed: \${url}\`);
          currentIndex++;
          trySource(); // 尝试下一个源
        };
      }
    }
    
    // 开始尝试第一个源
    trySource();
  });
}

// 使用示例
loadFromMultipleSources('/assets/main.js', 'script')
  .then(() => {
    console.log('Resource loaded successfully');
    initializeApp(); // 初始化应用
  })
  .catch(error => {
    console.error(error);
    showErrorMessage('无法加载必要资源，请检查网络连接');
  });
`

  const configurationCode = `// 在 webpack 或其他构建工具中配置多 CDN
// webpack.config.js 示例
module.exports = {
  // ...其他配置
  output: {
    // ...
    publicPath: process.env.NODE_ENV === 'production'
      ? [
          'https://cdn1.example.com/',
          'https://cdn2.example.com/',
          'https://cdn3.example.com/'
        ]
      : '/',
  },
  // ...
};

// 在 HTML 中使用 CDN 回退
// index.html
<!DOCTYPE html>
<html>
<head>
  <!-- 主要 CSS -->
  <link rel="stylesheet" href="https://cdn1.example.com/styles.css" 
        onerror="this.onerror=null;this.href='https://cdn2.example.com/styles.css'">
  
  <!-- 主要 JS 带回退 -->
  <script>
    function loadScript(src, fallback) {
      var script = document.createElement('script');
      script.src = src;
      script.onerror = function() {
        var fallbackScript = document.createElement('script');
        fallbackScript.src = fallback;
        document.head.appendChild(fallbackScript);
      };
      document.head.appendChild(script);
    }
    
    // 使用方式
    loadScript('https://cdn1.example.com/app.js', 'https://cdn2.example.com/app.js');
  </script>
</head>
<body>
  <!-- 页面内容 -->
</body>
</html>
`

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">静态资源多源兜底</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>多源加载演示</CardTitle>
            <CardDescription>模拟从多个 CDN 源依次尝试加载资源的过程</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-2">
                <Button variant="default" onClick={simulateMultiSourceLoading} disabled={demoStatus !== "idle"}>
                  模拟多源加载成功
                </Button>

                <Button variant="destructive" onClick={simulateAllFailure} disabled={demoStatus !== "idle"}>
                  模拟全部失败
                </Button>

                <Button variant="outline" onClick={resetDemo} disabled={demoStatus === "idle"}>
                  重置演示
                </Button>
              </div>

              <div className="w-full min-h-[300px] border rounded p-4">
                {demoStatus === "idle" && <div className="text-center text-muted-foreground">点击上方按钮开始演示</div>}

                {demoStatus !== "idle" && (
                  <div className="space-y-4">
                    <h3 className="font-medium text-center mb-4">资源加载流程</h3>

                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${loadingStep > 1 ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300" : loadingStep === 1 ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 animate-pulse" : "bg-muted text-muted-foreground"}`}
                      >
                        {loadingStep > 1 ? <AlertCircle className="h-4 w-4" /> : "1"}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">主要 CDN 源</p>
                        <p className="text-sm text-muted-foreground">https://cdn-primary.example.com/main.js</p>
                      </div>
                      <div className="text-sm">
                        {loadingStep === 1 && <span className="text-blue-600 dark:text-blue-400">加载中...</span>}
                        {loadingStep > 1 && <span className="text-red-600 dark:text-red-400">加载失败</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${loadingStep > 2 ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300" : loadingStep === 2 ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 animate-pulse" : "bg-muted text-muted-foreground"}`}
                      >
                        {loadingStep > 2 ? <AlertCircle className="h-4 w-4" /> : "2"}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">备用 CDN 源 1</p>
                        <p className="text-sm text-muted-foreground">https://cdn-backup1.example.com/main.js</p>
                      </div>
                      <div className="text-sm">
                        {loadingStep === 2 && <span className="text-blue-600 dark:text-blue-400">加载中...</span>}
                        {loadingStep > 2 && <span className="text-red-600 dark:text-red-400">加载失败</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${loadingStep > 3 && demoStatus === "error" ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300" : loadingStep === 3 ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 animate-pulse" : loadingStep > 3 ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300" : "bg-muted text-muted-foreground"}`}
                      >
                        {loadingStep > 3 && demoStatus === "error" ? (
                          <AlertCircle className="h-4 w-4" />
                        ) : loadingStep > 3 ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          "3"
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">备用 CDN 源 2</p>
                        <p className="text-sm text-muted-foreground">https://cdn-backup2.example.com/main.js</p>
                      </div>
                      <div className="text-sm">
                        {loadingStep === 3 && <span className="text-blue-600 dark:text-blue-400">加载中...</span>}
                        {loadingStep > 3 && demoStatus === "error" && (
                          <span className="text-red-600 dark:text-red-400">加载失败</span>
                        )}
                        {loadingStep > 3 && demoStatus !== "error" && (
                          <span className="text-green-600 dark:text-green-400">加载成功</span>
                        )}
                      </div>
                    </div>

                    {loadingStep === 4 && (
                      <div className="mt-6">
                        {demoStatus === "error" ? (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>所有源均加载失败</AlertTitle>
                            <AlertDescription>
                              无法从任何配置的 CDN 源加载资源，请检查网络连接或稍后再试。
                            </AlertDescription>
                          </Alert>
                        ) : (
                          <Alert className="bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800">
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <AlertTitle className="text-green-800 dark:text-green-200">资源加载成功</AlertTitle>
                            <AlertDescription className="text-green-700 dark:text-green-300">
                              成功从备用 CDN 源 2 加载资源，应用可以正常运行。
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    )}
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
              <CardDescription>配置多个 CDN 源地址，主源失败时自动切换到备源</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="js">
                <TabsList className="mb-4">
                  <TabsTrigger value="js">JavaScript 实现</TabsTrigger>
                  <TabsTrigger value="config">配置方式</TabsTrigger>
                </TabsList>
                <TabsContent value="js">
                  <CodeBlock code={multiSourceCode} />
                </TabsContent>
                <TabsContent value="config">
                  <CodeBlock code={configurationCode} />
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
                <li>选择地理位置分散的多个 CDN 提供商，避免区域性故障</li>
                <li>实现超时机制，避免单个源长时间无响应导致整体加载缓慢</li>
                <li>考虑使用 CDN 负载均衡服务，自动选择最优 CDN</li>
                <li>对于关键资源，可以预加载多个源的资源，使用先加载成功的版本</li>
                <li>结合浏览器缓存策略，减少对多源加载的依赖</li>
                <li>监控各 CDN 源的可用性和性能，动态调整优先级</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
