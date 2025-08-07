

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import RainParticles from '@/components/RainParticles';
import Languages from './Languages';
import ResumeModal from './ResumeModal';

export default function Hero() {
  const [rainMode, setRainMode] = useState(true);

  return (
    <section className="relative text-center py-28 px-6 overflow-hidden bg-black ">
      {/* Conditional Rain Effect */}
      <div className="">
        {rainMode && <RainParticles />}
      </div>

      {/* Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setRainMode(!rainMode)}
        className="fixed top-4 right-4 z-50 bg-gray-900/80 text-white text-sm px-4 py-2 rounded-full shadow-md hover:bg-gray-800 transition-all duration-300"
      >
        {rainMode ? '🌧️ Rain On' : '☀️ Rain Off'}
      </motion.button>

      {/* Hero Content */}
      <div className="relative z-10">
        <motion.h1
          className="text-5xl sm:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight tracking-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          👋 Hi, I’m <span className="whitespace-nowrap">Abel Markos</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Full-Stack Developer ⚙️ building bold, scalable, visually sharp apps with <strong className="text-white">Next.js</strong>, <strong className="text-white">MongoDB</strong>, <strong className="text-white">Cloudinary</strong>, and <strong className="text-white">TailwindCSS</strong>.
        </motion.p>

       <div className="flex items-center gap-4 justify-center">
         <motion.a
          href="#projects"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 500 }}
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-800/30 hover:shadow-pink-700/40 transition-all duration-300"
        >
          🚀 View My Work
        </motion.a>
         <ResumeModal />
       </div>
        <Languages />
      </div>
    </section>
  );
}
