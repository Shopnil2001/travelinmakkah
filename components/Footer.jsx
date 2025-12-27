'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone, ArrowUp, Facebook, Twitter, Send, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="px-6 py-12 md:px-12 lg:px-24 bg-white">
      <div 
        className="relative overflow-hidden rounded-[50px] px-10 py-16 md:px-20 text-white shadow-2xl"
        style={{
          // Sky Blueish Gradient: from a soft cyan-blue to a deeper sky blue
          backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.85), rgba(3, 105, 161, 0.9)), url('/footer.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-4">
          
          {/* Column 1: Logo & Contact */}
          <div className="space-y-6">
            <div className="bg-white p-3 inline-block rounded-2xl shadow-sm">
               <Image src="/logo.JFIF" alt="Logo" width={120} height={60} />
            </div>
            <div className="space-y-4 text-blue-50">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#64B5F6]" />
                <span className="font-sans text-sm md:text-base">
                  Wisconsin Ave, Suite 700<br />Chevy Chase, Maryland 20815
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[#64B5F6]" />
                <span className="font-sans text-sm md:text-base">support@travelinmakkah.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-[#64B5F6]" />
                <span className="font-sans text-sm md:text-base">+1 800 854-36-80</span>
              </div>
            </div>
          </div>

          {/* Column 2: Our Commitment */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-serif font-semibold mb-6 border-b-2 border-[#64B5F6] inline-block pb-1">
              Our Commitment
            </h4>
            <p className="text-blue-50 leading-relaxed font-sans text-sm md:text-base">
              To make your spiritual journey easy and stress-free, we provide 
              complete assistance, ensuring safety and comfort every step of the way.
            </p>
          </div>

          {/* Column 3: Quick Access */}
          <div>
            <h4 className="text-xl font-serif font-semibold mb-6 border-b-2 border-[#64B5F6] inline-block pb-1">
              Quick Access
            </h4>
            <ul className="space-y-3 text-blue-50 font-sans text-sm md:text-base">
              <li><Link href="/" className="hover:text-[#64B5F6] transition-colors">Home</Link></li>
              <li><Link href="/hajj" className="hover:text-[#64B5F6] transition-colors">Hajj Guide</Link></li>
              <li><Link href="/umrah" className="hover:text-[#64B5F6] transition-colors">Umrah Guide</Link></li>
              <li><Link href="/shop" className="hover:text-[#64B5F6] transition-colors">Pilgrim Shop</Link></li>
              <li><Link href="/about" className="hover:text-[#64B5F6] transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Column 4: Social Media & Scroll Up */}
          <div className="relative flex flex-col justify-between items-start lg:items-end">
             <div>
                <h4 className="text-xl font-serif font-semibold mb-6">Follow Our Journey</h4>
                <div className="flex gap-4">
                  <Facebook className="cursor-pointer hover:text-[#64B5F6] transition-transform hover:scale-110" />
                  <Twitter className="cursor-pointer hover:text-[#64B5F6] transition-transform hover:scale-110" />
                  <Send className="cursor-pointer hover:text-[#64B5F6] transition-transform hover:scale-110" />
                  <Instagram className="cursor-pointer hover:text-[#64B5F6] transition-transform hover:scale-110" />
                  <Linkedin className="cursor-pointer hover:text-[#64B5F6] transition-transform hover:scale-110" />
                </div>
             </div>

             <button 
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="mt-12 flex h-14 w-14 items-center justify-center rounded-full bg-[#64B5F6] text-white shadow-xl transition-all hover:scale-110 hover:bg-[#008e45] ring-4 ring-white/10"
             >
                <ArrowUp size={28} />
             </button>
          </div>
        </div>

        <div className="mt-16 border-t border-white/20 pt-8 text-center text-xs md:text-sm text-blue-100/70">
          © 2025 Travel In Makkah. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;