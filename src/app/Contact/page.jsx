'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactUsPage = () => {
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const templateParams = {
      subject_title: 'General Contact Inquiry',
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      passport_no: 'N/A',
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams,
        'YOUR_PUBLIC_KEY'
      );
      alert('Thank you! Your message has been sent successfully.');
      setFormData({ name: '', mobile: '', email: '', message: '' });
    } catch (err) {
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  const inputClass =
    'w-full px-5 py-4 rounded-xl border border-gray-200 bg-zinc-50 ' +
    'text-sm font-medium text-gray-900 placeholder-gray-500 ' + // darker text + clearer placeholder
    'outline-none focus:ring-2 focus:ring-emerald-500 transition-all';

  return (
    <div className="min-h-screen bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Contact Content */}
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl md:text-6xl font-serif text-[#2d4f43] flex items-center gap-3">
              Contact{' '}
              <span className="bg-[#00a651] text-white px-3 py-1 rounded-lg">
                Us
              </span>
            </h1>
            <p className="mt-6 text-[#5a6360] text-lg leading-relaxed max-w-md">
              We are committed to processing the information in order to contact
              you and talk about your project.
            </p>
          </div>

          <div className="space-y-6 pt-4">
            <div className="flex items-start gap-4">
              <div className="bg-emerald-50 p-3 rounded-full text-[#00a651]">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-[#2d4f43] font-medium">
                  Wisconsin Ave, Suite 700
                </p>
                <p className="text-[#5a6360]">Chevy Chase, Maryland 20815</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-emerald-50 p-3 rounded-full text-[#00a651]">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-[#2d4f43] font-medium text-lg">
                  support@travelinmakkah.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-emerald-50 p-3 rounded-full text-[#00a651]">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-[#2d4f43] font-medium text-lg">
                  +1 800 854-36-80
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white p-2 rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name*"
                required
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number*"
                required
                value={formData.mobile}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email*"
                required
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={
                  inputClass +
                  ' resize-none align-top leading-relaxed min-h-[140px]'
                }
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-[#00a651] hover:bg-[#008f45] text-white py-4 rounded-xl font-bold text-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-60"
            >
              {isSending ? 'Sending...' : 'Submit'}
            </button>
            <p className="text-xs text-gray-400 text-center mt-4">
              Please submit your information, our team will contact you with all
              the necessary details.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
