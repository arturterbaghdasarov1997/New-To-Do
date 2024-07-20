import { useLanguage } from "./LanguageContext";

const Header = () => {
    const { language, toggleLanguage } = useLanguage();

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
            <button onClick={toggleLanguage}>{translations[language].languageToggle}</button>
        </header>
    )
}

export default Header