import React, { useState } from 'react';
import { cn } from '../lib/utils';
import whitepaperPdf from '../assets/pdf/Tronado White Paper.pdf';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full py-4 px-6 backdrop-blur-md bg-black/40 shadow-md", 
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
          <a href="#hero" className="text-white hover:text-blue-400 transition-colors duration-300 font-medium">Home</a>
          <a href="#about" className="text-white hover:text-blue-400 transition-colors duration-300 font-medium">About</a>
          <a href="#features" className="text-white hover:text-blue-400 transition-colors duration-300 font-medium">Features</a>
          <a href="#roadmap" className="text-white hover:text-blue-400 transition-colors duration-300 font-medium">Roadmap</a>
        </nav>

        {/* Whitepaper Button */}
        <a 
          href={whitepaperPdf} 
          download="Tronado White Paper.pdf"
          className="hidden md:block bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 text-center"
        >
          Whitepaper
        </a>

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
            <a href="#hero" className="text-white hover:text-blue-400 transition-colors duration-300 font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a href="#about" className="text-white hover:text-blue-400 transition-colors duration-300 font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#features" className="text-white hover:text-blue-400 transition-colors duration-300 font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
            <a href="#roadmap" className="text-white hover:text-blue-400 transition-colors duration-300 font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>Roadmap</a>
            <a 
              href={whitepaperPdf} 
              download="Tronado White Paper.pdf"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 text-center block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Whitepaper
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
