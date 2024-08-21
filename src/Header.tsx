import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from './features/language/languageSlice';
import { RootState, AppDispatch } from './store/store';

type Language = 'en' | 'ge';

const Header: React.FC = () => {
    const language = useSelector((state: RootState) => state.language) as Language;
    const dispatch = useDispatch<AppDispatch>();

    const translations = {
        en: {
            title: 'ToDo App',
            languageToggle: 'Switch Language',
        },
        ge: {
            title: 'ToDo აპლიკაცია',
            languageToggle: 'ენის შეცვლა',
        },
    };

    return (
        <header>
            <h1>{translations[language].title}</h1>
            <button onClick={() => dispatch(toggleLanguage())}>
                {translations[language].languageToggle}
            </button>
        </header>
    );
};

export default Header;
