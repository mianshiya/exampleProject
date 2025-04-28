"use client"

import { useState } from "react"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
}

export default function CodeBlock({ code, language = "jsx", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-md overflow-hidden border border-gray-200 mb-4">
      {title && <div className="bg-gray-100 px-4 py-2 text-sm font-medium border-b border-gray-200">{title}</div>}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm bg-gray-50">
          <code className={`language-${language}`}>{code}</code>
        </pre>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 opacity-70 hover:opacity-100"
          onClick={copyToClipboard}
        >
          <Copy className="h-4 w-4" />
          <span className="sr-only">复制代码</span>
        </Button>
        {copied && <div className="absolute top-2 right-12 bg-black text-white text-xs px-2 py-1 rounded">已复制</div>}
      </div>
    </div>
  )
}
