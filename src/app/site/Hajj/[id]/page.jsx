
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import emailjs from '@emailjs/browser';
import FloatingInput from '../../../../../components/ui/FloatingInput'; // ← Import here

const PackageDetailsPage = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [focusedField, setFocusedField] = useState(null); // ← Keep this state
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
    if (id) fetchPackage();
  }, [id]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pkg) return;

    setIsSending(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_PRIVATE_KEY,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLET_ID1,
        {
          subject_title: `Hajj Booking: ${pkg.title}`,
          name: formData.fullName,
          mobile: formData.mobileNumber,
          email: formData.email,
          passport_no: formData.passportNo,
          message: 'No specific message provided.',
          time: new Date().toLocaleString(),
        },
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
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

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-warm-white)]">
        <div className="text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 border-4 border-[var(--color-stone)] rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-[var(--color-gold)] rounded-full animate-spin"></div>
          </div>
          <p className="text-[var(--color-charcoal-light)] font-medium tracking-wide">Loading your sacred journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-warm-white)] relative overflow-hidden">
      <div className="absolute inset-0 pattern-islamic opacity-40 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-64 bg-gradient-to-b from-[var(--color-gold)]/5 to-transparent rounded-b-[100%]"></div>

      <div className="relative max-w-7xl mx-auto py-16 md:py-24 px-6 lg:px-8">
        {/* Breadcrumb - UNCHANGED */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
          <span className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-gold-dark)] transition-colors cursor-pointer group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Hajj Packages
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
         <div className="lg:col-span-7 space-y-8">
            <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-charcoal)]">
              {pkg.title}
            </h1>

            <p className="text-lg text-[var(--color-charcoal-light)]">
              {pkg.description}
            </p>

            <div className="text-3xl font-serif text-[var(--color-gold-dark)]">
              BDT {pkg.price?.toLocaleString()}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pkg.inclusions?.map((inc, i) => (
                <div
                  key={i}
                  className="p-4 bg-white rounded-xl border border-[var(--color-stone)]"
                >
                  {inc}
                </div>
              ))}
            </div>
          </div>
        

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              <div className="relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                {/* Decorative corners - UNCHANGED */}
                <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[var(--color-gold)] rounded-tl-xl"></div>
                <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[var(--color-gold)] rounded-tr-xl"></div>
                <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[var(--color-gold)] rounded-bl-xl"></div>
                <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[var(--color-gold)] rounded-br-xl"></div>

                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-[var(--color-stone)]">
                  {/* Form Header - UNCHANGED */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl
                                    bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)]
                                    shadow-lg shadow-[var(--color-gold)]/25 mb-4">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-serif text-[var(--color-charcoal)] mb-2">
                      Book Your Pilgrimage
                    </h2>
                    <p className="text-sm text-[var(--color-muted)]">
                      Begin your sacred journey to Makkah
                    </p>
                  </div>

                  {/* Selected Package - UNCHANGED */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-[var(--color-midnight-deep)] to-[var(--color-midnight)]
                                  rounded-xl text-white animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-[var(--color-gold-light)]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-white/60 uppercase tracking-wider">Selected Package</p>
                        <p className="font-semibold text-[var(--color-gold-light)]">{pkg.title}</p>
                      </div>
                    </div>
                  </div>

                  {/* Booking Form - PASS focusedField & setFocusedField */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5">
                      <FloatingInput
                        name="fullName"
                        label="Full Name (as per passport)"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        delay={350}
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                      />
                      <FloatingInput
                        name="mobileNumber"
                        label="Mobile Number"
                        type="tel"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                        delay={400}
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                      />
                      <FloatingInput
                        name="email"
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        delay={450}
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                      />
                      <FloatingInput
                        name="passportNo"
                        label="Passport Number"
                        value={formData.passportNo}
                        onChange={handleChange}
                        required
                        delay={500}
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                      />
                    </div>

                    {/* Submit Button & Security Note - UNCHANGED */}
                    <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '550ms' }}>
                      <button
                        type="submit"
                        disabled={isSending}
                        className="relative w-full py-4 px-8 rounded-xl font-semibold text-lg text-white
                                 bg-gradient-to-r from-[var(--color-gold)] via-[var(--color-gold-dark)] to-[var(--color-gold)]
                                 background-size-200 bg-left hover:bg-right
                                 shadow-lg shadow-[var(--color-gold)]/30
                                 transition-all duration-500
                                 hover:shadow-xl hover:shadow-[var(--color-gold)]/40 hover:-translate-y-0.5
                                 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                                 overflow-hidden group"
                        style={{ backgroundSize: '200% 100%' }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isSending ? (
                            <>
                              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              Confirm Booking Request
                              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </>
                          )}
                        </span>
                      </button>
                    </div>

                    <p className="text-center text-xs text-[var(--color-muted)] pt-2 animate-fade-in-up"
                       style={{ animationDelay: '600ms' }}>
                      <svg className="w-4 h-4 inline-block mr-1 -mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Your information is secure and encrypted
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsPage;
