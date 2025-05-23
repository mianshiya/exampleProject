import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Globe size={24} />
          <h1 className="text-xl font-bold">{t('nav.title')}</h1>
        </div>
        <nav>
          <ul className="flex gap-4">
            <li>{t('nav.home')}</li>
            <li>{t('nav.about')}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;