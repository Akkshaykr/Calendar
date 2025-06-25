import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button className={`theme-toggle ${theme}`} onClick={onToggle}>
      <div className="toggle-slider">
        <div className="toggle-icon">
          {theme === 'light-theme' ? '🌙' : '☀️'}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;