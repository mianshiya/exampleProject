import React, { useState, useRef } from 'react';
import ImageUploader from './ImageUploader';
import ImageCanvas from './ImageCanvas';
import ControlPanel from './ControlPanel';
import { EditorState, ImageInfo, ToolType } from '../types/editor';
import { resetCanvasContext } from '../utils/canvasUtils';

const ImageEditor: React.FC = () => {
  const [editorState, setEditorState] = useState<EditorState>({
    originalImage: null,
    tool: ToolType.NONE,
    rotation: 0,
    scale: 1,
    cropSelection: { x: 0, y: 0, width: 0, height: 0 },
    isCropping: false,
    isImageLoaded: false
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (imageInfo: ImageInfo) => {
    setEditorState({
      ...editorState,
      originalImage: imageInfo,
      isImageLoaded: true,
      cropSelection: {
        x: 0,
        y: 0,
        width: imageInfo.width,
        height: imageInfo.height
      }
    });
  };

  const handleToolChange = (tool: ToolType) => {
    // Reset crop selection when switching to crop tool
    if (tool === ToolType.CROP && editorState.originalImage) {
      const centerX = editorState.originalImage.width / 2;
      const centerY = editorState.originalImage.height / 2;
      const size = Math.min(editorState.originalImage.width, editorState.originalImage.height) / 2;

      setEditorState({
        ...editorState,
        tool,
        isCropping: true,
        cropSelection: {
          x: centerX - size,
          y: centerY - size,
          width: size * 2,
          height: size * 2
        }
      });
    } else {
      setEditorState({
        ...editorState,
        tool,
        isCropping: tool === ToolType.CROP
      });
    }
  };

  const handleRotationChange = (rotation: number) => {
    setEditorState({
      ...editorState,
      rotation
    });
  };

  const handleScaleChange = (scale: number) => {
    setEditorState({
      ...editorState,
      scale
    });
  };

  const handleCropSelectionChange = (cropSelection: { x: number; y: number; width: number; height: number }) => {
    setEditorState({
      ...editorState,
      cropSelection
    });
  };

  const handleCropApply = () => {
    if (!canvasRef.current || !editorState.originalImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Create a temporary canvas for the cropped image
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    if (!tempCtx) return;

    // Set dimensions to crop selection
    tempCanvas.width = editorState.cropSelection.width;
    tempCanvas.height = editorState.cropSelection.height;

    // Draw only the cropped portion to the temp canvas
    tempCtx.drawImage(
      editorState.originalImage.element,
      editorState.cropSelection.x,
      editorState.cropSelection.y,
      editorState.cropSelection.width,
      editorState.cropSelection.height,
      0,
      0,
      editorState.cropSelection.width,
      editorState.cropSelection.height
    );

    // Create a new image from the temp canvas
    const croppedImage = new Image();
    croppedImage.src = tempCanvas.toDataURL('image/png');

    croppedImage.onload = () => {
      // Update the original image with our cropped version
      setEditorState({
        ...editorState,
        originalImage: {
          element: croppedImage,
          width: editorState.cropSelection.width,
          height: editorState.cropSelection.height
        },
        tool: ToolType.NONE,
        isCropping: false,
        rotation: 0,
        scale: 1
      });
    };
  };

  const handleDownload = () => {
    if (!previewCanvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = '处理后的图片.png';
    link.href = previewCanvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handleReset = () => {
    if (!editorState.originalImage) return;
    
    // Reset to original image state
    setEditorState({
      ...editorState,
      rotation: 0,
      scale: 1,
      tool: ToolType.NONE,
      isCropping: false
    });

    // Reset canvas
    if (canvasRef.current) {
      resetCanvasContext(canvasRef.current);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        {!editorState.isImageLoaded ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <ImageCanvas
                canvasRef={canvasRef}
                previewCanvasRef={previewCanvasRef}
                editorState={editorState}
                onCropSelectionChange={handleCropSelectionChange}
              />
            </div>
            <div className="w-full lg:w-64">
              <ControlPanel
                editorState={editorState}
                onToolChange={handleToolChange}
                onRotationChange={handleRotationChange}
                onScaleChange={handleScaleChange}
                onCropApply={handleCropApply}
                onDownload={handleDownload}
                onReset={handleReset}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageEditor;