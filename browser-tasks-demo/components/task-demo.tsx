"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw } from "lucide-react"

// 定义颜色映射
const colorMap = {
  blue: "bg-blue-500 hover:bg-blue-600",
  green: "bg-green-500 hover:bg-green-600",
  purple: "bg-purple-500 hover:bg-purple-600",
  orange: "bg-orange-500 hover:bg-orange-600",
}

// 定义进度条颜色映射
const progressColorMap = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
}

interface TaskDemoProps {
  method: "requestAnimationFrame" | "setTimeout" | "MessageChannel" | "requestIdleCallback"
  description: string
  color: "blue" | "green" | "purple" | "orange"
}

export default function TaskDemo({ method, description, color }: TaskDemoProps) {
  const [taskCount, setTaskCount] = useState(1000000)
  const [batchSize, setBatchSize] = useState(1000)
  const [progress, setProgress] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [fps, setFps] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [completedTasks, setCompletedTasks] = useState(0)

  const animationRef = useRef<number | null>(null)
  const taskRef = useRef<number>(0)
  const fpsRef = useRef<number[]>([])
  const lastFrameTimeRef = useRef<number>(0)
  const frameCountRef = useRef<number>(0)
  const messageChannelRef = useRef<MessageChannel | null>(null)
  const idleCallbackIdRef = useRef<number | null>(null)
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)

  // 模拟任务执行
  const simulateTask = () => {
    // 模拟一个简单的计算任务
    let result = 0
    for (let i = 0; i < 1000; i++) {
      result += Math.sqrt(i)
    }
    return result
  }

  // 使用requestAnimationFrame执行任务
  const runWithRAF = () => {
    const processBatch = (timestamp: number) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = timestamp
      }

      // 计算FPS
      frameCountRef.current++
      if (timestamp - lastFrameTimeRef.current >= 1000) {
        const currentFps = Math.round((frameCountRef.current * 1000) / (timestamp - lastFrameTimeRef.current))
        setFps(currentFps)
        fpsRef.current.push(currentFps)
        frameCountRef.current = 0
        lastFrameTimeRef.current = timestamp
      }

      if (isPaused) {
        animationRef.current = requestAnimationFrame(processBatch)
        return
      }

      const endIndex = Math.min(taskRef.current + batchSize, taskCount)
      for (let i = taskRef.current; i < endIndex; i++) {
        simulateTask()
      }

      taskRef.current = endIndex
      const newProgress = Math.floor((taskRef.current / taskCount) * 100)
      setProgress(newProgress)
      setCompletedTasks(taskRef.current)

      if (taskRef.current < taskCount) {
        animationRef.current = requestAnimationFrame(processBatch)
      } else {
        setIsRunning(false)
        setElapsedTime(Date.now() - startTime)
      }
    }

    animationRef.current = requestAnimationFrame(processBatch)
  }

  // 使用setTimeout执行任务
  const runWithTimeout = () => {
    const processBatch = () => {
      if (isPaused) {
        timeoutIdRef.current = setTimeout(processBatch, 0)
        return
      }

      const now = performance.now()
      if (now - lastFrameTimeRef.current >= 1000) {
        const currentFps = Math.round((frameCountRef.current * 1000) / (now - lastFrameTimeRef.current))
        setFps(currentFps)
        fpsRef.current.push(currentFps)
        frameCountRef.current = 0
        lastFrameTimeRef.current = now
      }

      const endIndex = Math.min(taskRef.current + batchSize, taskCount)
      for (let i = taskRef.current; i < endIndex; i++) {
        simulateTask()
      }

      taskRef.current = endIndex
      const newProgress = Math.floor((taskRef.current / taskCount) * 100)
      setProgress(newProgress)
      setCompletedTasks(taskRef.current)
      frameCountRef.current++

      if (taskRef.current < taskCount) {
        timeoutIdRef.current = setTimeout(processBatch, 0)
      } else {
        setIsRunning(false)
        setElapsedTime(Date.now() - startTime)
      }
    }

    timeoutIdRef.current = setTimeout(processBatch, 0)
  }

  // 使用MessageChannel执行任务
  const runWithMessageChannel = () => {
    if (!messageChannelRef.current) {
      messageChannelRef.current = new MessageChannel()
    }

    messageChannelRef.current.port1.onmessage = () => {
      if (isPaused) {
        messageChannelRef.current?.port2.postMessage(null)
        return
      }

      const now = performance.now()
      if (now - lastFrameTimeRef.current >= 1000) {
        const currentFps = Math.round((frameCountRef.current * 1000) / (now - lastFrameTimeRef.current))
        setFps(currentFps)
        fpsRef.current.push(currentFps)
        frameCountRef.current = 0
        lastFrameTimeRef.current = now
      }

      const endIndex = Math.min(taskRef.current + batchSize, taskCount)
      for (let i = taskRef.current; i < endIndex; i++) {
        simulateTask()
      }

      taskRef.current = endIndex
      const newProgress = Math.floor((taskRef.current / taskCount) * 100)
      setProgress(newProgress)
      setCompletedTasks(taskRef.current)
      frameCountRef.current++

      if (taskRef.current < taskCount) {
        messageChannelRef.current?.port2.postMessage(null)
      } else {
        setIsRunning(false)
        setElapsedTime(Date.now() - startTime)
      }
    }

    messageChannelRef.current.port2.postMessage(null)
  }

  // 使用requestIdleCallback执行任务
  const runWithIdleCallback = () => {
    const processBatch = (deadline: IdleDeadline) => {
      const now = performance.now()
      if (now - lastFrameTimeRef.current >= 1000) {
        const currentFps = Math.round((frameCountRef.current * 1000) / (now - lastFrameTimeRef.current))
        setFps(currentFps)
        fpsRef.current.push(currentFps)
        frameCountRef.current = 0
        lastFrameTimeRef.current = now
      }

      if (isPaused) {
        idleCallbackIdRef.current = requestIdleCallback(processBatch)
        return
      }

      let i = 0
      // 在浏览器空闲时间内尽可能多地处理任务
      while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && i < batchSize && taskRef.current < taskCount) {
        simulateTask()
        taskRef.current++
        i++
      }

      const newProgress = Math.floor((taskRef.current / taskCount) * 100)
      setProgress(newProgress)
      setCompletedTasks(taskRef.current)
      frameCountRef.current++

      if (taskRef.current < taskCount) {
        idleCallbackIdRef.current = requestIdleCallback(processBatch, { timeout: 50 })
      } else {
        setIsRunning(false)
        setElapsedTime(Date.now() - startTime)
      }
    }

    idleCallbackIdRef.current = requestIdleCallback(processBatch, { timeout: 50 })
  }

  // 启动任务处理
  const startProcessing = () => {
    if (isRunning) return

    setIsRunning(true)
    setIsPaused(false)
    setProgress(0)
    setCompletedTasks(0)
    setStartTime(Date.now())
    setElapsedTime(0)
    setFps(0)
    fpsRef.current = []
    taskRef.current = 0
    lastFrameTimeRef.current = 0
    frameCountRef.current = 0

    switch (method) {
      case "requestAnimationFrame":
        runWithRAF()
        break
      case "setTimeout":
        runWithTimeout()
        break
      case "MessageChannel":
        runWithMessageChannel()
        break
      case "requestIdleCallback":
        if (typeof window.requestIdleCallback === "undefined") {
          alert("您的浏览器不支持requestIdleCallback，将使用setTimeout模拟")
          runWithTimeout()
        } else {
          runWithIdleCallback()
        }
        break
    }
  }

  // 暂停/继续任务处理
  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  // 重置任务处理
  const resetProcessing = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }
    if (idleCallbackIdRef.current && typeof window.cancelIdleCallback !== "undefined") {
      cancelIdleCallback(idleCallbackIdRef.current)
    }

    setIsRunning(false)
    setIsPaused(false)
    setProgress(0)
    setCompletedTasks(0)
    setElapsedTime(0)
    setFps(0)
    fpsRef.current = []
    taskRef.current = 0
  }

  // 清理函数
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }
      if (idleCallbackIdRef.current && typeof window.cancelIdleCallback !== "undefined") {
        cancelIdleCallback(idleCallbackIdRef.current)
      }
    }
  }, [])

  // 计算平均FPS
  const averageFps =
    fpsRef.current.length > 0
      ? Math.round(fpsRef.current.reduce((sum, fps) => sum + fps, 0) / fpsRef.current.length)
      : 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{method}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
          <Badge variant="outline" className={`${progressColorMap[color]} text-white px-3 py-1`}>
            {isRunning ? "运行中" : "就绪"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">进度: {progress}%</span>
            <span className="text-sm text-muted-foreground">
              {completedTasks.toLocaleString()} / {taskCount.toLocaleString()}
            </span>
          </div>
          <Progress value={progress} className="h-2" indicatorClassName={progressColorMap[color]} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`task-count-${method}`}>任务数量</Label>
            <div className="flex items-center space-x-2">
              <Input
                id={`task-count-${method}`}
                type="number"
                value={taskCount}
                onChange={(e) => setTaskCount(Number.parseInt(e.target.value) || 1000)}
                disabled={isRunning}
                min={1000}
                max={10000000}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`batch-size-${method}`}>批处理大小</Label>
            <div className="flex items-center space-x-2">
              <Input
                id={`batch-size-${method}`}
                type="number"
                value={batchSize}
                onChange={(e) => setBatchSize(Number.parseInt(e.target.value) || 100)}
                disabled={isRunning}
                min={10}
                max={10000}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">当前FPS</div>
            <div className="text-2xl font-bold">{fps}</div>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">平均FPS</div>
            <div className="text-2xl font-bold">{averageFps}</div>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">已用时间</div>
            <div className="text-2xl font-bold">
              {isRunning ? ((Date.now() - startTime) / 1000).toFixed(1) : (elapsedTime / 1000).toFixed(1)} 秒
            </div>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">每秒任务数</div>
            <div className="text-2xl font-bold">
              {isRunning && Date.now() - startTime > 0
                ? Math.round(completedTasks / ((Date.now() - startTime) / 1000)).toLocaleString()
                : elapsedTime > 0
                  ? Math.round(taskCount / (elapsedTime / 1000)).toLocaleString()
                  : "0"}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`input-test-${method}`}>测试输入响应</Label>
          <Input
            id={`input-test-${method}`}
            placeholder="在这里输入文字测试页面响应性..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">在任务执行过程中尝试在此输入框中输入文字，测试页面响应性</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button onClick={startProcessing} disabled={isRunning} className={colorMap[color]}>
            <Play className="mr-2 h-4 w-4" />
            开始
          </Button>

          <Button onClick={togglePause} disabled={!isRunning} variant="outline">
            {isPaused ? (
              <>
                <Play className="mr-2 h-4 w-4" />
                继续
              </>
            ) : (
              <>
                <Pause className="mr-2 h-4 w-4" />
                暂停
              </>
            )}
          </Button>
        </div>

        <Button onClick={resetProcessing} variant="outline" disabled={!isRunning && progress === 0}>
          <RotateCcw className="mr-2 h-4 w-4" />
          重置
        </Button>
      </CardFooter>
    </Card>
  )
}
