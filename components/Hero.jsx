'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden flex items-center px-6 md:px-12 lg:px-24">
      {/* 1. Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* 2. Mint Overlay & Pattern */}
      <div 
        className="absolute inset-0 z-10 opacity-80"
        style={{
          background: 'linear-gradient(135deg, #d1e9df 0%, #e8f4f0 100%)',
          backgroundImage: `url('/geometric-pattern.png')`, // Upload the pattern from your image
          backgroundSize: 'cover',
          mixBlendMode: 'multiply'
        }}
      />

      {/* 3. Content */}
      <div className="relative z-20 max-w-3xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif text-[#2d4f43] leading-[1.1]"
        >
          Most Trusted Hajj and <br /> Umrah Agency in <br /> Bangladesh
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-lg md:text-xl text-[#5a6360] leading-relaxed max-w-xl"
        >
          Through the gentle guidance of Tarbiyah, shaped by the illuminating 
          principles of the Sunnah, we strive to refine our character and 
          elevate our faith.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 flex items-center gap-3 rounded-xl bg-[#00a651] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#008f45]"
        >
          Start your Journey
          <ArrowRightCircle className="h-6 w-6" />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;