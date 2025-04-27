"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsItem, TabsList } from "@/components/ui/tabs"

export default function ThemeDemo() {
  const { theme } = useTheme()

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-lg font-medium">当前主题: {theme === "dark" ? "深色" : "浅色"}</h3>
          <p className="mb-4 text-muted-foreground">点击右上角的主题切换按钮，观察下面组件的样式变化。</p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button variant="default">主要按钮</Button>
            <Button variant="secondary">次要按钮</Button>
            <Button variant="outline">轮廓按钮</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="destructive">危险按钮</Button>
            <Button variant="ghost">幽灵按钮</Button>
            <Button variant="link">链接按钮</Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>卡片组件</CardTitle>
            <CardDescription>这是一个卡片组件的示例，用于展示主题切换效果</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">用户名</Label>
                  <Input id="name" placeholder="输入您的用户名" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">取消</Button>
            <Button>提交</Button>
          </CardFooter>
        </Card>

        <div className="rounded-lg border p-4">
          <Tabs defaultValue="tab1">
            <TabsList className="mb-4">
              <TabsItem value="tab1">选项卡 1</TabsItem>
              <TabsItem value="tab2">选项卡 2</TabsItem>
            </TabsList>
            <TabsContent value="tab1">
              <p>这是选项卡 1 的内容。主题切换时，选项卡的样式也会随之变化。</p>
            </TabsContent>
            <TabsContent value="tab2">
              <p>这是选项卡 2 的内容。不同主题下，文本和背景颜色会有所不同。</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
