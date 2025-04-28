"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Code } from "lucide-react"
import Sortable from "sortablejs"

const STORAGE_KEY = "sortableJsOrder"
const DEFAULT_ITEMS = [
  { id: 1, content: "项目 1", color: "bg-blue-100" },
  { id: 2, content: "项目 2", color: "bg-green-100" },
  { id: 3, content: "项目 3", color: "bg-yellow-100" },
  { id: 4, content: "项目 4", color: "bg-purple-100" },
  { id: 5, content: "项目 5", color: "bg-pink-100" },
]

export default function SortableJsDragDrop() {
  const [items, setItems] = useState(DEFAULT_ITEMS)
  const [showCode, setShowCode] = useState(false)
  const sortableRef = useRef<HTMLUListElement>(null)
  const sortableInstance = useRef<Sortable | null>(null)

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

  // 初始化Sortable
  useEffect(() => {
    if (sortableRef.current) {
      sortableInstance.current = Sortable.create(sortableRef.current, {
        animation: 150,
        ghostClass: "bg-gray-100",
        chosenClass: "opacity-50",
        dragClass: "shadow-lg",
        handle: ".handle",
        onEnd: (evt) => {
          // 更新状态
          const newItems = [...items]
          const [removed] = newItems.splice(evt.oldIndex!, 1)
          newItems.splice(evt.newIndex!, 0, removed)
          setItems(newItems)
        },
      })
    }

    return () => {
      if (sortableInstance.current) {
        sortableInstance.current.destroy()
      }
    }
  }, [items])

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
          <h3 className="text-lg font-medium">SortableJS库实现</h3>
          <p className="text-sm text-gray-500">使用SortableJS库实现拖拽排序</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowCode(!showCode)}>
          <Code className="h-4 w-4 mr-2" />
          {showCode ? "隐藏代码" : "查看代码"}
        </Button>
      </div>

      <ul ref={sortableRef} className="space-y-2 max-h-[400px] overflow-y-auto p-1">
        {items.map((item) => (
          <li key={item.id} className={`p-4 rounded-md shadow-sm ${item.color} transition-all duration-200`}>
            <div className="flex items-center">
              <div className="mr-2 p-1 bg-white rounded handle cursor-grab">
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
            {`// SortableJS库实现
// 1. 引入SortableJS
import Sortable from 'sortablejs';

// 2. 初始化Sortable
useEffect(() => {
  if (listRef.current) {
    sortableInstance.current = Sortable.create(listRef.current, {
      animation: 150,
      ghostClass: 'bg-gray-100',
      chosenClass: 'opacity-50',
      handle: '.handle',
      onEnd: (evt) => {
        // 更新状态
        const newItems = [...items];
        const [removed] = newItems.splice(evt.oldIndex, 1);
        newItems.splice(evt.newIndex, 0, removed);
        setItems(newItems);
        
        // 保存到localStorage
        localStorage.setItem('sortOrder', JSON.stringify(newItems));
      },
    });
  }

  return () => {
    if (sortableInstance.current) {
      sortableInstance.current.destroy();
    }
  };
}, [items]);`}
          </pre>
        </div>
      )}
    </div>
  )
}
