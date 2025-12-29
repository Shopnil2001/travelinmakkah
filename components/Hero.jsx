'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightCircle } from 'lucide-react';

const Hero = () => {
  // Animation Variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] lg:min-h-[95vh] w-full overflow-hidden flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start px-6 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-12 lg:py-24">
      
      {/* 1. Video Background with Parallax Effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0 h-full w-full"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover brightness-[0.45] saturate-75"
        >
          <source src="/Hajj.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* 2. Dark Vignette Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 sm:from-black/30 via-black/40 to-black/80" />

      {/* 3. Content - STAGGERED ANIMATIONS */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 w-full lg:w-auto max-w-4xl lg:max-w-2xl xl:max-w-4xl mx-auto lg:mx-0 text-center lg:text-left flex flex-col items-center lg:items-start gap-6 lg:gap-8 pt-12 lg:pt-0"
      >
        
        {/* Headline with Floating Effect */}
        <motion.h1 
          variants={itemVariants}
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif leading-[1.1] tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)] font-black w-full"
        >
          Most Trusted Hajj and <br className="hidden sm:block" /> 
          Umrah Agency in <br className="hidden lg:block" />
          Bangladesh
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/90 drop-shadow-lg max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto lg:mx-0 leading-relaxed font-light tracking-wide px-4 sm:px-0"
        >
          Through the gentle guidance of Tarbiyah, shaped by the illuminating 
          principles of the Sunnah, we strive to refine our character and 
          elevate our faith.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="w-full lg:w-fit mt-4">
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(100, 181, 246, 0.3)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center justify-center lg:justify-start gap-4 w-full lg:w-auto rounded-full bg-gradient-to-r from-[#64B5F6] to-[#42A5F5] px-10 py-5 lg:py-6 text-xl lg:text-2xl font-bold text-white shadow-2xl backdrop-blur-sm border border-white/20 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 tracking-wide">Start your Journey</span>
            <ArrowRightCircle className="h-7 w-7 group-hover:translate-x-2 transition-transform duration-300 relative z-10 flex-shrink-0" />
            
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 transform -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* 4. Responsive Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
      
      {/* 5. Scroll Indicator (Animated) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs uppercase tracking-[0.3em] font-medium hidden md:block">Scroll</span>
        <div className="w-[2px] h-12 bg-gradient-to-b from-[#64B5F6] to-transparent rounded-full relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-1/3 bg-white rounded-full shadow-[0_0_10px_white]"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;