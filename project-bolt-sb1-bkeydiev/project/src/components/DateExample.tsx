import React from 'react';
import { useTranslation } from 'react-i18next';

const DateExample: React.FC = () => {
  const { t, i18n } = useTranslation();
  const today = new Date();

  // 根据当前语言格式化日期
  const formattedDate = new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(today);

  return (
    <div className="mb-4">
      <h3 className="font-medium mb-2">{t('examples.date')}</h3>
      <div className="bg-gray-100 p-3 rounded-md">
        <p>{t('examples.today')} <span className="font-medium">{formattedDate}</span></p>
      </div>
    </div>
  );
};

export default DateExample;