'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../Provider/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Hajj', href: '/Hajj' },
    { name: 'Umrah', href: '/Umrah' },
    { name: 'Shop', href: '/Shop' },
    { name: 'Visa', href: '/Visa' },
  ];

  const moreLinks = [
    { name: 'Hajj Guide', href: '/hajj-guide' },
    { name: 'Umrah Guide', href: '/umrah-guide' },
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-transparent px-6 py-4 transition-all duration-300 md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-12 w-24">
            {/* Replace with your actual logo path */}
            <Image 
              src="/logo.JFIF" 
              alt="Travel In Makkah" 
              fill 
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-normal text-gray-800 transition-colors hover:text-emerald-600"
            >
              {link.name}
            </Link>
          ))}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
              className="flex items-center gap-1 text-lg font-normal text-gray-800 hover:text-emerald-600"
            >
              More <ChevronDown className={`h-4 w-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
              
              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 top-full w-48 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl"
                  >
                    <div className="flex flex-col py-2">
                      {moreLinks.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Right Actions (Auth & Contact) */}
        <div className="hidden items-center gap-4 lg:flex">
          {user ? (
            <div className="flex items-center gap-4">
               <button 
                onClick={logOut}
                className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="text-sm font-medium text-gray-700 hover:text-emerald-600"
            >
              Sign in
            </Link>
          )}

          <Link
            href="/Contact"
            className="rounded-lg border-[1.5px] border-black px-6 py-2 text-base font-medium text-black transition-all hover:bg-black hover:text-white"
          >
            Contact us
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="block lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-y-0 right-0 z-[60] w-[80%] bg-white p-8 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col gap-6">
              <button onClick={() => setIsMobileMenuOpen(false)} className="self-end">
                <X size={28} />
              </button>
              
              <div className="flex flex-col gap-6">
                {[...navLinks, ...moreLinks].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl font-medium text-gray-800"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <hr className="border-gray-100" />

              <div className="flex flex-col gap-4">
                {user ? (
                  <button onClick={() => { logOut(); setIsMobileMenuOpen(false); }} className="text-left text-red-500 font-medium">
                    Sign Out
                  </button>
                ) : (
                  <Link href="/signin" className="text-emerald-600 font-medium">Sign In</Link>
                )}
                <Link
                  href="/Contact"
                  className="rounded-xl bg-black py-4 text-center text-white"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;