"use client"

import { useState, useEffect } from "react"
import { CodeBlock } from "@/components/code-block"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BarChart, FileText, ImageIcon } from "lucide-react"

export default function ErrorMonitoringPage() {
  const [errors, setErrors] = useState<Array<{ type: string; message: string; timestamp: Date }>>([])
  const [isMonitoring, setIsMonitoring] = useState(false)

  useEffect(() => {
    if (isMonitoring) {
      // 清除之前的错误
      setErrors([])

      // 设置全局错误监听
      const handleError = (event: ErrorEvent) => {
        event.preventDefault()
        setErrors((prev) => [
          ...prev,
          {
            type: "JavaScript Error",
            message: `${event.message} at ${event.filename}:${event.lineno}:${event.colno}`,
            timestamp: new Date(),
          },
        ])
      }

      // 设置资源加载错误监听
      const handleResourceError = (event: Event) => {
        if (event.target instanceof HTMLImageElement) {
          setErrors((prev) => [
            ...prev,
            {
              type: "Image Load Error",
              message: `Failed to load image: ${event.target.src}`,
              timestamp: new Date(),
            },
          ])
        } else if (event.target instanceof HTMLScriptElement) {
          setErrors((prev) => [
            ...prev,
            {
              type: "Script Load Error",
              message: `Failed to load script: ${event.target.src}`,
              timestamp: new Date(),
            },
          ])
        } else if (event.target instanceof HTMLLinkElement) {
          setErrors((prev) => [
            ...prev,
            {
              type: "CSS Load Error",
              message: `Failed to load stylesheet: ${event.target.href}`,
              timestamp: new Date(),
            },
          ])
        }
      }

      // 添加事件监听器
      window.addEventListener("error", handleError)
      window.addEventListener("error", handleResourceError, true)

      return () => {
        // 清理事件监听器
        window.removeEventListener("error", handleError)
        window.removeEventListener("error", handleResourceError, true)
      }
    }
  }, [isMonitoring])

  const startMonitoring = () => {
    setIsMonitoring(true)
  }

  const stopMonitoring = () => {
    setIsMonitoring(false)
  }

  const triggerJsError = () => {
    try {
      // @ts-ignore
      const obj = null
      obj.nonExistentMethod()
    } catch (error) {
      if (error instanceof Error) {
        window.dispatchEvent(
          new ErrorEvent("error", {
            message: error.message,
            filename: "demo.js",
            lineno: 42,
            colno: 13,
            error,
          }),
        )
      }
    }
  }

  const triggerImageError = () => {
    const img = new Image()
    img.src = "https://non-existent-image-url.jpg"
    document.body.appendChild(img)
    setTimeout(() => {
      document.body.removeChild(img)
    }, 100)
  }

  const triggerScriptError = () => {
    const script = document.createElement("script")
    script.src = "https://non-existent-script-url.js"
    document.body.appendChild(script)
    setTimeout(() => {
      document.body.removeChild(script)
    }, 100)
  }

  const errorMonitoringCode = `// 全局错误监控实现
// 初始化错误监控
function initErrorMonitoring() {
  // 监听 JavaScript 运行时错误
  window.addEventListener('error', function(event) {
    // 阻止默认处理
    event.preventDefault();
    
    // 收集错误信息
    const errorInfo = {
      type: 'runtime',
      message: event.message,
      source: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error ? event.error.stack : '',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    // 记录错误
    console.error('JavaScript Error:', errorInfo);
    
    // 上报错误
    reportError(errorInfo);
    
    return true; // 防止默认错误处理
  });
  
  // 监听未捕获的 Promise 拒绝
  window.addEventListener('unhandledrejection', function(event) {
    // 收集 Promise 错误信息
    const errorInfo = {
      type: 'promise',
      message: event.reason ? (event.reason.message || String(event.reason)) : 'Promise rejected',
      stack: event.reason && event.reason.stack ? event.reason.stack : '',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    // 记录错误
    console.error('Unhandled Promise Rejection:', errorInfo);
    
    // 上报错误
    reportError(errorInfo);
  });
  
  // 监听资源加载错误 (使用捕获阶段)
  window.addEventListener('error', function(event) {
    // 只处理资源加载错误
    if (event.target && (
        event.target instanceof HTMLImageElement || 
        event.target instanceof HTMLScriptElement || 
        event.target instanceof HTMLLinkElement ||
        event.target instanceof HTMLAudioElement ||
        event.target instanceof HTMLVideoElement
    )) {
      // 收集资源错误信息
      const target = event.target;
      const errorInfo = {
        type: 'resource',
        tagName: target.tagName.toLowerCase(),
        url: target instanceof HTMLImageElement ? target.src : 
             target instanceof HTMLScriptElement ? target.src :
             target instanceof HTMLLinkElement ? target.href :
             target instanceof HTMLAudioElement ? target.src :
             target instanceof HTMLVideoElement ? target.src : '',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        pageUrl: window.location.href
      };
      
      // 记录错误
      console.error('Resource Load Error:', errorInfo);
      
      // 上报错误
      reportError(errorInfo);
      
      // 尝试资源降级处理
      handleResourceFallback(event.target);
    }
  }, true); // 使用捕获阶段
}

// 资源降级处理
function handleResourceFallback(element) {
  if (element instanceof HTMLImageElement) {
    // 图片加载失败处理
    if (!element.dataset.fallbackApplied) {
      element.dataset.fallbackApplied = 'true';
      element.onerror = null; // 防止循环触发
      
      // 尝试从备用源加载
      if (element.dataset.fallbackSrc) {
        element.src = element.dataset.fallbackSrc;
      } else {
        // 使用默认占位图
        element.src = '/placeholder.svg';
      }
    }
  } else if (element instanceof HTMLScriptElement) {
    // 脚本加载失败处理
    if (element.dataset.fallbackSrc) {
      const fallbackScript = document.createElement('script');
      fallbackScript.src = element.dataset.fallbackSrc;
      fallbackScript.async = element.async;
      fallbackScript.defer = element.defer;
      
      // 替换原始脚本
      element.parentNode.replaceChild(fallbackScript, element);
    }
  } else if (element instanceof HTMLLinkElement && element.rel === 'stylesheet') {
    // 样式表加载失败处理
    if (element.dataset.fallbackHref) {
      const fallbackLink = document.createElement('link');
      fallbackLink.rel = 'stylesheet';
      fallbackLink.href = element.dataset.fallbackHref;
      
      // 替换原始样式表
      element.parentNode.replaceChild(fallbackLink, element);
    } else {
      // 应用内联的基础样式
      applyBasicStyles();
    }
  }
}

// 上报错误到服务器
function reportError(errorInfo) {
  // 添加应用信息
  errorInfo.appVersion = APP_VERSION;
  errorInfo.environment = process.env.NODE_ENV;
  
  // 批量收集错误，定期发送
  if (window.errorQueue) {
    window.errorQueue.push(errorInfo);
  } else {
    window.errorQueue = [errorInfo];
  }
  
  // 如果队列达到阈值或者是严重错误，立即发送
  if (window.errorQueue.length >= 10 || errorInfo.type === 'runtime') {
    sendErrorsToServer();
  }
}

// 发送错误到服务器
function sendErrorsToServer() {
  if (!window.errorQueue || window.errorQueue.length === 0) return;
  
  const errors = [...window.errorQueue];
  window.errorQueue = [];
  
  // 使用 Beacon API 发送，避免页面卸载时丢失数据
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/error-logging', JSON.stringify({ errors }));
  } else {
    // 降级为 fetch
    fetch('/api/error-logging', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ errors }),
      // 使用 keepalive 确保请求在页面卸载时仍能完成
      keepalive: true
    }).catch(e => console.error('Error reporting failed:', e));
  }
}

// 初始化错误监控
initErrorMonitoring();

// 定期发送收集的错误
setInterval(sendErrorsToServer, 30000);
`

  const reactErrorBoundaryCode = `// React 错误边界实现
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // 更新状态，下次渲染时显示降级UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 记录错误信息
    console.error('Component Error:', error, errorInfo);
    
    // 更新状态以保存错误信息
    this.setState({ errorInfo });
    
    // 上报错误到监控系统
    reportComponentError({
      type: 'react',
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      url: window.location.href
    });
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      // 渲染降级UI
      return (
        <div className="error-boundary-fallback">
          <h2>组件加载失败</h2>
          <p>{this.state.error && this.state.error.message}</p>
          {this.props.fallback ? (
            // 使用提供的降级组件
            React.cloneElement(this.props.fallback, { 
              error: this.state.error,
              resetError: this.resetError 
            })
          ) : (
            // 默认降级UI
            <div>
              <p>抱歉，此部分内容暂时无法显示。</p>
              <button onClick={this.resetError}>
                重试
              </button>
            </div>
          )}
        </div>
      );
    }

    // 正常渲染子组件
    return this.props.children;
  }
}

// 使用示例
function App() {
  return (
    <div className="app">
      <Header />
      
      {/* 为整个内容区域添加错误边界 */}
      <ErrorBoundary>
        <MainContent />
      </ErrorBoundary>
      
      {/* 为独立功能模块添加单独的错误边界和自定义降级UI */}
      <ErrorBoundary 
        fallback={
          <div className="chart-fallback">
            <p>图表加载失败，显示基础数据表格</p>
            <BasicDataTable data={chartData} />
            <button onClick={() => {}}>重新加载图表</button>
          </div>
        }
      >
        <InteractiveChart data={chartData} />
      </ErrorBoundary>
      
      <Footer />
    </div>
  );
}

// 上报组件错误
function reportComponentError(errorInfo) {
  fetch('/api/component-errors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(errorInfo)
  }).catch(e => console.error('Error reporting failed:', e));
}

export default ErrorBoundary;
`

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">全局错误监控</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>错误监控演示</CardTitle>
            <CardDescription>模拟捕获和记录各种静态资源加载错误</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                {!isMonitoring ? (
                  <Button variant="default" onClick={startMonitoring}>
                    启动错误监控
                  </Button>
                ) : (
                  <Button variant="destructive" onClick={stopMonitoring}>
                    停止监控
                  </Button>
                )}
              </div>

              {isMonitoring && (
                <Alert className="bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800">
                  <AlertTitle className="text-green-800 dark:text-green-200">错误监控已启动</AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-300">
                    点击下方按钮触发不同类型的错误，查看监控效果。
                  </AlertDescription>
                </Alert>
              )}

              {isMonitoring && (
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={triggerJsError} className="flex gap-1 items-center">
                    <FileText className="h-4 w-4" />
                    触发 JS 错误
                  </Button>

                  <Button variant="outline" size="sm" onClick={triggerImageError} className="flex gap-1 items-center">
                    <ImageIcon className="h-4 w-4" />
                    触发图片加载错误
                  </Button>

                  <Button variant="outline" size="sm" onClick={triggerScriptError} className="flex gap-1 items-center">
                    <FileText className="h-4 w-4" />
                    触发脚本加载错误
                  </Button>
                </div>
              )}

              <div className="border rounded-md p-4 max-h-[400px] overflow-y-auto">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  错误监控日志
                </h3>

                {errors.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    {isMonitoring ? "暂无错误记录，请触发一些错误" : "请先启动错误监控"}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {errors.map((error, index) => (
                      <div key={index} className="border-l-4 border-red-500 pl-3 py-1">
                        <div className="flex justify-between">
                          <span className="font-medium text-red-600 dark:text-red-400">{error.type}</span>
                          <span className="text-xs text-muted-foreground">{error.timestamp.toLocaleTimeString()}</span>
                        </div>
                        <p className="text-sm mt-1">{error.message}</p>
                      </div>
                    ))}
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
              <CardDescription>
                通过 window.onerror、window.addEventListener('error') 统一捕获资源加载错误
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="global">
                <TabsList className="mb-4">
                  <TabsTrigger value="global">全局错误监控</TabsTrigger>
                  <TabsTrigger value="react">React 错误边界</TabsTrigger>
                </TabsList>
                <TabsContent value="global">
                  <CodeBlock code={errorMonitoringCode} />
                </TabsContent>
                <TabsContent value="react">
                  <CodeBlock code={reactErrorBoundaryCode} />
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
                <li>同时监听 window.onerror 和 error 事件，确保捕获所有类型的错误</li>
                <li>使用捕获阶段（capture phase）监听资源加载错误</li>
                <li>实现错误去重和节流，避免重复上报相同错误</li>
                <li>收集足够的上下文信息，便于问题定位和复现</li>
                <li>使用 Beacon API 或 fetch keepalive 确保页面卸载时错误也能上报</li>
                <li>在 React 应用中，结合使用全局监控和错误边界</li>
                <li>对于关键业务模块，实现单独的错误监控和降级策略</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
