'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md shadow-sm"
    >
      {/* Animated Logo */}
      <motion.h1
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }}
        className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2"
      >
        <span className="text-xl">🚀</span>
        <span><span className="text-blue-500">Abel</span>.Dev</span>
        <span className="text-xl">💻</span>
      </motion.h1>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-8 text-sm font-medium">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="relative text-gray-300 hover:text-blue-400 transition-colors duration-300 hover-underline"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-gray-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Links Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          className="absolute top-full left-0 w-full bg-gray-950 border-t border-gray-800 md:hidden overflow-hidden"
        >
          <div className="flex flex-col items-start px-6 py-4 space-y-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-blue-400 w-full"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
