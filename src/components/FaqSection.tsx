import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border border-purple-500/20 rounded-lg overflow-hidden bg-[#14101f]/60 backdrop-blur-sm">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold text-white">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-purple-400"
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
            <div className="border-t border-purple-500/20 pt-4 text-gray-300">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FaqSection: React.FC = () => {
  const faqItems = [
    {
      question: "What is Tronado contract address?",
      answer: "0xC396b3198b5Bd6OCF2cDaB9b34F646A58C029998"
    }
  ];

  return (
    <section 
      id="faq"
      className="relative py-20 px-6 md:px-20"
      style={{
        background: "#0a0515"
      }}
    >

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
          <h3 className="uppercase text-xs tracking-[0.3em] text-purple-400 font-medium">
            FREQUENTLY ASKED
          </h3>
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
        </div>

        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            FAQ
          </span>
        </h2>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <FaqItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>

      <style>
        {`
          .stars-small {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(1px 1px at 10% 10%, rgba(255, 255, 255, 0.7) 50%, transparent 100%),
                        radial-gradient(1px 1px at 30% 30%, rgba(255, 255, 255, 0.5) 50%, transparent 100%),
                        radial-gradient(1px 1px at 50% 50%, rgba(255, 255, 255, 0.3) 50%, transparent 100%),
                        radial-gradient(1px 1px at 70% 70%, rgba(255, 255, 255, 0.5) 50%, transparent 100%),
                        radial-gradient(1px 1px at 90% 90%, rgba(255, 255, 255, 0.7) 50%, transparent 100%);
            background-size: 100px 100px;
          }
          
          .stars-medium {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(1.5px 1.5px at 15% 15%, rgba(255, 255, 255, 0.7) 50%, transparent 100%),
                        radial-gradient(1.5px 1.5px at 35% 35%, rgba(255, 255, 255, 0.5) 50%, transparent 100%),
                        radial-gradient(1.5px 1.5px at 55% 55%, rgba(255, 255, 255, 0.3) 50%, transparent 100%),
                        radial-gradient(1.5px 1.5px at 75% 75%, rgba(255, 255, 255, 0.5) 50%, transparent 100%),
                        radial-gradient(1.5px 1.5px at 95% 95%, rgba(255, 255, 255, 0.7) 50%, transparent 100%);
            background-size: 200px 200px;
          }
          
          .stars-large {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(2px 2px at 20% 20%, rgba(255, 255, 255, 0.7) 50%, transparent 100%),
                        radial-gradient(2px 2px at 40% 40%, rgba(255, 255, 255, 0.5) 50%, transparent 100%),
                        radial-gradient(2px 2px at 60% 60%, rgba(255, 255, 255, 0.3) 50%, transparent 100%),
                        radial-gradient(2px 2px at 80% 80%, rgba(255, 255, 255, 0.5) 50%, transparent 100%);
            background-size: 300px 300px;
          }
        `}
      </style>
    </section>
  );
};

export default FaqSection;
