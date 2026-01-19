"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  ArrowUp,
  Facebook,
  Instagram,
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
    { name: "Sharia Consultant", href: "/site/About" },
    { name: "Umrah Guide", href: "/site/Umrah" },
    { name: "Client Testimonials", href: "/#reviews" },
    { name: "Hours and Location", href: "/site/Contact" },
  ];

  const guidanceLinks = [
    { name: "Hajj Guideline", href: "/site/Hajj" },
    { name: "Umrah Guideline", href: "/site/Umrah" },
  ];

  const facilitiesLinks = [
    { name: "Hotel Booking", href: "/site/book" },
    { name: "Ziyarat Tours", href: "/site/book" },
    { name: "Umrah Training", href: "/site/Umrah" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/travelinmakkah", label: "Facebook" },
    { icon: Youtube, href: "https://www.youtube.com/@travelinmakkah-sn2iy", label: "YouTube" },
    { icon: Instagram, href: "https://www.instagram.com/travelinmakkah/", label: "Instagram" },
    { icon: "tiktok", href: "https://www.tiktok.com/@travel.in.makkah", label: "TikTok" },
    { icon: "pinterest", href: "https://www.pinterest.com/travelinmakkah/", label: "Pinterest" },
  ];

  const bottomLinks = [
    { name: "About Us", href: "/site/About" },
    { name: "Privacy Policy", href: "/site/PrivacyPolicy" },
    { name: "Contact Us", href: "/site/Contact" },
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

  // Custom TikTok icon component
  const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );

  // Custom Pinterest icon component
  const PinterestIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.43l1.4-5.96s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-.99 4-.28 1.19.6 2.16 1.77 2.16 2.13 0 3.76-2.25 3.76-5.49 0-2.87-2.06-4.88-5-4.88-3.41 0-5.41 2.56-5.41 5.2 0 1.03.4 2.13.89 2.73.1.12.11.22.08.35l-.33 1.36c-.05.22-.18.27-.4.16-1.5-.7-2.43-2.89-2.43-4.65 0-3.78 2.75-7.26 7.92-7.26 4.16 0 7.4 2.97 7.4 6.93 0 4.14-2.61 7.46-6.23 7.46-1.22 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15A12 12 0 1 0 12 0z" />
    </svg>
  );

  return (
    <footer className="relative">
      {/* ══════════════════════════════════════════════════════════════════════
          CTA Section - Warm Cream Background
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-16 sm:py-24 md:py-32 lg:py-40 xl:py-48 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-xl sm:text-2xl md:text-[2rem] lg:text-[2.5rem] text-[#2D3339] mb-4 sm:mb-6 md:mb-8 leading-[1.25] tracking-[-0.01em] italic">
            Apply for your Umrah visa today and embark on a
            <br className="hidden md:block" />
            hassle-free spiritual journey to the holy city of Makkah.
          </h2>

          <Link
            href="/site/Umrah"
            className="inline-flex items-center px-6 md:px-8 py-3 md:py-3.5 bg-[#D4A84B] hover:bg-[#C49A3D] text-white font-medium text-sm md:text-base rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-[#D4A84B]/25"
          >
            Request for Umrah Booking Online
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          Decorative Mosque Silhouette Border
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full h-[60px] sm:h-[90px] md:h-[130px] lg:h-[170px] bg-[#243d4d] overflow-hidden">
        <Image
          src="/footer-border.webp"
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
            backgroundImage: "url('/extra footer-bg-2.webp')",
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
                  <div className="relative h-12 w-[120px] sm:h-14 sm:w-[140px] md:h-16 md:w-[160px] lg:h-[88px] lg:w-[220px]">
                    <Image
                      src="/3Dlogo.webp"
                      alt="Travel In Makkah"
                      fill
                      className="object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,1)]"
                      sizes="(max-width: 640px) 120px, (max-width: 768px) 140px, (max-width: 1024px) 160px, (max-width: 1280px) 180px, 200px"
                    />
                  </div>
                </div>

                {/* Corporate Office */}
                <div>
                  <h4 className="text-white font-semibold text-[15px] mb-4 tracking-wide">
                    <span className="text-white text-xl font-bold">Corporate Office</span>
                  </h4>

                  <div className="space-y-3">
                    <a
                      href="https://maps.google.com/?q=C4M2+XJ5,+Al+Adamah,+Dammam+32242,+Saudi+Arabia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2.5 text-white/75 text-[13px] leading-relaxed hover:text-white transition-colors duration-200 group"
                    >
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/60 group-hover:text-white/90" />
                      <span className="underline decoration-white/30 underline-offset-2 group-hover:decoration-white/60">
                        C4M2+XJ5, Al Adamah
                        <br />
                        Dammam 32242, Saudi Arabia
                      </span>
                    </a>

                    <a
                      href="tel:+966509779723"
                      className="flex items-center gap-2.5 text-white/75 text-[13px] hover:text-white transition-colors duration-200 group"
                    >
                      <Phone className="w-4 h-4 flex-shrink-0 text-white/60 group-hover:text-white/90" />
                      <span className="underline decoration-white/30 underline-offset-2 group-hover:decoration-white/60">
                        +966509779723
                      </span>
                    </a>

                    <a
                      href="mailto:info@travelinmakkah.com"
                      className="flex items-center gap-2.5 text-white/75 text-[13px] hover:text-white transition-colors duration-200 group"
                    >
                      <Mail className="w-4 h-4 flex-shrink-0 text-white/60 group-hover:text-white/90" />
                      <span className="underline decoration-white/30 underline-offset-2 group-hover:decoration-white/60">
                        info@travelinmakkah.com
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
                      const isTikTok = social.icon === "tiktok";
                      const isPinterest = social.icon === "pinterest";
                      const Icon = isGoogle ? GoogleIcon : isTikTok ? TikTokIcon : isPinterest ? PinterestIcon : social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          aria-label={social.label}
                          className="text-white/60 hover:text-white transition-colors duration-200"
                        >
                          {isGoogle ? (
                            <GoogleIcon />
                          ) : isTikTok ? (
                            <TikTokIcon />
                          ) : isPinterest ? (
                            <PinterestIcon />
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
