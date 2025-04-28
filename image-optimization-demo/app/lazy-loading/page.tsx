"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LazyLoadingDemo() {
  const [loadType, setLoadType] = useState<"eager" | "lazy">("lazy")
  const [loadedImages, setLoadedImages] = useState<number[]>([])
  const [scrollPosition, setScrollPosition] = useState(0)

  // 监听滚动位置
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 图片加载回调
  const handleImageLoad = (index: number) => {
    if (!loadedImages.includes(index)) {
      setLoadedImages((prev) => [...prev, index])
    }
  }

  // 重置演示
  const resetDemo = () => {
    setLoadedImages([])
    window.scrollTo(0, 0)
  }

  // 切换加载类型
  const toggleLoadType = () => {
    resetDemo()
    setLoadType((prev) => (prev === "lazy" ? "eager" : "lazy"))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">图片懒加载演示</h1>
      </div>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertDescription>
          当前模式: <strong>{loadType === "lazy" ? "懒加载" : "立即加载"}</strong> | 已加载图片:{" "}
          <strong>{loadedImages.length}</strong> / 20 | 滚动位置: <strong>{scrollPosition}px</strong>
        </AlertDescription>
      </Alert>

      <div className="mb-6 space-y-4">
        <p>
          图片懒加载是一种优化技术，只在图片即将进入视口时才加载，避免一次性加载所有图片。
          这可以显著减少初始页面加载时间和带宽使用。
        </p>
        <p>
          现代浏览器支持原生懒加载，只需添加 <code className="bg-gray-100 px-1 rounded">loading="lazy"</code> 属性：
        </p>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          {`<img src="image.jpg" loading="lazy" alt="描述">`}
        </pre>
        <p>在下面的演示中，向下滚动页面，观察图片何时加载。在懒加载模式下，图片只有在接近视口时才会加载。</p>
        <Button onClick={toggleLoadType}>切换到{loadType === "lazy" ? "立即加载" : "懒加载"}模式</Button>
        <Button variant="outline" onClick={resetDemo} className="ml-2">
          重置演示
        </Button>
      </div>

      <div className="space-y-64 pb-32">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="relative">
            <img
              src={`/placeholder.svg?height=400&width=600&text=图片 ${index + 1}`}
              alt={`演示图片 ${index + 1}`}
              loading={loadType}
              onLoad={() => handleImageLoad(index)}
              className="w-full h-auto rounded-lg shadow-md"
              width={600}
              height={400}
            />
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded shadow text-sm">
              {loadedImages.includes(index) ? "已加载" : "未加载"}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
