import React from "react";
import { motion } from "framer-motion";
import astroImage from "../assets/astro.png"; // ✅ Correct image import
import auditReportPdf from "../assets/pdf/Security Assessment Report -Tronado (Final).pdf";
import whitepaperPdf from "../assets/pdf/Tronado White Paper.pdf";

const WhitepaperSection: React.FC = () => {
  return (
    <section
      className="relative text-white px-6 md:px-20 py-20"
      style={{
        background: "linear-gradient(135deg, #170a23 0%, #190f28 100%)",
      }}
    >
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at center, rgba(150, 100, 255, 0.2) 0%, rgba(90, 50, 150, 0.1) 50%, transparent 70%)",
        }}
      ></div>

      <div className="relative z-10 text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
          <h3 className="uppercase text-xs tracking-[0.3em] text-purple-400 font-medium">
            OFFICIAL DOCUMENTS
          </h3>
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
        </div>
        <h2 className="text-4xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Whitepaper
          </span>
        </h2>
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-10 rounded-2xl overflow-hidden border border-purple-500/20 bg-[#190f28]/50 backdrop-blur-sm shadow-xl">
        {/* Left: Background Image with bluish-black overlay */}
        <div
          className="relative min-h-[500px] bg-cover bg-center"
          style={{ backgroundImage: `url(${astroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0c1f]/80 to-[#09071a]/80 mix-blend-multiply"></div>
        </div>

        {/* Right: Content Block */}
        <div className="flex flex-col justify-between py-10 px-6 md:px-12 space-y-10 bg-gradient-to-br from-[#1a0f2a]/80 to-[#190d20]/80 backdrop-blur-sm">
          {/* Audit Results */}
          <div className="group">
            <h3 className="text-2xl font-bold text-[#d1caff] mb-3 relative inline-block">
              Audit Results
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <p className="text-gray-300 mb-6">
              Tronado has been successfully audited by the trusted organizations
              like 0xcommit. Passing these audits underscores our dedication to
              building a safe and robust solution for all users.
            </p>
            <motion.a
              href={auditReportPdf}
              download="Security Assessment Report - Tronado.pdf"
              className="relative inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600/10 to-purple-900/10 border border-purple-500/30 text-[#d1caff] shadow-md hover:shadow-purple-500/20 group overflow-hidden"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="pr-2 group-hover:-translate-x-1 transition-transform relative z-10">←</span>
              <span className="relative z-10">Download Audit Report</span>
              <span className="pl-2 group-hover:translate-x-1 transition-transform relative z-10">→</span>
            </motion.a>
          </div>

          <hr className="border-t border-purple-500/20" />

          {/* Explore Whitepaper */}
          <div className="group">
            <h3 className="text-2xl font-bold text-[#d1caff] mb-3 relative inline-block">
              Explore Whitepaper
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <p className="text-gray-300 mb-6">
              Here is our full document that helps you to understand deeply
              about us and our operation.
            </p>
            <motion.a
              href={whitepaperPdf}
              download="Tronado White Paper.pdf"
              className="relative inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600/10 to-purple-900/10 border border-purple-500/30 text-[#d1caff] shadow-md hover:shadow-purple-500/20 group overflow-hidden"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="pr-2 group-hover:-translate-x-1 transition-transform relative z-10">←</span>
              <span className="relative z-10">Download Whitepaper</span>
              <span className="pl-2 group-hover:translate-x-1 transition-transform relative z-10">→</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhitepaperSection;
