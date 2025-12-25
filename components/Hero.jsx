'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] lg:min-h-[95vh] w-full overflow-hidden flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start px-6 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-12 lg:py-24">
      {/* 1. Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover brightness-50 saturate-75"
      >
        <source src="/Hajj.mp4" type="video/mp4" />
      </video>

      {/* 2. Dark Vignette Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 sm:from-black/30 via-black/50 to-black/70" />

      {/* 3. Content - LEFT ALIGNED ON LARGE SCREENS */}
      <div className="relative z-20 w-full lg:w-auto max-w-4xl lg:max-w-2xl xl:max-w-3xl mx-auto lg:mx-0 text-center lg:text-left flex flex-col items-center lg:items-start gap-6 lg:gap-8 pt-12 lg:pt-0 pl-0 lg:pl-8 xl:pl-12">
        
        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-[1.1] tracking-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] font-black w-full lg:w-auto"
        >
          Most Trusted Hajj and <br className="hidden sm:block" /> 
          Umrah Agency in <br className="hidden lg:block" />
          Bangladesh
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/95 drop-shadow-lg max-w-xl lg:max-w-lg xl:max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light tracking-wide px-4 sm:px-0 lg:px-0"
        >
          Through the gentle guidance of Tarbiyah, shaped by the illuminating 
          principles of the Sunnah, we strive to refine our character and 
          elevate our faith.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full lg:w-fit mt-4 lg:mt-0"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center justify-center lg:justify-start gap-3 w-full lg:w-auto rounded-2xl bg-gradient-to-r from-[#00a651] via-[#00a651] to-[#008f45] px-8 py-5 lg:py-6 text-lg lg:text-xl xl:text-2xl font-bold text-white shadow-2xl hover:shadow-emerald-500/50 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 tracking-wide">Start your Journey</span>
            <ArrowRightCircle className="h-6 w-6 lg:h-7 lg:w-7 group-hover:translate-x-1 transition-transform duration-300 relative z-10 flex-shrink-0" />
            
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </motion.button>
        </motion.div>
      </div>

      {/* 4. Responsive Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 md:h-28 lg:h-32 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
      
      {/* 5. Mobile Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-6 left-1/2 lg:right-12 lg:left-auto transform -translate-x-1/2 lg:translate-x-0 lg:hidden z-20"
      >
        <div className="w-1 h-10 bg-white/60 backdrop-blur-sm rounded-full animate-pulse shadow-lg" />
      </motion.div>
    </section>
  );
};

export default Hero;
