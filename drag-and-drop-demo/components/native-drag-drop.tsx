"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Code } from "lucide-react"

const STORAGE_KEY = "nativeDragDropOrder"
const DEFAULT_ITEMS = [
  { id: 1, content: "项目 1", color: "bg-blue-100" },
  { id: 2, content: "项目 2", color: "bg-green-100" },
  { id: 3, content: "项目 3", color: "bg-yellow-100" },
  { id: 4, content: "项目 4", color: "bg-purple-100" },
  { id: 5, content: "项目 5", color: "bg-pink-100" },
]

export default function NativeDragDrop() {
  const [items, setItems] = useState(DEFAULT_ITEMS)
  const [draggedItem, setDraggedItem] = useState<null | number>(null)
  const [showCode, setShowCode] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const dragItemRef = useRef<HTMLLIElement | null>(null)
  const dragOverItemRef = useRef<number | null>(null)
  const initialPosRef = useRef({ x: 0, y: 0 })
  const initialScrollRef = useRef(0)

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

  const handleDragStart = (e: React.MouseEvent, index: number) => {
    if (!listRef.current) return

    // 记录初始位置
    initialPosRef.current = { x: e.clientX, y: e.clientY }
    initialScrollRef.current = listRef.current.scrollTop

    // 创建拖拽元素的克隆
    const item = e.currentTarget as HTMLLIElement
    dragItemRef.current = item
    setDraggedItem(index)

    // 添加拖拽样式
    item.classList.add("opacity-50")

    // 添加事件监听
    document.addEventListener("mousemove", handleDragMove)
    document.addEventListener("mouseup", handleDragEnd)

    // 阻止默认行为和冒泡
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragMove = (e: MouseEvent) => {
    if (!dragItemRef.current || draggedItem === null || !listRef.current) return

    // 计算鼠标移动距离
    const mouseY = e.clientY

    // 找到当前鼠标位置下的元素
    const elements = Array.from(listRef.current.querySelectorAll("li"))
    if (!elements.length) return

    // 移除之前的所有视觉提示
    elements.forEach((el) => {
      el.classList.remove("border-t-2", "border-blue-500", "border-b-2")
    })

    // 找到最近的元素
    let targetIndex = -1

    for (let i = 0; i < elements.length; i++) {
      if (i === draggedItem) continue // 跳过被拖拽的元素

      const box = elements[i].getBoundingClientRect()
      const boxTop = box.top
      const boxBottom = box.bottom

      // 如果鼠标在元素上方
      if (mouseY < boxTop + box.height / 2) {
        elements[i].classList.add("border-t-2", "border-blue-500")
        targetIndex = i
        break
      }
      // 如果鼠标在元素下方且是最后一个元素
      else if (i === elements.length - 1 || (i === elements.length - 2 && draggedItem === elements.length - 1)) {
        elements[i].classList.add("border-b-2", "border-blue-500")
        targetIndex = i + 1
        break
      }
    }

    if (targetIndex !== -1) {
      dragOverItemRef.current = targetIndex
    }
  }

  const handleDragEnd = () => {
    if (draggedItem === null || dragOverItemRef.current === null) {
      resetDragState()
      return
    }

    // 创建新的排序数组
    const newItems = [...items]
    const itemToMove = newItems[draggedItem]

    // 移除拖拽的项目
    newItems.splice(draggedItem, 1)

    // 在新位置插入
    let targetIndex = dragOverItemRef.current
    // 如果目标位置在拖拽项之后，需要减1（因为已经移除了拖拽项）
    if (targetIndex > draggedItem) {
      targetIndex--
    }

    newItems.splice(targetIndex, 0, itemToMove)

    // 更新状态
    setItems(newItems)

    // 保存到localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems))

    // 重置拖拽状态
    resetDragState()
  }

  const resetDragState = () => {
    if (dragItemRef.current) {
      dragItemRef.current.classList.remove("opacity-50")
    }

    // 移除所有视觉提示
    const elements = listRef.current?.querySelectorAll("li")
    elements?.forEach((el) => {
      el.classList.remove("border-t-2", "border-blue-500")
    })

    // 重置引用
    dragItemRef.current = null
    dragOverItemRef.current = null
    setDraggedItem(null)

    // 移除事件监听
    document.removeEventListener("mousemove", handleDragMove)
    document.removeEventListener("mouseup", handleDragEnd)
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
          <h3 className="text-lg font-medium">可拖拽列表</h3>
          <p className="text-sm text-gray-500">按住列表项并拖动来重新排序</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowCode(!showCode)}>
          <Code className="h-4 w-4 mr-2" />
          {showCode ? "隐藏代码" : "查看代码"}
        </Button>
      </div>

      <ul ref={listRef} className="space-y-2 max-h-[400px] overflow-y-auto p-1 relative">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`p-4 rounded-md shadow-sm cursor-grab ${item.color} transition-all duration-200 ${
              draggedItem === index ? "opacity-50 shadow-lg" : ""
            }`}
            onMouseDown={(e) => handleDragStart(e, index)}
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
            {`// 原生JavaScript拖拽排序实现
const handleDragStart = (e, index) => {
  // 记录初始位置
  initialPos = { x: e.clientX, y: e.clientY };
  
  // 标记拖拽元素
  draggedItem = index;
  
  // 添加事件监听
  document.addEventListener('mousemove', handleDragMove);
  document.addEventListener('mouseup', handleDragEnd);
};

const handleDragMove = (e) => {
  if (draggedItem === null) return;
  
  // 计算鼠标位置
  const mouseY = e.clientY;
  
  // 找到最近的元素
  elements.forEach((element) => {
    const box = element.getBoundingClientRect();
    const boxCenter = box.top + box.height / 2;
    const distance = Math.abs(mouseY - boxCenter);
    
    if (distance < closestDistance) {
      closestDistance = distance;
      closestElement = element;
    }
  });
  
  // 更新视觉提示
};

const handleDragEnd = () => {
  // 创建新的排序数组
  const newItems = [...items];
  const itemToMove = newItems[draggedItem];
  
  // 移除拖拽的项目
  newItems.splice(draggedItem, 1);
  
  // 在新位置插入
  newItems.splice(targetIndex, 0, itemToMove);
  
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
