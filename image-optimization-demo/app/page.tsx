import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">图像优化技术演示</h1>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
          在网页中有大量图片时，如何优化图像加载以提高页面加载速度？本网站演示了多种图像优化技术及其实现方法。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {techniques.map((technique) => (
            <Link
              key={technique.id}
              href={technique.path}
              className="block p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-3">{technique.title}</h2>
              <p className="text-gray-600 mb-4">{technique.description}</p>
              <div className="flex items-center text-blue-600">
                查看演示 <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">为什么图像优化很重要？</h2>
          <p className="mb-4">
            图像通常占据网页总下载量的大部分。优化图像可以显著提高页面加载速度，改善用户体验，
            并对搜索引擎优化(SEO)产生积极影响。特别是对移动用户来说，图像优化可以减少数据使用量并提高页面响应速度。
          </p>
          <p>
            根据研究，页面加载时间每增加1秒，转化率可能下降7%。通过本站展示的优化技术，
            可以显著减少图像加载时间，提高网站性能。
          </p>
        </div>
      </div>
    </main>
  )
}

const techniques = [
  {
    id: 1,
    title: "图片懒加载",
    description: "只在图片即将进入视口时才加载，避免一次性加载所有图片",
    path: "/lazy-loading",
  },
  {
    id: 2,
    title: "图片占位符",
    description: "在图片加载前显示低质量占位图或色块，提升用户体验",
    path: "/placeholders",
  },
  {
    id: 3,
    title: "CSS Sprites",
    description: "将多个小图标合并成一张大图，减少HTTP请求",
    path: "/css-sprites",
  },
  {
    id: 4,
    title: "图片解码优化",
    description: "使用decoding='async'属性让图片解码过程不阻塞主线程",
    path: "/async-decoding",
  },
  {
    id: 5,
    title: "现代图像格式",
    description: "使用WebP等现代图像格式减小文件大小，提高加载速度",
    path: "/modern-formats",
  },
  {
    id: 6,
    title: "响应式图像",
    description: "根据设备屏幕大小和分辨率提供不同尺寸的图像",
    path: "/responsive-images",
  },
]
