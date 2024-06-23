import React from 'react';
import Sun from '../Icons/sun.png';
import Moon from '../Icons/moon.png';

interface DarkModeButtonProps {
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

const DarkModeButton: React.FC<DarkModeButtonProps> = ({ onToggleTheme, isDarkMode }) => {
  return (
    <button
        onClick={onToggleTheme}
        className="p-2rounded fixed bottom-1.5 right-2 lg:mr-4 z-20 flex items-center justify-center text-xs lg:text-sm dark:text-zinc-200"
        aria-label={`Switch to ${isDarkMode ? 'Dark' : 'Light'} mode`}
        aria-pressed={isDarkMode}
    >
    <img 
        src={isDarkMode ? Moon : Sun } 
        alt={isDarkMode ? 'Moon icon' : 'Sun icon'} 
        className="w-3 h-3 mr-1"
    />
        {isDarkMode ? 'Dark' : 'Light'}
    </button>
  );
};

export default DarkModeButton;