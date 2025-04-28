"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ModernFormatsDemo() {
  const [selectedFormat, setSelectedFormat] = useState("webp")

  // 模拟不同格式的文件大小
  const fileSizes = {
    jpeg: 150,
    png: 220,
    webp: 80,
    avif: 60,
  }

  // 计算相对于JPEG的节省百分比
  const calculateSavings = (format) => {
    return Math.round((1 - fileSizes[format] / fileSizes.jpeg) * 100)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">现代图像格式演示</h1>
      </div>

      <div className="mb-8 space-y-4">
        <p>
          现代图像格式如WebP和AVIF提供更高的压缩率和更好的图像质量，可以显著减小文件大小，
          提高页面加载速度。Next.js的Image组件会自动根据浏览器支持提供最优的图像格式。
        </p>
        <p>下面是不同图像格式的比较演示：</p>
      </div>

      <Tabs defaultValue="comparison" className="mb-12">
        <TabsList>
          <TabsTrigger value="comparison">格式比较</TabsTrigger>
          <TabsTrigger value="code">代码示例</TabsTrigger>
          <TabsTrigger value="browser">浏览器支持</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">选择图像格式：</h2>
                <div className="flex space-x-2">
                  {Object.keys(fileSizes).map((format) => (
                    <Button
                      key={format}
                      variant={selectedFormat === format ? "default" : "outline"}
                      onClick={() => setSelectedFormat(format)}
                      className="uppercase"
                    >
                      {format}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=600&width=800&text=${selectedFormat.toUpperCase()} 格式`}
                  alt={`${selectedFormat} 格式演示`}
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500">文件大小：</span>
                  <span className="font-bold">{fileSizes[selectedFormat]} KB</span>
                </div>
                {selectedFormat !== "jpeg" && (
                  <div className="text-green-600 font-bold">比JPEG小 {calculateSavings(selectedFormat)}%</div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">格式特点</h2>
              <div className="space-y-4">
                <Card className={selectedFormat === "jpeg" ? "border-blue-500" : ""}>
                  <CardHeader className="pb-2">
                    <CardTitle>JPEG</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>有损压缩，适合照片</li>
                      <li>不支持透明度</li>
                      <li>广泛支持，兼容性最好</li>
                      <li>文件大小适中</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className={selectedFormat === "png" ? "border-blue-500" : ""}>
                  <CardHeader className="pb-2">
                    <CardTitle>PNG</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>无损压缩，适合图形和文本</li>
                      <li>支持透明度</li>
                      <li>广泛支持，兼容性好</li>
                      <li>文件大小较大</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className={selectedFormat === "webp" ? "border-blue-500" : ""}>
                  <CardHeader className="pb-2">
                    <CardTitle>WebP</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>支持有损和无损压缩</li>
                      <li>支持透明度和动画</li>
                      <li>比JPEG小约30%，比PNG小约25%</li>
                      <li>现代浏览器支持良好</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className={selectedFormat === "avif" ? "border-blue-500" : ""}>
                  <CardHeader className="pb-2">
                    <CardTitle>AVIF</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>基于AV1视频编码的图像格式</li>
                      <li>支持透明度和HDR</li>
                      <li>比WebP小约20%，比JPEG小约50%</li>
                      <li>浏览器支持正在增长</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="mt-4">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">使用Next.js Image组件</h2>
              <p className="mb-4">Next.js的Image组件会自动根据浏览器支持提供最优的图像格式 [^1][^2]：</p>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
                {`import Image from 'next/image'

export default function MyComponent() {
  return (
    <Image
      src="/my-image.jpg"  // 原始图像可以是jpg/png
      alt="描述"
      width={800}
      height={600}
      // Next.js会自动转换为WebP或AVIF（如果浏览器支持）
    />
  )
}`}
              </pre>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">使用picture元素提供多种格式</h2>
              <p className="mb-4">对于不使用Next.js的项目，可以使用HTML的picture元素提供多种格式：</p>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
                {`<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="描述" width="800" height="600">
</picture>`}
              </pre>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="browser" className="mt-4">
          <h2 className="text-xl font-bold mb-4">浏览器支持情况</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">格式</th>
                  <th className="border p-2 text-left">Chrome</th>
                  <th className="border p-2 text-left">Firefox</th>
                  <th className="border p-2 text-left">Safari</th>
                  <th className="border p-2 text-left">Edge</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-bold">JPEG</td>
                  <td className="border p-2 text-green-600">✓ 所有版本</td>
                  <td className="border p-2 text-green-600">✓ 所有版本</td>
                  <td className="border p-2 text-green-600">✓ 所有版本</td>
                  <td className="border p-2 text-green-600">✓ 所有版本</td>
                </tr>
                <tr>
                  <td className="border p-2 font-bold">PNG</td>
                  <td className="border p-2 text-green-600">✓ 所有版本</td>
                  <td className="border p-2 text-green-600">✓ 所有版本</td>
                  <td className="border p-2 text-green-600">✓ 所有版本</td>
                  <td className="border p-2 text-green-600">✓ 所有版本</td>
                </tr>
                <tr>
                  <td className="border p-2 font-bold">WebP</td>
                  <td className="border p-2 text-green-600">✓ 32+</td>
                  <td className="border p-2 text-green-600">✓ 65+</td>
                  <td className="border p-2 text-green-600">✓ 14+</td>
                  <td className="border p-2 text-green-600">✓ 18+</td>
                </tr>
                <tr>
                  <td className="border p-2 font-bold">AVIF</td>
                  <td className="border p-2 text-green-600">✓ 85+</td>
                  <td className="border p-2 text-green-600">✓ 93+</td>
                  <td className="border p-2 text-yellow-600">✓ 16.4+</td>
                  <td className="border p-2 text-green-600">✓ 85+</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-600">* 数据截至2023年，实际支持情况可能有变化</p>
        </TabsContent>
      </Tabs>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">使用现代图像格式的最佳实践</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>使用Next.js的Image组件自动提供最优格式 [^3]</li>
          <li>对于非Next.js项目，使用picture元素提供多种格式</li>
          <li>为旧浏览器提供JPEG/PNG回退</li>
          <li>根据图像内容选择合适的格式：照片使用WebP/AVIF，图形使用SVG</li>
          <li>使用适当的压缩级别平衡质量和文件大小</li>
        </ul>
      </div>
    </div>
  )
}
