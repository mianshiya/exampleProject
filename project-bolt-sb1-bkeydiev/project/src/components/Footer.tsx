import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>{t('footer.text')}</p>
        <p className="text-gray-400 text-sm mt-1">{t('footer.made')}</p>
      </div>
    </footer>
  );
};

export default Footer;