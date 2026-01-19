"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "../Provider/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  LogOut,
  User,
  LayoutDashboard,
} from "lucide-react";

const Navbar = () => {
  const { user, logOut, role } = useAuth();
  const pathname = usePathname();
  const isAdmin = user && (role === "admin" || role === "superadmin");
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Only use transparent navbar on homepage
  const isHomePage = pathname === "/";
  const isTransparent = isHomePage && !scrolled;

  // Check if a link is active (exact match or starts with path for nested routes)
  const isLinkActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Check if any "More" dropdown link is active
  const isMoreActive = (moreLinks) => moreLinks.some((link) => isLinkActive(link.href));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/site/About" },
    { name: "Blog", href: "/site/Blog" },
    { name: "Shop", href: "/site/Shop" },
    { name: "Book Hotel", href: "/site/book" },
  ];

  const moreLinks = [
    { name: "Hajj", href: "/site/Hajj" },
    { name: "Umrah", href: "/site/Umrah" },
    { name: "Complete Guideline Book", href: "/site/Guideline-Book" },
    { name: "Privacy Policy", href: "/site/PrivacyPolicy" },
    { name: "Contact Us", href: "/site/Contact" },
  ];

  return (
    <>
      <nav
        className={`
          fixed top-0 z-50 w-full px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-2 lg:py-2.5 transition-all duration-500
          ${
            isTransparent
              ? "bg-transparent"
              : "bg-white/70 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.04)] border-b border-[#E8E3DA]/50"
          }
        `}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative transition-transform duration-300 group-hover:scale-[1.02]">
              {/* Dark backdrop behind logo - mimics footer's dark background for proper glow blending */}
              {isTransparent && (
                <div
                  className="absolute -inset-4 rounded-full blur-2xl pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(30,45,60,0.7) 0%, rgba(30,45,60,0.4) 50%, transparent 80%)",
                  }}
                />
              )}
              <div className="relative h-9 w-[90px] sm:h-11 sm:w-[110px] md:h-12 md:w-[120px] lg:h-14 lg:w-[140px] xl:h-[72px] xl:w-[180px]">
                <Image
                  src="/3Dlogo.webp"
                  alt="Travel In Makkah"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,1)]"
                  sizes="(max-width: 640px) 90px, (max-width: 768px) 110px, (max-width: 1024px) 120px, (max-width: 1280px) 140px, 180px"
                />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-base font-medium transition-all duration-300 group ${
                    isTransparent
                      ? isActive
                        ? "text-white"
                        : "text-white/85 hover:text-white"
                      : isActive
                        ? "text-[#1E3A5F]"
                        : "text-[#2D3339]/80 hover:text-[#3B82F6]"
                  }`}
                >
                  {link.name}
                  {/* Active indicator underline */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-[60%] opacity-100"
                        : "w-0 opacity-0 group-hover:w-[40%] group-hover:opacity-60"
                    } ${
                      isTransparent
                        ? "bg-gradient-to-r from-[#60A5FA] via-white to-[#60A5FA] shadow-[0_0_8px_rgba(96,165,250,0.7)]"
                        : "bg-gradient-to-r from-[#1E3A5F] to-[#3B82F6]"
                    }`}
                  />
                </Link>
              );
            })}

            {/* More Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              {(() => {
                const isMoreItemActive = isMoreActive(moreLinks);
                return (
                  <button
                    className={`flex items-center gap-1.5 px-4 py-2 text-base font-medium transition-all duration-300 relative group ${
                      isTransparent
                        ? isMoreItemActive
                          ? "text-white"
                          : "text-white/85 hover:text-white"
                        : isMoreItemActive
                          ? "text-[#1E3A5F]"
                          : "text-[#2D3339]/80 hover:text-[#3B82F6]"
                    }`}
                  >
                    More
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isMoreOpen ? "rotate-180" : ""
                      }`}
                    />
                    {/* Active indicator underline for More */}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${
                        isMoreItemActive
                          ? "w-[60%] opacity-100"
                          : "w-0 opacity-0 group-hover:w-[40%] group-hover:opacity-60"
                      } ${
                        isTransparent
                          ? "bg-gradient-to-r from-[#60A5FA] via-white to-[#60A5FA] shadow-[0_0_8px_rgba(96,165,250,0.7)]"
                          : "bg-gradient-to-r from-[#1E3A5F] to-[#3B82F6]"
                      }`}
                    />
                  </button>
                );
              })()}

              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-white rounded-md border border-[#E8E3DA] shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden"
                  >
                    <div className="py-2">
                      {moreLinks.map((item) => {
                        const isActive = isLinkActive(item.href);
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`block px-5 py-3 text-[15px] font-medium transition-all duration-200 relative ${
                              isActive
                                ? "text-[#1E3A5F] bg-gradient-to-r from-[#3B82F6]/15 to-transparent border-l-2 border-[#3B82F6]"
                                : "text-[#2D3339] hover:bg-[#EBF4FF] hover:text-[#1E3A5F] hover:pl-6"
                            }`}
                            onClick={() => setIsMoreOpen(false)}
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 text-[15px] font-semibold text-white bg-[#1E3A5F] px-4 py-2.5 rounded-xl hover:bg-[#2A4A73] transition-all duration-300"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                )}
                <div className="flex items-center gap-2 text-[15px] font-medium text-[#4A5158] bg-[#F5F3EF] px-4 py-2.5 rounded-xl">
                  <User className="h-4 w-4" />
                  <span>{user.email?.split("@")[0] || "User"}</span>
                </div>
                <button
                  onClick={logOut}
                  className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 p-2.5 rounded-xl hover:bg-red-50 transition-all duration-200"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/site/login"
                className={`text-[15px] font-semibold px-4 py-2 transition-colors duration-200 ${
                  isTransparent
                    ? "text-white hover:text-white/80"
                    : "text-[#2D3339] hover:text-[#3B82F6]"
                }`}
              >
                Sign In
              </Link>
            )}

            <Link
              href="/site/Contact"
              className={`group relative inline-flex items-center gap-2 px-6 py-2.5 text-[15px] font-semibold rounded-full overflow-hidden transition-all duration-300
                ${
                  isTransparent
                    ? "text-white border border-white/60 bg-white/15 backdrop-blur-md hover:bg-white/20"
                    : "text-white rounded-xl"
                }
              `}
              style={
                isTransparent
                  ? {}
                  : {
                      background:
                        "linear-gradient(135deg, #1E3A5F 0%, #2A4A73 100%)",
                      boxShadow: "0 4px 16px rgba(30, 58, 95, 0.25)",
                    }
              }
            >
              <span className="relative z-10">Contact Us</span>

              {/* ✨ Inner shiny sweep */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700"
              />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`lg:hidden p-2.5 rounded-xl transition-colors duration-200 ${
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-[#2D3339] hover:bg-[#F5F3EF]"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="fixed inset-0 z-[55] bg-[#1E3A5F]/20 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 right-0 z-[60] w-[85vw] max-w-sm bg-white shadow-2xl lg:hidden overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#E8E3DA]">
                <Link
                  href="/"
                  className="flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="relative h-11 w-[110px] overflow-hidden">
                    <Image
                      src="/3Dlogo.webp"
                      alt="Travel In Makkah"
                      fill
                      className="object-contain"
                      sizes="110px"
                    />
                  </div>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl hover:bg-[#F5F3EF] transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="space-y-1 mb-8">
                {[...navLinks, ...moreLinks].map((link) => {
                  const isActive = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-3 px-4 text-base font-medium rounded-xl transition-all duration-200 relative ${
                        isActive
                          ? "text-[#1E3A5F] bg-gradient-to-r from-[#3B82F6]/15 to-[#EBF4FF]/50 border-l-[3px] border-[#3B82F6] pl-[13px]"
                          : "text-[#2D3339] hover:bg-[#EBF4FF] hover:text-[#1E3A5F] hover:pl-5"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-[#E8E3DA] pt-6">
                {/* Mobile Auth & Contact */}
                <div className="space-y-4">
                  {user ? (
                    <>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-center gap-3 p-4 bg-[#1E3A5F] text-white font-semibold rounded-xl"
                        >
                          <LayoutDashboard className="h-5 w-5" />
                          Admin Dashboard
                        </Link>
                      )}
                      <div className="flex items-center gap-3 p-4 bg-[#F5F3EF] rounded-xl">
                        <div className="w-10 h-10 bg-[#1E3A5F]/10 rounded-xl flex items-center justify-center">
                          <User className="h-5 w-5 text-[#1E3A5F]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#2D3339]">
                            {user.email?.split("@")[0] || "User"}
                          </p>
                          <p className="text-sm text-[#6B7280]">{user.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          logOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-4 text-left text-red-500 font-medium rounded-xl hover:bg-red-50 transition-all duration-200"
                      >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/site/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center py-4 px-6 bg-[#F5F3EF] text-[#2D3339] font-semibold rounded-xl hover:bg-[#E8E3DA] transition-all duration-200"
                    >
                      Sign In
                    </Link>
                  )}
                  <Link
                    href="/site/Contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-4 px-6 text-white font-semibold text-center rounded-xl transition-all duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, #1E3A5F 0%, #2A4A73 100%)",
                      boxShadow: "0 4px 16px rgba(30, 58, 95, 0.25)",
                    }}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
