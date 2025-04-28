import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "无限滚动加载演示",
  description: "前端无限滚动加载技术教学演示",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <header className="border-b">
          <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
            <div className="font-bold text-xl">无限滚动加载演示</div>
            <nav>
              <ul className="flex gap-4">
                <li>
                  <Link href="/" className="hover:text-blue-600 transition-colors">
                    基础演示
                  </Link>
                </li>
                <li>
                  <Link href="/advanced" className="hover:text-blue-600 transition-colors">
                    高级技巧
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
