import { Home, Settings, Users, FileText, HelpCircle } from "lucide-react"
import Link from "next/link"

export function HoverSidebar() {
  return (
    <div className="group fixed left-0 top-0 z-10 h-full w-[60px] bg-gray-800 text-white transition-all duration-300 hover:w-60">
      <div className="flex h-16 items-center px-4">
        <span className="whitespace-nowrap font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          控制面板
        </span>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2 px-2">
          <li>
            <Link href="#" className="flex items-center rounded-md px-2 py-2 hover:bg-gray-700">
              <Home size={20} />
              <span className="ml-3 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                首页
              </span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center rounded-md px-2 py-2 hover:bg-gray-700">
              <Users size={20} />
              <span className="ml-3 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                用户管理
              </span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center rounded-md px-2 py-2 hover:bg-gray-700">
              <FileText size={20} />
              <span className="ml-3 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                文档
              </span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center rounded-md px-2 py-2 hover:bg-gray-700">
              <HelpCircle size={20} />
              <span className="ml-3 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                帮助
              </span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center rounded-md px-2 py-2 hover:bg-gray-700">
              <Settings size={20} />
              <span className="ml-3 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                设置
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
