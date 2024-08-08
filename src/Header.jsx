import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from './features/language/languageSlice';

const Header = () => {
    const language = useSelector(state => state.language);
    const dispatch = useDispatch();

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