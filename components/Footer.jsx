'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone, ArrowUp, Facebook, Twitter, Send, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="px-6 py-12 md:px-12 lg:px-24">
      <div 
        className="relative overflow-hidden rounded-[50px] bg-[#d1e9df]/40 px-10 py-16 md:px-20"
        style={{
          backgroundImage: `url('/geometric-pattern.png')`, // Use same pattern as hero
          backgroundSize: '400px',
        }}
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          
          {/* Column 1: Logo & Contact */}
          <div className="space-y-6">
            <Image src="/logo.JFIF" alt="Logo" width={120} height={60} />
            <div className="space-y-4 text-[#5a6360]">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0" />
                <span>Wisconsin Ave, Suite 700<br />Chevy Chase, Maryland 20815</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <span>support@figma.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0" />
                <span>+1 800 854-36-80</span>
              </div>
            </div>
          </div>

          {/* Column 2: Professional Web Design (Description) */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-semibold text-[#2d4f43] mb-4">Professional Web Design</h4>
            <p className="text-[#5a6360] leading-relaxed">
              To make your spiritual journey easy and stress-free, we provide 
              complete assistance, ensuring safety and comfort every step of the way.
            </p>
          </div>

          {/* Column 3: Quick Access */}
          <div>
            <h4 className="text-xl font-semibold text-[#2d4f43] mb-4">Quick Access</h4>
            <ul className="space-y-3 text-[#5a6360]">
              <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
              <li><Link href="/hajj" className="hover:text-emerald-600">Hajj</Link></li>
              <li><Link href="/umrah" className="hover:text-emerald-600">Umrah</Link></li>
              <li><Link href="/shop" className="hover:text-emerald-600">Shop</Link></li>
              <li><Link href="/about" className="hover:text-emerald-600">About us</Link></li>
            </ul>
          </div>

          {/* Column 4: Social Media & Scroll Up */}
          <div className="relative flex flex-col justify-between items-start lg:items-end">
             <div>
                <h4 className="text-xl font-semibold text-[#2d4f43] mb-4">Social Media</h4>
                <div className="flex gap-4 text-[#5a6360]">
                  <Facebook className="cursor-pointer hover:text-emerald-600" />
                  <Twitter className="cursor-pointer hover:text-emerald-600" />
                  <Send className="cursor-pointer hover:text-emerald-600" />
                  <Instagram className="cursor-pointer hover:text-emerald-600" />
                  <Linkedin className="cursor-pointer hover:text-emerald-600" />
                </div>
             </div>

             <button 
                onClick={scrollToTop}
                className="mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#00a651] text-white shadow-lg transition-transform hover:scale-110"
             >
                <ArrowUp size={28} />
             </button>
          </div>
        </div>

        <div className="mt-16 border-t border-[#2d4f43]/10 pt-8 text-center text-sm text-[#5a6360]/70">
          © 2025 Lift Media. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;