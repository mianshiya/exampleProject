import React from 'react';
import { useTranslation } from 'react-i18next';

const CodeExample: React.FC = () => {
  const { t } = useTranslation();

  const setupCode = `
// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'zh-CN': { translation: { ... } },
      'en-US': { translation: { ... } }
    },
    fallbackLng: 'zh-CN',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
  `;

  const usageCode = `
// App.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';

function App() {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => changeLanguage('zh-CN')}>
        中文
      </button>
      <button onClick={() => changeLanguage('en-US')}>
        English
      </button>
    </div>
  );
}
  `;

  return (
    <div className="mt-6">
      <h3 className="font-medium text-lg mb-2">{t('examples.code')}</h3>
      
      <div className="mb-4">
        <p className="text-sm font-medium mb-1">{t('code.setup')}</p>
        <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm">
          {setupCode}
        </pre>
      </div>
      
      <div>
        <p className="text-sm font-medium mb-1">{t('code.component')}</p>
        <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm">
          {usageCode}
        </pre>
      </div>
    </div>
  );
};

export default CodeExample;