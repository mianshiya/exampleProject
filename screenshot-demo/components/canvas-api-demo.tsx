"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Download, RefreshCw } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

export default function CanvasApiDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lineWidth, setLineWidth] = useState([3])
  const [color, setColor] = useState("#000000")

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Fill with white background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw some initial content
    drawInitialContent(ctx, canvas.width, canvas.height)
  }, [])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      // Store the current image data
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      // Resize canvas
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      // Restore the image data
      ctx.putImageData(imageData, 0, 0)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Drawing functions
  const drawInitialContent = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw a simple scene

    // Sky
    const gradient = ctx.createLinearGradient(0, 0, 0, height * 0.7)
    gradient.addColorStop(0, "#87CEEB")
    gradient.addColorStop(1, "#E0F7FF")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height * 0.7)

    // Ground
    ctx.fillStyle = "#8FBC8F"
    ctx.fillRect(0, height * 0.7, width, height * 0.3)

    // Sun
    ctx.fillStyle = "#FFD700"
    ctx.beginPath()
    ctx.arc(width * 0.8, height * 0.2, 40, 0, Math.PI * 2)
    ctx.fill()

    // House
    ctx.fillStyle = "#CD853F"
    ctx.fillRect(width * 0.2, height * 0.4, width * 0.2, height * 0.3)

    // Roof
    ctx.fillStyle = "#8B4513"
    ctx.beginPath()
    ctx.moveTo(width * 0.15, height * 0.4)
    ctx.lineTo(width * 0.3, height * 0.25)
    ctx.lineTo(width * 0.45, height * 0.4)
    ctx.closePath()
    ctx.fill()

    // Window
    ctx.fillStyle = "#87CEFA"
    ctx.fillRect(width * 0.25, height * 0.45, width * 0.05, height * 0.05)
    ctx.fillRect(width * 0.32, height * 0.45, width * 0.05, height * 0.05)

    // Door
    ctx.fillStyle = "#8B4513"
    ctx.fillRect(width * 0.28, height * 0.55, width * 0.05, height * 0.15)

    // Tree
    ctx.fillStyle = "#8B4513"
    ctx.fillRect(width * 0.6, height * 0.5, width * 0.03, height * 0.2)

    ctx.fillStyle = "#006400"
    ctx.beginPath()
    ctx.arc(width * 0.615, height * 0.45, 30, 0, Math.PI * 2)
    ctx.fill()

    // Text
    ctx.fillStyle = "#000000"
    ctx.font = "16px Arial"
    ctx.fillText("Canvas 绘图示例", width * 0.1, height * 0.1)
    ctx.fillText("可以在下方进行绘制", width * 0.1, height * 0.15)
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.beginPath()

    let x, y
    if ("touches" in e) {
      // Touch event
      const rect = canvas.getBoundingClientRect()
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      // Mouse event
      x = e.nativeEvent.offsetX
      y = e.nativeEvent.offsetY
    }

    ctx.moveTo(x, y)
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth[0]
    ctx.lineCap = "round"
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let x, y
    if ("touches" in e) {
      // Touch event
      const rect = canvas.getBoundingClientRect()
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      // Mouse event
      x = e.nativeEvent.offsetX
      y = e.nativeEvent.offsetY
    }

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Redraw initial content
    drawInitialContent(ctx, canvas.width, canvas.height)

    // Clear screenshot
    setScreenshotUrl(null)
  }

  const captureCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const imageUrl = canvas.toDataURL("image/png")
    setScreenshotUrl(imageUrl)
  }

  const downloadScreenshot = () => {
    if (!screenshotUrl) return

    const link = document.createElement("a")
    link.download = `canvas-screenshot-${new Date().getTime()}.png`
    link.href = screenshotUrl
    link.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">画笔粗细</label>
          <Slider value={lineWidth} min={1} max={20} step={1} onValueChange={setLineWidth} />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">画笔颜色</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-9 w-9 rounded cursor-pointer"
            />
            <div className="h-9 w-9 rounded border" style={{ backgroundColor: color }}></div>
          </div>
        </div>
        <div className="flex items-end space-x-2">
          <Button variant="outline" onClick={clearCanvas}>
            <RefreshCw className="mr-2 h-4 w-4" />
            重置画布
          </Button>
          <Button onClick={captureCanvas}>
            <Camera className="mr-2 h-4 w-4" />
            截取画布
          </Button>
        </div>
      </div>

      <div className="border rounded-lg p-1 bg-white">
        <canvas
          ref={canvasRef}
          className="w-full h-[300px] rounded cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        ></canvas>
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
            <div className="overflow-auto max-h-[300px] border rounded bg-white">
              <img src={screenshotUrl || "/placeholder.svg"} alt="截图预览" className="max-w-full h-auto" />
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 bg-gray-50 rounded-lg p-4 text-sm">
        <h3 className="font-medium mb-2">Canvas API 代码示例</h3>
        <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
          {`// 获取 Canvas 元素
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 绘制内容
ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 100, 100);
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;
ctx.strokeRect(10, 10, 100, 100);

// 截取 Canvas 内容
const captureCanvas = () => {
  // 将 Canvas 转换为 data URL
  const imageUrl = canvas.toDataURL('image/png');
  
  // 创建下载链接
  const link = document.createElement('a');
  link.download = 'canvas-screenshot.png';
  link.href = imageUrl;
  link.click();
};`}
        </pre>
      </div>
    </div>
  )
}
