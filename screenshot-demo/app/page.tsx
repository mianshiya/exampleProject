"use client"

import { useState, Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Code, FileImage, Layers } from "lucide-react"
import dynamic from "next/dynamic"

// Use dynamic imports with loading fallbacks
const Html2CanvasDemo = dynamic(() => import("@/components/html2canvas-demo"), {
  ssr: false,
  loading: () => <div className="p-8 text-center">加载 html2canvas 组件中...</div>,
})

const DomToImageDemo = dynamic(() => import("@/components/dom-to-image-demo"), {
  ssr: false,
  loading: () => <div className="p-8 text-center">加载 DOM-to-Image 组件中...</div>,
})

const CanvasApiDemo = dynamic(() => import("@/components/canvas-api-demo"), {
  ssr: false,
  loading: () => <div className="p-8 text-center">加载 Canvas API 组件中...</div>,
})

export default function Home() {
  const [activeTab, setActiveTab] = useState("html2canvas")

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">网页截图功能演示</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            这个演示展示了三种在前端实现网页截图的方法，让您可以将网页内容保存为图片。
          </p>
        </header>

        <Tabs defaultValue="html2canvas" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="html2canvas">
              <Camera className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">html2canvas</span>
            </TabsTrigger>
            <TabsTrigger value="domtoimage">
              <Layers className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">DOM-to-Image</span>
            </TabsTrigger>
            <TabsTrigger value="canvas">
              <FileImage className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Canvas API</span>
            </TabsTrigger>
          </TabsList>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {activeTab === "html2canvas" && (
                  <>
                    <Camera className="mr-2 h-5 w-5" />
                    html2canvas 方法
                  </>
                )}
                {activeTab === "domtoimage" && (
                  <>
                    <Layers className="mr-2 h-5 w-5" />
                    DOM-to-Image 方法
                  </>
                )}
                {activeTab === "canvas" && (
                  <>
                    <FileImage className="mr-2 h-5 w-5" />
                    Canvas API 方法
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {activeTab === "html2canvas" && "通过遍历页面元素并在 Canvas 上重新绘制来实现截图"}
                {activeTab === "domtoimage" && "类似于 html2canvas，但在某些场景下有不同的渲染效果"}
                {activeTab === "canvas" && "使用原生 Canvas API 实现简单的截图功能"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Suspense fallback={<div className="p-8 text-center">加载组件中...</div>}>
                <TabsContent value="html2canvas" className="mt-0">
                  <Html2CanvasDemo />
                </TabsContent>

                <TabsContent value="domtoimage" className="mt-0">
                  <DomToImageDemo />
                </TabsContent>

                <TabsContent value="canvas" className="mt-0">
                  <CanvasApiDemo />
                </TabsContent>
              </Suspense>
            </CardContent>

            <CardFooter className="flex justify-between border-t pt-6">
              <div className="text-sm text-gray-500">
                <Code className="inline mr-1 h-4 w-4" />
                查看源代码了解实现细节
              </div>
              <Button variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                返回顶部
              </Button>
            </CardFooter>
          </Card>
        </Tabs>

        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">技术说明</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">html2canvas</h3>
              <p className="text-gray-600">
                最常用的网页截图方案，通过遍历DOM元素并在Canvas上重新绘制来实现。适合大多数场景，但可能在处理某些CSS效果时有限制。
              </p>
            </div>
            <div>
              <h3 className="font-medium">DOM-to-Image</h3>
              <p className="text-gray-600">
                类似于html2canvas的库，在某些场景下可能有更好的渲染效果，特别是对于复杂的CSS样式。
              </p>
            </div>
            <div>
              <h3 className="font-medium">Canvas API</h3>
              <p className="text-gray-600">
                使用原生Canvas API实现简单的截图功能，适合对特定Canvas元素进行截图，或者在不需要引入额外库的简单场景。
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
