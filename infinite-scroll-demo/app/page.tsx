import InfiniteScrollDemo from "@/components/infinite-scroll-demo"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">无限滚动加载演示</h1>
        <p className="text-gray-600 mb-8">本演示展示了如何使用 Intersection Observer API 实现无限滚动加载功能</p>
        <InfiniteScrollDemo />
      </div>
    </main>
  )
}
