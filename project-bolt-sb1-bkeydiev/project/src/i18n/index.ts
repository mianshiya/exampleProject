import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { zhCN, enUS } from './locales';

// 初始化i18next
i18n
  // 检测用户语言
  .use(LanguageDetector)
  // 将i18n实例传递给react-i18next
  .use(initReactI18next)
  // 初始化i18next
  .init({
    debug: true,
    fallbackLng: 'zh-CN',
    interpolation: {
      escapeValue: false, // 不需要为React转义
    },
    resources: {
      'zh-CN': zhCN,
      'en-US': enUS,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;