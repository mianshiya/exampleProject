"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Smartphone, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DeviceDetectionPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [userAgent, setUserAgent] = useState("")
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    // 获取User-Agent
    setUserAgent(navigator.userAgent)

    // 获取窗口宽度
    setWindowWidth(window.innerWidth)

    // 检测是否为移动设备
    const checkMobile = () => {
      const mobileByUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const mobileByWidth = window.innerWidth < 768
      setIsMobile(mobileByUA || mobileByWidth)
      setWindowWidth(window.innerWidth)
    }

    // 初始检测
    checkMobile()

    // 监听窗口大小变化
    window.addEventListener("resize", checkMobile)

    // 清理监听器
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-800">
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-slate-800 mb-6">设备检测方案演示</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>当前设备检测结果</CardTitle>
            <CardDescription>根据User-Agent和窗口宽度判断</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-6 bg-slate-50 rounded-lg">
              {isMobile ? (
                <div className="flex flex-col items-center text-center">
                  <Smartphone className="h-16 w-16 text-emerald-500 mb-4" />
                  <h2 className="text-2xl font-bold text-emerald-600">移动端设备</h2>
                  <p className="text-slate-600 mt-2">检测到您正在使用移动设备或小屏幕访问</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <Monitor className="h-16 w-16 text-blue-500 mb-4" />
                  <h2 className="text-2xl font-bold text-blue-600">PC端设备</h2>
                  <p className="text-slate-600 mt-2">检测到您正在使用PC设备或大屏幕访问</p>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <p>
                <strong>窗口宽度:</strong> {windowWidth}px
              </p>
              <p>
                <strong>判断标准:</strong> {windowWidth < 768 ? "小于" : "大于或等于"} 768px
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>设备信息</CardTitle>
            <CardDescription>User-Agent和窗口尺寸</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">User-Agent:</h3>
                <div className="bg-slate-100 p-3 rounded text-xs break-all">{userAgent}</div>
              </div>

              <div>
                <h3 className="font-medium mb-1">窗口尺寸:</h3>
                <div className="bg-slate-100 p-3 rounded">宽度: {windowWidth}px</div>
              </div>
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
              <CardTitle>JavaScript设备检测代码</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto text-sm">
                {`function isMobile() {
  // 通过User-Agent检测移动设备
  const mobileByUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // 通过窗口宽度检测小屏幕设备
  const mobileByWidth = window.innerWidth < 768;
  
  // 两种方式任一满足即判定为移动设备
  return mobileByUA || mobileByWidth;
}

// 使用示例
if (isMobile()) {
  // 跳转到移动端页面
  window.location.href = '/mobile';
} else {
  // 保持在PC端页面
  // 或者加载PC端组件
}`}
              </pre>

              <div className="mt-6">
                <Button
                  onClick={() => {
                    const isMobileDevice =
                      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                      window.innerWidth < 768
                    alert(isMobileDevice ? "检测到移动设备，将跳转到移动端页面" : "检测到PC设备，将保持在PC端页面")
                  }}
                  className="w-full"
                >
                  测试设备检测
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="explanation">
          <Card>
            <CardHeader>
              <CardTitle>设备检测原理</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-lg mb-2">User-Agent检测</h3>
                <p className="text-slate-600">
                  通过检查浏览器的User-Agent字符串中是否包含移动设备的标识符（如Android、iPhone等）来判断用户设备类型。
                  这种方法简单直接，但随着设备和浏览器的发展，可能不够准确。
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">窗口尺寸检测</h3>
                <p className="text-slate-600">
                  通过检测浏览器窗口的宽度来判断设备类型。通常将小于768px的视口宽度视为移动设备。
                  这种方法更关注用户的实际使用环境，而非设备本身。
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">组合检测</h3>
                <p className="text-slate-600">
                  结合User-Agent和窗口尺寸两种方法，可以更准确地判断用户设备类型。
                  在实际应用中，可以根据检测结果执行不同的操作，如跳转到不同的页面或加载不同的组件。
                </p>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                <h3 className="font-medium text-amber-800 mb-1">注意事项</h3>
                <p className="text-amber-700">
                  设备检测方法并非完全可靠，用户可能会修改User-Agent或调整窗口大小。
                  建议将设备检测作为辅助手段，配合响应式设计或服务器端检测使用。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
