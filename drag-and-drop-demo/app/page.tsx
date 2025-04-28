"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NativeDragDrop from "@/components/native-drag-drop"
import Html5DragDrop from "@/components/html5-drag-drop"
import SortableJsDragDrop from "@/components/sortablejs-drag-drop"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [activeTab, setActiveTab] = useState("native")

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">JavaScript 拖拽排序列表演示</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            本演示展示了三种不同的方法来实现可拖拽排序的列表，并保持排序后的顺序。
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="native">原生JavaScript实现</TabsTrigger>
            <TabsTrigger value="html5">HTML5拖放API实现</TabsTrigger>
            <TabsTrigger value="sortablejs">SortableJS库实现</TabsTrigger>
          </TabsList>

          <TabsContent value="native">
            <Card>
              <CardHeader>
                <CardTitle>原生JavaScript实现</CardTitle>
                <CardDescription>
                  使用原生JavaScript监听鼠标事件（mousedown、mousemove、mouseup）来实现拖拽功能。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NativeDragDrop />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="html5">
            <Card>
              <CardHeader>
                <CardTitle>HTML5拖放API实现</CardTitle>
                <CardDescription>利用HTML5的拖放API（Drag and Drop API）实现拖拽排序。</CardDescription>
              </CardHeader>
              <CardContent>
                <Html5DragDrop />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sortablejs">
            <Card>
              <CardHeader>
                <CardTitle>SortableJS库实现</CardTitle>
                <CardDescription>使用成熟的拖拽排序库SortableJS实现简单高效的拖拽排序。</CardDescription>
              </CardHeader>
              <CardContent>
                <SortableJsDragDrop />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">实现要点</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium">原生JavaScript实现</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>监听列表项的mousedown事件，记录起始位置</li>
                <li>在document上监听mousemove事件，计算拖拽位置并移动元素</li>
                <li>监听mouseup事件，完成拖拽并更新DOM结构</li>
                <li>使用localStorage保存排序结果</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">HTML5拖放API实现</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>为列表项添加draggable="true"属性</li>
                <li>监听dragstart、dragover、drop等事件</li>
                <li>在drop事件中更新DOM结构</li>
                <li>保存排序结果</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">SortableJS库实现</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>引入SortableJS库</li>
                <li>初始化Sortable实例</li>
                <li>配置拖拽选项和回调函数</li>
                <li>保存排序结果</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
