// src/app/site/Contact/page.jsx
'use client'
import React, { useState } from 'react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  BookOpen,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import SearchParamsHandler from './SearchParamsHandler';

const ContactUsPage = () => {
  const [isSending, setIsSending] = useState(false);
  const [pdfRequest, setPdfRequest] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: '',
  });

  // Called by SearchParamsHandler when pdf_message is present
  const handlePdfMessage = (message) => {
    setFormData((prev) => ({ ...prev, message }));
    setPdfRequest(true);

    // Scroll to form smoothly
    setTimeout(() => {
      const formElement = document.getElementById('contact-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const subjectTitle = pdfRequest
      ? 'PDF Full Access Request'
      : 'General Contact Inquiry';

    const templateParams = {
      subject_title: subjectTitle,
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      passport_no: 'N/A',
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_PRIVATE_KEY,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLET_ID1,
        templateParams,
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
      );
      alert('Thank you! Your message has been sent successfully.');
      setFormData({ name: '', mobile: '', email: '', message: '' });
      setPdfRequest(false);
    } catch (err) {
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      lines: ['C4M2+XJ5, Al Adamah', 'Dammam 32242, Saudi Arabia'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      lines: ['info@travelinmakkah.com'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      lines: ['+966 509 779 723'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] overflow-hidden">
      {/* Suspense boundary for search params */}
      <Suspense fallback={null}>
        <SearchParamsHandler onPdfMessage={handlePdfMessage} />
      </Suspense>

      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="1" fill="#1E3A5F"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-pattern)"/>
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="hidden sm:block absolute top-12 left-12 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" stroke="#C9A962" strokeWidth="1"/>
            <circle cx="50" cy="50" r="32" stroke="#C9A962" strokeWidth="0.5"/>
          </svg>
        </div>
        <div className="hidden sm:block absolute top-20 right-16 w-20 h-20 opacity-10">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 0L80 40L40 80L0 40Z" stroke="#C9A962" strokeWidth="1"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C9A962]"></div>
                <span className="text-[#C9A962] font-medium text-sm tracking-[0.3em] uppercase">
                  Get In Touch
                </span>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C9A962]"></div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-[#2D3339] mb-4 sm:mb-6 tracking-tight">
                Contact
                <span className="block mt-2">
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-[#C9A962] to-[#D4BC82] bg-clip-text text-transparent">
                      Us
                    </span>
                    <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 60 12" fill="none">
                      <path d="M0 6C15 6 15 2 30 2C45 2 45 10 60 10" stroke="#C9A962" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-[#6B7280] max-w-xl mx-auto text-lg md:text-xl"
              >
                Have questions about our packages? We&apos;re here to help you plan your sacred journey
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 order-2 lg:order-1"
            >
              <div className="relative">
                <div className="absolute -inset-3 border-2 border-[#C9A962]/10 rounded-[2rem] transform -rotate-1"></div>
                <div className="absolute -inset-3 bg-gradient-to-br from-[#C9A962]/5 via-transparent to-[#1E3A5F]/5 rounded-[2rem] transform rotate-1"></div>

                <div id="contact-form" className="relative bg-white p-5 sm:p-6 md:p-8 lg:p-12 rounded-3xl border border-[#E8E3DA] shadow-[0_20px_60px_-20px_rgba(201,169,98,0.12)]">
                  {/* PDF Request Notice */}
                  {pdfRequest && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-[#C9A962]/10 border border-[#C9A962]/30 rounded-xl"
                    >
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-[#C9A962] mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-[#2D3339] text-sm">PDF Access Request</h4>
                          <p className="text-sm text-[#6B7280] mt-1">
                            Your message has been pre-filled with a PDF access request. Please complete the form below with your details.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-[2px] bg-gradient-to-r from-[#C9A962] to-transparent"></div>
                      <span className="text-[#C9A962] text-sm font-medium tracking-[0.2em] uppercase">Send Message</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif text-[#2D3339]">
                      {pdfRequest ? 'Request Full PDF Access' : 'We\'d Love to Hear From You'}
                    </h3>
                    <p className="text-[#6B7280] mt-2">Fill out the form and our team will get back to you within 24 hours.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[#2D3339] mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-xl border-2 border-[#E8E3DA] bg-[#FAF8F5]/50 text-[#2D3339] placeholder-[#9CA3AF] focus:border-[#C9A962] focus:bg-white focus:ring-4 focus:ring-[#C9A962]/10 outline-none transition-all duration-300"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-[#2D3339] mb-2">Phone Number</label>
                        <input
                          type="text"
                          name="mobile"
                          placeholder="Your phone number"
                          required
                          value={formData.mobile}
                          onChange={handleChange}
                          className="w-full px-5 py-4 rounded-xl border-2 border-[#E8E3DA] bg-[#FAF8F5]/50 text-[#2D3339] placeholder-[#9CA3AF] focus:border-[#C9A962] focus:bg-white focus:ring-4 focus:ring-[#C9A962]/10 outline-none transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2D3339] mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Your email address"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-5 py-4 rounded-xl border-2 border-[#E8E3DA] bg-[#FAF8F5]/50 text-[#2D3339] placeholder-[#9CA3AF] focus:border-[#C9A962] focus:bg-white focus:ring-4 focus:ring-[#C9A962]/10 outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2D3339] mb-2">Your Message</label>
                      <textarea
                        name="message"
                        placeholder="Tell us about your pilgrimage plans or any questions you have..."
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-xl border-2 border-[#E8E3DA] bg-[#FAF8F5]/50 text-[#2D3339] placeholder-[#9CA3AF] focus:border-[#C9A962] focus:bg-white focus:ring-4 focus:ring-[#C9A962]/10 outline-none transition-all duration-300 resize-none"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSending}
                      className="w-full flex items-center justify-center gap-3 py-5 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-60 bg-gradient-to-r from-[#C9A962] to-[#B8954F] hover:from-[#B8954F] hover:to-[#A6843D] shadow-[0_10px_40px_-10px_rgba(201,169,98,0.4)]"
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-5 order-1 lg:order-2"
            >
              <div className="lg:sticky lg:top-28 space-y-6 sm:space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-[2px] bg-gradient-to-r from-[#C9A962] to-transparent"></div>
                    <span className="text-[#C9A962] text-sm font-medium tracking-[0.2em] uppercase">Contact Info</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-[#2D3339] leading-tight mb-4">
                    Let&apos;s Start Your
                    <span className="block text-[#C9A962]">Sacred Journey</span>
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed">
                    We are committed to providing you with the best pilgrimage experience. Reach out to us and begin your spiritual journey today.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="flex items-start gap-5 p-5 bg-white rounded-2xl border border-[#E8E3DA] hover:border-[#C9A962]/30 hover:shadow-[0_10px_40px_-15px_rgba(201,169,98,0.15)] transition-all duration-300">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C9A962] to-[#B8954F] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                          <info.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="pt-1">
                          <h3 className="font-semibold text-[#2D3339] mb-1 group-hover:text-[#C9A962] transition-colors">{info.title}</h3>
                          {info.lines.map((line, i) => (
                            <p key={i} className="text-[#6B7280] text-sm leading-relaxed">{line}</p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 bg-gradient-to-br from-[#1E3A5F] to-[#152a45] rounded-2xl">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#C9A962]/20 flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#C9A962]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <h4 className="text-white font-serif text-lg mb-3 text-center">Our Commitment</h4>
                  <ul className="space-y-2.5">
                    <li className="flex items-center gap-2 text-white/80 text-sm">
                      <svg className="w-4 h-4 text-[#C9A962] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Complete visa assistance
                    </li>
                    <li className="flex items-center gap-2 text-white/80 text-sm">
                      <svg className="w-4 h-4 text-[#C9A962] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      24/7 customer support
                    </li>
                    <li className="flex items-center gap-2 text-white/80 text-sm">
                      <svg className="w-4 h-4 text-[#C9A962] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Guided pilgrimage experience
                    </li>
                    <li className="flex items-center gap-2 text-white/80 text-sm">
                      <svg className="w-4 h-4 text-[#C9A962] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Premium accommodations
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="relative py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-[#1E3A5F] to-[#152a45] overflow-hidden">
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
              <svg className="w-6 h-6 text-[#C9A962]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
              <span className="text-[#C9A962] text-sm tracking-[0.2em] uppercase">Visit Our Office</span>
              <svg className="w-6 h-6 text-[#C9A962]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6">
              <span className="text-white">Prefer to Meet</span> <span className="text-[#C9A962]">In Person?</span>
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              We welcome you to visit our office for a personal consultation about your pilgrimage journey. Our team is ready to assist you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-3 text-white">
                <div className="w-12 h-12 rounded-xl bg-[#C9A962]/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#C9A962]" />
                </div>
                <div className="text-left">
                  <p className="font-medium">C4M2+XJ5, Al Adamah</p>
                  <p className="text-white/60 text-sm">Dammam 32242, Saudi Arabia</p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-12 bg-white/20"></div>

              <a href="tel:+966509779723" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8954F] text-white font-medium rounded-xl hover:shadow-[0_10px_40px_-10px_rgba(201,169,98,0.5)] transition-all duration-300">
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;