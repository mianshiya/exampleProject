import React from 'react';
import { EditorState, ToolType } from '../types/editor';
import { Crop, RotateCcw, ZoomIn, Download, RefreshCw } from 'lucide-react';

interface ControlPanelProps {
  editorState: EditorState;
  onToolChange: (tool: ToolType) => void;
  onRotationChange: (rotation: number) => void;
  onScaleChange: (scale: number) => void;
  onCropApply: () => void;
  onDownload: () => void;
  onReset: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  editorState,
  onToolChange,
  onRotationChange,
  onScaleChange,
  onCropApply,
  onDownload,
  onReset
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <h2 className="text-xl font-bold mb-4">图像控制面板</h2>
      
      <div className="space-y-6">
        {/* 工具选择 */}
        <div>
          <h3 className="text-md font-medium mb-2">选择工具</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onToolChange(ToolType.CROP)}
              className={`flex items-center px-3 py-2 rounded ${
                editorState.tool === ToolType.CROP
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border hover:bg-gray-100'
              }`}
            >
              <Crop className="h-4 w-4 mr-1" />
              裁剪
            </button>
            <button
              onClick={() => onToolChange(ToolType.ROTATE)}
              className={`flex items-center px-3 py-2 rounded ${
                editorState.tool === ToolType.ROTATE
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border hover:bg-gray-100'
              }`}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              旋转
            </button>
            <button
              onClick={() => onToolChange(ToolType.RESIZE)}
              className={`flex items-center px-3 py-2 rounded ${
                editorState.tool === ToolType.RESIZE
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border hover:bg-gray-100'
              }`}
            >
              <ZoomIn className="h-4 w-4 mr-1" />
              缩放
            </button>
          </div>
        </div>
        
        {/* 根据选择的工具显示不同控制 */}
        {editorState.tool === ToolType.ROTATE && (
          <div>
            <h3 className="text-md font-medium mb-2">旋转控制</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-sm mb-1">旋转角度: {editorState.rotation}°</label>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  value={editorState.rotation}
                  onChange={(e) => onRotationChange(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => onRotationChange(editorState.rotation - 90)}
                  className="bg-white border px-3 py-1 rounded hover:bg-gray-100"
                >
                  -90°
                </button>
                <button
                  onClick={() => onRotationChange(0)}
                  className="bg-white border px-3 py-1 rounded hover:bg-gray-100"
                >
                  重置
                </button>
                <button
                  onClick={() => onRotationChange(editorState.rotation + 90)}
                  className="bg-white border px-3 py-1 rounded hover:bg-gray-100"
                >
                  +90°
                </button>
              </div>
            </div>
          </div>
        )}
        
        {editorState.tool === ToolType.RESIZE && (
          <div>
            <h3 className="text-md font-medium mb-2">缩放控制</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-sm mb-1">缩放倍数: {editorState.scale.toFixed(1)}x</label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={editorState.scale}
                  onChange={(e) => onScaleChange(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => onScaleChange(0.5)}
                  className="bg-white border px-3 py-1 rounded hover:bg-gray-100"
                >
                  0.5x
                </button>
                <button
                  onClick={() => onScaleChange(1)}
                  className="bg-white border px-3 py-1 rounded hover:bg-gray-100"
                >
                  1x
                </button>
                <button
                  onClick={() => onScaleChange(2)}
                  className="bg-white border px-3 py-1 rounded hover:bg-gray-100"
                >
                  2x
                </button>
              </div>
            </div>
          </div>
        )}
        
        {editorState.tool === ToolType.CROP && (
          <div>
            <h3 className="text-md font-medium mb-2">裁剪控制</h3>
            <p className="text-sm text-gray-600 mb-2">
              拖动裁剪框的边缘或角落来调整大小，或拖动整个框来移动位置
            </p>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs mb-1">X: {Math.round(editorState.cropSelection.x)}</label>
                </div>
                <div>
                  <label className="block text-xs mb-1">Y: {Math.round(editorState.cropSelection.y)}</label>
                </div>
                <div>
                  <label className="block text-xs mb-1">宽: {Math.round(editorState.cropSelection.width)}</label>
                </div>
                <div>
                  <label className="block text-xs mb-1">高: {Math.round(editorState.cropSelection.height)}</label>
                </div>
              </div>
              <button
                onClick={onCropApply}
                className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
              >
                应用裁剪
              </button>
            </div>
          </div>
        )}
        
        {/* 全局操作按钮 */}
        <div className="pt-4 border-t">
          <div className="space-y-2">
            <button
              onClick={onDownload}
              disabled={!editorState.isImageLoaded}
              className="w-full flex justify-center items-center bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4 mr-1" />
              下载处理后的图片
            </button>
            <button
              onClick={onReset}
              disabled={!editorState.isImageLoaded}
              className="w-full flex justify-center items-center bg-gray-300 px-3 py-2 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              重置所有修改
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;