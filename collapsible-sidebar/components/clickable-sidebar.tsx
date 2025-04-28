"use client"

import { useState } from "react"
import { Home, Settings, Users, Menu, X, FileText, HelpCircle } from "lucide-react"
import Link from "next/link"

export function ClickableSidebar() {
  const [expanded, setExpanded] = useState(false)

  const toggleSidebar = () => {
    setExpanded(!expanded)
  }

  return (
    <div
      className={`fixed left-0 top-0 z-10 h-full bg-gray-800 text-white transition-all duration-300 ${
        expanded ? "w-60" : "w-[60px]"
      }`}
    >
      <div className="relative flex h-16 items-center px-4">
        <span className={`whitespace-nowrap font-semibold ${expanded ? "opacity-100" : "opacity-0"}`}>控制面板</span>
        <button
          onClick={toggleSidebar}
          className="absolute right-4 flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-700"
        >
          {expanded ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2 px-2">
          <li>
            <Link href="#" className="flex items-center rounded-md px-2 py-2 hover:bg-gray-700">
              <Home size={20} />
              <span className={`ml-3 whitespace-nowrap transition-opacity ${expanded ? "opacity-100" : "opacity-0"}`}>
                首页
              </span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center rounded-md px-2 py-2 hover:bg-gray-700">
              <Users size={20} />
              <span className={`ml-3 whitespace-nowrap transition-opacity ${expanded ? "opacity-100" : "opacity-0"}`}>
                用户管理
              </span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center rounded-md px-2 py-2 hover:bg-gray-700">
              <FileText size={20} />
              <span className={`ml-3 whitespace-nowrap transition-opacity ${expanded ? "opacity-100" : "opacity-0"}`}>
                文档
              </span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center rounded-md px-2 py-2 hover:bg-gray-700">
              <HelpCircle size={20} />
              <span className={`ml-3 whitespace-nowrap transition-opacity ${expanded ? "opacity-100" : "opacity-0"}`}>
                帮助
              </span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center rounded-md px-2 py-2 hover:bg-gray-700">
              <Settings size={20} />
              <span className={`ml-3 whitespace-nowrap transition-opacity ${expanded ? "opacity-100" : "opacity-0"}`}>
                设置
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
