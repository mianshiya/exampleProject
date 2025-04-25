"use client"

import type React from "react"

import { useState } from "react"
import { CodeBlock } from "@/components/code-block"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ImageFallbackPage() {
  const [showBrokenImage, setShowBrokenImage] = useState(false)
  const [showFallbackImage, setShowFallbackImage] = useState(false)

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("图片加载失败，使用默认占位图")
    e.currentTarget.src = "/placeholder.svg?height=200&width=200"
    e.currentTarget.alt = "加载失败的占位图"
  }

  const imageErrorCode = `// React 组件中处理图片加载失败
const MyImage = () => {
  return (
    <img 
      src="https://example.com/image.jpg" 
      alt="描述"
      onError={(e) => {
        e.currentTarget.src = "/placeholder.svg" // 替换为默认图片
        e.currentTarget.alt = "加载失败的占位图"
      }}
    />
  )
}

// 也可以封装成可复用的组件
const FallbackImage = ({ src, fallbackSrc, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src)
  
  return (
    <img
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
      {...props}
    />
  )
}

// 使用方式
<FallbackImage 
  src="https://example.com/image.jpg"
  fallbackSrc="/placeholder.svg"
  alt="描述"
/>
`

  const cssBackgroundCode = `/* CSS 背景图片降级处理 */
.hero-section {
  /* 主要图片 */
  background-image: url('/images/hero.jpg');
  
  /* 降级方案：使用渐变色作为背景 */
  background-image: linear-gradient(to right, #f0f0f0, #e0e0e0);
}

/* 或者使用多个背景，按顺序尝试 */
.profile-avatar {
  background-image: 
    url('/images/avatar.jpg'),     /* 首选图片 */
    url('/images/default-avatar.jpg'), /* 备选图片 */
    linear-gradient(#e66465, #9198e5); /* 最终降级为渐变色 */
}
`

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">图片加载失败降级处理</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>图片加载失败示例</CardTitle>
            <CardDescription>演示图片加载失败时的默认行为和降级处理效果</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">默认行为（无降级）</h3>
              <div className="flex flex-col items-center gap-4">
                <Button variant="outline" onClick={() => setShowBrokenImage(!showBrokenImage)}>
                  {showBrokenImage ? "隐藏" : "显示"}无降级的损坏图片
                </Button>

                {showBrokenImage && (
                  <div className="border rounded p-4 w-full flex justify-center">
                    <img
                      src="/non-existent-image.jpg"
                      alt="这个图片不存在"
                      width={200}
                      height={200}
                      className="border"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">降级处理（使用占位图）</h3>
              <div className="flex flex-col items-center gap-4">
                <Button variant="outline" onClick={() => setShowFallbackImage(!showFallbackImage)}>
                  {showFallbackImage ? "隐藏" : "显示"}有降级的损坏图片
                </Button>

                {showFallbackImage && (
                  <div className="border rounded p-4 w-full flex justify-center">
                    <img
                      src="/non-existent-image.jpg"
                      alt="这个图片不存在，但会降级到占位图"
                      width={200}
                      height={200}
                      className="border"
                      onError={handleImageError}
                    />
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
              <CardDescription>通过监听图片的 onerror 事件，在图片加载失败时替换为默认占位图</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="react">
                <TabsList className="mb-4">
                  <TabsTrigger value="react">React 实现</TabsTrigger>
                  <TabsTrigger value="css">CSS 背景图</TabsTrigger>
                </TabsList>
                <TabsContent value="react">
                  <CodeBlock code={imageErrorCode} />
                </TabsContent>
                <TabsContent value="css">
                  <CodeBlock code={cssBackgroundCode} language="css" />
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
                <li>始终为图片提供合适的 alt 文本，确保无障碍访问</li>
                <li>使用与内容相关的占位图，而不是通用占位符</li>
                <li>考虑使用渐进式加载或模糊占位符提升用户体验</li>
                <li>对于重要图片，可以预先加载或使用多个备选源</li>
                <li>结合图片懒加载技术，减少不必要的加载失败</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
