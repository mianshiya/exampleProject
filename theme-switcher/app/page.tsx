import ThemeSwitcher from "@/components/theme-switcher"
import ThemeDemo from "@/components/theme-demo"
import FrameworkExample from "@/components/framework-example"
import DynamicStylesheetDemo from "@/components/dynamic-stylesheet-demo"
import { Tabs, TabsContent, TabsItem, TabsList } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">网站主题切换演示</h1>
          <ThemeSwitcher />
        </header>

        <main>
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">主题切换演示</h2>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <ThemeDemo />
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">实现方法</h2>
            <Tabs defaultValue="css-vars">
              <TabsList className="mb-4">
                <TabsItem value="css-vars">CSS 变量方法</TabsItem>
                <TabsItem value="frameworks">框架实现</TabsItem>
                <TabsItem value="dynamic-css">动态样式表</TabsItem>
              </TabsList>

              <TabsContent value="css-vars" className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-medium">使用 CSS 变量实现主题切换</h3>
                <p className="mb-4">CSS 变量（Custom Properties）是实现主题切换的主流方案，兼容性好、维护方便。</p>

                <div className="mb-4 rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    <code>{`:root {
  /* 浅色主题变量 */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
}

[data-theme="dark"] {
  /* 深色主题变量 */
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 47.4% 11.2%;
}`}</code>
                  </pre>
                </div>

                <p className="mb-4">JavaScript 切换主题代码：</p>
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    <code>{`// 切换主题函数
function toggleTheme() {
  // 获取当前主题
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  // 切换到新主题
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  // 设置主题属性
  document.documentElement.setAttribute('data-theme', newTheme);
  
  // 保存到 localStorage 以便持久化
  localStorage.setItem('theme', newTheme);
}`}</code>
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="frameworks" className="rounded-lg border bg-card p-6 shadow-sm">
                <FrameworkExample />
              </TabsContent>

              <TabsContent value="dynamic-css" className="rounded-lg border bg-card p-6 shadow-sm">
                <DynamicStylesheetDemo />
              </TabsContent>
            </Tabs>
          </section>
        </main>
      </div>
    </div>
  )
}
