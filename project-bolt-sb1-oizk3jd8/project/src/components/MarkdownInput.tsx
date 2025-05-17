import React, { useRef, useEffect } from 'react';
import { Edit3 } from 'lucide-react';

interface MarkdownInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownInput: React.FC<MarkdownInputProps> = ({ value, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 自动调整高度
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50 transition-all duration-300 ease-in-out">
      <div className="flex items-center mb-2 text-gray-700">
        <Edit3 className="h-4 w-4 mr-2" />
        <h2 className="font-medium">编辑区</h2>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        className="w-full h-full min-h-[300px] p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-gray-800"
        placeholder="在这里输入 Markdown 文本..."
      />
    </div>
  );
};

export default MarkdownInput;