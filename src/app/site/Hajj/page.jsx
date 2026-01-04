'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import api from '@/lib/api';
import PackageCard from '../../../../components/ui/packageCard';

const HajjBookingSection = () => {
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
    <div className="bg-gradient-to-b from-blue-50/50 to-white min-h-screen">
      {/* Hero Booking Section */}
      <section
        ref={formRef}
        className="py-12 md:py-16 lg:py-20 px-4 sm:px-8 md:px-12 lg:px-20 relative overflow-hidden"
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
                      src="/hajj.PNG"
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
                      {/* <div className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#64B5F6]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>Govt. Approved</span>
                      </div> */}
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#64B5F6]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                        </div>
                        <span>10,000+ Pilgrims</span>
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

      {/* Packages Section */}
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
    </div>
  );
};

export default HajjBookingSection;
