import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Footer from './components/Footer';
import LanguageSwitcher from './components/LanguageSwitcher';
import DateExample from './components/DateExample';
import NumberExample from './components/NumberExample';
import CodeExample from './components/CodeExample';
import ImplementationSteps from './components/ImplementationSteps';
import './i18n';

function App() {
  const { t } = useTranslation();

  // 动态更新页面标题
  useEffect(() => {
    document.title = t('nav.title');
  }, [t]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-blue-600">{t('demo.title')}</h1>
          <h2 className="text-xl mb-4 text-gray-600">{t('demo.subtitle')}</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <p className="text-lg">{t('demo.intro')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <LanguageSwitcher />
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-medium text-lg mb-3">{t('examples.title')}</h3>
                <DateExample />
                <NumberExample />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <ImplementationSteps />
              <CodeExample />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;