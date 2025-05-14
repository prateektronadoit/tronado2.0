import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import "./roadmap.css";
import astroImg from "../assets/astro.png";
// import { MdDownload } from "react-icons/md";

// Roadmap data organized as in the image
type RoadmapItem = {
  year: string;
  quarter: string;
  title: string;
  status?: "completed" | "pending" | "upcoming";
};

// Display roadmap items similar to the image provided
const roadmapItems: RoadmapItem[] = [
  // Column 1
  { year: "2020", quarter: "Q4", title: "Community Building", status: "completed" },
  { year: "2021", quarter: "Q2", title: "Token Distribution", status: "completed" },
  { year: "2021", quarter: "Q3", title: "Exchange Listing", status: "completed" },
  { year: "2021", quarter: "Q4", title: "Launch of Utility App (Beta Version)", status: "completed" },
  { year: "2021", quarter: "Q4", title: "Token Updation", status: "completed" },
  
  // Column 2
  { year: "2022", quarter: "Q2", title: "Asian Exchange", status: "completed" },
  { year: "2022", quarter: "Q3", title: "Utility App Product Delivery", status: "completed" },
  { year: "2022", quarter: "Q3", title: "Token Based Gaming Platform", status: "completed" },
  
  // Column 3
  { year: "2024", quarter: "Q1", title: "Community Expansion Globally", status: "completed" },
  { year: "2024", quarter: "Q2", title: "Updation on Polygon Chain", status: "completed" },
  { year: "2024", quarter: "Q3", title: "Crypto Application Beta Version (Indus Store)", status: "pending" },
  
  // Column 4
  { year: "2025", quarter: "Q1", title: "Crypto App Subscription on Token", status: "upcoming" },
  { year: "2025", quarter: "Q2", title: "Rolling Out Formidable Model Crypto CAFE", status: "upcoming" },
  { year: "2025", quarter: "Q3", title: "Blockchain Lottery", status: "upcoming" },
  { year: "2026", quarter: "Q1", title: "Gadgets with Tronado Token", status: "upcoming" },
  { year: "2026", quarter: "Q3", title: "Listing on 2 Global Exchanges", status: "upcoming" },
];

// Group roadmap items by column as shown in the image
const columns = {
  column1: roadmapItems.slice(0, 5),  // 2020-2021
  column2: roadmapItems.slice(5, 8),   // 2022
  column3: roadmapItems.slice(8, 11),  // 2024
  column4: roadmapItems.slice(11),     // 2025-2026
};

