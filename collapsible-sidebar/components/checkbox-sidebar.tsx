"use client"

import { Home, Settings, Users, Menu, X, FileText, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function CheckboxSidebar() {
  const [checked, setChecked] = useState(false)

  const toggleSidebar = () => {
    setChecked(!checked)
  }

  return (
    <>
      <div
        className={`fixed left-0 top-0 z-10 h-full bg-gray-800 text-white transition-all duration-300 ${
          checked ? "w-60" : "w-[60px]"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <span className={`whitespace-nowrap font-semibold ${checked ? "opacity-100" : "opacity-0"}`}>控制面板</span>
          <button
            onClick={toggleSidebar}
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-700"
          >
            {checked ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2 px-2">
            <li>
              <Link href="#" className="flex items-center rounded-md px-2 py-2 hover:bg-gray-700">
                <Home size={20} />
                <span className={`ml-3 whitespace-nowrap transition-opacity ${checked ? "opacity-100" : "opacity-0"}`}>
                  首页
                </span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center rounded-md px-2 py-2 hover:bg-gray-700">
                <Users size={20} />
                <span className={`ml-3 whitespace-nowrap transition-opacity ${checked ? "opacity-100" : "opacity-0"}`}>
                  用户管理
                </span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center rounded-md px-2 py-2 hover:bg-gray-700">
                <FileText size={20} />
                <span className={`ml-3 whitespace-nowrap transition-opacity ${checked ? "opacity-100" : "opacity-0"}`}>
                  文档
                </span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center rounded-md px-2 py-2 hover:bg-gray-700">
                <HelpCircle size={20} />
                <span className={`ml-3 whitespace-nowrap transition-opacity ${checked ? "opacity-100" : "opacity-0"}`}>
                  帮助
                </span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center rounded-md px-2 py-2 hover:bg-gray-700">
                <Settings size={20} />
                <span className={`ml-3 whitespace-nowrap transition-opacity ${checked ? "opacity-100" : "opacity-0"}`}>
                  设置
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="fixed bottom-4 right-4 z-20 rounded-lg bg-white p-4 shadow-lg">
        <h4 className="mb-2 font-medium">Checkbox 技巧说明</h4>
        <p className="text-sm text-gray-600">
          在实际应用中，我们会使用隐藏的 checkbox 和 label 元素来实现纯 CSS 的点击切换功能。 为了简化演示，这里使用了
          React 状态来模拟 checkbox 的行为。
        </p>
        <pre className="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-xs">
          <code>{`<input type="checkbox" id="sidebar-toggle" className="hidden" />
<label htmlFor="sidebar-toggle" className="cursor-pointer">
  <Menu size={20} />
</label>

/* CSS */
#sidebar-toggle:checked ~ .sidebar {
  width: 240px;
}`}</code>
        </pre>
      </div>
    </>
  )
}
