import React, { useState, useEffect, useCallback } from 'react';
import MarkdownInput from './MarkdownInput';
import MarkdownPreview from './MarkdownPreview';

const MarkdownEditor: React.FC = () => {
  const [markdownText, setMarkdownText] = useState<string>(
    `# Markdown 编辑器示例

## 这是一个二级标题

这是一个段落文本。您可以**加粗**或者*斜体*文字。

### 列表示例

- 项目 1
- 项目 2
- 项目 3

### 链接和图片

[这是一个链接](https://example.com)

![这是一个图片描述](https://images.pexels.com/photos/3493777/pexels-photo-3493777.jpeg?auto=compress&cs=tinysrgb&w=800)

### 代码示例

\`\`\`javascript
function sayHello() {
  console.log("你好，世界！");
}
\`\`\`

> 这是一个引用块
`
  );

  const handleTextChange = useCallback((newText: string) => {
    setMarkdownText(newText);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-full">
      <MarkdownInput value={markdownText} onChange={handleTextChange} />
      <MarkdownPreview markdown={markdownText} />
    </div>
  );
};

export default MarkdownEditor;