import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "静态资源加载失败降级处理演示",
  description: "前端应用中静态资源加载失败的场景进行降级处理的教学演示",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="border-t py-4">
              <div className="container text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} 静态资源加载失败降级处理演示
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
