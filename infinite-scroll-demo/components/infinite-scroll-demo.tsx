"use client"

import { useState, useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// 模拟从API获取数据的函数
const fetchItems = async (page: number, limit = 10) => {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 生成模拟数据
  return Array.from({ length: limit }, (_, i) => ({
    id: page * limit + i,
    title: `项目 ${page * limit + i + 1}`,
    description: `这是项目 ${page * limit + i + 1} 的描述。这里可以放置更多内容...`,
    imageUrl: `/placeholder.svg?height=200&width=400&text=项目 ${page * limit + i + 1}`,
  }))
}

export default function InfiniteScrollDemo() {
  const [items, setItems] = useState<any[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)

  // 初始加载数据
  useEffect(() => {
    loadMoreItems()
  }, [])

  // 加载更多数据的函数
  const loadMoreItems = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const newItems = await fetchItems(page)

      // 模拟数据结束的情况（当加载到第5页时）
      if (page >= 4) {
        setHasMore(false)
      }

      setItems((prevItems) => [...prevItems, ...newItems])
      setPage((prevPage) => prevPage + 1)
    } catch (error) {
      console.error("加载数据时出错:", error)
    } finally {
      setLoading(false)
    }
  }

  // 设置 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 当观察的元素进入视口时
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreItems()
        }
      },
      { threshold: 1.0 }, // 当目标元素完全可见时触发回调
    )

    // 观察加载指示器元素
    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    // 清理函数
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [hasMore, loading])

  return (
    <div className="space-y-6">
      {/* 教学说明 */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">实现原理</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Intersection Observer API</strong>: 用于检测元素是否进入视口，比scroll事件更高效
            </li>
            <li>
              <strong>状态管理</strong>: 使用React状态管理加载状态、页码和数据
            </li>
            <li>
              <strong>加载指示器</strong>: 在列表底部放置一个被观察的元素，当它进入视口时加载更多数据
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* 内容列表 */}
      <div className="grid gap-6">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-100">
              <img src={item.imageUrl || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 加载指示器 */}
      <div ref={loaderRef} className="py-4 flex justify-center items-center">
        {loading && (
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
            <span className="text-gray-500">加载更多内容...</span>
          </div>
        )}
        {!hasMore && !loading && items.length > 0 && <div className="text-gray-500 py-4">已经到底了，没有更多内容</div>}
      </div>

      {/* 代码解释 */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle>代码实现要点</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">1. 状态管理</h3>
            <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
              {`const [items, setItems] = useState([])
const [page, setPage] = useState(0)
const [loading, setLoading] = useState(false)
const [hasMore, setHasMore] = useState(true)`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">2. Intersection Observer 设置</h3>
            <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
              {`useEffect(() => {
  const observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadMoreItems()
      }
    },
    { threshold: 1.0 }
  )

  if (loaderRef.current) {
    observer.observe(loaderRef.current)
  }

  return () => {
    if (loaderRef.current) {
      observer.unobserve(loaderRef.current)
    }
  }
}, [hasMore, loading])`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">3. 加载更多数据</h3>
            <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
              {`const loadMoreItems = async () => {
  if (loading || !hasMore) return
  
  setLoading(true)
  try {
    const newItems = await fetchItems(page)
    
    // 检查是否还有更多数据
    if (page >= 4) {
      setHasMore(false)
    }
    
    setItems(prevItems => [...prevItems, ...newItems])
    setPage(prevPage => prevPage + 1)
  } catch (error) {
    console.error("加载数据时出错:", error)
  } finally {
    setLoading(false)
  }
}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
