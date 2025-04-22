import VirtualListDemo from "@/components/virtual-list-demo"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">虚拟列表演示</h1>
        <p className="text-lg mb-8 max-w-3xl mx-auto text-center">
          本演示展示了如何在页面内一次性处理10万条数据，并通过虚拟列表技术保证页面不卡顿。
        </p>

        <VirtualListDemo />
      </div>
    </main>
  )
}
