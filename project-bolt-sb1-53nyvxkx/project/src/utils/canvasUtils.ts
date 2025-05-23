/**
 * Draw an image on canvas with rotation and scaling
 */
export const drawImageWithTransforms = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  rotation: number,
  scale: number,
  canvasWidth: number,
  canvasHeight: number
) => {
  // Save the current context state
  ctx.save();
  
  // Clear canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  // Translate to center of canvas for rotation around center
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  
  ctx.translate(centerX, centerY);
  
  // Rotate canvas (convert degrees to radians)
  ctx.rotate((rotation * Math.PI) / 180);
  
  // Scale the canvas
  ctx.scale(scale, scale);
  
  // Draw image centered
  const imageWidth = image.width;
  const imageHeight = image.height;
  
  ctx.drawImage(
    image,
    -imageWidth / 2,
    -imageHeight / 2,
    imageWidth,
    imageHeight
  );
  
  // Restore the context state
  ctx.restore();
};

/**
 * Draw crop overlay with semi-transparent mask and handles
 */
export const drawCropOverlay = (
  ctx: CanvasRenderingContext2D,
  cropSelection: { x: number; y: number; width: number; height: number }
) => {
  const { x, y, width, height } = cropSelection;
  
  // Save context state
  ctx.save();
  
  // Draw semi-transparent overlay for the area outside the crop selection
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  
  // Draw outer rectangle (whole canvas)
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  // Clear the crop area to make it visible
  ctx.clearRect(x, y, width, height);
  
  // Draw border around crop selection
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
  
  // Draw grid lines (rule of thirds)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 1;
  
  // Vertical lines
  ctx.beginPath();
  ctx.moveTo(x + width / 3, y);
  ctx.lineTo(x + width / 3, y + height);
  ctx.moveTo(x + (2 * width) / 3, y);
  ctx.lineTo(x + (2 * width) / 3, y + height);
  
  // Horizontal lines
  ctx.moveTo(x, y + height / 3);
  ctx.lineTo(x + width, y + height / 3);
  ctx.moveTo(x, y + (2 * height) / 3);
  ctx.lineTo(x + width, y + (2 * height) / 3);
  
  ctx.stroke();
  
  // Draw resize handles at corners
  const handleSize = 8;
  const handles = [
    { x: x, y: y }, // Top-left
    { x: x + width, y: y }, // Top-right
    { x: x, y: y + height }, // Bottom-left
    { x: x + width, y: y + height } // Bottom-right
  ];
  
  ctx.fillStyle = 'white';
  handles.forEach(handle => {
    ctx.fillRect(
      handle.x - handleSize / 2,
      handle.y - handleSize / 2,
      handleSize,
      handleSize
    );
  });
  
  // Restore context state
  ctx.restore();
};

/**
 * Reset canvas context to default state
 */
export const resetCanvasContext = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Reset transformations
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};