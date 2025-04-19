import TaskDemo from "@/components/task-demo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Clock, Cpu } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-6 text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            浏览器中执行<span className="text-blue-600 dark:text-blue-400">100万个任务</span>而不卡顿
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            探索不同的任务分批处理技术，保持页面流畅响应的交互式演示
          </p>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">为什么浏览器会卡顿？</CardTitle>
            <CardDescription>了解浏览器主线程工作原理和任务执行机制</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-medium flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-blue-500" />
                  浏览器主线程
                </h3>
                <p className="text-muted-foreground">
                  浏览器的JavaScript执行和页面渲染都在主线程上进行。当一次性执行大量任务时，会长时间占用主线程，导致页面无法响应用户操作、动画停止、输入延迟等问题。
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-medium flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  渲染帧
                </h3>
                <p className="text-muted-foreground">
                  浏览器尝试以每秒60帧的速度渲染页面（约16.7毫秒/帧）。如果JavaScript执行时间超过这个时间，就会导致丢帧，用户会感知到卡顿。分批处理的核心是"让出主线程"，让浏览器有机会处理其他任务。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-bold mb-8">解决方案演示</h2>

        <Tabs defaultValue="raf" className="mb-12">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="raf">requestAnimationFrame</TabsTrigger>
            <TabsTrigger value="timeout">setTimeout</TabsTrigger>
            <TabsTrigger value="channel">MessageChannel</TabsTrigger>
            <TabsTrigger value="idle">requestIdleCallback</TabsTrigger>
          </TabsList>
          <TabsContent value="raf">
            <TaskDemo
              method="requestAnimationFrame"
              description="适合和页面渲染相关的任务，每一帧处理一部分任务。与浏览器的渲染周期同步，通常每秒60次。"
              color="blue"
            />
          </TabsContent>
          <TabsContent value="timeout">
            <TaskDemo
              method="setTimeout"
              description="通过定时器分批处理任务，间隔执行，避免长时间占用主线程。兼容性好，但精度较低。"
              color="green"
            />
          </TabsContent>
          <TabsContent value="channel">
            <TaskDemo
              method="MessageChannel"
              description="利用微任务队列，分批调度任务，性能优于setTimeout。属于微任务队列，优先级较高。"
              color="purple"
            />
          </TabsContent>
          <TabsContent value="idle">
            <TaskDemo
              method="requestIdleCallback"
              description="浏览器空闲时才执行任务，适合低优先级任务。注意兼容性问题，部分浏览器不支持。"
              color="orange"
            />
          </TabsContent>
        </Tabs>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">不同方案的适用场景</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-medium">requestAnimationFrame</h3>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>适合动画、渲染相关任务</li>
                  <li>每帧执行，与页面刷新同步</li>
                  <li>适合需要视觉平滑过渡的场景</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">setTimeout / setInterval</h3>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>适合通用分批任务</li>
                  <li>兼容性好，但精度较低</li>
                  <li>适合不需要精确时间控制的场景</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">MessageChannel</h3>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>适合需要更高精度的分批任务</li>
                  <li>属于微任务队列，性能优于setTimeout</li>
                  <li>适合需要更精确控制的场景</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">requestIdleCallback</h3>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>适合低优先级、可延迟的任务</li>
                  <li>只有浏览器空闲时才执行</li>
                  <li>适合后台处理、预加载等非关键任务</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">分批处理的核心原理</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mt-1">
                  <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium">拆分任务</h3>
                  <p className="text-muted-foreground">将大量任务拆分成小批次，每批只包含有限数量的任务</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mt-1">
                  <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium">每次处理一部分</h3>
                  <p className="text-muted-foreground">每次只执行一小部分任务，避免长时间占用主线程</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mt-1">
                  <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium">让出主线程</h3>
                  <p className="text-muted-foreground">处理完一批后，让出主线程，给浏览器处理其他任务的机会</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mt-1">
                  <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium">循环直到完成</h3>
                  <p className="text-muted-foreground">通过循环机制，继续处理下一批任务，直到所有任务完成</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
