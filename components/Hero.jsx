'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Volume2, VolumeX } from 'lucide-react';

const Hero = () => {
  const sectionRef = useRef(null);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const FADE_DURATION = 500;
  const FADE_STEPS = 20;

  // Fade audio volume smoothly
  const fadeAudio = useCallback((targetVolume, onComplete) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const startVolume = audio.volume;
    const volumeStep = (targetVolume - startVolume) / FADE_STEPS;
    const stepDuration = FADE_DURATION / FADE_STEPS;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      if (currentStep >= FADE_STEPS) {
        audio.volume = targetVolume;
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
        onComplete?.();
      } else {
        audio.volume = Math.max(0, Math.min(1, startVolume + volumeStep * currentStep));
      }
    }, stepDuration);
  }, []);

  // Play with fade in (resumes from current position)
  const playWithFadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audioEnabled) return;

    audio.volume = 0;
    audio.play().then(() => {
      fadeAudio(1);
    }).catch(() => {});
  }, [audioEnabled, fadeAudio]);

  // Pause with fade out (does not reset position)
  const pauseWithFadeOut = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;

    fadeAudio(0, () => {
      audio.pause();
    });
  }, [fadeAudio]);

  // React to visibility changes
  useEffect(() => {
    if (!audioEnabled) return;

    if (isVisible) {
      playWithFadeIn();
    } else {
      pauseWithFadeOut();
    }
  }, [isVisible, audioEnabled, playWithFadeIn, pauseWithFadeOut]);

  // Set up Intersection Observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  // Pause audio when tab/window loses focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioEnabled) return;

      if (document.hidden) {
        pauseWithFadeOut();
      } else if (isVisible) {
        playWithFadeIn();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [audioEnabled, isVisible, playWithFadeIn, pauseWithFadeOut]);

  // Handle click to enable audio (autoplay policy workaround)
  const handleEnableAudio = useCallback(() => {
    if (audioEnabled) return;

    const audio = audioRef.current;
    if (!audio) return;

    setAudioEnabled(true);
    setShowAudioPrompt(false);

    if (isVisible) {
      audio.volume = 0;
      audio.play().then(() => {
        fadeAudio(1);
      }).catch(() => {});
    }
  }, [audioEnabled, isVisible, fadeAudio]);

  // Toggle mute state
  const handleToggleMute = useCallback((e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audio.muted = newMuted;
  }, [isMuted]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <section
      ref={sectionRef}
      onClick={handleEnableAudio}
      className="relative min-h-[90vh] lg:min-h-screen w-full overflow-hidden flex items-center"
      style={{ cursor: !audioEnabled ? 'pointer' : undefined }}
    >
      {/* Background Audio */}
      <audio ref={audioRef} src="/Hajj-Talbiyah.MP3" loop preload="auto" />

      {/* Audio Enable Prompt */}
      {showAudioPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute top-6 right-6 z-30 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 pointer-events-none"
        >
          <span className="text-white/80 text-sm flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            Click anywhere to enable audio
          </span>
        </motion.div>
      )}

      {/* Mute/Unmute Button */}
      {audioEnabled && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={handleToggleMute}
          className="absolute bottom-36 right-6 z-30 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group"
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          ) : (
            <Volume2 className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          )}
        </motion.button>
      )}

      {/* Video Background */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/Hajj.mp4" type="video/mp4" />
        </video>
        {/* Refined overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F]/70 via-[#1E3A5F]/60 to-[#1E3A5F]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 w-full px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Trust Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#6796dd] fill-[#6796dd]" />
                ))}
              </div>
              <span className="text-white/90 text-sm font-medium">Trusted by Worldwide Pilgrims</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium leading-[1.1] tracking-tight text-white mb-6"
          >
            <span className="text-white">Your Sacred Journey</span>
            <br />
            <span className="text-[#7CB9E8]">Begins Here</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed mb-10"
          >
            Experience spiritually fulfilling Hajj and Umrah pilgrimages with complete
            guidance, premium accommodations, and unwavering care every step of the way.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link
              href="/site/Hajj"
              className="group inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-[#1E3A5F] rounded-xl transition-all duration-300 bg-white hover:bg-[#F5F5F5]"
              style={{
                boxShadow: '0 8px 32px rgba(255, 255, 255, 0.2)'
              }}
            >
              Explore Packages
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <Link
              href="/site/Contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Speak With Us
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 pt-10 border-t border-white/20"
          >
            <div className="grid grid-cols-3 gap-8 max-w-lg">
              <div>
                <p className="text-3xl lg:text-4xl font-display font-semibold text-white">15+</p>
                <p className="text-sm text-white/70 mt-1">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl lg:text-4xl font-display font-semibold text-white">10K+</p>
                <p className="text-sm text-white/70 mt-1">Happy Pilgrims</p>
              </div>
              <div>
                <p className="text-3xl lg:text-4xl font-display font-semibold text-white">4.9</p>
                <p className="text-sm text-white/70 mt-1">Star Rating</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-3"
      >
        <span className="text-white/40 text-xs uppercase tracking-[0.25em] font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-4 bg-white"
          />
        </div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAF8F5] to-transparent z-10" />
    </section>
  );
};

export default Hero;
