import React from 'react';
import { useTranslation } from 'react-i18next';

const NumberExample: React.FC = () => {
  const { t, i18n } = useTranslation();
  const price = 1234.56;

  // 根据当前语言格式化数字
  const formattedPrice = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency: i18n.language === 'zh-CN' ? 'CNY' : 'USD',
  }).format(price);

  return (
    <div className="mb-4">
      <h3 className="font-medium mb-2">{t('examples.number')}</h3>
      <div className="bg-gray-100 p-3 rounded-md">
        <p>{t('examples.price')} <span className="font-medium">{formattedPrice}</span></p>
      </div>
    </div>
  );
};

export default NumberExample;