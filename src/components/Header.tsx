import React, { useState } from 'react';
import { cn } from '../lib/utils';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={cn(
      "relative z-10 w-full py-4 px-6 backdrop-blur-sm bg-black/20", 
      className
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            2.0 Flash
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {['Home', 'About', 'Use', 'Whitepaper'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white hover:text-blue-400 transition-colors duration-300 font-medium"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Connect Button */}
        <button className="hidden md:block bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
          Connect
        </button>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/80 backdrop-blur-md">
          <div className="flex flex-col space-y-4 p-4">
            {['Home', 'About', 'Use', 'Whitepaper'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-blue-400 transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300">
              Connect
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
