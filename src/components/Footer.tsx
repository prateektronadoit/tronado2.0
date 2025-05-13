import React, { useState } from "react";
import { FaInstagram, FaTelegramPlane, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import radioImage from "../assets/radio.jpg";

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border border-gray-800/50 rounded-lg overflow-hidden bg-black/30 backdrop-blur-sm shadow-lg">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold text-white">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white"
        >
          <FiChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-4"
          >
            <div className="border-t border-gray-800/50 pt-4 text-gray-300">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Footer: React.FC = () => {
  const faqItems = [
    {
      question: "What is Tronado contract address?",
      answer: "0xC396b3198b5Bd6OCF2cDaB9b34F646A58C029998"
    }
  ];

  return (
    <footer 
      id="faq" 
      className="relative py-20 px-6 md:px-20 text-center text-white overflow-hidden"
      style={{ 
        background: "#08050f"
      }}
    >
      {/* Radio background image */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${radioImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          filter: 'brightness(0.85)',
          opacity: 0.9
        }}
      />
      
      {/* Very light dark overlay - similar to roadmap style but more transparent */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(10, 5, 20, 0.6) 0%, rgba(5, 2, 10, 0.7) 100%)'
        }}
      />
      
      {/* FAQ Section */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
          <h3 className="uppercase text-xs tracking-[0.3em] text-white font-medium">
            FREQUENTLY ASKED
          </h3>
          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
        </div>

        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          FAQ
        </h2>

        <div className="space-y-4 mb-20">
          {faqItems.map((item, index) => (
            <FaqItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
      
      {/* Footer content */}
      <div className="relative z-10 border-t border-gray-800/30 pt-12">
        <h2 className="text-xs sm:text-sm text-white font-semibold tracking-wider mb-4 sm:mb-6 text-center">
          JOIN OUR SOCIAL GROUP
        </h2>

        <div className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <a
            href="https://www.instagram.com/tronadoofficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1a1a2e] hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 border border-pink-500 rounded-md p-2 sm:p-3 transition shadow-md hover:scale-105"
          >
            <FaInstagram size={16} className="sm:w-5 sm:h-5" />
          </a>
          <a
            href="https://t.me/tronadoofficialgroup"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1a1a2e] hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 border border-purple-500 rounded-md p-2 sm:p-3 transition shadow-md hover:scale-105"
          >
            <FaTelegramPlane size={16} className="sm:w-5 sm:h-5" />
          </a>
          <a
            href="https://www.linkedin.com/company/tronadotoken/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1a1a2e] hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-500 border border-indigo-500 rounded-md p-2 sm:p-3 transition shadow-md hover:scale-105"
          >
            <FaLinkedinIn size={16} className="sm:w-5 sm:h-5" />
          </a>
          <a
            href="https://x.com/TRDOtoken"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1a1a2e] hover:bg-gradient-to-r hover:from-blue-500 hover:to-sky-400 border border-blue-500 rounded-md p-2 sm:p-3 transition shadow-md hover:scale-105"
          >
            <FaTwitter size={16} className="sm:w-5 sm:h-5" />
          </a>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 text-center">
          Copyright 2025 <span className="text-gray-300">Coinpay</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
