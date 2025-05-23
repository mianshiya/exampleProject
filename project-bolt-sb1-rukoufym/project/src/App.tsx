import React from 'react';
import FormWizard from './components/FormWizard';
import { FormProvider } from './context/FormContext';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <FormProvider>
            <FormWizard />
          </FormProvider>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center text-sm">
        <p>© 2025 表单向导组件演示 | 教学与研究目的</p>
      </footer>
    </div>
  );
}

export default App;