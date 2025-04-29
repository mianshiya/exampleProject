import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript' }) => {
  return (
    <div className="rounded-md bg-gray-900 overflow-hidden">
      <div className="px-4 py-2 bg-gray-800 text-xs text-gray-400">
        {language.toUpperCase()}
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-gray-200 font-mono">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;