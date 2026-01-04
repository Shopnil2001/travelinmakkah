"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  ArrowUp,
  Facebook,
  Linkedin,
  Youtube,
  ChevronRight,
  Mail,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
// Import API client for newsletter subscription
import api from "@/lib/api";

const Footer = () => {
  const parallaxRef = useRef(null);
  const sectionRef = useRef(null);

  // ============================================================================
  // NEWSLETTER SUBSCRIPTION STATE AND HANDLERS
  // ============================================================================

  // State for newsletter subscription form
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle"); // idle, loading, success, error
  const [newsletterMessage, setNewsletterMessage] = useState("");

  /**
   * Validates email format using regex
   * @param {string} email - Email to validate
   * @returns {boolean} - True if valid email format
   */
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Handles newsletter form submission
   * Validates email and calls backend API to subscribe
   */
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    // Reset previous status
    setNewsletterStatus("loading");
    setNewsletterMessage("");

    // Client-side email validation
    if (!newsletterEmail.trim()) {
      setNewsletterStatus("error");
      setNewsletterMessage("Please enter your email address");
      return;
    }

    if (!validateEmail(newsletterEmail)) {
      setNewsletterStatus("error");
      setNewsletterMessage("Please enter a valid email address");
      return;
    }

    try {
      // Call backend newsletter subscription API
      const response = await api.post("/newsletter/subscribe", {
        email: newsletterEmail.trim().toLowerCase(),
      });

      // Handle successful subscription
      if (response.data.success) {
        setNewsletterStatus("success");
        setNewsletterMessage(response.data.message || "Successfully subscribed!");
        setNewsletterEmail(""); // Clear input on success
      } else {
        setNewsletterStatus("error");
        setNewsletterMessage(response.data.message || "Subscription failed");
      }
    } catch (error) {
      // Handle API errors
      setNewsletterStatus("error");
      setNewsletterMessage(
        error.response?.data?.message || "Unable to subscribe. Please try again."
      );
    }

    // Auto-reset status after 5 seconds
    setTimeout(() => {
      if (newsletterStatus !== "loading") {
        setNewsletterStatus("idle");
        setNewsletterMessage("");
      }
    }, 5000);
  };

  // Parallax scroll effect - using requestAnimationFrame for smooth performance
  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      if (!parallaxRef.current || !sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only update when section is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate how far the section has scrolled into view
        // When section top is at window bottom: progress = 0
        // When section top is at window top: progress = 1
        const scrolled = windowHeight - rect.top;
        const totalDistance = windowHeight + rect.height;
        const progress = scrolled / totalDistance;

        // Move background slower than scroll (parallax factor: 0.4 = 40% speed)
        // Negative value makes it move up as you scroll down (classic parallax)
        const yOffset = (progress - 0.5) * rect.height * 1.6;

        parallaxRef.current.style.backgroundPosition = `center calc(50% + ${yOffset}px)`;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateParallax(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Navigation data matching reference exactly
  const aboutLinks = [
    { name: "Management Board", href: "/site/About" },
    { name: "Sharia Consultant", href: "/site/About#sharia" },
    { name: "Umrah Guide", href: "/site/Umrah-Guide" },
    { name: "Client Testimonials", href: "/#reviews" },
    { name: "Hours and Location", href: "/site/Contact" },
  ];

  const guidanceLinks = [
    { name: "Umrah Guideline English", href: "/site/Umrah-Guide" },
    { name: "Umrah Guideline Bangla", href: "/site/Umrah-Guide-Bangla" },
  ];

  const facilitiesLinks = [
    { name: "Visa Processing", href: "/site/Visa" },
    { name: "Hotel Booking", href: "/site/Hajj" },
    { name: "Ziyarat Tours", href: "/site/Umrah" },
    { name: "Airline Ticketing", href: "/site/Hajj" },
    { name: "Umrah Training", href: "/site/Umrah-Guide" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: "google", href: "#", label: "Google" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const bottomLinks = [
    { name: "About Us", href: "/site/About" },
    { name: "Privacy Policy", href: "/site/Privacy" },
    { name: "Contact Us", href: "/site/Contact" },
    { name: "Sitemap", href: "/site/Sitemap" },
  ];

  // Custom Google icon component
  const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );

  return (
    <footer className="relative">
      {/* ══════════════════════════════════════════════════════════════════════
          CTA Section - Warm Cream Background
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-28 md:py-36 lg:py-44 xl:py-52 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-[1.75rem] md:text-[2rem] lg:text-[2.5rem] text-[#2D3339] mb-6 md:mb-8 leading-[1.25] tracking-[-0.01em] italic">
            Apply for your Umrah visa today and embark on a 
            <br className="hidden sm:block" />
            hassle-free spiritual journey to the holy city of Makkah.
          </h2>

          <Link
            href="/site/Visa"
            className="inline-flex items-center px-6 md:px-8 py-3 md:py-3.5 bg-[#D4A84B] hover:bg-[#C49A3D] text-white font-medium text-sm md:text-base rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-[#D4A84B]/25"
          >
            Request for Umrah Booking Online
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          Decorative Mosque Silhouette Border
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full h-[90px] md:h-[130px] lg:h-[170px] bg-[#243d4d] overflow-hidden">
        <Image
          src="/footer-border.png"
          alt=""
          fill
          className="object-cover object-bottom"
          priority

        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          Main Footer with Parallax Background
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="relative min-h-[520px] overflow-hidden bg-[#243d4d]"
      >
        {/* Parallax Background Image Container */}
        <div
          ref={parallaxRef}
          className="absolute inset-x-0 top-0 bottom-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/extra footer-bg-2.jpg')",
            backgroundPosition: "center top",
          }}
        />

        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#243d4d] to-transparent z-[1]" />

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-[#1a2634]/45" />

        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#243d4d]/50 via-transparent to-[#1a2634]/70" />

        {/* Footer Content */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 xl:px-20 py-12 md:py-16 lg:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
              {/* ─── Brand & Contact Column ─── */}
              <div className="lg:col-span-4 space-y-6">
                {/* Logo */}
                <div className="mb-6">
                  <Image
                    src="/logo.png"
                    alt="Travel In Makkah"
                    width={220}
                    height={130}
                    className='drop-shadow-[0_2px_8px_rgba(255,255,255,1)]'
                  />
                </div>

                {/* Corporate Office */}
                <div>
                  <h4 className="text-white font-semibold text-[15px] mb-4 tracking-wide">
                    <span className="text-white text-xl font-bold">Corporate Office</span>
                  </h4>

                  <div className="space-y-3">
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2.5 text-white/75 text-[13px] leading-relaxed hover:text-white transition-colors duration-200 group"
                    >
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/60 group-hover:text-white/90" />
                      <span className="underline decoration-white/30 underline-offset-2 group-hover:decoration-white/60">
                        The Forecastle, Suite No. 4/A, 3rd Floor, Road 23/B
                        <br />
                        Gulshan 01, Dhaka 1212, Bangladesh
                      </span>
                    </a>

                    <a
                      href="tel:+8801713155258"
                      className="flex items-center gap-2.5 text-white/75 text-[13px] hover:text-white transition-colors duration-200 group"
                    >
                      <Phone className="w-4 h-4 flex-shrink-0 text-white/60 group-hover:text-white/90" />
                      <span className="underline decoration-white/30 underline-offset-2 group-hover:decoration-white/60">
                        +8801713155258
                      </span>
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-2">
                  <p className="text-white font-medium text-[14px] mb-4">
                    We&apos;re Social: Follow Us
                  </p>
                  <div className="flex items-center gap-4">
                    {socialLinks.map((social, index) => {
                      const isGoogle = social.icon === "google";
                      const Icon = isGoogle ? GoogleIcon : social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          aria-label={social.label}
                          className="text-white/60 hover:text-white transition-colors duration-200"
                        >
                          {isGoogle ? (
                            <GoogleIcon />
                          ) : (
                            <Icon className="w-5 h-5" strokeWidth={1.5} />
                          )}
                        </a>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* ─── About Us Column ─── */}
              <div className="lg:col-span-2 lg:col-start-6">
                <h4 className="text-white font-semibold text-[15px] mb-5 tracking-wide">
                  <span className="text-white text-xl font-bold">About Us</span>
                </h4>
                <ul className="space-y-2.5">
                  {aboutLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-white/70 text-[13px] hover:text-white transition-colors duration-200 underline decoration-white/30 underline-offset-2 hover:decoration-white/60"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ─── Guidance Column ─── */}
              <div className="lg:col-span-3">
                <h4 className="text-white font-semibold text-[15px] mb-5 tracking-wide">
                  <span className="text-white text-xl font-bold">Guidance</span>
                </h4>
                <ul className="space-y-2.5">
                  {guidanceLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-white/70 text-[13px] hover:text-white transition-colors duration-200 underline decoration-white/30 underline-offset-2 hover:decoration-white/60"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ─── Facilities Column ─── */}
              <div className="lg:col-span-2">
                <h4 className="text-white font-semibold text-[15px] mb-5 tracking-wide">
                  <span className="text-white text-xl font-bold">Facilities</span>
                </h4>
                <ul className="space-y-2.5">
                  {facilitiesLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-white/70 text-[13px] hover:text-white transition-colors duration-200 underline decoration-white/30 underline-offset-2 hover:decoration-white/60"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ─── Newsletter Subscription Section ─── */}
            <div className="mt-12 pt-10 border-t border-white/10">
              <div className="max-w-2xl mx-auto text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Mail className="w-5 h-5 text-white/80" />
                  <h4 className="text-white font-semibold text-lg tracking-wide">
                    <span className="text-white">Subscribe to Our Newsletter</span>
                  </h4>
                </div>
                <p className="text-white/60 text-[14px] mb-6">
                  Stay updated with the latest blogs, events, and exclusive offers for your spiritual journey.
                </p>

                {/* Newsletter Subscription Form */}
                <form onSubmit={handleNewsletterSubmit} className="max-w-lg mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address"
                      disabled={newsletterStatus === "loading"}
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-[14px] placeholder:text-white/40 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={newsletterStatus === "loading"}
                      className="px-6 py-3 bg-white hover:bg-white/90 text-[#243d4d] text-[14px] font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-[0_8px_30px_-8px_rgba(255,255,255,0.3)]"
                    >
                      {newsletterStatus === "loading" ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </div>

                  {/* Status Message */}
                  {newsletterMessage && (
                    <div
                      className={`flex items-center justify-center gap-2 mt-4 text-[13px] ${
                        newsletterStatus === "success"
                          ? "text-green-400"
                          : newsletterStatus === "error"
                          ? "text-red-400"
                          : "text-white/60"
                      }`}
                    >
                      {newsletterStatus === "success" ? (
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      ) : newsletterStatus === "error" ? (
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      ) : null}
                      <span>{newsletterMessage}</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* ─── Bottom Bar ─── */}
          <div className="border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 xl:px-20 py-5">
              {/* Links Row */}
              <nav className="flex flex-wrap justify-center gap-x-1.5 gap-y-2 mb-3">
                {bottomLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white text-[13px] transition-colors duration-200 underline decoration-white/30 underline-offset-2 hover:decoration-white/60"
                    >
                      {link.name}
                    </Link>
                    {index < bottomLinks.length - 1 && (
                      <span className="text-white/30 mx-1">|</span>
                    )}
                  </React.Fragment>
                ))}
              </nav>

              {/* Copyright */}
              <div className="text-center space-y-1.5">
                <p className="text-white/50 text-[13px] flex items-center justify-center gap-2">
                  <ChevronRight className="w-3 h-3 rotate-0" />
                  Copyright &copy; {new Date().getFullYear()} Travel In Makkah
                  Ltd. | All rights reserved.
                </p>
                <p className="text-white/40 text-[12px]">
                  Designed & Developed by{" "}
                  <a
                    href="#"
                    className="text-white/60 hover:text-white underline decoration-white/30 underline-offset-2 hover:decoration-white/60 transition-colors"
                  >
                    American Best IT Limited
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          Scroll to Top Button
      ══════════════════════════════════════════════════════════════════════ */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-5 right-5 z-50 w-11 h-11 rounded-lg bg-[#3f83e9] hover:bg-[#1c4cd3] flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl group"
      >
        <ArrowUp className="w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>
    </footer>
  );
};

export default Footer;
