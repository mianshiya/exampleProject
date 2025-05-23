import React, { useMemo } from 'react';
import { marked } from 'marked';
import { Eye } from 'lucide-react';

interface MarkdownPreviewProps {
  markdown: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown }) => {
  // 使用 useMemo 避免不必要的重复渲染
  const htmlContent = useMemo(() => {
    // 配置 marked 选项，确保代码块正确渲染
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
    return marked(markdown);
  }, [markdown]);

  return (
    <div className="w-full md:w-1/2 p-4 bg-white">
      <div className="flex items-center mb-2 text-gray-700">
        <Eye className="h-4 w-4 mr-2" />
        <h2 className="font-medium">预览区</h2>
      </div>
      <div 
        className="markdown-preview p-3 border border-gray-200 rounded-md min-h-[300px] prose prose-blue max-w-none animate-fade-in"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default MarkdownPreview;