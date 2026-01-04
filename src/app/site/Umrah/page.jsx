'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import api from '@/lib/api';
import PackageCard from '../../../../components/ui/packageCard';
import { useRouter } from 'next/navigation';

const UmrahBookingSection = () => {
  const formRef = useRef(null);
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
  const router = useRouter();

  const handlePackageClick = (id) => {
    router.push(`/site/Umrah/${id}`);
  };

  useEffect(() => {
    const fetchAndSync = async () => {
      try {
        const res = await api.get('/packages');
        const umrahOnly = res.data.filter((pkg) => pkg.category === 'Umrah');
        setPackages(umrahOnly);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchAndSync();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_PRIVATE_KEY,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLET_ID1,
        {
          subject_title: `Umrah Booking: ${formData.packageName}`,
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
      alert('Failed to send.');
    } finally {
      setIsSending(false);
    }
  };

  // Stable input class - using golden theme for form
  const inputClass =
    'w-full px-4 py-3.5 bg-white border-2 border-[#c9a227]/25 rounded-xl ' +
    'text-slate-800 placeholder-slate-400 font-medium ' +
    'focus:outline-none focus:border-[#c9a227] focus:ring-4 focus:ring-[#c9a227]/15 ' +
    'hover:border-[#c9a227]/50 hover:shadow-md hover:shadow-[#c9a227]/10 ' +
    'transition-all duration-300';

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* FORM SECTION */}
      <section
        ref={formRef}
        className="py-12 md:py-20 px-4 sm:px-8 md:px-12 lg:px-24 relative overflow-hidden"
        style={{
          backgroundImage: `url('/extra bg-1.png')`,
          backgroundSize: '450px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
        }}
      >
        {/* Layered overlays for depth - Gold & Blue subtle tints */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-slate-50/90 to-white/95 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,162,39,0.06)_0%,_transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(100,181,246,0.08)_0%,_transparent_50%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-7xl mx-auto relative z-10"
        >
          {/* Main Card */}
          <div
            className="relative rounded-2xl overflow-hidden bg-white
                       border border-[#64B5F6]/30
                       shadow-[0_20px_60px_-15px_rgba(100,181,246,0.2),0_8px_25px_-8px_rgba(201,162,39,0.1)]"
          >
            {/* Decorative top border accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c9a227] via-[#c9a227]/50 to-[#c9a227]" />

            {/* Elegant Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
            >
              <div className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#c9a227] via-[#c9a227]/80 to-[#c9a227] rounded-b-xl shadow-lg">
                <span className="text-white">✦</span>
                <span className="text-white font-serif text-base md:text-lg tracking-wide">Umrah</span>
                <div className="h-4 w-px bg-white mx-1" />
                <span className="text-white text-sm font-light tracking-wider">
                  Pilgrimage {currentYear}
                </span>
                <span className="text-white">✦</span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 p-6 pt-16 md:p-10 md:pt-20 lg:p-14 lg:pt-20">
              {/* Left Column: Text + Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-6 order-2 lg:order-1"
              >
                {/* Header */}
                <div className="space-y-3">
                  <p className="text-[#c9a227] font-semibold tracking-widest text-xs uppercase">
                    Begin Your Sacred Journey
                  </p>
                  <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-serif text-slate-800 leading-tight">
                    Where Your Dreams Find{' '}
                    <span className="text-[#c9a227]">Perfect Guidance</span>
                  </h2>
                </div>

                <p className="text-slate-500 text-base leading-relaxed max-w-lg">
                  Plan your Umrah with ease. Travel In Makkah, Bangladesh&apos;s trusted agency,
                  offers packages designed for your comfort and spiritual growth.{' '}
                  <span className="text-[#c9a227] font-semibold">Limited slots available.</span>
                </p>

                {/* Form Section */}
                <div className="pt-4">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px flex-1 bg-gradient-to-r from-[#c9a227]/50 to-transparent" />
                    <h4 className="text-sm font-bold text-slate-700 tracking-wider uppercase">
                      Reserve Your Place
                    </h4>
                    <div className="h-px flex-1 bg-gradient-to-l from-[#c9a227]/50 to-transparent" />
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Package Select */}
                    <div className="relative">
                      <select
                        name="packageName"
                        value={formData.packageName}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-gradient-to-r from-[#c9a227]/5 to-[#c9a227]/10
                                   border-2 border-[#c9a227]/30 rounded-xl
                                   text-slate-800 font-medium
                                   focus:outline-none focus:border-[#c9a227] focus:ring-4 focus:ring-[#c9a227]/15
                                   hover:border-[#c9a227]/50 hover:shadow-md hover:shadow-[#c9a227]/10
                                   transition-all duration-300 cursor-pointer appearance-none"
                        required
                      >
                        <option value="">Select Your Umrah Package</option>
                        {packages.map((pkg) => (
                          <option key={pkg._id} value={pkg.title}>
                            {pkg.title}
                          </option>
                        ))}
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-[#c9a227]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Input Grid - Using stable inline classes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                      <input
                        type="text"
                        name="mobileNumber"
                        placeholder="Mobile Number *"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                      <input
                        type="text"
                        name="passportNo"
                        placeholder="Passport Number *"
                        value={formData.passportNo}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3">
                      <motion.button
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSending}
                        className="group relative w-full md:w-auto px-10 py-4 overflow-hidden
                                   bg-gradient-to-r from-[#c9a227] via-[#d4af37] to-[#c9a227]
                                   text-white font-semibold text-base tracking-wide
                                   rounded-xl shadow-lg shadow-[#c9a227]/30
                                   disabled:opacity-60 disabled:cursor-not-allowed
                                   transition-all duration-300
                                   hover:shadow-xl hover:shadow-[#c9a227]/40"
                      >
                        {/* Button shine effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                        <span className="relative flex items-center justify-center gap-2">
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
                              <span>Begin Your Journey</span>
                              <span className="group-hover:translate-x-1 transition-transform duration-300">
                                →
                              </span>
                            </>
                          )}
                        </span>
                      </motion.button>
                    </div>

                    {/* Trust indicators */}
                    <div className="flex flex-wrap items-center gap-5 pt-3 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#c9a227]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <span>Secure Booking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#c9a227]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Trusted Agency</span>
                      </div>
                    </div>
                  </form>
                </div>
              </motion.div>

              {/* Right Column: Image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative order-1 lg:order-2"
              >
                <div className="relative h-[280px] sm:h-[380px] md:h-[450px] lg:h-[520px] w-full">
                  {/* Decorative frame */}
                  <div className="absolute -inset-2 border-2 border-[#c9a227]/20 rounded-2xl" />
                  <div className="absolute -inset-4 border border-[#64B5F6]/15 rounded-2xl" />

                  {/* Main image container */}
                  <div className="relative h-full w-full rounded-xl overflow-hidden shadow-2xl shadow-slate-900/20">
                    <Image
                      src="/umrah.PNG"
                      alt="Umrah Pilgrimage"
                      fill
                      priority
                      className="object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-[#c9a227]/10" />

                    {/* Bottom caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-slate-900/80 to-transparent">
                      <p className="text-white/90 font-serif text-lg text-center">
                        &quot;The guest of Allah&quot;
                      </p>
                      <p className="text-[#c9a227] text-sm text-center mt-1 tracking-wider">
                        ضيوف الرحمن
                      </p>
                    </div>
                  </div>

                  {/* Floating decorative badge */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-14 h-14 md:w-16 md:h-16
                               bg-gradient-to-br from-[#c9a227] to-[#a68523]
                               rounded-full flex items-center justify-center
                               shadow-lg shadow-[#c9a227]/40"
                  >
                    <span className="text-white text-xl md:text-2xl">☪</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* PACKAGES SECTION */}
      <section className="py-14 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-[#c9a227] font-semibold tracking-widest text-xs uppercase mb-3">
              Choose Your Path
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-800">
              Our Umrah <span className="text-[#c9a227]">Packages</span>
            </h2>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#c9a227]/60" />
              <span className="text-[#c9a227]">✦</span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#c9a227]/60" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <PackageCard
                  title={pkg.title}
                  price={pkg.price}
                  duration={pkg.duration}
                  inclusions={pkg.inclusions}
                  ctaLabel="More Details"
                  onClick={() => handlePackageClick(pkg._id)}
                />
              </motion.div>
            ))}
          </div>

          {packages.length === 0 && !isSending && (
            <p className="text-center text-slate-400 py-10 font-light">
              No packages available at the moment.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default UmrahBookingSection;
