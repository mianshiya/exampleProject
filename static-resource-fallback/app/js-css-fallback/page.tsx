"use client"

import { useState } from "react"
import { CodeBlock } from "@/components/code-block"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function JsCssFallbackPage() {
  const [demoStatus, setDemoStatus] = useState<"idle" | "loading" | "error" | "fallback">("idle")

  const simulateJsLoading = () => {
    setDemoStatus("loading")

    // 模拟加载失败
    setTimeout(() => {
      setDemoStatus("error")

      // 模拟降级处理
      setTimeout(() => {
        setDemoStatus("fallback")
      }, 2000)
    }, 2000)
  }

  const resetDemo = () => {
    setDemoStatus("idle")
  }

  const jsLoadingCode = `// 动态加载 JS 文件并处理失败情况
function loadScript(src, fallbackSrc) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    
    script.onload = () => resolve(script);
    
    script.onerror = () => {
      console.warn(\`Failed to load script: \${src}\`);
      
      if (fallbackSrc) {
        console.log(\`Attempting to load fallback: \${fallbackSrc}\`);
        // 尝试加载备用脚本
        const fallbackScript = document.createElement('script');
        fallbackScript.src = fallbackSrc;
        fallbackScript.async = true;
        
        fallbackScript.onload = () => resolve(fallbackScript);
        fallbackScript.onerror = () => reject(new Error(\`Both primary and fallback scripts failed to load\`));
        
        document.head.appendChild(fallbackScript);
      } else {
        reject(new Error(\`Script load error: \${src}\`));
      }
    };
    
    document.head.appendChild(script);
  });
}

// 使用示例
loadScript('https://cdn.example.com/library.js', 'https://backup-cdn.example.com/library.js')
  .then(() => {
    console.log('Script loaded successfully');
    // 初始化依赖该脚本的功能
    initFeature();
  })
  .catch(error => {
    console.error(error);
    // 显示错误提示或降级UI
    showErrorMessage('无法加载必要的资源，请刷新页面或稍后再试');
  });
`

  const cssLoadingCode = `// 动态加载 CSS 文件并处理失败情况
function loadStylesheet(href, fallbackHref) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    
    link.onload = () => resolve(link);
    
    link.onerror = () => {
      console.warn(\`Failed to load stylesheet: \${href}\`);
      
      if (fallbackHref) {
        console.log(\`Attempting to load fallback stylesheet: \${fallbackHref}\`);
        // 尝试加载备用样式表
        const fallbackLink = document.createElement('link');
        fallbackLink.rel = 'stylesheet';
        fallbackLink.href = fallbackHref;
        
        fallbackLink.onload = () => resolve(fallbackLink);
        fallbackLink.onerror = () => {
          reject(new Error(\`Both primary and fallback stylesheets failed to load\`));
          // 加载内联的基础样式，确保页面可用
          applyBasicStyles();
        };
        
        document.head.appendChild(fallbackLink);
      } else {
        // 加载内联的基础样式，确保页面可用
        applyBasicStyles();
        reject(new Error(\`Stylesheet load error: \${href}\`));
      }
    };
    
    document.head.appendChild(link);
  });
}

// 应用基础内联样式，确保页面基本可用
function applyBasicStyles() {
  const style = document.createElement('style');
  style.textContent = \`
    body { font-family: sans-serif; line-height: 1.5; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 15px; }
    /* 其他基础样式 */
  \`;
  document.head.appendChild(style);
}

// 使用示例
loadStylesheet('https://cdn.example.com/styles.css', 'https://backup-cdn.example.com/styles.css')
  .catch(error => {
    console.error(error);
    // 显示样式加载失败的提示
    showNotification('样式加载不完整，某些功能可能受影响');
  });
`

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">JS/CSS 加载失败降级处理</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>JS 加载失败演示</CardTitle>
            <CardDescription>模拟 JavaScript 文件加载失败及降级处理过程</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-2">
                <Button variant="default" onClick={simulateJsLoading} disabled={demoStatus !== "idle"}>
                  模拟 JS 加载失败
                </Button>

                <Button variant="outline" onClick={resetDemo} disabled={demoStatus === "idle"}>
                  重置演示
                </Button>
              </div>

              <div className="w-full min-h-[200px] border rounded p-4 flex flex-col items-center justify-center">
                {demoStatus === "idle" && <div className="text-center text-muted-foreground">点击上方按钮开始演示</div>}

                {demoStatus === "loading" && (
                  <div className="text-center">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p>正在加载主要 JS 资源...</p>
                  </div>
                )}

                {demoStatus === "error" && (
                  <div className="text-center">
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>加载失败</AlertTitle>
                      <AlertDescription>主要 JS 资源加载失败，正在尝试备用资源...</AlertDescription>
                    </Alert>
                  </div>
                )}

                {demoStatus === "fallback" && (
                  <div className="text-center">
                    <div className="bg-green-100 dark:bg-green-900 p-4 rounded-md mb-4">
                      <h3 className="font-medium text-green-800 dark:text-green-100">备用资源加载成功</h3>
                      <p className="text-green-700 dark:text-green-200 text-sm">
                        已从备用 CDN 成功加载资源，功能已恢复
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      在实际应用中，用户不会感知到这个过程，只会看到功能正常工作
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
              <CardDescription>通过动态插入 script 或 link 标签，监听 onerror 事件，加载备用资源</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="js">
                <TabsList className="mb-4">
                  <TabsTrigger value="js">JS 加载降级</TabsTrigger>
                  <TabsTrigger value="css">CSS 加载降级</TabsTrigger>
                </TabsList>
                <TabsContent value="js">
                  <CodeBlock code={jsLoadingCode} />
                </TabsContent>
                <TabsContent value="css">
                  <CodeBlock code={cssLoadingCode} />
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
                <li>使用 Promise 封装资源加载，便于处理成功/失败情况</li>
                <li>配置多个备用 CDN，按优先级尝试加载</li>
                <li>对于关键 CSS，考虑内联关键样式，确保基本布局</li>
                <li>实现超时机制，避免长时间等待无响应的资源</li>
                <li>使用资源预加载（preload）提高关键资源加载成功率</li>
                <li>考虑使用 Service Worker 缓存关键资源，提供离线支持</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
