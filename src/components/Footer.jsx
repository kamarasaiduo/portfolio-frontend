import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

function Footer() {
  const [now, setNow] = useState(new Date());
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
    
    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const dateStr = now.toLocaleDateString();
  const timeStr = now.toLocaleTimeString();

  return (
    <footer className="bg-gray-900 dark:bg-gray-800 text-white py-6 mt-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            &copy; {now.getFullYear()} My Portfolio. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-300 transform hover:scale-110"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-300" />
              )}
            </button>
            <div className="text-center">
              A link-corporation-project
            </div>
          </div>

          <div className="text-center md:text-right">
            {dateStr} {timeStr}
          </div>
        </div>
        
        <div className="text-center mt-4 text-gray-400">
          Built with <span className="text-teal-300 font-semibold">Spring Boot</span> +{" "}
          <span className="text-blue-400 font-semibold">React</span> +{" "}
          <span className="text-teal-300 font-semibold">Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;