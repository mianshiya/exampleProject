"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Download } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DomToImageDemo() {
  const [captureTarget, setCaptureTarget] = useState("demo-content")
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [format, setFormat] = useState("png")
  const [error, setError] = useState<string | null>(null)
  const [domToImageLoaded, setDomToImageLoaded] = useState(false)

  const demoContentRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Load dom-to-image on client side
  useEffect(() => {
    const loadDomToImage = async () => {
      try {
        await import("dom-to-image")
        setDomToImageLoaded(true)
      } catch (err) {
        console.error("Failed to load dom-to-image:", err)
        setError("Failed to load dom-to-image library")
      }
    }

    loadDomToImage()
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
        // For entire page, we'll use a different approach since dom-to-image
        // works better with specific elements
        targetElement = document.documentElement
      }

      // Import dom-to-image directly when needed
      const domtoimage = (await import("dom-to-image")).default

      let imageUrl

      try {
        if (format === "png") {
          imageUrl = await domtoimage.toPng(targetElement, {
            quality: 1,
            scale: window.devicePixelRatio,
            bgcolor: "#ffffff",
          })
        } else if (format === "jpeg") {
          imageUrl = await domtoimage.toJpeg(targetElement, {
            quality: 0.95,
            scale: window.devicePixelRatio,
            bgcolor: "#ffffff",
          })
        } else if (format === "svg") {
          imageUrl = await domtoimage.toSvg(targetElement, {
            scale: window.devicePixelRatio,
            bgcolor: "#ffffff",
          })
        }

        if (!imageUrl) {
          throw new Error("Failed to generate image URL")
        }

        setScreenshotUrl(imageUrl)
      } catch (err) {
        console.error("Error in DOM-to-Image processing:", err)
        throw new Error("Failed to process image with DOM-to-Image")
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
    link.download = `screenshot-${new Date().getTime()}.${format}`
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
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">输出格式</label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger>
              <SelectValue placeholder="选择输出格式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="jpeg">JPEG</SelectItem>
              <SelectItem value="svg">SVG</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button onClick={captureElement} disabled={isCapturing || !domToImageLoaded} className="w-full md:w-auto">
            <Camera className="mr-2 h-4 w-4" />
            {isCapturing ? "截图中..." : "截取屏幕"}
          </Button>
        </div>
      </div>

      <div ref={cardRef} className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">演示内容</h3>
        <div ref={demoContentRef} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">交互元素</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="option1" className="rounded" />
                  <label htmlFor="option1">选项 1</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="option2" className="rounded" defaultChecked />
                  <label htmlFor="option2">选项 2</label>
                </div>
                <div className="mt-2">
                  <input type="range" min="0" max="100" defaultValue="50" className="w-full" />
                </div>
              </div>
            </div>
            <div className="bg-pink-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">卡片示例</h4>
              <div className="border rounded-md p-3 bg-white shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-500"></div>
                  <div>
                    <div className="font-medium">用户名称</div>
                    <div className="text-xs text-gray-500">用户描述信息</div>
                  </div>
                </div>
                <div className="mt-3 text-sm">这是一个卡片内容示例，用于测试DOM-to-Image的渲染效果。</div>
              </div>
            </div>
          </div>
          <div className="bg-teal-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">复杂布局</h4>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="aspect-square rounded flex items-center justify-center bg-gradient-to-br from-teal-200 to-teal-400"
                >
                  项目 {item}
                </div>
              ))}
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
        <h3 className="font-medium mb-2">DOM-to-Image 代码示例</h3>
        <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
          {`import domtoimage from 'dom-to-image';

const captureElement = (element) => {
  domtoimage.toPng(element, {
    quality: 1,
    scale: window.devicePixelRatio,
    bgcolor: '#ffffff'
  })
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.download = 'screenshot.png';
      link.href = dataUrl;
      link.click();
    })
    .catch((error) => {
      console.error('截图失败:', error);
      alert('截图失败: ' + error.message);
    });
};

// 使用示例
const button = document.getElementById('capture-btn');
button.addEventListener('click', () => {
  const target = document.getElementById('capture-area');
  captureElement(target);
});`}
        </pre>
      </div>
    </div>
  )
}
