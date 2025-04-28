"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, Play, Pause, RotateCcw, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CountdownTimer() {
  // 状态管理
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)
  const [totalSeconds, setTotalSeconds] = useState<number>(0)
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // 初始化音频
  useEffect(() => {
    audioRef.current = new Audio("/alarm.mp3")
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // 开始倒计时
  const startTimer = () => {
    if (remainingSeconds <= 0 && !isRunning) {
      // 如果没有设置时间或已经结束，则从输入框获取时间
      const newTotalSeconds = hours * 3600 + minutes * 60 + seconds
      if (newTotalSeconds <= 0) return

      setTotalSeconds(newTotalSeconds)
      setRemainingSeconds(newTotalSeconds)
      setIsCompleted(false)
    }

    setIsRunning(true)

    // 清除之前的定时器
    if (intervalRef.current) clearInterval(intervalRef.current)

    // 创建新的定时器
    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          // 倒计时结束
          clearInterval(intervalRef.current as NodeJS.Timeout)
          setIsRunning(false)
          setIsCompleted(true)
          // 触发结束事件
          triggerCompletionEvent()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // 暂停倒计时
  const pauseTimer = () => {
    setIsRunning(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  // 重置倒计时
  const resetTimer = () => {
    pauseTimer()
    setRemainingSeconds(0)
    setIsCompleted(false)
    setHours(0)
    setMinutes(0)
    setSeconds(0)
  }

  // 触发倒计时结束事件
  const triggerCompletionEvent = () => {
    // 播放声音
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((e) => console.log("播放音频失败:", e))
    }

    // 创建自定义事件
    const event = new CustomEvent("countdownComplete", {
      detail: { message: "倒计时结束!" },
    })
    document.dispatchEvent(event)

    // 显示浏览器通知（如果用户已授权）
    if (Notification && Notification.permission === "granted") {
      new Notification("倒计时结束!", {
        body: "您设置的倒计时已经结束",
        icon: "/favicon.ico",
      })
    } else if (Notification && Notification.permission !== "denied") {
      Notification.requestPermission()
    }
  }

  // 格式化时间显示
  const formatTime = (totalSecs: number) => {
    const hours = Math.floor(totalSecs / 3600)
    const minutes = Math.floor((totalSecs % 3600) / 60)
    const seconds = totalSecs % 60

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    }
  }

  // 监听自定义事件（用于演示目的）
  useEffect(() => {
    const handleCountdownComplete = (e: Event) => {
      console.log("倒计时完成事件被触发:", (e as CustomEvent).detail)
    }

    document.addEventListener("countdownComplete", handleCountdownComplete)

    return () => {
      document.removeEventListener("countdownComplete", handleCountdownComplete)
    }
  }, [])

  // 格式化显示时间
  const displayTime = formatTime(remainingSeconds)

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            JavaScript 倒计时器演示
          </CardTitle>
          <CardDescription>设置时间，开始倒计时，并在结束时触发事件</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 倒计时显示 */}
          <div
            className={cn(
              "text-5xl font-mono text-center py-8 rounded-lg transition-colors",
              isCompleted ? "bg-red-100 text-red-600 animate-pulse" : "bg-slate-100",
            )}
          >
            {displayTime.hours}:{displayTime.minutes}:{displayTime.seconds}
          </div>

          {/* 时间设置 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hours">小时</Label>
              <Input
                id="hours"
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={(e) => setHours(Number.parseInt(e.target.value) || 0)}
                disabled={isRunning}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minutes">分钟</Label>
              <Input
                id="minutes"
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(Number.parseInt(e.target.value) || 0)}
                disabled={isRunning}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seconds">秒钟</Label>
              <Input
                id="seconds"
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(Number.parseInt(e.target.value) || 0)}
                disabled={isRunning}
              />
            </div>
          </div>

          {/* 倒计时结束提示 */}
          {isCompleted && (
            <div className="flex items-center gap-2 p-3 bg-red-100 text-red-600 rounded-md">
              <Bell className="h-5 w-5" />
              <span>倒计时结束！事件已触发</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {!isRunning ? (
            <Button onClick={startTimer} className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              开始
            </Button>
          ) : (
            <Button onClick={pauseTimer} variant="outline" className="flex items-center gap-2">
              <Pause className="h-4 w-4" />
              暂停
            </Button>
          )}
          <Button onClick={resetTimer} variant="outline" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            重置
          </Button>
        </CardFooter>
      </Card>

      {/* 代码解释部分 */}
      <Card className="max-w-3xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>实现原理解析</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">1. 时间计算</h3>
            <p className="text-sm text-gray-500 mt-1">
              使用 JavaScript 将小时、分钟和秒转换为总秒数进行计算，然后在显示时再转换回易读格式。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">2. 定时器控制</h3>
            <p className="text-sm text-gray-500 mt-1">
              使用 <code>setInterval</code> 创建定时器，每秒更新一次剩余时间。使用 <code>useRef</code> 保存定时器引用，
              以便在组件卸载或重置时清除定时器，防止内存泄漏。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">3. 事件触发机制</h3>
            <p className="text-sm text-gray-500 mt-1">
              当倒计时结束时，通过 <code>CustomEvent</code> 创建并分发自定义事件，可以被其他组件或脚本监听和响应。
              同时使用浏览器通知 API 和音频提示增强用户体验。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">4. 用户交互</h3>
            <p className="text-sm text-gray-500 mt-1">
              提供开始、暂停和重置按钮，允许用户完全控制倒计时过程。使用状态管理确保界面与倒计时状态同步。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
