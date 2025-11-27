import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className="absolute top-6 right-6 z-40 flex items-center bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4">
      <Globe className="w-8 h-8 text-white mr-4" />
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-transparent text-white text-xl outline-none cursor-pointer"
      >
        <option value="en" className="bg-gray-900">{t('language.english')}</option>
        <option value="zh" className="bg-gray-900">{t('language.chinese')}</option>
      </select>
    </div>
  );
};

export default LanguageSelector;