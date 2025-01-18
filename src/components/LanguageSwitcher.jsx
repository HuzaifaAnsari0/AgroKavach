import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setDropdownOpen(false); // Close the dropdown after selecting a language
  };

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {i18n.language === 'en' ? 'English' : 'हिन्दी'}
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
          <button
            onClick={() => changeLanguage('en')}
            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('hi')}
            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
          >
            हिन्दी
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;