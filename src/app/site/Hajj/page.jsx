'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import api from '@/lib/api';
import PackageCard from '../../../../components/ui/packageCard';
import dynamic from 'next/dynamic';

// Dynamically import PdfViewer to avoid SSR issues with react-pdf
const PdfViewer = dynamic(() => import('../../../../components/PdfViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden shadow-lg">
      <div className="p-6 border-b border-[#E8E3DA]">
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="flex items-center justify-center bg-[#FAF8F5]" style={{ height: 500 }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#64B5F6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B7280]">Loading PDF Viewer...</p>
        </div>
      </div>
    </div>
  )
});

const HajjPage = () => {
  const formRef = useRef(null);
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const [packages, setPackages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    passportNo: '',
    packageName: '',
  });

  // Hajj Guide sections data
  const sections = [
    {
      step: "01",
      title: "Preparation and entering Ihram",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2L20 10L29 11.5L22.5 18L24 27L16 22.5L8 27L9.5 18L3 11.5L12 10L16 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      ),
      items: [
        { label: "Preparation", text: "Begin with spiritual and physical preparations, including sincere repentance, settling debts, and ensuring good health." },
        { label: "Intention (Niyyah)", text: "Make a sincere intention to perform Hajj solely for Allah." },
        { label: "Ihram", text: "After a purifying bath and trimming nails/hair, wear the Ihram garments (two white seamless cloths for men; modest, loose clothing for women) and enter the state of ritual purity." },
        { label: "Talbiyah", text: "Recite the Talbiyah continuously: 'Labbayka Allaahumma labbayk, Labbayka laa shareeka laka labbayk. Inna al-hamda, wa n-nimata, Laka wal mulk, Laa shareeka lak.'" }
      ]
    },
    {
      step: "02",
      title: "Days of Hajj",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="6" width="24" height="22" rx="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M4 12H28" stroke="currentColor" strokeWidth="2"/>
          <path d="M10 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M22 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      items: [
        { label: "8th of Dhul-Hijjah", text: "Travel to Mina and spend the day there in prayer and rest." },
        { label: "9th of Dhul-Hijjah (Day of Arafah)", text: "Travel to Arafat. This is a crucial day of worship and supplication. After sunset, proceed to Muzdalifah." },
        { label: "10th of Dhul-Hijjah", text: "After Fajr prayer, move from Muzdalifah to Mina. Perform the Ramy ritual at the Jamarat al-Aqaba (stoning of the largest pillar). After stoning, offer an animal sacrifice (Qurbani), then shave or trim your hair." }
      ]
    },
    {
      step: "03",
      title: "Post-stoning and completion",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 8V16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      items: [
        { label: "Tawaf al-Ifadah", text: "Travel to Makkah to perform the Tawaf (seven circuits around the Kaaba) and Sa'i (running between Safa and Marwa)." },
        { label: "Return to Mina", text: "After completing the Tawaf and Sa'i, return to Mina and spend the night." },
        { label: "Subsequent days", text: "On the 11th and 12th of Dhul-Hijjah, repeat the Ramy ritual for all three Jamarat. You may leave Mina after the second day if you wish, but you must have completed the rituals." }
      ]
    },
    {
      step: "04",
      title: "Final steps",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 16L13 23L26 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      items: [
        { label: "Farewell Tawaf (Tawaf al-Wida)", text: "Before leaving Makkah, perform the Farewell Tawaf. This is the final ritual, and it is not performed by those who perform the other Tawaf in the correct order, but by the others." }
      ]
    }
  ];

  useEffect(() => {
    const fetchAndSync = async () => {
      try {
        const res = await api.get('/packages');
        const hajjOnly = res.data.filter((pkg) => pkg.category === 'Hajj');
        setPackages(hajjOnly);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    fetchAndSync();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePackageClick = (id) => {
    router.push(`/site/Hajj/${id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_PRIVATE_KEY,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLET_ID1,
        {
          subject_title: `Hajj Booking: ${formData.packageName}`,
          name: formData.fullName,
          mobile: formData.mobileNumber,
          email: formData.email,
          passport_no: formData.passportNo,
          message: 'No specific message provided.',
          time: new Date().toLocaleString(),
        },
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
      );
      alert('Application Received! We will contact you soon.');
      setFormData({
        fullName: '',
        mobileNumber: '',
        email: '',
        passportNo: '',
        packageName: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to send application. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  // Input class with blue accent
  const inputClass =
    'w-full px-4 py-3.5 bg-white border-2 border-blue-100 rounded-lg ' +
    'text-slate-800 placeholder-slate-400 font-medium ' +
    'focus:outline-none focus:border-[#64B5F6] focus:ring-4 focus:ring-[#64B5F6]/10 ' +
    'hover:border-blue-300 hover:shadow-sm ' +
    'transition-all duration-300';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8faf9] via-white to-[#f0f7f4] overflow-hidden">
      {/* Decorative Islamic Pattern Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="#2d4f43" strokeWidth="1"/>
              <circle cx="30" cy="30" r="8" fill="none" stroke="#2d4f43" strokeWidth="1"/>
              <path d="M30 0L30 22M30 38L30 60M0 30L22 30M38 30L60 30" stroke="#2d4f43" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)"/>
        </svg>
      </div>

      {/* ========== SECTION 1: HAJJ GUIDE HEADER ========== */}
      <section className="relative pt-20 pb-16 text-center">
        {/* Decorative Arc */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10">
          <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 300C0 134.315 134.315 0 300 0C465.685 0 600 134.315 600 300" stroke="#64B5F6" strokeWidth="2"/>
            <path d="M50 300C50 161.929 161.929 50 300 50C438.071 50 550 161.929 550 300" stroke="#64B5F6" strokeWidth="1"/>
            <path d="M100 300C100 189.543 189.543 100 300 100C410.457 100 500 189.543 500 300" stroke="#64B5F6" strokeWidth="0.5"/>
          </svg>
        </div>

        <div className="relative z-10">
          <span className="inline-block text-[#64B5F6] text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Your Sacred Journey
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#2d4f43] tracking-tight">
            Complete Hajj
            <span className="block mt-2">
              <span className="relative inline-block">
                <span className="relative z-10 text-white px-6 py-2">Guide</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#64B5F6] to-[#42A5F5] rounded-xl transform -skew-x-3"></span>
              </span>
            </span>
          </h1>
        </div>
      </section>

      {/* ========== SECTION 2: HAJJ GUIDE HERO WITH TEXT ========== */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-16 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-[2px] bg-gradient-to-r from-[#64B5F6] to-transparent"></div>
                <span className="text-[#64B5F6] text-sm font-medium tracking-wider uppercase">Understanding Hajj</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-[#2d4f43] leading-[1.2]">
                How to Perform Hajj: <br />
                <span className="text-[#64B5F6]">A Detailed Guide</span>
              </h2>
            </div>
            <p className="text-[#5a6360] leading-[1.9] text-lg">
              Hajj, meaning &apos;pilgrimage&apos; in Arabic, is the sacred journey to the holy city of <strong className="text-[#2d4f43] font-medium">Makkah</strong>. It is an obligation for every Muslim who is physically and financially able, and it must be performed during the first ten days of <strong className="text-[#2d4f43] font-medium">Dhu al-Hijjah</strong>, the final month of the Islamic lunar calendar.
            </p>
            <p className="text-[#5a6360] leading-[1.9] text-lg">
              Considered one of the greatest acts of worship, Hajj nurtures goodness, humility, inner peace, and sincere devotion to <strong className="text-[#2d4f43] font-medium">Allah</strong>.
            </p>

            {/* Stats Row */}
            <div className="flex gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-serif text-[#64B5F6]">5</div>
                <div className="text-xs text-[#5a6360] tracking-wider uppercase mt-1">Days</div>
              </div>
              <div className="w-px bg-gradient-to-b from-transparent via-[#64B5F6]/30 to-transparent"></div>
              <div className="text-center">
                <div className="text-3xl font-serif text-[#64B5F6]">4</div>
                <div className="text-xs text-[#5a6360] tracking-wider uppercase mt-1">Pillars</div>
              </div>
              <div className="w-px bg-gradient-to-b from-transparent via-[#64B5F6]/30 to-transparent"></div>
              <div className="text-center">
                <div className="text-3xl font-serif text-[#64B5F6]">∞</div>
                <div className="text-xs text-[#5a6360] tracking-wider uppercase mt-1">Blessings</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#64B5F6]/20 via-transparent to-[#2d4f43]/10 rounded-[3rem] transform rotate-2"></div>
              <div className="absolute -inset-4 border-2 border-[#64B5F6]/20 rounded-[3rem] transform -rotate-1"></div>

              <div className="relative h-[400px] md:h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-[0_25px_80px_-15px_rgba(100,181,246,0.3)]">
                <Image
                  src="/hajj-hero.webp"
                  alt="Makkah Clock Tower and Kaaba"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d4f43]/40 via-transparent to-transparent"></div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-[#64B5F6]/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#64B5F6] to-[#42A5F5] flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-[#5a6360]">Fifth Pillar of</div>
                    <div className="font-serif text-[#2d4f43] font-medium">Islam</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 3: FOUR PILLARS OF HAJJ ========== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 mb-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-[#64B5F6] text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Step by Step
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#2d4f43] mb-6">
            The Four Fundamental Pillars of Hajj
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#64B5F6] to-transparent mx-auto"></div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-16 mb-24">
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-3xl shadow-[0_4px_40px_-10px_rgba(45,79,67,0.1)] hover:shadow-[0_8px_60px_-10px_rgba(100,181,246,0.2)] transition-all duration-500 overflow-hidden"
            >
              {/* Left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#64B5F6] to-[#42A5F5] rounded-l-3xl"></div>

              <div className="p-8 md:p-10 pl-10 md:pl-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-8">
                  {/* Step number */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f0f7f4] to-[#e8f4fc] flex items-center justify-center border border-[#64B5F6]/10 group-hover:scale-105 transition-transform duration-300">
                        <span className="text-2xl font-serif text-[#64B5F6] font-medium">{section.step}</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-[#64B5F6] text-white flex items-center justify-center">
                        {section.icon}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-serif text-[#2d4f43] group-hover:text-[#64B5F6] transition-colors duration-300">
                      {section.title}
                    </h3>
                  </div>
                </div>

                {/* Items Grid */}
                <div className="grid gap-4">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className="relative pl-6 py-4 pr-4 bg-gradient-to-r from-[#f8faf9] to-transparent rounded-xl border-l-2 border-[#64B5F6]/30 hover:border-[#64B5F6] hover:from-[#f0f7f4] transition-all duration-300"
                    >
                      <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#64B5F6]"></div>
                      <p className="text-[#5a6360] leading-[1.8]">
                        <strong className="text-[#2d4f43] font-medium">{item.label}:</strong>{' '}
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative corner pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 0L100 100L0 100" stroke="#2d4f43" strokeWidth="2"/>
                  <path d="M100 25L100 100L25 100" stroke="#2d4f43" strokeWidth="1.5"/>
                  <path d="M100 50L100 100L50 100" stroke="#2d4f43" strokeWidth="1"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== SECTION 4: BOOKING FORM ========== */}
      <section
        ref={formRef}
        className="py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-12 lg:px-20 relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white"
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e88e5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main Card with asymmetric design */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-[0_25px_80px_-20px_rgba(100,181,246,0.2)]">

              {/* Top decorative bar */}
              <div className="h-2 bg-gradient-to-r from-[#64B5F6] via-[#42A5F5] to-[#64B5F6]" />

              <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[600px]">

                {/* Left: Image Section (2 cols) */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="lg:col-span-2 relative order-1"
                >
                  <div className="relative h-[300px] lg:h-full w-full">
                    <Image
                      src="/hajj.webp"
                      alt="Hajj Pilgrimage"
                      fill
                      priority
                      className="object-cover"
                    />
                    {/* Overlay gradients */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-white/50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-900/20 to-transparent" />

                    {/* Floating Year Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="absolute top-6 left-6"
                    >
                      <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                        <p className="text-[#64B5F6] font-bold text-2xl">{currentYear}</p>
                        <p className="text-blue-500/70 text-xs font-medium tracking-wider uppercase">Hajj Season</p>
                      </div>
                    </motion.div>

                    {/* Bottom caption on image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                        <p className="text-white font-serif text-lg text-center">
                          &quot;And proclaim to the people the Hajj&quot;
                        </p>
                        <p className="text-blue-200 text-sm text-center mt-1">
                          Surah Al-Hajj, 22:27
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right: Form Section (3 cols) */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="lg:col-span-3 p-6 md:p-10 lg:p-12 order-2 flex flex-col justify-center"
                >
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 mb-6">
                    <span className="bg-[#64B5F6] text-white px-3 py-1.5 rounded-md text-sm font-bold tracking-wide">
                      HAJJ
                    </span>
                    <span className="text-[#64B5F6] text-sm font-medium">
                      The Fifth Pillar of Islam
                    </span>
                  </div>

                  {/* Header */}
                  <div className="space-y-4 mb-8">
                    <h2 className="text-3xl md:text-4xl font-serif text-slate-800 leading-tight">
                      Embark on the{' '}
                      <span className="text-[#64B5F6]">Greatest Journey</span>{' '}
                      of Your Life
                    </h2>
                    <p className="text-slate-500 leading-relaxed max-w-xl">
                      Begin your spiritual journey with confidence. Travel in Makkah is the trusted
                      name in Hajj services, offering comprehensive packages designed for a
                      blessed and comfortable pilgrimage.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Package Select */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Select Your Package
                      </label>
                      <select
                        name="packageName"
                        value={formData.packageName}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-blue-50/50 border-2 border-blue-200 rounded-lg
                                   text-slate-800 font-medium
                                   focus:outline-none focus:border-[#64B5F6] focus:ring-4 focus:ring-[#64B5F6]/10
                                   hover:border-blue-400
                                   transition-all duration-300 cursor-pointer appearance-none"
                        required
                      >
                        <option value="">Choose a Hajj Package</option>
                        {packages.map((pkg) => (
                          <option key={pkg._id} value={pkg.title}>
                            {pkg.title}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 bottom-4 pointer-events-none">
                        <svg className="w-5 h-5 text-[#64B5F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Input Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Mobile Number</label>
                        <input
                          type="text"
                          name="mobileNumber"
                          placeholder="Enter mobile number"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          required
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Passport Number</label>
                        <input
                          type="text"
                          name="passportNo"
                          placeholder="Enter passport number"
                          value={formData.passportNo}
                          onChange={handleChange}
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <motion.button
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSending}
                        className="group relative w-full md:w-auto px-10 py-4 overflow-hidden
                                   bg-gradient-to-r from-[#64B5F6] to-[#42A5F5]
                                   text-white font-semibold text-base
                                   rounded-lg shadow-lg shadow-[#64B5F6]/25
                                   disabled:opacity-60 disabled:cursor-not-allowed
                                   transition-all duration-300
                                   hover:shadow-xl hover:shadow-[#64B5F6]/30"
                      >
                        {/* Shine effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                        <span className="relative flex items-center justify-center gap-3">
                          {isSending ? (
                            <>
                              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <span>Reserve Your Place</span>
                              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </>
                          )}
                        </span>
                      </motion.button>
                    </div>

                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center gap-6 pt-4">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#64B5F6]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                        </div>
                        <span>Dedicated Support</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#64B5F6]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>Premium Service</span>
                      </div>
                    </div>
                  </form>
                </motion.div>
              </div>
            </div>

            {/* Decorative floating element */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-20 h-20 md:w-24 md:h-24
                         bg-gradient-to-br from-[#64B5F6] to-[#1e88e5]
                         rounded-full flex items-center justify-center
                         shadow-xl shadow-[#64B5F6]/30 rotate-12"
            >
              <span className="text-white text-3xl md:text-4xl -rotate-12">☪</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========== SECTION 5: PACKAGES ========== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-gradient-to-b from-white to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-block bg-blue-100 text-[#64B5F6] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Choose Your Package
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-800">
              Our Hajj <span className="text-[#64B5F6]">Packages</span>
            </h2>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-300" />
              <div className="w-2 h-2 rounded-full bg-[#64B5F6]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-300" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg._id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PackageCard
                  title={pkg.title}
                  price={pkg.price}
                  duration={pkg.duration}
                  inclusions={pkg.inclusions}
                  ctaLabel="View Details"
                  onClick={() => handlePackageClick(pkg._id)}
                />
              </motion.div>
            ))}
          </div>

          {packages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-400">No Hajj packages available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* ========== SECTION 6: CLOSING DUA ========== */}
      <section className="max-w-4xl mx-auto px-6 lg:px-16 mt-20">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <svg className="w-16 h-16 text-[#64B5F6]/20" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 4L36 16H48L38 24L42 36L32 28L22 36L26 24L16 16H28L32 4Z" fill="currentColor"/>
            </svg>
          </div>

          <div className="bg-gradient-to-br from-[#2d4f43] to-[#1a332d] rounded-[2rem] p-10 md:p-14 text-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dua-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="2" fill="white"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dua-pattern)"/>
              </svg>
            </div>

            <div className="relative z-10">
              <div className="text-[#64B5F6] mb-6">
                <svg className="w-10 h-10 mx-auto opacity-60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p className="text-white/90 text-xl md:text-2xl font-serif leading-relaxed mb-6">
                May Allah (SWT) accept your pilgrimage and grant you Hajj Mabrur.
              </p>
              <p className="text-[#64B5F6] text-2xl md:text-3xl font-serif">
                Ameen
              </p>
              <div className="mt-8 flex justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#64B5F6]/40"></div>
                <div className="w-2 h-2 rounded-full bg-[#64B5F6]/60"></div>
                <div className="w-2 h-2 rounded-full bg-[#64B5F6]/40"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 7: PDF GUIDE ========== */}
      <section className="max-w-5xl mx-auto px-6 lg:px-16 mt-20 pb-24">
        <div className="text-center mb-10">
          <span className="inline-block text-[#64B5F6] text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Download Guide
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#2d4f43] mb-4">
            Complete Hajj Guide PDF
          </h2>
          <p className="text-[#5a6360] max-w-xl mx-auto">
            Access our comprehensive Hajj guide document with detailed instructions,
            duas, and step-by-step procedures.
          </p>
        </div>

        <PdfViewer section="HAJJ_GUIDE" accentColor="#64B5F6" maxHeight={600} />
      </section>
    </div>
  );
};

export default HajjPage;
