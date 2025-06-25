import React, { useState, useEffect } from 'react';
import Calendar from "./components/Calendar";
import ThemeToggle from "./components/ThemeToggle";
import LanguageSelector from "./components/LanguageSelector";

import './index.css';

const Index = () => {
  const [theme, setTheme] = useState('light-theme');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light-theme' ? 'dark-theme' : 'light-theme');
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };
const translations = {
  en: {
    title: 'Sparrow Calendar',
    subtitle: 'Click on a date to add an event and remember important moments.',
  },
  hi: {
    title: 'रंगबिरंगा कैलेंडर',
    subtitle: 'किसी तारीख़ पर क्लिक करें और ज़रूरी पल याद रखने के लिए इवेंट जोड़ें।',
  },
  ta: {
    title: 'வண்ணமயமான நாட்காட்டி',
    subtitle: 'நிகழ்வுகளை நினைவில் வைத்திருக்க தேதியை கிளிக் செய்து சேர்க்கவும்.',
  }
};

  const t = translations[language];

  return (
    <div className={`app-container ${theme}`}>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <LanguageSelector language={language} onLanguageChange={handleLanguageChange} />
      
      <header className="app-header">
        <h1 className="app-title">{t.title}</h1>
        <p className="app-subtitle">{t.subtitle}</p>
      </header>
      
      <main className="app-main">
        <Calendar language={language} theme={theme} />
      </main>
      
    
    </div>
  );
};

export default Index;