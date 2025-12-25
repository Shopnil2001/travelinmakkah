'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../Provider/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, LogOut, User, Phone, Mail } from 'lucide-react';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Hajj', href: '/Hajj' },
    { name: 'Umrah', href: '/Umrah' },
    { name: 'Shop', href: '/Shop' },
    { name: 'Visa', href: '/Visa' },
  ];

  const moreLinks = [
    { name: 'Hajj Guide', href: '/Hajj-Guide' },
    { name: 'Umrah Guide', href: '/Umrah-Guide' },
    { name: 'About Us', href: '/About' },
    { name: 'Blog', href: '/Blog' },
  ];

  const handleMoreToggle = () => {
    setIsMoreOpen(!isMoreOpen);
  };

  return (
    <>
      <nav 
        className={`
          fixed top-0 z-50 w-full px-4 sm:px-6 lg:px-12 xl:px-24 py-4 lg:py-5 transition-all duration-300
          ${scrolled 
            ? 'backdrop-blur-xl bg-white/95 shadow-lg border-b border-gray-100/50' 
            : 'bg-transparent/90 backdrop-blur-sm'
          }
        `}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300">
            <div className="relative h-12 w-28 sm:h-14 sm:w-32 lg:h-16 lg:w-36 overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl">
              <Image 
                src="/logo.JFIF" 
                alt="Travel In Makkah" 
                fill 
                priority
                className="object-contain hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 140px, (max-width: 1200px) 160px, 180px"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-2 sm:gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative text-base lg:text-lg font-medium text-gray-800 hover:text-emerald-600 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-emerald-50/50"
              >
                {link.name}
                <span className="absolute inset-0 bg-emerald-100/50 rounded-lg -z-10 scale-0 group-hover:scale-100 transition-transform origin-center duration-300" />
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative" onMouseEnter={() => setIsMoreOpen(true)} onMouseLeave={() => setIsMoreOpen(false)}>
              <button className="group flex items-center gap-2 text-base lg:text-lg font-medium text-gray-800 hover:text-emerald-600 px-3 py-2 rounded-lg hover:bg-emerald-50/50 transition-all duration-300">
                More 
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-2xl overflow-hidden"
                  >
                    <div className="py-3">
                      {moreLinks.map((item, index) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 hover:text-emerald-700 transition-all duration-200 border-b border-gray-50/50 last:border-b-0 hover:shadow-sm"
                          onClick={() => setIsMoreOpen(false)}
                        >
                          <div className="w-2 h-8 bg-gradient-to-b from-emerald-400 to-green-400 rounded-full" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex xl:gap-6 lg:gap-4 items-center">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100/50 px-4 py-2 rounded-xl backdrop-blur-sm hover:bg-gray-200 transition-all">
                  <User className="h-4 w-4" />
                  <span>{user.email?.split('@')[0] || 'User'}</span>
                </div>
                <button 
                  onClick={logOut}
                  className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 p-3 rounded-xl hover:bg-red-50/50 transition-all duration-200"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="text-sm font-semibold text-gray-700 hover:text-emerald-600 px-4 py-2 rounded-xl hover:bg-emerald-50/50 transition-all duration-200"
              >
                Sign in
              </Link>
            )}

            <Link
              href="/Contact"
              className="group relative rounded-2xl border-2 border-black px-8 py-3 lg:py-3.5 text-base lg:text-lg font-bold text-black overflow-hidden hover:bg-black hover:text-white transition-all duration-300 shadow-lg hover:shadow-black/20 hover:-translate-y-0.5"
            >
              <span className="relative z-10">Contact us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-700" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100/50 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 right-0 z-[60] w-[85vw] max-w-sm bg-white/95 backdrop-blur-2xl shadow-2xl lg:hidden overflow-y-auto"
          >
            <div className="p-8 pb-4">
              <div className="flex items-center justify-between mb-12">
                <Link href="/" className="flex items-center gap-3">
                  <div className="relative h-12 w-28 overflow-hidden rounded-xl shadow-lg">
                    <Image 
                      src="/logo.JFIF" 
                      alt="Travel In Makkah" 
                      fill 
                      className="object-contain"
                      sizes="140px"
                    />
                  </div>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="space-y-1 mb-10">
                {[...navLinks, ...moreLinks].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-4 px-4 text-xl font-semibold text-gray-800 hover:bg-emerald-50 hover:text-emerald-600 rounded-2xl transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <hr className="border-gray-100 mb-8" />

              {/* Mobile Auth & Contact */}
              <div className="space-y-6">
                {user ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <User className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.email?.split('@')[0] || 'User'}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => { logOut(); setIsMobileMenuOpen(false); }}
                      className="w-full flex items-center gap-3 p-4 text-left text-red-500 font-semibold rounded-2xl hover:bg-red-50 transition-all duration-200"
                    >
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link 
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center py-4 px-6 bg-emerald-600 text-white font-semibold rounded-2xl hover:bg-emerald-700 transition-all duration-200 text-lg"
                  >
                    Sign In
                  </Link>
                )}
                <Link
                  href="/Contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-5 px-6 bg-gradient-to-r from-black to-gray-900 text-white font-bold text-lg rounded-2xl text-center shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
