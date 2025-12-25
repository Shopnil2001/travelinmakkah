'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import emailjs from '@emailjs/browser';

const PackageDetailsPage = () => {
  const { id } = useParams();
  const currentYear = new Date().getFullYear();

  const [pkg, setPkg] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    passportNo: '',
  });

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await api.get(`/packages/${id}`);
        setPkg(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPackage();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pkg) return;

    setIsSending(true);
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
         subject_title: `Hajj Booking: ${pkg.title}`, // Tells you which package
    name: formData.fullName,
    mobile: formData.mobileNumber,
    email: formData.email,
    passport_no: formData.passportNo,
    message: "No specific message provided.", // Default text for the message field
    time: new Date().toLocaleString()
        },
        'YOUR_PUBLIC_KEY'
      );
      alert(`Booking request for ${pkg.title} sent!`);
      setFormData({
        fullName: '',
        mobileNumber: '',
        email: '',
        passportNo: '',
      });
    } catch (err) {
      alert('Error sending request.');
    } finally {
      setIsSending(false);
    }
  };

  const inputClass =
    'w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm font-medium ' +
    'text-gray-900 placeholder-gray-500 ' +
    'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ' +
    'transition-all bg-white';

  if (!pkg)
    return (
      <div className="p-20 text-center text-emerald-600">
        Loading details...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Package Info */}
        <div className="space-y-6">
          <h1 className="text-5xl font-serif text-[#2d4f43]">
            {pkg.title}
          </h1>
          <p className="text-2xl text-[#00a651] font-bold">
            Price: BDT {pkg.price.toLocaleString()}
          </p>

          {/* description from pkg */}
          {pkg.description && (
            <p className="text-[#5a6360] leading-relaxed">
              {pkg.description}
            </p>
          )}

          <div className="mt-6">
            <h3 className="text-xl font-bold mb-3">What is included:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {pkg.inclusions?.map((inc, i) => (
                <li key={i}>{inc}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Booking Form (same style as main section, fixed package) */}
        <div className="bg-[#f6fbf9] p-10 rounded-3xl border border-emerald-100 h-fit">
          <h2 className="text-2xl font-serif mb-6">
            Book this Package
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* fixed selected package */}
            <div className="bg-white border border-emerald-200 p-4 rounded-xl font-bold text-emerald-800">
              Selected: {pkg.title}
            </div>

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

            <button
              type="submit"
              disabled={isSending}
              className="mt-4 w-full bg-[#00a651] text-white px-10 py-3.5 rounded-xl font-semibold text-lg transition-colors hover:bg-[#008f45] shadow-md shadow-emerald-100 disabled:opacity-60"
            >
              {isSending ? 'Processing...' : 'Confirm Booking Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsPage;
