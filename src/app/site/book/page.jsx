"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plane,
  Building2,
  Shield,
  Clock,
  Headphones,
  BadgeCheck,
  MapPin,
  Star,
} from "lucide-react";
import SearchPanel from "../../../../components/SearchPanel";

const BookingPage = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Booking",
      description:
        "Your transactions are protected with enterprise-grade security",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Book your travel arrangements anytime, anywhere",
    },
    {
      icon: Headphones,
      title: "Dedicated Support",
      description: "Expert assistance throughout your pilgrimage journey",
    },
    {
      icon: BadgeCheck,
      title: "Best Price Guarantee",
      description: "Competitive rates for flights and accommodations",
    },
  ];

  const popularDestinations = [
    {
      name: "Makkah",
      country: "Saudi Arabia",
      description: "The holiest city in Islam",
      image: "/makkah.jpg",
    },
    {
      name: "Madinah",
      country: "Saudi Arabia",
      description: "The City of the Prophet",
      image: "/madina.jpg",
    },
    {
      name: "Jeddah",
      country: "Saudi Arabia",
      description: "Gateway to the Holy Cities",
      image: "/hajj new-bg.png",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Section with Search Panel */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/Hajj.mp4" type="video/mp4" />
          </video>
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F]/70 via-[#1E3A5F]/50 to-[#1E3A5F]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#152A45]/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <Plane className="w-4 h-4 text-[#C9A962]" />
              <span className="text-white/90 text-sm font-medium">
                Travel With Confidence
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4">
              <span className="text-white">Book Your</span>{" "}
              <span className="text-[#C9A962]">Sacred Journey</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Find the perfect flights and hotels for your pilgrimage to the
              Holy Cities. Trusted by thousands of pilgrims worldwide.
            </p>
          </motion.div>

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <SearchPanel variant="compact" />
          </motion.div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAF8F5] to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[#1E3A5F] font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-[#2D3339]">
              Travel With <span className="text-[#C9A962]">Peace of Mind</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-6 bg-[#FAF8F5] rounded-2xl border border-[#E8E3DA] hover:border-[#C9A962]/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#1E3A5F] to-[#2A4A73] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#2D3339] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[#1E3A5F] font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              Holy Destinations
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-[#2D3339]">
              Popular <span className="text-[#C9A962]">Destinations</span>
            </h2>
            <p className="text-[#6B7280] max-w-xl mx-auto mt-4">
              Explore the sacred cities and plan your spiritual journey
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {popularDestinations.map((destination, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${destination.image})` }}
                />
                {/* Gradient Overlay */}
                {/* Dark bottom for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F33] via-[#0F1F33]/60 to-transparent" />

                {/* Soft vignette */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-[#C9A962]" />
                    <span className="text-white/90 text-sm font-medium tracking-wide">
                      {destination.country}
                    </span>
                  </div>
                  <h3 className="text-3xl font-display text-white leading-tight">
                    {destination.name}
                  </h3>
                  <p className="text-white/75 text-sm max-w-[90%]">
                    {destination.description}
                  </p>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 text-[#C9A962] font-semibold text-sm rounded-full backdrop-blur-sm border border-[#C9A962]/30 hover:bg-[#C9A962] hover:text-[#1E3A5F] transition-all duration-300">
                    Explore Flights
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Travel Tips Section */}
      <section className="py-20 lg:py-28 bg-[#1E3A5F] relative overflow-hidden">
        {/* Islamic Pattern Background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#C9A962] font-semibold text-sm uppercase tracking-[0.2em] mb-4">
                Travel Smart
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-white mb-6">
                <span className="text-white">
                  Essential Tips for Your{" "}
                  <span className="text-[#C9A962]">Pilgrimage</span>
                </span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Prepare for your sacred journey with our comprehensive travel
                guides and expert recommendations. We ensure your trip is
                smooth, comfortable, and spiritually fulfilling.
              </p>

              <div className="space-y-4">
                {[
                  "Book flights 2-3 months in advance for best rates",
                  "Choose hotels near Haram for convenience",
                  "Pack light and comfortable clothing",
                  "Keep digital copies of all documents",
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#C9A962]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-[#C9A962]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-white/80">{tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { value: "15+", label: "Years Experience" },
                { value: "10K+", label: "Happy Pilgrims" },
                { value: "50+", label: "Partner Airlines" },
                { value: "100+", label: "Hotels Network" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center"
                >
                  <p className="text-4xl lg:text-5xl font-display text-[#C9A962] mb-2">
                    {stat.value}
                  </p>
                  <p className="text-white/60 text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-1 px-4 py-2 bg-[#C9A962]/10 rounded-full mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-[#C9A962] fill-[#C9A962]"
                />
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-[#2D3339] mb-4">
              Ready to Begin Your{" "}
              <span className="text-[#C9A962]">Journey</span>?
            </h2>
            <p className="text-[#6B7280] text-lg max-w-2xl mx-auto mb-8">
              Let us help you plan the perfect pilgrimage. Our team is here to
              assist you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/site/Contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1E3A5F] to-[#2A4A73] text-white font-semibold rounded-xl shadow-[0_8px_24px_rgba(30,58,95,0.25)] hover:shadow-[0_12px_32px_rgba(30,58,95,0.35)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Headphones className="w-5 h-5" />
                Speak With Us
              </Link>

              <Link
                href="/site/Hajj"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1E3A5F] font-semibold rounded-xl border-2 border-[#E8E3DA] hover:border-[#1E3A5F] transition-all duration-300"
              >
                Explore Packages
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
