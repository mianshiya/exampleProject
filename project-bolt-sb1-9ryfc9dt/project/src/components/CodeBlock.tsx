import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript' }) => {
  return (
    <div className="my-4 rounded-lg overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 text-xs text-gray-200">
        {language}
      </div>
      <pre className="bg-gray-900 p-4 overflow-x-auto text-sm text-gray-200">
        <code>{code}</code>
      </pre>
    </div>
  );
};