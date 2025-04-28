"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Code } from "lucide-react"

const STORAGE_KEY = "html5DragDropOrder"
const DEFAULT_ITEMS = [
  { id: 1, content: "项目 1", color: "bg-blue-100" },
  { id: 2, content: "项目 2", color: "bg-green-100" },
  { id: 3, content: "项目 3", color: "bg-yellow-100" },
  { id: 4, content: "项目 4", color: "bg-purple-100" },
  { id: 5, content: "项目 5", color: "bg-pink-100" },
]

export default function Html5DragDrop() {
  const [items, setItems] = useState(DEFAULT_ITEMS)
  const [showCode, setShowCode] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  // 加载保存的顺序
  useEffect(() => {
    const savedOrder = localStorage.getItem(STORAGE_KEY)
    if (savedOrder) {
      try {
        setItems(JSON.parse(savedOrder))
      } catch (e) {
        console.error("Failed to parse saved order")
      }
    }
  }, [])

  const handleDragStart = (e: React.DragEvent, index: number) => {
    // 设置拖拽数据
    e.dataTransfer.setData("text/plain", index.toString())
    e.dataTransfer.effectAllowed = "move"

    // 记录被拖拽的元素索引
    setDraggedIndex(index)

    // 设置拖拽时的透明度
    setTimeout(() => {
      const element = e.target as HTMLElement
      element.classList.add("opacity-50")
    }, 0)
  }

  const handleDragOver = (e: React.DragEvent) => {
    // 阻止默认行为以允许放置
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDragEnter = (e: React.DragEvent) => {
    // 添加视觉提示
    const element = e.currentTarget as HTMLElement
    element.classList.add("bg-gray-100")
  }

  const handleDragLeave = (e: React.DragEvent) => {
    // 移除视觉提示
    const element = e.currentTarget as HTMLElement
    element.classList.remove("bg-gray-100")
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()

    // 获取拖拽的元素索引
    const dragIndex = Number.parseInt(e.dataTransfer.getData("text/plain"))

    // 如果拖放到自身，不做任何操作
    if (dragIndex === dropIndex) {
      return
    }

    // 创建新的排序数组
    const newItems = [...items]
    const [removed] = newItems.splice(dragIndex, 1)
    newItems.splice(dropIndex, 0, removed)

    // 更新状态
    setItems(newItems)

    // 移除视觉提示
    const element = e.currentTarget as HTMLElement
    element.classList.remove("bg-gray-100")
  }

  const handleDragEnd = (e: React.DragEvent) => {
    // 移除所有拖拽相关的视觉提示
    const element = e.target as HTMLElement
    element.classList.remove("opacity-50")

    // 重置拖拽索引
    setDraggedIndex(null)

    // 移除所有元素的视觉提示
    document.querySelectorAll(".bg-gray-100").forEach((el) => {
      el.classList.remove("bg-gray-100")
    })
  }

  const saveOrder = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    toast({
      title: "保存成功",
      description: "列表顺序已保存到本地存储",
    })
  }

  const resetOrder = () => {
    setItems(DEFAULT_ITEMS)
    localStorage.removeItem(STORAGE_KEY)
    toast({
      title: "重置成功",
      description: "列表顺序已重置为默认顺序",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium">HTML5拖放API实现</h3>
          <p className="text-sm text-gray-500">拖放列表项来重新排序</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowCode(!showCode)}>
          <Code className="h-4 w-4 mr-2" />
          {showCode ? "隐藏代码" : "查看代码"}
        </Button>
      </div>

      <ul className="space-y-2 max-h-[400px] overflow-y-auto p-1">
        {items.map((item, index) => (
          <li
            key={item.id}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`p-4 rounded-md shadow-sm cursor-grab ${item.color} transition-all duration-200 ${draggedIndex === index ? "opacity-50" : ""}`}
          >
            <div className="flex items-center">
              <div className="mr-2 p-1 bg-white rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="8" y1="6" x2="16" y2="6"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                  <line x1="8" y1="18" x2="16" y2="18"></line>
                </svg>
              </div>
              <span>{item.content}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex space-x-2 mt-4">
        <Button onClick={saveOrder}>保存顺序</Button>
        <Button variant="outline" onClick={resetOrder}>
          重置顺序
        </Button>
      </div>

      {showCode && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md border overflow-auto">
          <pre className="text-xs">
            {`// HTML5拖放API实现
// 1. 添加draggable属性
<li
  draggable="true"
  onDragStart={(e) => handleDragStart(e, index)}
  onDragOver={handleDragOver}
  onDragEnter={handleDragEnter}
  onDragLeave={handleDragLeave}
  onDrop={(e) => handleDrop(e, index)}
  onDragEnd={handleDragEnd}
>
  {item.content}
</li>

// 2. 处理拖拽开始
const handleDragStart = (e, index) => {
  // 设置拖拽数据
  e.dataTransfer.setData('text/plain', index.toString());
  e.dataTransfer.effectAllowed = 'move';
  
  // 记录被拖拽的元素索引
  setDraggedIndex(index);
};

// 3. 处理拖拽结束和放置
const handleDrop = (e, dropIndex) => {
  e.preventDefault();
  
  // 获取拖拽的元素索引
  const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
  
  // 创建新的排序数组
  const newItems = [...items];
  const [removed] = newItems.splice(dragIndex, 1);
  newItems.splice(dropIndex, 0, removed);
  
  // 更新状态
  setItems(newItems);
  
  // 保存到localStorage
  localStorage.setItem('sortOrder', JSON.stringify(newItems));
};`}
          </pre>
        </div>
      )}
    </div>
  )
}
