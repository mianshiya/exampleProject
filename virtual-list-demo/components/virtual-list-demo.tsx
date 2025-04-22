"use client"

import { useState, useEffect } from "react"
import BasicVirtualList from "./basic-virtual-list"
import ReactWindowList from "./react-window-list"
import PerformanceMonitor from "./performance-monitor"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// 生成测试数据
const generateData = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    name: `项目 ${index}`,
    description: `这是第 ${index} 条数据的详细描述`,
    value: Math.floor(Math.random() * 1000),
  }))
}

export default function VirtualListDemo() {
  const [itemCount, setItemCount] = useState(100000)
  const [data, setData] = useState<any[]>([])
  const [fps, setFps] = useState(0)
  const [implementation, setImplementation] = useState("react-window")

  useEffect(() => {
    setData(generateData(itemCount))
  }, [itemCount])

  const handleCountChange = (value: number[]) => {
    setItemCount(value[0])
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>虚拟列表参数控制</CardTitle>
          <CardDescription>调整参数以查看不同条件下的性能表现</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span>数据条数: {itemCount.toLocaleString()}</span>
              </div>
              <Slider defaultValue={[100000]} max={1000000} min={1000} step={1000} onValueChange={handleCountChange} />
            </div>

            <Tabs defaultValue="react-window" onValueChange={setImplementation}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">基础实现</TabsTrigger>
                <TabsTrigger value="react-window">react-window</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <PerformanceMonitor setFps={setFps} />

      <Card>
        <CardHeader>
          <CardTitle>{implementation === "basic" ? "基础虚拟列表实现" : "使用 react-window 的虚拟列表"}</CardTitle>
          <CardDescription>
            当前FPS: {fps.toFixed(1)} - 数据条数: {itemCount.toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[600px] border rounded-md">
            {implementation === "basic" ? <BasicVirtualList data={data} /> : <ReactWindowList data={data} />}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>虚拟列表原理说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>虚拟列表（Virtual List）是解决大数据渲染问题的有效方案。其核心原理是：</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>只渲染可视区域内的数据（通常只有几十条）</li>
              <li>监听滚动事件，动态计算应该显示哪些数据</li>
              <li>通过CSS定位技术，确保数据显示在正确的位置</li>
              <li>使用占位元素保持滚动条的正确比例</li>
            </ul>

            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">两种实现方式的对比：</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">基础实现</h4>
                  <p>自行实现的虚拟列表，展示了核心原理，但可能在边界情况处理上不够完善。</p>
                </div>
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">react-window</h4>
                  <p>专业的虚拟列表库，经过优化，处理了各种边界情况，适合生产环境使用。</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
