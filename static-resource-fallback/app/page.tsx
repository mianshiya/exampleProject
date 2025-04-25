import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ImageIcon, FileCode, Network, LayoutDashboard, AlertTriangle } from "lucide-react"

export default function Home() {
  const features = [
    {
      icon: <ImageIcon className="h-6 w-6" />,
      title: "图片加载失败处理",
      description: "通过监听图片的 onerror 事件，替换为默认占位图，避免页面出现破损图标。",
      href: "/image-fallback",
    },
    {
      icon: <FileCode className="h-6 w-6" />,
      title: "JS/CSS 加载失败处理",
      description: "监听 onerror 事件，加载备用资源（如备用 CDN），或者提示用户刷新页面。",
      href: "/js-css-fallback",
    },
    {
      icon: <Network className="h-6 w-6" />,
      title: "静态资源多源兜底",
      description: "配置多个 CDN 源地址，主源失败时自动切换到备源，提升资源可用性。",
      href: "/multi-source",
    },
    {
      icon: <LayoutDashboard className="h-6 w-6" />,
      title: "核心功能降级",
      description: "关键 JS 资源加载失败时，展示简化版页面或降级为静态内容，保证基础信息可见。",
      href: "/core-fallback",
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "全局错误监控",
      description: "通过 window.onerror、addEventListener('error') 统一捕获资源加载错误，结合埋点上报。",
      href: "/error-monitoring",
    },
  ]

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">前端静态资源加载失败降级处理</h1>
        <p className="text-xl text-muted-foreground">
          学习如何优雅地处理前端应用中静态资源加载失败的场景，提升用户体验和应用可靠性
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Link key={index} href={feature.href} className="block">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <div className="mb-2 w-fit rounded-md bg-primary/10 p-2 text-primary">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-primary underline-offset-4 hover:underline">查看示例 →</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
