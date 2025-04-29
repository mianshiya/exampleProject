import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'css' }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative mt-4 mb-8 rounded-md overflow-hidden">
      <div className="bg-gray-800 text-white px-4 py-2 text-sm flex justify-between items-center">
        <span>{language.toUpperCase()}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <CheckCircle className="h-4 w-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="bg-gray-900 p-4 overflow-x-auto text-sm text-gray-100">
        <code>{code}</code>
      </pre>
    </div>
  );
};