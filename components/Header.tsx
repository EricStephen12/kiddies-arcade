"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LOGO from '@/public/images/logo.webp'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigateTo = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 lg:py-6">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center overflow-hidden">
              <Image 
                src={LOGO}
                alt="LOVEWORLD Kiddies Game Arcade"
                width={48}
                height={48}
                className="w-full h-full object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl';
                  fallback.textContent = 'L';
                  target.parentNode?.appendChild(fallback);
                }}
              />
            </div>
            <div>
              <h1 className="text-white font-black text-lg sm:text-xl lg:text-2xl">JOYCALL</h1>
              <p className="text-blue-400 text-xs sm:text-sm font-medium">KIDDIES GAME ARCADE</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => navigateTo('/')} className="text-white/80 hover:text-white transition-colors duration-300 font-medium cursor-pointer">Home</button>
            <button onClick={() => navigateTo('/arcade')} className="text-white/80 hover:text-white transition-colors duration-300 font-medium cursor-pointer">Games</button>
            <button onClick={() => navigateTo('/about')} className="text-white/80 hover:text-white transition-colors duration-300 font-medium cursor-pointer">About</button>
            <motion.button 
              onClick={() => navigateTo('/arcade')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Now
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMobileMenu}
            className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20"
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className="w-5 h-0.5 bg-white rounded-full"
              animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span 
              className="w-5 h-0.5 bg-white rounded-full"
              animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span 
              className="w-5 h-0.5 bg-white rounded-full"
              animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -4 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            height: isMobileMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <nav className="py-4 space-y-4 border-t border-white/10">
            <button onClick={() => navigateTo('/')} className="block text-white/80 hover:text-white transition-colors duration-300 font-medium py-2 w-full text-left">Home</button>
            <button onClick={() => navigateTo('/arcade')} className="block text-white/80 hover:text-white transition-colors duration-300 font-medium py-2 w-full text-left">Games</button>
            <button onClick={() => navigateTo('/about')} className="block text-white/80 hover:text-white transition-colors duration-300 font-medium py-2 w-full text-left">About</button>
            <motion.button 
              onClick={() => navigateTo('/arcade')}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 mt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Play Now
            </motion.button>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
}
