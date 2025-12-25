'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import api from '@/lib/api';
import PackageCard from '../../../components/ui/packageCard';

const HajjBookingSection = () => {
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

  // Fetch packages (Hajj only)
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

  // Clicking a card scrolls and preselects
  const scrollToForm = (title) => {
    setFormData((prev) => ({ ...prev, packageName: title }));
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          subject_title: `Hajj Booking: ${formData.packageName}`,
          name: formData.fullName,
          mobile: formData.mobileNumber,
          email: formData.email,
          passport_no: formData.passportNo,
          message: 'No specific message provided.',
          time: new Date().toLocaleString(),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
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

  const inputClass =
    'w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm font-medium ' +
    'text-gray-900 placeholder-gray-500 ' +
    'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ' +
    'transition-all bg-white';

  return (
    <div className="bg-white">
      {/* FORM SECTION */}
      <section ref={formRef} className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto border border-emerald-100 rounded-3xl overflow-hidden relative shadow-sm bg-white">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center bg-white px-5 py-2 border-x border-b border-emerald-100 rounded-b-2xl z-10 shadow-sm">
            <span className="bg-[#00a651] text-white px-2 py-0.5 rounded text-lg font-bold mr-2">
              Hajj
            </span>
            <span className="text-xl font-medium text-gray-800">
              Pilgrimage {currentYear}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 md:p-14 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d4f43] leading-tight">
                Embark on a blessed journey <br />
                with our{' '}
                <span className="text-[#00a651]">
                  {currentYear} Hajj packages.
                </span>
              </h2>

              <p className="text-[#5a6360] text-base leading-relaxed max-w-lg">
                Begin your spiritual journey with confidence through our
                exclusive {currentYear} Hajj packages. Book now to guarantee a
                smooth and stress-free pilgrimage. Travel in Makkah, the trusted
                name in Hajj &amp; Umrah services in Bangladesh.
              </p>

              <div className="pt-6">
                <h4 className="text-lg font-bold text-gray-900 mb-5">
                  Input your information
                </h4>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <select
                    name="packageName"
                    value={formData.packageName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3.5 bg-emerald-50 font-medium text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  >
                    <option value="">Select a Hajj Package*</option>
                    {packages.map((pkg) => (
                      <option key={pkg._id} value={pkg.title}>
                        {pkg.title}
                      </option>
                    ))}
                  </select>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name*"
                      className={inputClass}
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="mobileNumber"
                      placeholder="Mobile Number*"
                      className={inputClass}
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email*"
                      className={inputClass}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="passportNo"
                      placeholder="Passport No.*"
                      className={inputClass}
                      value={formData.passportNo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    disabled={isSending}
                    className="mt-4 bg-[#00a651] text-white px-10 py-3.5 rounded-xl font-semibold text-lg transition-colors hover:bg-[#008f45] shadow-md shadow-emerald-100 disabled:opacity-60"
                  >
                    {isSending ? 'Processing...' : 'Book Now'}
                  </motion.button>
                </form>
              </div>
            </div>

            <div className="relative h-[400px] md:h-[500px] w-full rounded-[40px] overflow-hidden border-4 border-white shadow-xl">
              <Image
                src="/hajj.PNG"
                alt="Hajj"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES SECTION */}
      <section className="py-16 px-6 bg-[#fcfdfd]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif text-center mb-12">
            Our Hajj <span className="text-[#00a651]">Packages</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg._id}
                title={pkg.title}
                price={pkg.price}
                duration={pkg.duration}
                inclusions={pkg.inclusions}
                ctaLabel="More Details"
                onClick={() => scrollToForm(pkg.title)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HajjBookingSection;