const Roadmap: React.FC = () => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Floating animation for astro
  const floatingAnimation = {
    y: ["-10px", "10px"],
    x: ["-5px", "5px"],
    rotate: [-2, 2],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  };

  // Handle PDF download
  // const handleDownload = () => {
  //   // Create an anchor element and set properties
  //   const link = document.createElement('a');
  //   link.href = '/assets/pdf/Security Assessment Report - Tronado (Final).pdf';
  //   link.download = 'Tronado_Security_Assessment_Report.pdf';
  //   // Append to the document body, click and remove
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <section 
      id="roadmap" 
      className="text-white py-20 px-6 md:px-20 overflow-hidden relative"
      style={{
        background: '#08050f',
        position: 'relative'
      }}
      ref={ref}
    >
      {/* Animated background stars */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          initial={{ opacity: Math.random() * 0.5 + 0.3 }}
          animate={{ 
            opacity: [Math.random() * 0.3 + 0.2, Math.random() * 0.7 + 0.3, Math.random() * 0.3 + 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: Math.random() * 3 + 2, 
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          style={{
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            zIndex: 0
          }}
        />
      ))}

      {/* Astro background */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
        <motion.div 
          className="absolute right-0 bottom-0 w-full h-full"
          initial={{ opacity: 0.8 }}
          animate={floatingAnimation}
        >
          <img 
            src={astroImg} 
            alt="Astronaut" 
            className="absolute right-[-10%] bottom-[-10%] w-[60%] opacity-40"
            style={{ filter: "blur(1px)" }}
          />
        </motion.div>
      </div>

      {/* Glowing orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div 
          key={i}
          className="absolute rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 50) + 50}, ${Math.floor(Math.random() * 200) + 50}, 0.6) 0%, rgba(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 20)}, ${Math.floor(Math.random() * 80)}, 0.2) 70%)`,
            width: Math.random() * 300 + 100 + 'px',
            height: Math.random() * 300 + 100 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            filter: 'blur(40px)',
            opacity: Math.random() * 0.1 + 0.05,
            zIndex: 0
          }}
          animate={{
            x: ['-20px', '20px'],
            y: ['-20px', '20px'],
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Deep space background effect */}
      <div 
        className="absolute inset-0 opacity-40 z-0"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(30, 20, 100, 0.2) 0%, rgba(20, 10, 50, 0.1) 50%, transparent 70%)',
        }}
      ></div>
      
      {/* Galaxy-like overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, rgba(5, 2, 15, 0.7) 0%, rgba(10, 5, 30, 0.4) 100%)',
          mixBlendMode: 'multiply'
        }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-sm uppercase tracking-wider mb-2 flex items-center justify-center gap-2 font-bold text-[#d1caff]">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            Tronado Progress
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Roadmap
            </span>
          </h3>
        </motion.div>
        
        {/* Roadmap Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="roadmap-grid"
        >
          {/* Column 1 */}
          <div className="roadmap-column">
            {columns.column1.map((item, index) => (
              <motion.div 
                key={`col1-${index}`}
                className="roadmap-card p-5"
                variants={itemVariants}
              >
                <div className="quarter-badge">
                  {item.quarter} - {item.year}
                </div>
                <h3 className="roadmap-title">{item.title}</h3>
                {item.status && (
                  <span className={`roadmap-status ${item.status}`}>
                    {item.status === 'completed' ? 'Completed' : 
                     item.status === 'pending' ? 'In Progress' : 'Upcoming'}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="roadmap-column">
            {columns.column2.map((item, index) => (
              <motion.div 
                key={`col2-${index}`}
                className="roadmap-card p-5"
                variants={itemVariants}
              >
                <div className="quarter-badge">
                  {item.quarter} - {item.year}
                </div>
                <h3 className="roadmap-title">{item.title}</h3>
                {item.status && (
                  <span className={`roadmap-status ${item.status}`}>
                    {item.status === 'completed' ? 'Completed' : 
                     item.status === 'pending' ? 'In Progress' : 'Upcoming'}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="roadmap-column">
            {columns.column3.map((item, index) => (
              <motion.div 
                key={`col3-${index}`}
                className="roadmap-card p-5"
                variants={itemVariants}
              >
                <div className="quarter-badge">
                  {item.quarter} - {item.year}
                </div>
                <h3 className="roadmap-title">{item.title}</h3>
                {item.status && (
                  <span className={`roadmap-status ${item.status}`}>
                    {item.status === 'completed' ? 'Completed' : 
                     item.status === 'pending' ? 'In Progress' : 'Upcoming'}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Column 4 */}
          <div className="roadmap-column">
            {columns.column4.map((item, index) => (
              <motion.div 
                key={`col4-${index}`}
                className="roadmap-card p-5"
                variants={itemVariants}
              >
                <div className="quarter-badge">
                  {item.quarter} - {item.year}
                </div>
                <h3 className="roadmap-title">{item.title}</h3>
                {item.status && (
                  <span className={`roadmap-status ${item.status}`}>
                    {item.status === 'completed' ? 'Completed' : 
                     item.status === 'pending' ? 'In Progress' : 'Upcoming'}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Audit Report Download Button
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } }
          }}
        >
          <motion.button
            className="download-report-btn"
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdDownload size={20} />
            Download Audit Report
          </motion.button>
        </motion.div> */}

        {/* Floating space elements */}
        <motion.div 
          className="absolute z-1 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-xl"
          style={{ top: '20%', left: '15%' }}
          animate={{ 
            y: [0, -20, 0], 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute z-1 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-xl"
          style={{ bottom: '20%', right: '10%' }}
          animate={{ 
            y: [0, 20, 0], 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </section>
  );
};

export default Roadmap;
