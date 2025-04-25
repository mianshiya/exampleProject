"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Download } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Html2CanvasDemo() {
  const [captureTarget, setCaptureTarget] = useState("demo-content")
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [html2canvasLoaded, setHtml2canvasLoaded] = useState(false)

  const demoContentRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Load html2canvas on client side
  useEffect(() => {
    const loadHtml2Canvas = async () => {
      try {
        // We'll use a regular import here instead of dynamic import
        await import("html2canvas")
        setHtml2canvasLoaded(true)
      } catch (err) {
        console.error("Failed to load html2canvas:", err)
        setError("Failed to load html2canvas library")
      }
    }

    loadHtml2Canvas()
  }, [])

  const captureElement = async () => {
    setIsCapturing(true)
    setError(null)

    try {
      let targetElement

      if (captureTarget === "demo-content" && demoContentRef.current) {
        targetElement = demoContentRef.current
      } else if (captureTarget === "card" && cardRef.current) {
        targetElement = cardRef.current
      } else {
        targetElement = document.documentElement // Entire page
      }

      // Import html2canvas directly when needed
      const html2canvas = (await import("html2canvas")).default

      // Use html2canvas with proper error handling
      const canvas = await html2canvas(targetElement, {
        logging: false,
        useCORS: true,
        scale: window.devicePixelRatio,
        allowTaint: true, // Allow cross-origin images
        backgroundColor: null, // Transparent background
      })

      // Verify canvas is valid
      if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
        throw new Error("Invalid canvas returned from html2canvas")
      }

      // Get data URL from canvas
      try {
        const imageUrl = canvas.toDataURL("image/png")
        setScreenshotUrl(imageUrl)
      } catch (dataUrlError) {
        console.error("Error converting canvas to data URL:", dataUrlError)
        throw new Error("Failed to convert canvas to image")
      }
    } catch (error) {
      console.error("截图失败:", error)
      setError(error instanceof Error ? error.message : "Unknown error occurred")
    } finally {
      setIsCapturing(false)
    }
  }

  const downloadScreenshot = () => {
    if (!screenshotUrl) return

    const link = document.createElement("a")
    link.download = `screenshot-${new Date().getTime()}.png`
    link.href = screenshotUrl
    link.click()
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">选择截图区域</label>
          <Select value={captureTarget} onValueChange={setCaptureTarget}>
            <SelectTrigger>
              <SelectValue placeholder="选择截图区域" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="demo-content">演示内容区域</SelectItem>
              <SelectItem value="card">卡片组件</SelectItem>
              <SelectItem value="entire-page">整个页面</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button onClick={captureElement} disabled={isCapturing || !html2canvasLoaded} className="w-full md:w-auto">
            <Camera className="mr-2 h-4 w-4" />
            {isCapturing ? "截图中..." : "截取屏幕"}
          </Button>
        </div>
      </div>

      <div ref={cardRef} className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">演示内容</h3>
        <div ref={demoContentRef} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">图表示例</h4>
              <div className="h-40 bg-gradient-to-r from-blue-200 to-blue-400 rounded flex items-center justify-center">
                图表区域
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">数据表格</h4>
              <div className="border rounded overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">名称</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">数值</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-3 py-2 text-sm">项目 A</td>
                      <td className="px-3 py-2 text-sm">42</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-sm">项目 B</td>
                      <td className="px-3 py-2 text-sm">78</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-sm">项目 C</td>
                      <td className="px-3 py-2 text-sm">15</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">图片示例</h4>
            <div className="flex justify-center">
              <img
                src="/placeholder.svg?height=150&width=300"
                alt="示例图片"
                className="h-[150px] w-[300px] object-cover rounded"
                crossOrigin="anonymous"
              />
            </div>
          </div>
        </div>
      </div>

      {screenshotUrl && (
        <div className="mt-6 space-y-4">
          <Separator />
          <h3 className="text-lg font-medium">截图预览</h3>
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-end mb-2">
              <Button variant="outline" size="sm" onClick={downloadScreenshot}>
                <Download className="mr-2 h-4 w-4" />
                下载截图
              </Button>
            </div>
            <div className="overflow-auto max-h-[400px] border rounded bg-white">
              <img src={screenshotUrl || "/placeholder.svg"} alt="截图预览" className="max-w-full h-auto" />
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 bg-gray-50 rounded-lg p-4 text-sm">
        <h3 className="font-medium mb-2">html2canvas 代码示例</h3>
        <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
          {`import html2canvas from 'html2canvas';

// 截取指定元素
const captureElement = async (element) => {
  try {
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: window.devicePixelRatio,
      allowTaint: true,
      backgroundColor: null
    });
    
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Invalid canvas object');
    }
    
    const image = canvas.toDataURL('image/png');
    return image;
  } catch (error) {
    console.error('截图失败:', error);
    throw error;
  }
};

// 使用示例
const button = document.getElementById('capture-btn');
button.addEventListener('click', async () => {
  try {
    const target = document.getElementById('capture-area');
    const imgData = await captureElement(target);
    
    // 创建下载链接
    const link = document.createElement('a');
    link.download = 'screenshot.png';
    link.href = imgData;
    link.click();
  } catch (error) {
    alert('截图失败: ' + error.message);
  }
});`}
        </pre>
      </div>
    </div>
  )
}
