'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Shield,
  FileText,
  Users,
  Globe,
  Lock,
  Bell,
  Database,
  UserCheck,
  ExternalLink,
  Mail,
  Clock,
  CheckCircle
} from 'lucide-react';

const PrivacyPolicyPage = () => {
  const sections = [
    {
      id: 'collection',
      icon: Database,
      title: 'What Information Do We Collect?',
      content: [
        {
          subtitle: 'Contact Information',
          text: 'Name, email address, phone number.'
        },
        {
          subtitle: 'Technical Information',
          text: 'Device information and usage data (collected via cookies and analytics tools).'
        },
        {
          subtitle: 'Payment Information',
          text: 'Processed through our affiliate partners for transactions (note: we do not store payment details; this is handled by third-party providers).'
        }
      ]
    },
    {
      id: 'usage',
      icon: FileText,
      title: 'How Do We Use Your Information?',
      content: [
        { text: 'To provide information related to Hajj, Umrah, Makkah, and Madinah.' },
        { text: 'To offer affiliate marketing services, including promoting tours and packages for Saudi Arabia through our trusted third-party providers.' },
        { text: 'To improve the functionality and user experience of the website.' },
        { text: 'To send newsletters, offers, or promotional materials if you consent.' },
        { text: 'To process any inquiries, complaints, or customer service requests.' }
      ]
    },
    {
      id: 'affiliate',
      icon: ExternalLink,
      title: 'Affiliate Marketing',
      content: [
        {
          text: 'As part of our services, TravelinMakkah.com engages in affiliate marketing. This means we may earn a commission when you click on a link or purchase products/services related to tours and packages for Saudi Arabia through our affiliate programs. We only promote services from recognized and trusted partners, and we ensure that affiliate links on our website are clearly identified.'
        },
        {
          text: 'Please note that when you purchase a product through an affiliate link, your information may be collected and processed by the third-party provider. We do not control these third-party websites or their privacy policies, so we encourage you to review their privacy policies.'
        }
      ]
    },
    {
      id: 'advertisements',
      icon: Globe,
      title: 'Advertisements',
      content: [
        { text: 'Ads appearing on our website may be delivered to users by advertising partners, who may set cookies.' },
        { text: 'These cookies allow the ad server to recognize your computer each time they send you an online advertisement to compile information about you or others who use your computer.' },
        { text: 'This information allows ad networks to, among other things, deliver targeted advertisements that they believe will be of most interest to you.' },
        { text: 'This Privacy Policy covers the use of cookies by Blogging and does not cover the use of cookies by any advertisers.' }
      ]
    },
    {
      id: 'sharing',
      icon: Users,
      title: 'Information Sharing and Third Parties',
      content: [
        { text: 'We do not sell or rent your personal information to third parties. However, we may share your information:' },
        { subtitle: 'With affiliate partners', text: 'To process your purchase or service related to Hajj and Umrah tours.' },
        { subtitle: 'With service providers', text: 'Who assist in operating our website, sending marketing materials, and conducting other business activities.' },
        { subtitle: 'For legal requirements', text: 'If required by law, such as to comply with a legal process or governmental request, we may disclose your personal information.' }
      ]
    },
    {
      id: 'security',
      icon: Lock,
      title: 'Data Security and Protection',
      content: [
        { text: 'We take the security of your personal information seriously. However, please note that no method of transmission over the internet is 100% secure, and we will make every effort to ensure the utmost protection of your information.' }
      ]
    },
    {
      id: 'rights',
      icon: UserCheck,
      title: 'Your Rights',
      content: [
        { text: 'As a user of our website, you have the following rights:' },
        { text: 'The right to access the personal information we hold about you.' },
        { text: 'The right to correct any inaccurate or incomplete information.' },
        { text: 'The right to request the deletion of your personal information (subject to legal obligations).' },
        { text: 'The right to object to or restrict the processing of your personal information.' },
        { text: 'The right to opt out of receiving marketing communications from us at any time.' }
      ]
    },
    {
      id: 'retention',
      icon: Clock,
      title: 'Retention of Personal Information',
      content: [
        { text: 'We will retain your personal information only for as long as necessary to fulfill the purposes for which it was collected.' }
      ]
    }
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="privacy-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="1.5" fill="#1E3A5F"/>
              <path d="M0 40h80M40 0v80" stroke="#1E3A5F" strokeWidth="0.5" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#privacy-pattern)"/>
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Decorative Elements */}
        <div className="hidden sm:block absolute top-10 left-10 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" stroke="#C9A962" strokeWidth="1"/>
            <circle cx="50" cy="50" r="35" stroke="#C9A962" strokeWidth="0.5"/>
            <circle cx="50" cy="50" r="22" stroke="#C9A962" strokeWidth="0.5"/>
          </svg>
        </div>
        <div className="hidden sm:block absolute top-20 right-20 w-24 h-24 opacity-10">
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
                  Legal Information
                </span>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C9A962]"></div>
              </div>

              {/* Main Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-[#2D3339] mb-4 sm:mb-6 tracking-tight">
                Privacy
                <span className="block mt-2 relative">
                  <span className="relative z-10 bg-gradient-to-r from-[#C9A962] to-[#D4BC82] bg-clip-text text-transparent">
                    Policy
                  </span>
                  {/* Decorative underline */}
                  <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-3" viewBox="0 0 200 12" fill="none">
                    <path d="M0 6C50 6 50 2 100 2C150 2 150 10 200 10" stroke="#C9A962" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-[#6B7280] max-w-2xl mx-auto text-lg md:text-xl mt-8"
              >
                Welcome to our website (TravelinMakkah.com). We value your privacy and are committed to protecting your personal information.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 lg:py-20 px-6 md:px-12 lg:px-20 bg-white relative">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M200 0v200H0" stroke="#1E3A5F" strokeWidth="2"/>
            <path d="M200 50v150H50" stroke="#1E3A5F" strokeWidth="1"/>
            <path d="M200 100v100H100" stroke="#1E3A5F" strokeWidth="0.5"/>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-[#1E3A5F] to-[#152a45] p-8 md:p-12 rounded-3xl overflow-hidden"
          >
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full border border-[#C9A962]"></div>
              <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full border border-white"></div>
            </div>

            <div className="relative z-10 flex items-start gap-6">
              <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C9A962] to-[#D4BC82] items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-serif text-white mb-4"><span className='text-white'>Our Commitment to You</span></h2>
                <p className="text-white/80 leading-relaxed text-base md:text-lg">
                  This Privacy Policy outlines how we collect, use, and protect your information when you visit our website and use our services, including affiliate marketing for tours related to Makkah, Madinah, Hajj, and Umrah. By using this website, you agree to the collection and use of your information in accordance with this policy.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-16 lg:py-24 px-6 md:px-12 lg:px-20 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group"
            >
              <div className="relative bg-white p-8 md:p-10 rounded-3xl border border-[#E8E3DA] hover:shadow-[0_20px_60px_-20px_rgba(201,169,98,0.15)] hover:border-[#C9A962]/30 transition-all duration-500">
                {/* Section number */}
                <div className="absolute top-6 right-6 text-5xl font-serif text-[#E8E3DA] group-hover:text-[#C9A962]/20 transition-colors duration-300">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon and Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl ${index % 2 === 0 ? 'bg-gradient-to-br from-[#C9A962] to-[#D4BC82]' : 'bg-gradient-to-br from-[#1E3A5F] to-[#2E5A8F]'} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-serif text-[#2D3339] pt-2 pr-12">
                    {section.title}
                  </h2>
                </div>

                {/* Content */}
                <div className="space-y-4 pl-0 md:pl-16">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="text-[#6B7280] leading-relaxed">
                      {item.subtitle && (
                        <h3 className="font-semibold text-[#2D3339] mb-1 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#C9A962]" />
                          {item.subtitle}
                        </h3>
                      )}
                      <p className={item.subtitle ? 'pl-6' : ''}>{item.text}</p>
                    </div>
                  ))}
                </div>

                {/* Decorative bottom line */}
                <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#C9A962]/0 to-transparent group-hover:via-[#C9A962]/30 transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#C9A962]"></div>
              <span className="text-[#C9A962] text-sm font-medium tracking-[0.3em] uppercase">Questions?</span>
              <div className="w-8 h-[1px] bg-[#C9A962]"></div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#2D3339] mb-6">
              Exercise Your <span className="text-[#C9A962]">Rights</span>
            </h2>
            <p className="text-[#6B7280] max-w-xl mx-auto mb-8 text-lg">
              If you wish to exercise your rights or have any questions about this Privacy Policy, please contact us.
            </p>
            <Link
              href="/site/Contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#D4BC82] text-white font-medium rounded-xl hover:shadow-[0_10px_40px_-10px_rgba(201,169,98,0.5)] transition-all duration-300 group"
            >
              <Mail className="w-5 h-5" />
              Contact Us
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Last Updated Section */}
      <section className="py-8 px-6 md:px-12 lg:px-20 bg-[#FAF8F5] border-t border-[#E8E3DA]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#6B7280] text-sm">
            Last updated: January 2026
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
