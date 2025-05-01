import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'html',
  title
}) => {
  return (
    <div className="rounded-lg overflow-hidden">
      {title && (
        <div className="bg-gray-800 text-white text-sm px-4 py-2 font-mono">
          {title}
        </div>
      )}
      <pre className="bg-gray-900 p-4 rounded-b-lg overflow-x-auto">
        <code className={`language-${language} text-sm text-white font-mono`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;