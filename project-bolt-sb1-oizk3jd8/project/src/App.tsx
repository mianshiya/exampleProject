import React from 'react';
import Header from './components/Header';
import MarkdownEditor from './components/MarkdownEditor';
import SyntaxGuide from './components/SyntaxGuide';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <main className="flex-1 container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="p-4 bg-blue-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Markdown 实时预览编辑器</h2>
            <p className="text-gray-600 mt-1">
              在左侧输入 Markdown 文本，右侧将实时显示渲染效果。
            </p>
          </div>
          
          <MarkdownEditor />
        </div>
        
        <SyntaxGuide />
        
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>教学演示与研究 | 简易 Markdown 编辑器实现</p>
        </footer>
      </main>
    </div>
  );
}

export default App;