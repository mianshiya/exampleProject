"use client"

import type React from "react"

import { FixedSizeList as List } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

interface Item {
  id: number
  name: string
  description: string
  value: number
}

interface ReactWindowListProps {
  data: Item[]
  itemHeight?: number
}

export default function ReactWindowList({ data, itemHeight = 50 }: ReactWindowListProps) {
  // 渲染每一行的函数
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = data[index]

    return (
      <div className="p-4 border-b hover:bg-gray-50 transition-colors" style={style}>
        <div className="flex justify-between">
          <span className="font-medium">{item.name}</span>
          <span className="text-gray-500">ID: {item.id}</span>
        </div>
        <p className="text-sm text-gray-600 truncate">{item.description}</p>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <AutoSizer>
        {({ height, width }) => (
          <List height={height} width={width} itemCount={data.length} itemSize={itemHeight}>
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  )
}
