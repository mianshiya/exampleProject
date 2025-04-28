"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PlaceholdersDemo() {
  const [showOriginal, setShowOriginal] = useState(false)

  // 模拟网络延迟
  const simulateNetworkDelay = () => {
    setShowOriginal(false)
    setTimeout(() => {
      setShowOriginal(true)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">图片占位符演示</h1>
      </div>

      <div className="mb-6 space-y-4">
        <p>
          在图片加载前显示占位符可以减少布局偏移(CLS)，提升用户体验。
          有多种占位符策略，包括色块、低质量图像预览(LQIP)、模糊占位符等。
        </p>
        <p>
          Next.js 的 Image 组件提供了内置的占位符支持，可以通过{" "}
          <code className="bg-gray-100 px-1 rounded">placeholder</code> 属性设置：
        </p>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          {`<Image
  src="/image.jpg"
  alt="描述"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/..."
/>`}
        </pre>
      </div>

      <Button onClick={simulateNetworkDelay} className="mb-6">
        模拟网络延迟 (2秒)
      </Button>

      <Tabs defaultValue="blur" className="mb-12">
        <TabsList>
          <TabsTrigger value="blur">模糊占位符</TabsTrigger>
          <TabsTrigger value="color">色块占位符</TabsTrigger>
          <TabsTrigger value="lqip">低质量图像预览</TabsTrigger>
        </TabsList>

        <TabsContent value="blur" className="mt-4">
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            {!showOriginal && <div className="absolute inset-0 animate-pulse bg-gray-200 blur-xl"></div>}
            <Image
              src={
                showOriginal
                  ? "/placeholder.svg?height=600&width=800&text=高清图像"
                  : "/placeholder.svg?height=60&width=80&text=低清图像"
              }
              alt="模糊占位符演示"
              className={`w-full h-auto transition-opacity duration-500 ${showOriginal ? "opacity-100" : "opacity-0"}`}
              width={800}
              height={600}
              style={{
                filter: showOriginal ? "none" : "blur(20px)",
                transform: "scale(1.1)",
              }}
            />
          </div>
          <p className="mt-4">
            模糊占位符使用模糊处理的低分辨率图像作为占位符，在高清图像加载完成后平滑过渡。 这种方法在Next.js中通过{" "}
            <code>placeholder="blur"</code> 实现。
          </p>
        </TabsContent>

        <TabsContent value="color" className="mt-4">
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            {!showOriginal && <div className="absolute inset-0 bg-blue-200"></div>}
            <Image
              src={
                showOriginal
                  ? "/placeholder.svg?height=600&width=800&text=高清图像"
                  : "/placeholder.svg?height=1&width=1"
              }
              alt="色块占位符演示"
              className={`w-full h-auto transition-opacity duration-500 ${showOriginal ? "opacity-100" : "opacity-0"}`}
              width={800}
              height={600}
            />
          </div>
          <p className="mt-4">
            色块占位符使用与图像主色调相匹配的纯色块，占用极少的带宽，适合快速显示。 可以通过提取图像的主色调来实现。
          </p>
        </TabsContent>

        <TabsContent value="lqip" className="mt-4">
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={
                showOriginal
                  ? "/placeholder.svg?height=600&width=800&text=高清图像"
                  : "/placeholder.svg?height=80&width=120&text=低质量预览"
              }
              alt="LQIP演示"
              className="w-full h-auto transition-all duration-500"
              width={800}
              height={600}
            />
          </div>
          <p className="mt-4">
            低质量图像预览(LQIP)使用极小的图像(通常小于2KB)作为占位符。
            这种方法提供比纯色块更多的视觉信息，同时保持较小的文件大小。
          </p>
        </TabsContent>
      </Tabs>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">占位符技术的好处</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>减少累积布局偏移(CLS)，提高Core Web Vitals得分 [^1]</li>
          <li>提供即时视觉反馈，改善感知性能</li>
          <li>在慢速网络环境下提供更好的用户体验</li>
          <li>减少用户等待空白区域的焦虑感</li>
        </ul>
      </div>
    </div>
  )
}
