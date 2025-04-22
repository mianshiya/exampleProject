"use client"

import { useState, useRef, useEffect } from "react"

interface Item {
  id: number
  name: string
  description: string
  value: number
}

interface BasicVirtualListProps {
  data: Item[]
  itemHeight?: number
  bufferItems?: number
}

export default function BasicVirtualList({ data, itemHeight = 50, bufferItems = 5 }: BasicVirtualListProps) {
  const [startIndex, setStartIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState(0)

  // 计算可见区域能显示多少项
  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight
      const calculatedVisibleItems = Math.ceil(containerHeight / itemHeight)
      setVisibleItems(calculatedVisibleItems)
    }
  }, [itemHeight])

  // 处理滚动事件
  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop
      const newStartIndex = Math.floor(scrollTop / itemHeight)
      setStartIndex(newStartIndex)
    }
  }

  // 计算要渲染的数据范围
  const endIndex = Math.min(startIndex + visibleItems + bufferItems, data.length)
  const visibleData = data.slice(startIndex, endIndex)

  // 计算总高度和偏移量
  const totalHeight = data.length * itemHeight
  const offsetY = startIndex * itemHeight

  return (
    <div ref={containerRef} className="overflow-auto h-full relative" onScroll={handleScroll}>
      {/* 占位元素，确保滚动条高度正确 */}
      <div style={{ height: totalHeight, position: "relative" }}>
        {/* 可见项容器，使用transform定位到正确位置 */}
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleData.map((item) => (
            <div
              key={item.id}
              className="p-4 border-b hover:bg-gray-50 transition-colors"
              style={{ height: itemHeight }}
            >
              <div className="flex justify-between">
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-500">ID: {item.id}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
