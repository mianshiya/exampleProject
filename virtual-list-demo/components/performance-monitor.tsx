"use client"

import { useEffect, useRef } from "react"

interface PerformanceMonitorProps {
  setFps: (fps: number) => void
}

export default function PerformanceMonitor({ setFps }: PerformanceMonitorProps) {
  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(performance.now())
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const updateFPS = () => {
      const now = performance.now()
      frameCountRef.current += 1

      // 每秒更新一次FPS
      if (now - lastTimeRef.current >= 1000) {
        setFps(frameCountRef.current)
        frameCountRef.current = 0
        lastTimeRef.current = now
      }

      animationFrameRef.current = requestAnimationFrame(updateFPS)
    }

    animationFrameRef.current = requestAnimationFrame(updateFPS)

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [setFps])

  return null
}
