'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center px-4 sm:px-6">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] opacity-[0.03]"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="#1E3A5F" strokeWidth="0.3"/>
            <polygon points="50,15 85,32.5 85,67.5 50,85 15,67.5 15,32.5" fill="none" stroke="#C9A962" strokeWidth="0.3"/>
            <polygon points="50,25 75,37.5 75,62.5 50,75 25,62.5 25,37.5" fill="none" stroke="#1E3A5F" strokeWidth="0.3"/>
            <polygon points="50,35 65,42.5 65,57.5 50,65 35,57.5 35,42.5" fill="none" stroke="#C9A962" strokeWidth="0.3"/>
          </svg>
        </motion.div>

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 150,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] opacity-[0.04]"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#C9A962" strokeWidth="0.3"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="#1E3A5F" strokeWidth="0.3"/>
            <circle cx="50" cy="50" r="25" fill="none" stroke="#C9A962" strokeWidth="0.3"/>
            <path d="M50 5 L50 95 M5 50 L95 50" stroke="#1E3A5F" strokeWidth="0.2"/>
            <path d="M18 18 L82 82 M82 18 L18 82" stroke="#C9A962" strokeWidth="0.2"/>
          </svg>
        </motion.div>

        {/* Subtle gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#C9A962]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-[#1E3A5F]/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Compass Icon with parallax effect */}
        <motion.div
          style={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          className="mb-8 inline-block"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.2
            }}
            className="relative"
          >
            {/* Outer decorative ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-32 h-32 sm:w-40 sm:h-40 mx-auto"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="48" fill="none" stroke="#E8E3DA" strokeWidth="1" strokeDasharray="4 4"/>
              </svg>
            </motion.div>

            {/* Main compass container */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#152A45] flex items-center justify-center shadow-[0_20px_60px_rgba(30,58,95,0.3)]">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Compass className="w-14 h-14 sm:w-18 sm:h-18 text-[#C9A962]" strokeWidth={1.5} />
              </motion.div>
            </div>

            {/* Pulsing ring */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-[#C9A962]"
            />
          </motion.div>
        </motion.div>

        {/* 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1 className="font-display text-8xl sm:text-9xl md:text-[10rem] font-bold text-[#1E3A5F] leading-none tracking-tight">
            4
            <motion.span
              animate={{
                color: ['#C9A962', '#D4BC82', '#C9A962'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block"
            >
              0
            </motion.span>
            4
          </h1>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex items-center justify-center gap-3 my-6"
        >
          <div className="h-[2px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#C9A962] to-[#C9A962]" />
          <div className="w-2 h-2 rotate-45 bg-[#C9A962]" />
          <div className="h-[2px] w-16 sm:w-24 bg-gradient-to-l from-transparent via-[#C9A962] to-[#C9A962]" />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="space-y-3 mb-10"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#2D3339]">
            Path Not Found
          </h2>
          <p className="text-[#6B7280] text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            The page you're seeking seems to have wandered off the sacred path.
            Let us guide you back to your journey.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#1E3A5F] to-[#2A4A73] text-white font-semibold rounded-2xl shadow-[0_8px_32px_rgba(30,58,95,0.25)] hover:shadow-[0_12px_40px_rgba(30,58,95,0.35)] transition-all duration-300"
            >
              <Home className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>Return Home</span>
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.history.back()}
            className="group flex items-center gap-3 px-8 py-4 bg-white text-[#2D3339] font-semibold rounded-2xl border-2 border-[#E8E3DA] hover:border-[#C9A962] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(201,169,98,0.15)] transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>Go Back</span>
          </motion.button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 pt-8 border-t border-[#E8E3DA]"
        >
          <p className="text-[#6B7280] text-sm mb-4">Popular destinations</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { name: 'Hajj Packages', href: '/site/Hajj' },
              { name: 'Umrah Packages', href: '/site/Umrah' },
              { name: 'About Us', href: '/site/About' },
              { name: 'Contact', href: '/site/Contact' },
            ].map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
              >
                <Link href={link.href}>
                  <span className="inline-block px-4 py-2 text-sm text-[#1E3A5F] hover:text-[#C9A962] bg-white hover:bg-[#1E3A5F]/5 rounded-full border border-[#E8E3DA] hover:border-[#C9A962]/30 transition-all duration-300 cursor-pointer">
                    {link.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom decorative element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent"
      />
    </div>
  );
}
