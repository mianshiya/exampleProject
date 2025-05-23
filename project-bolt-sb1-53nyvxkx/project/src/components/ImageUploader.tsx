import React, { useRef } from 'react';
import { ImageInfo } from '../types/editor';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (imageInfo: ImageInfo) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      alert('请选择有效的图片文件');
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      
      img.onload = () => {
        // Pass the loaded image info to parent component
        onImageUpload({
          element: img,
          width: img.width,
          height: img.height
        });
      };
    };
    
    reader.readAsDataURL(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      alert('请选择有效的图片文件');
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      
      img.onload = () => {
        // Pass the loaded image info to parent component
        onImageUpload({
          element: img,
          width: img.width,
          height: img.height
        });
      };
    };
    
    reader.readAsDataURL(file);
  };

  return (
    <div 
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
      onClick={triggerFileUpload}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />
      <div className="flex flex-col items-center">
        <Upload className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">选择或拖拽图片</h3>
        <p className="text-gray-500 mb-4">支持 JPG、PNG、GIF 等常见图片格式</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          选择图片
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;