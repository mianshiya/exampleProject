import React, { useEffect, useRef } from 'react';
import { EditorState, ToolType } from '../types/editor';
import { drawImageWithTransforms, drawCropOverlay } from '../utils/canvasUtils';

interface ImageCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  previewCanvasRef: React.RefObject<HTMLCanvasElement>;
  editorState: EditorState;
  onCropSelectionChange: (cropSelection: { x: number; y: number; width: number; height: number }) => void;
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({
  canvasRef,
  previewCanvasRef,
  editorState,
  onCropSelectionChange
}) => {
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragTypeRef = useRef<'move' | 'resize' | null>(null);
  const resizeHandleRef = useRef<string | null>(null);

  // Set up canvas dimensions based on image
  useEffect(() => {
    if (!editorState.originalImage || !canvasRef.current || !previewCanvasRef.current) return;

    const canvas = canvasRef.current;
    const previewCanvas = previewCanvasRef.current;
    
    // Set main canvas dimensions to match original image
    canvas.width = editorState.originalImage.width;
    canvas.height = editorState.originalImage.height;
    
    // Set preview canvas dimensions based on original image and transformations
    updatePreviewCanvas();
    
  }, [editorState.originalImage]);

  // Render image with current transformations
  useEffect(() => {
    if (!editorState.originalImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the image with current transformations
    drawImageWithTransforms(
      ctx,
      editorState.originalImage.element,
      editorState.rotation,
      editorState.scale,
      canvas.width,
      canvas.height
    );
    
    // Draw crop overlay if in cropping mode
    if (editorState.isCropping) {
      drawCropOverlay(ctx, editorState.cropSelection);
    }
    
    // Update preview canvas
    updatePreviewCanvas();
    
  }, [editorState]);

  const updatePreviewCanvas = () => {
    if (!editorState.originalImage || !previewCanvasRef.current) return;
    
    const previewCanvas = previewCanvasRef.current;
    const previewCtx = previewCanvas.getContext('2d');
    
    if (!previewCtx) return;
    
    // Determine output size based on transformations
    let outputWidth = editorState.originalImage.width;
    let outputHeight = editorState.originalImage.height;
    
    if (editorState.isCropping) {
      outputWidth = editorState.cropSelection.width;
      outputHeight = editorState.cropSelection.height;
    }
    
    // Apply scale
    outputWidth *= editorState.scale;
    outputHeight *= editorState.scale;
    
    // Set preview canvas dimensions
    previewCanvas.width = outputWidth;
    previewCanvas.height = outputHeight;
    
    // Draw the processed image to preview
    if (editorState.isCropping) {
      // For cropping preview, only show the cropped region
      previewCtx.drawImage(
        editorState.originalImage.element,
        editorState.cropSelection.x,
        editorState.cropSelection.y,
        editorState.cropSelection.width,
        editorState.cropSelection.height,
        0,
        0,
        outputWidth,
        outputHeight
      );
    } else {
      // For rotation and scaling, show the full image with transforms
      drawImageWithTransforms(
        previewCtx,
        editorState.originalImage.element,
        editorState.rotation,
        editorState.scale,
        outputWidth,
        outputHeight
      );
    }
  };

  // Mouse event handlers for crop interaction
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!editorState.isCropping || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if clicking on a resize handle or inside the crop area
    const cropArea = editorState.cropSelection;
    const handleSize = 10; // Size of resize handles
    
    // Check each corner for resize handles
    if (Math.abs(x - cropArea.x) <= handleSize && Math.abs(y - cropArea.y) <= handleSize) {
      // Top-left handle
      dragTypeRef.current = 'resize';
      resizeHandleRef.current = 'tl';
    } else if (Math.abs(x - (cropArea.x + cropArea.width)) <= handleSize && Math.abs(y - cropArea.y) <= handleSize) {
      // Top-right handle
      dragTypeRef.current = 'resize';
      resizeHandleRef.current = 'tr';
    } else if (Math.abs(x - cropArea.x) <= handleSize && Math.abs(y - (cropArea.y + cropArea.height)) <= handleSize) {
      // Bottom-left handle
      dragTypeRef.current = 'resize';
      resizeHandleRef.current = 'bl';
    } else if (Math.abs(x - (cropArea.x + cropArea.width)) <= handleSize && Math.abs(y - (cropArea.y + cropArea.height)) <= handleSize) {
      // Bottom-right handle
      dragTypeRef.current = 'resize';
      resizeHandleRef.current = 'br';
    } else if (x >= cropArea.x && x <= cropArea.x + cropArea.width && y >= cropArea.y && y <= cropArea.y + cropArea.height) {
      // Inside crop area - move the whole selection
      dragTypeRef.current = 'move';
    } else {
      return; // Clicked outside crop area, do nothing
    }
    
    isDraggingRef.current = true;
    dragStartRef.current = { x, y };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || !canvasRef.current || !editorState.isCropping) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const deltaX = x - dragStartRef.current.x;
    const deltaY = y - dragStartRef.current.y;
    
    // Clone current crop selection
    const newCropSelection = { ...editorState.cropSelection };
    
    if (dragTypeRef.current === 'move') {
      // Move the entire selection
      newCropSelection.x += deltaX;
      newCropSelection.y += deltaY;
      
      // Constrain within canvas bounds
      newCropSelection.x = Math.max(0, Math.min(canvas.width - newCropSelection.width, newCropSelection.x));
      newCropSelection.y = Math.max(0, Math.min(canvas.height - newCropSelection.height, newCropSelection.y));
      
    } else if (dragTypeRef.current === 'resize' && resizeHandleRef.current) {
      // Resize the selection based on which handle is being dragged
      switch (resizeHandleRef.current) {
        case 'tl': // Top-left
          newCropSelection.x += deltaX;
          newCropSelection.y += deltaY;
          newCropSelection.width -= deltaX;
          newCropSelection.height -= deltaY;
          break;
        case 'tr': // Top-right
          newCropSelection.y += deltaY;
          newCropSelection.width += deltaX;
          newCropSelection.height -= deltaY;
          break;
        case 'bl': // Bottom-left
          newCropSelection.x += deltaX;
          newCropSelection.width -= deltaX;
          newCropSelection.height += deltaY;
          break;
        case 'br': // Bottom-right
          newCropSelection.width += deltaX;
          newCropSelection.height += deltaY;
          break;
      }
      
      // Ensure minimum size
      if (newCropSelection.width < 20) newCropSelection.width = 20;
      if (newCropSelection.height < 20) newCropSelection.height = 20;
      
      // Ensure crop area doesn't go outside the canvas
      if (newCropSelection.x < 0) {
        newCropSelection.width += newCropSelection.x;
        newCropSelection.x = 0;
      }
      if (newCropSelection.y < 0) {
        newCropSelection.height += newCropSelection.y;
        newCropSelection.y = 0;
      }
      
      if (newCropSelection.x + newCropSelection.width > canvas.width) {
        newCropSelection.width = canvas.width - newCropSelection.x;
      }
      if (newCropSelection.y + newCropSelection.height > canvas.height) {
        newCropSelection.height = canvas.height - newCropSelection.y;
      }
    }
    
    // Update crop selection in parent component
    onCropSelectionChange(newCropSelection);
    
    // Update drag start position
    dragStartRef.current = { x, y };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    dragTypeRef.current = null;
    resizeHandleRef.current = null;
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="border rounded overflow-auto relative bg-gray-100 flex justify-center">
        <canvas
          ref={canvasRef}
          className="max-w-full"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">预览效果</h3>
        <div className="border rounded overflow-auto p-2 bg-gray-100 flex justify-center">
          <canvas
            ref={previewCanvasRef}
            className="max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCanvas;