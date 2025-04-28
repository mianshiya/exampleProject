"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AsyncDecodingDemo() {
  const [loadingTime, setLoadingTime] = useState<{ sync: number; async: number }>({ sync: 0, async: 0 })
  const [isLoading, setIsLoading] = useState(false)

  const runTest = () => {
    setIsLoading(true)
    setLoadingTime({ sync: 0, async: 0 })

    // 清除缓存的影响
    const timestamp = Date.now()

    // 测试同步解码
    const startSync = performance.now()
    const syncImg = new Image()
    syncImg.src = `/placeholder.svg?height=1200&width=1600&text=大图像&t=${timestamp}`
    syncImg.decoding = "sync"
    syncImg.onload = () => {
      const endSync = performance.now()
      setLoadingTime((prev) => ({ ...prev, sync: Math.round(endSync - startSync) }))

      // 测试异步解码
      const startAsync = performance.now()
      const asyncImg = new Image()
      asyncImg.src = `/placeholder.svg?height=1200&width=1600&text=大图像&t=${timestamp}`
      asyncImg.decoding = "async"
      asyncImg.onload = () => {
        const endAsync = performance.now()
        setLoadingTime((prev) => ({ ...prev, async: Math.round(endAsync - startAsync) }))
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">图片解码优化演示</h1>
      </div>

      <div className="mb-8 space-y-4">
        <p>
          当浏览器加载图片时，需要将压缩的图片数据解码为像素数据以便显示。
          这个解码过程默认在主线程上进行，可能会阻塞其他JavaScript的执行和UI更新。
        </p>
        <p>
          使用 <code className="bg-gray-100 px-1 rounded">decoding="async"</code>{" "}
          属性可以让浏览器在非主线程上异步解码图片， 避免阻塞主线程，提高页面响应性：
        </p>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          {`<img src="large-image.jpg" decoding="async" alt="描述">`}
        </pre>
      </div>

      <Button onClick={runTest} disabled={isLoading} className="mb-6">
        {isLoading ? "测试中..." : "运行解码测试"}
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">同步解码 (decoding="sync")</h2>
          <p className="mb-4">在主线程上解码图片，可能会阻塞UI更新</p>

          <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            {isLoading ? (
              <div className="text-center">加载中...</div>
            ) : (
              <img
                src="/placeholder.svg?height=600&width=800&text=同步解码图像"
                alt="同步解码演示"
                decoding="sync"
                className="w-full h-auto rounded-lg"
                width={800}
                height={600}
              />
            )}
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold">{loadingTime.sync}ms</div>
            <div className="text-sm text-gray-600">加载时间</div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">异步解码 (decoding="async")</h2>
          <p className="mb-4">在非主线程上解码图片，不阻塞UI更新</p>

          <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            {isLoading ? (
              <div className="text-center">加载中...</div>
            ) : (
              <img
                src="/placeholder.svg?height=600&width=800&text=异步解码图像"
                alt="异步解码演示"
                decoding="async"
                className="w-full h-auto rounded-lg"
                width={800}
                height={600}
              />
            )}
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold">{loadingTime.async}ms</div>
            <div className="text-sm text-gray-600">加载时间</div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">解码属性选项</h2>
        <ul className="space-y-4">
          <li>
            <strong>async</strong>: 告诉浏览器在非主线程上异步解码图像。
            这可以防止图像解码阻塞主线程，但图像可能不会立即显示。
          </li>
          <li>
            <strong>sync</strong>: 在主线程上同步解码图像。 这可能会阻塞主线程，但确保图像在显示前完全解码。
          </li>
          <li>
            <strong>auto</strong>: 让浏览器决定最佳解码方式。 这是默认值，通常浏览器会选择异步解码。
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">最佳实践</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            对于大型图像或页面上的多个图像，使用 <code>decoding="async"</code> 可以防止图像解码阻塞主线程
          </li>
          <li>
            对于关键的首屏图像，如果需要立即显示，可以考虑使用 <code>decoding="sync"</code>
          </li>
          <li>结合图像懒加载和异步解码可以获得更好的性能优化效果</li>
          <li>
            对于现代浏览器，<code>decoding="auto"</code> 通常是一个不错的默认选择
          </li>
        </ul>
      </div>
    </div>
  )
}
