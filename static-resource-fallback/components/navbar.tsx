import Link from "next/link"
import { ModeToggle } from "./mode-toggle"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold">
          静态资源降级处理演示
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:underline">
            首页
          </Link>
          <Link href="/image-fallback" className="text-sm font-medium hover:underline">
            图片降级
          </Link>
          <Link href="/js-css-fallback" className="text-sm font-medium hover:underline">
            JS/CSS降级
          </Link>
          <Link href="/multi-source" className="text-sm font-medium hover:underline">
            多源兜底
          </Link>
          <Link href="/core-fallback" className="text-sm font-medium hover:underline">
            核心功能降级
          </Link>
          <Link href="/error-monitoring" className="text-sm font-medium hover:underline">
            错误监控
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
