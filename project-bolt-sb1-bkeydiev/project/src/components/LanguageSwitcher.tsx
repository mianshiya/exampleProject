import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Globe className="text-blue-600" size={20} />
        <h3 className="font-medium text-lg">{t('language.switch')}</h3>
      </div>
      
      <p className="mb-2">{t('language.current')}</p>
      
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => changeLanguage('zh-CN')}
          className={`px-3 py-1 rounded-md transition-all ${
            currentLanguage === 'zh-CN'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {t('language.zh-CN')}
        </button>
        <button
          onClick={() => changeLanguage('en-US')}
          className={`px-3 py-1 rounded-md transition-all ${
            currentLanguage === 'en-US'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {t('language.en-US')}
        </button>
      </div>
      
      <div className="text-sm text-gray-600">
        <p>{t('language.auto')} {currentLanguage === 'zh-CN' ? '中文' : 'English'}</p>
      </div>
    </div>
  );
};

export default LanguageSwitcher;