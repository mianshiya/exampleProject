import type React from "react"
import Link from "next/link"
import { ArrowRight, Smartphone, Monitor, Layout } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">PC端与移动端自动适配方案</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            本演示网站展示了三种常用的设备适配方案，帮助开发者理解如何实现PC端与移动端的自动适配。
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card
            icon={<Smartphone className="w-10 h-10 text-emerald-500" />}
            title="设备检测方案"
            description="使用JavaScript检测用户设备类型，根据检测结果跳转到相应页面或加载相应组件。"
            link="/device-detection"
          />

          <Card
            icon={<Layout className="w-10 h-10 text-blue-500" />}
            title="响应式设计方案"
            description="使用CSS媒体查询实现响应式布局，根据屏幕尺寸自动调整页面样式和布局。"
            link="/responsive-design"
          />

          <Card
            icon={<Monitor className="w-10 h-10 text-purple-500" />}
            title="前端路由方案"
            description="在单页应用中使用前端路由，根据设备类型渲染不同的组件或页面。"
            link="/frontend-routing"
          />
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-600">调整浏览器窗口大小或使用不同设备访问以查看效果</p>
        </div>
      </div>
    </main>
  )
}

function Card({
  icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col">
      <div className="mb-4">{icon}</div>
      <h2 className="text-xl font-semibold text-slate-800 mb-3">{title}</h2>
      <p className="text-slate-600 mb-6 flex-grow">{description}</p>
      <Link href={link} className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium">
        查看演示 <ArrowRight className="ml-1 w-4 h-4" />
      </Link>
    </div>
  )
}
