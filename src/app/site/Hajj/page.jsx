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

  const inputClass =
    'w-full border border-gray-300 rounded-xl px-4 py-3 text-sm md:text-base font-medium ' +
    'text-gray-900 placeholder-gray-500 ' +
    'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ' +
    'transition-all bg-white';

  return (
    <div className="bg-white">
      {/* FORM SECTION */}
      <section ref={formRef} className="py-10 md:py-16 px-4 sm:px-8 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto border border-[#64B5F6] rounded-[2.5rem] overflow-hidden relative shadow-sm bg-white mt-8 md:mt-0">
          
          {/* Responsive Floating Top Badge */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center bg-white px-4 md:px-6 py-2 border-x border-b border-[#64B5F6] rounded-b-2xl z-20 shadow-sm w-[90%] sm:w-auto whitespace-nowrap">
            <span className="bg-[#64B5F6] text-white px-2 py-0.5 rounded text-sm md:text-lg font-bold mr-2">
              Hajj
            </span>
            <span className="text-sm md:text-xl font-medium text-gray-800">
              Pilgrimage {currentYear}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 p-6 pt-16 md:p-12 lg:p-16 items-center">
            
            {/* Left Column: Text + Form - Flows second on mobile */}
            <div className="space-y-6 order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#2d4f43] leading-tight">
                Embark on a blessed journey <br className="hidden md:block" />
                with our <span className="text-[#64B5F6]">{currentYear} Hajj packages.</span>
              </h2>

              <p className="text-[#5a6360] text-sm md:text-base leading-relaxed max-w-lg">
                Begin your spiritual journey with confidence. Travel in Makkah is the 
                trusted name in Hajj &amp; Umrah services. Book now to guarantee 
                a smooth and stress-free pilgrimage.
              </p>

              <div className="pt-4">
                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  Input your information
                </h4>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <select
                    name="packageName"
                    value={formData.packageName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-blue-50/50 font-medium text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
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
                    className="w-full md:w-auto mt-4 bg-[#64B5F6] text-white px-10 py-3.5 rounded-xl font-semibold text-lg transition-all hover:bg-blue-500 shadow-lg shadow-blue-100 disabled:opacity-60"
                  >
                    {isSending ? 'Processing...' : 'Book Now'}
                  </motion.button>
                </form>
              </div>
            </div>

            {/* Right Column: Image - Flows first on mobile */}
            <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] w-full rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl order-1 lg:order-2">
              <Image
                src="/hajj.PNG"
                alt="Hajj Pilgrimage"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES SECTION */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-[#fcfdfd]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif">
              Our Hajj <span className="text-[#64B5F6]">Packages</span>
            </h2>
            <div className="h-1 w-20 bg-[#64B5F6] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg._id}
                title={pkg.title}
                price={pkg.price}
                duration={pkg.duration}
                inclusions={pkg.inclusions}
                ctaLabel="More Details"
                onClick={() => handlePackageClick(pkg._id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HajjBookingSection;