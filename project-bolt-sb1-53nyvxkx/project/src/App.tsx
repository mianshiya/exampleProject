import React from 'react';
import ImageEditor from './components/ImageEditor';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">图像处理应用</h1>
          <p className="text-gray-600 mb-8 text-center">
            通过本应用，您可以体验前端实现的图像裁剪、旋转和调整大小功能
          </p>
          <ImageEditor />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;