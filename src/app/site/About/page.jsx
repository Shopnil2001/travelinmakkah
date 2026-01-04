'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Target, Eye, Users, Award, Heart, Shield } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { value: '15', suffix: '+', label: 'Years of Excellence' },
    { value: '10K', suffix: '+', label: 'Happy Pilgrims' },
    { value: '50', suffix: '+', label: 'Expert Guides' },
    { value: '4.9', suffix: '★', label: 'Customer Rating' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Pilgrim First',
      desc: 'Your spiritual journey is our top priority. We design every service around your comfort and peace of mind.',
      accent: 'from-[#C9A962] to-[#E8D5A3]'
    },
    {
      icon: Award,
      title: 'Excellence',
      desc: 'We maintain the highest standards in accommodations, guidance, and service delivery.',
      accent: 'from-[#1E3A5F] to-[#2E5A8F]'
    },
    {
      icon: Shield,
      title: 'Integrity',
      desc: 'Transparency and honesty guide all our dealings. What we promise, we deliver.',
      accent: 'from-[#C9A962] to-[#E8D5A3]'
    },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="1.5" fill="#1E3A5F"/>
              <path d="M0 40h80M40 0v80" stroke="#1E3A5F" strokeWidth="0.5" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-pattern)"/>
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 md:px-12 lg:px-20">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" stroke="#C9A962" strokeWidth="1"/>
            <circle cx="50" cy="50" r="35" stroke="#C9A962" strokeWidth="0.5"/>
            <circle cx="50" cy="50" r="22" stroke="#C9A962" strokeWidth="0.5"/>
          </svg>
        </div>
        <div className="absolute top-20 right-20 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L100 50L50 100L0 50Z" stroke="#1E3A5F" strokeWidth="1"/>
            <path d="M50 20L80 50L50 80L20 50Z" stroke="#1E3A5F" strokeWidth="0.5"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C9A962]"></div>
                <span className="text-[#C9A962] font-medium text-sm tracking-[0.3em] uppercase">
                  Est. 2009
                </span>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C9A962]"></div>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#2D3339] mb-6 tracking-tight">
                About
                <span className="block mt-2 relative">
                  <span className="relative z-10 bg-gradient-to-r from-[#C9A962] to-[#D4BC82] bg-clip-text text-transparent">
                    Travel In Makkah
                  </span>
                  {/* Decorative underline */}
                  <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-64 h-3" viewBox="0 0 200 12" fill="none">
                    <path d="M0 6C50 6 50 2 100 2C150 2 150 10 200 10" stroke="#C9A962" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-[#6B7280] max-w-xl mx-auto text-lg md:text-xl mt-8"
              >
                Your trusted companion for sacred journeys
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-32 px-6 md:px-12 lg:px-20 bg-white relative">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M200 0v200H0" stroke="#1E3A5F" strokeWidth="2"/>
            <path d="M200 50v150H50" stroke="#1E3A5F" strokeWidth="1"/>
            <path d="M200 100v100H100" stroke="#1E3A5F" strokeWidth="0.5"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative"
            >
              {/* Decorative frame */}
              <div className="absolute -inset-4 border-2 border-[#C9A962]/20 rounded-[2rem] transform rotate-2"></div>
              <div className="absolute -inset-4 bg-gradient-to-br from-[#C9A962]/10 via-transparent to-[#1E3A5F]/5 rounded-[2rem] transform -rotate-1"></div>

              <div className="relative h-[450px] md:h-[550px] w-full rounded-3xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(30,58,95,0.25)]">
                <Image
                  src="/about-kaaba.PNG"
                  alt="Pilgrim at the Kaaba"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/50 via-[#1E3A5F]/10 to-transparent" />

                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9A962] to-[#D4BC82] flex items-center justify-center">
                      <span className="text-white font-serif text-lg font-bold">15+</span>
                    </div>
                    <div>
                      <div className="text-xs text-[#6B7280] uppercase tracking-wider">Years of</div>
                      <div className="font-serif text-[#2D3339] font-medium">Excellence</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-[2px] bg-gradient-to-r from-[#C9A962] to-transparent"></div>
                  <span className="text-[#C9A962] text-sm font-medium tracking-[0.2em] uppercase">Our Story</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#2D3339] leading-[1.2]">
                  Discover the Story <br />
                  <span className="text-[#C9A962]">Behind Our Journey</span>
                </h2>
              </div>

              <div className="space-y-5 text-[#6B7280] leading-[1.9] text-lg">
                <p>
                  Welcome to <strong className="text-[#2D3339] font-medium">Travel In Makkah</strong>, your dependable companion on every sacred journey. We are devoted to offering well-organized Hajj and Umrah packages that ensure a smooth and fulfilling pilgrimage for all our respected travelers.
                </p>
                <p>
                  Under the guidance of our expertise, we uphold the true spiritual value of every step you take. Explore our wide range of thoughtfully designed tour packages tailored to your individual needs.
                </p>
                <p>
                  At <strong className="text-[#2D3339] font-medium">Travel In Makkah</strong>, we strive to create a stress-free pilgrimage experience, allowing you to focus solely on the spiritual essence of your journey.
                </p>
              </div>

              {/* Signature line */}
              <div className="flex items-center gap-4 pt-4">
                <div className="w-20 h-[2px] bg-gradient-to-r from-[#C9A962] to-[#D4BC82]"></div>
                <span className="text-[#C9A962] font-serif italic text-lg">Since 2009</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Redesigned */}
      <section className="relative py-24 px-6 md:px-12 lg:px-20 bg-[#1E3A5F] overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="stats-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#C9A962" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stats-pattern)"/>
          </svg>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 border border-[#C9A962]/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border border-[#C9A962]/10 rotate-45"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-white/5 rounded-lg rotate-12"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#C9A962] text-sm font-medium tracking-[0.3em] uppercase">Our Impact</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mt-4"><span className='text-white'>Numbers That Speak</span></h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#C9A962]/30 transition-all duration-500">
                  {/* Large number */}
                  <div className="flex items-baseline justify-center gap-1 mb-3">
                    <span className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-[#C9A962]">
                      {stat.value}
                    </span>
                    <span className="text-2xl md:text-3xl text-[#C9A962]/70 font-light">
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm tracking-wider uppercase">{stat.label}</p>

                  {/* Decorative line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A962] to-transparent group-hover:w-3/4 transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision - Redesigned */}
      <section className="py-24 lg:py-32 px-6 md:px-12 lg:px-20 bg-[#FAF8F5] relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#C9A962]"></div>
              <span className="text-[#C9A962] text-sm font-medium tracking-[0.3em] uppercase">What Guides Us</span>
              <div className="w-8 h-[1px] bg-[#C9A962]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#2D3339]">
              Mission & <span className="text-[#C9A962]">Vision</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
            {/* Connecting element */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-20 h-20 rounded-full bg-[#FAF8F5] border-4 border-[#C9A962]/20 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A962] to-[#D4BC82] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <div className="relative bg-white p-10 lg:p-12 rounded-3xl border border-[#E8E3DA] hover:shadow-[0_20px_60px_-20px_rgba(201,169,98,0.15)] hover:border-[#C9A962]/30 transition-all duration-500 h-full">
                {/* Icon */}
                <div className="absolute -top-6 left-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1E3A5F] to-[#2E5A8F] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="pt-8">
                  <span className="text-[#C9A962] text-sm font-medium tracking-[0.2em] uppercase">Our Purpose</span>
                  <h3 className="text-2xl md:text-3xl font-serif text-[#2D3339] mt-2 mb-6">Mission</h3>
                  <p className="text-[#6B7280] leading-[1.9] text-lg">
                    To provide exceptional pilgrimage services that enable every Muslim to fulfill their spiritual journey with peace of mind, comfort, and complete guidance. We are committed to making sacred travel accessible, meaningful, and memorable.
                  </p>

                  {/* Decorative bottom */}
                  <div className="mt-8 flex items-center gap-3">
                    <div className="w-12 h-[2px] bg-gradient-to-r from-[#1E3A5F] to-transparent"></div>
                    <div className="w-2 h-2 rounded-full bg-[#1E3A5F]/30"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group"
            >
              <div className="relative bg-white p-10 lg:p-12 rounded-3xl border border-[#E8E3DA] hover:shadow-[0_20px_60px_-20px_rgba(201,169,98,0.15)] hover:border-[#C9A962]/30 transition-all duration-500 h-full">
                {/* Icon */}
                <div className="absolute -top-6 left-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C9A962] to-[#D4BC82] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="pt-8">
                  <span className="text-[#C9A962] text-sm font-medium tracking-[0.2em] uppercase">Our Dream</span>
                  <h3 className="text-2xl md:text-3xl font-serif text-[#2D3339] mt-2 mb-6">Vision</h3>
                  <p className="text-[#6B7280] leading-[1.9] text-lg">
                    To become the most trusted guide for pilgrims worldwide, empowering every believer to experience a spiritually fulfilling and transformative journey to the sacred cities of Makkah and Madinah.
                  </p>

                  {/* Decorative bottom */}
                  <div className="mt-8 flex items-center gap-3">
                    <div className="w-12 h-[2px] bg-gradient-to-r from-[#C9A962] to-transparent"></div>
                    <div className="w-2 h-2 rounded-full bg-[#C9A962]/30"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section - Redesigned */}
      <section className="py-24 lg:py-32 px-6 md:px-12 lg:px-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute bottom-0 left-0 w-96 h-96 opacity-5">
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="0" cy="400" r="350" stroke="#1E3A5F" strokeWidth="2"/>
            <circle cx="0" cy="400" r="280" stroke="#1E3A5F" strokeWidth="1"/>
            <circle cx="0" cy="400" r="210" stroke="#1E3A5F" strokeWidth="0.5"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#C9A962] text-sm font-medium tracking-[0.3em] uppercase">What Drives Us</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#2D3339] mt-4">
              Our Core <span className="text-[#C9A962]">Values</span>
            </h2>
            <p className="text-[#6B7280] max-w-xl mx-auto mt-4">
              The principles that guide every decision we make
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <div className="relative h-full">
                  {/* Card */}
                  <div className="relative bg-[#FAF8F5] p-8 lg:p-10 rounded-3xl border border-[#E8E3DA] group-hover:border-[#C9A962]/30 group-hover:shadow-[0_20px_60px_-20px_rgba(201,169,98,0.12)] transition-all duration-500 h-full">
                    {/* Top accent line */}
                    <div className={`absolute top-0 left-8 right-8 h-1 bg-gradient-to-r ${value.accent} rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                    {/* Number */}
                    <div className="absolute top-6 right-6 text-6xl font-serif text-[#E8E3DA] group-hover:text-[#C9A962]/20 transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.accent} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-xl font-serif font-medium text-[#2D3339] mb-4 group-hover:text-[#C9A962] transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-[#6B7280] leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-[#1E3A5F] to-[#152a45] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full border border-[#C9A962]"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full border border-white"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <svg className="w-6 h-6 text-[#C9A962]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span className="text-[#C9A962] text-sm tracking-[0.2em] uppercase">Begin Your Journey</span>
              <svg className="w-6 h-6 text-[#C9A962]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6">
             <span className='text-white'> Ready to Start Your </span><br />
              <span className="text-[#C9A962]">Sacred Journey?</span>
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Let us guide you through an unforgettable pilgrimage experience with care, expertise, and devotion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/site/Packages" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#D4BC82] text-white font-medium rounded-xl hover:shadow-[0_10px_40px_-10px_rgba(201,169,98,0.5)] transition-all duration-300 group">
                Explore Packages
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="/site/Contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-medium rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
