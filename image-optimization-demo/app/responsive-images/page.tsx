import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResponsiveImagesDemo() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">响应式图像演示</h1>
      </div>

      <div className="mb-8 space-y-4">
        <p>
          响应式图像根据设备屏幕大小和分辨率提供不同尺寸的图像，确保用户只下载适合其设备的图像大小。
          这可以减少带宽使用，提高页面加载速度，特别是在移动设备上。
        </p>
      </div>

      <Tabs defaultValue="nextjs" className="mb-12">
        <TabsList>
          <TabsTrigger value="nextjs">Next.js Image</TabsTrigger>
          <TabsTrigger value="html">HTML响应式图像</TabsTrigger>
          <TabsTrigger value="art-direction">艺术指导</TabsTrigger>
        </TabsList>

        <TabsContent value="nextjs" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Next.js响应式图像</h2>
              <p className="mb-4">Next.js的Image组件通过设置sizes属性和样式可以轻松创建响应式图像 [^3]：</p>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto mb-4">
                {`<Image
  src="/my-image.jpg"
  alt="响应式图像"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, 50vw"
  style={{
    width: '100%',
    height: 'auto',
  }}
/>`}
              </pre>
              <p>
                sizes属性告诉浏览器图像在不同视口宽度下的显示大小， Next.js会自动生成适当的srcset，提供多种尺寸的图像。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">演示</h2>
              <div className="bg-gray-100 p-4 rounded-lg">
                <Image
                  src="/placeholder.svg?height=800&width=1200&text=响应式图像"
                  alt="响应式图像演示"
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  className="rounded-lg"
                />
                <p className="mt-4 text-sm text-gray-600 text-center">
                  调整浏览器窗口大小，观察图像如何适应不同屏幕宽度
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="html" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">HTML响应式图像</h2>
              <p className="mb-4">使用HTML的srcset和sizes属性可以为不同屏幕尺寸提供不同分辨率的图像：</p>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto mb-4">
                {`<img 
  src="image-800w.jpg"
  srcset="
    image-400w.jpg 400w,
    image-800w.jpg 800w,
    image-1200w.jpg 1200w
  "
  sizes="
    (max-width: 600px) 100vw,
    (max-width: 1200px) 50vw,
    33vw
  "
  alt="响应式图像"
  width="800"
  height="600"
/>`}
              </pre>
              <p>
                srcset列出了不同宽度的图像版本，sizes定义了在不同视口宽度下图像的显示大小，
                浏览器会自动选择最适合当前显示条件的图像。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">演示</h2>
              <div className="bg-gray-100 p-4 rounded-lg">
                <img
                  src="/placeholder.svg?height=600&width=800&text=默认图像"
                  srcSet="
                    /placeholder.svg?height=300&width=400&text=小图像 400w,
                    /placeholder.svg?height=600&width=800&text=中图像 800w,
                    /placeholder.svg?height=900&width=1200&text=大图像 1200w
                  "
                  sizes="
                    (max-width: 600px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw
                  "
                  alt="HTML响应式图像演示"
                  width="800"
                  height="600"
                  className="w-full h-auto rounded-lg"
                />
                <p className="mt-4 text-sm text-gray-600 text-center">
                  调整浏览器窗口大小，浏览器会自动选择合适的图像版本
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="art-direction" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">艺术指导</h2>
              <p className="mb-4">
                艺术指导是响应式图像的高级应用，不仅改变图像大小，还根据不同设备提供不同裁剪或构图的图像：
              </p>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto mb-4">
                {`<picture>
  <!-- 移动设备：竖向裁剪 -->
  <source 
    media="(max-width: 600px)" 
    srcset="mobile-image.jpg"
  />
  <!-- 平板设备：方形裁剪 -->
  <source 
    media="(max-width: 1024px)" 
    srcset="tablet-image.jpg"
  />
  <!-- 桌面设备：横向裁剪 -->
  <img 
    src="desktop-image.jpg" 
    alt="艺术指导演示"
  />
</picture>`}
              </pre>
              <p>
                使用picture元素和多个source元素，可以根据媒体查询为不同设备提供完全不同的图像，
                而不仅仅是同一图像的不同尺寸。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">演示</h2>
              <div className="bg-gray-100 p-4 rounded-lg">
                <picture>
                  <source media="(max-width: 600px)" srcSet="/placeholder.svg?height=600&width=400&text=移动版(竖向)" />
                  <source
                    media="(max-width: 1024px)"
                    srcSet="/placeholder.svg?height=600&width=600&text=平板版(方形)"
                  />
                  <img
                    src="/placeholder.svg?height=600&width=1000&text=桌面版(横向)"
                    alt="艺术指导演示"
                    className="w-full h-auto rounded-lg"
                  />
                </picture>
                <p className="mt-4 text-sm text-gray-600 text-center">
                  调整浏览器窗口大小，观察图像如何根据设备类型改变构图
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">响应式图像的好处</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>减少带宽使用，特别是在移动设备上</li>
          <li>提高页面加载速度</li>
          <li>改善用户体验，特别是在网络连接较慢的情况下</li>
          <li>减少服务器负载和CDN成本</li>
          <li>提高Core Web Vitals得分，特别是LCP (Largest Contentful Paint) [^1]</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">响应式图像最佳实践</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>始终设置width和height属性，避免布局偏移(CLS) [^1]</li>
          <li>使用Next.js的Image组件自动处理响应式图像 [^2]</li>
          <li>为不同的断点提供适当的图像尺寸</li>
          <li>结合现代图像格式(WebP/AVIF)和响应式技术获得最佳性能</li>
          <li>考虑使用艺术指导为移动设备提供更合适的图像构图</li>
          <li>测试不同设备和网络条件下的图像加载性能</li>
        </ul>
      </div>
    </div>
  )
}
