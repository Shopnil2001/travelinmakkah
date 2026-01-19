"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FileText,
  Plane,
  Hotel,
  Bus,
  MapPin,
  HeartPulse,
  Utensils,
  Tent,
} from "lucide-react";

const OffersSection = () => {
  const services = [
    {
      title: "Visa Processing",
      description: "Complete assistance with Hajj and Umrah visa applications",
      icon: FileText,
    },
    {
      title: "Guided Ziyarat Tours",
      description:
        "Visiting historical and Islamic places in Makkah and Madinah",
      icon: MapPin,
    },
    {
      title: "Air Ticket Booking",
      description: "Flexible travel dates and group arrangements",
      icon: Plane,
    },
    {
      title: "Medical Support",
      description:
        "Basic medical guidance and first-aid support during group travel",
      icon: HeartPulse,
    },
    {
      title: "Hotel Accommodation",
      description:
        "Premium hotels close to Masjid al-Haram and Masjid an-Nabawi",
      icon: Hotel,
    },
    {
      title: "Meal Arrangements",
      description: "Halal breakfast, lunch, and dinner included in packages",
      icon: Utensils,
    },
    {
      title: "Transportation",
      description: "Air-conditioned buses for Ziyarat and intercity transfers",
      icon: Bus,
    },
    {
      title: "Hajj Camps",
      description: "Mina, Arafat & Muzdalifah tent accommodation arrangements",
      icon: Tent,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative py-20 lg:py-28 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background Image - softened */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: "url('/extra bg-2.webp')" }}
      />
      {/* Multiple overlay layers for smooth, premium look */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-white/80 to-[#FAF8F5]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#1E3A5F] font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-[#2D3339] leading-tight">
            Everything You Need for a <br className="hidden md:block" />
            <span className="text-[#1E3A5F]">Blessed Journey</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Side: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="relative h-[280px] sm:h-[350px] md:h-[450px] lg:h-[550px] w-full overflow-hidden rounded-lg group">
              <Image
                src="/about-kaaba.webp"
                alt="Pilgrim at the Kaaba"
                sizes="(max-width: 1024px) 100vw, 40vw"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Elegant overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/40 via-transparent to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6">
                <div
                  className="inline-flex items-center px-6 py-3 rounded-full 
                  bg-[#1E3A5F]/5 backdrop-blur-sm 
                  border border-white/20 
                  shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                >
                  <p className="text-white text-sm md:text-base font-medium tracking-wide">
                    Complete pilgrim care from departure to return
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Services Grid */}
          <div className="lg:col-span-7">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group p-5 rounded-2xl bg-white border border-[#E8E3DA]/60 hover:border-[#1E3A5F]/20 hover:shadow-[0_8px_30px_rgba(30,58,95,0.08)] transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#1E3A5F]/10 flex items-center justify-center group-hover:bg-[#1E3A5F]/20 transition-colors duration-300">
                        <Icon
                          className="w-5 h-5 text-[#1E3A5F]"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <h4 className="text-[#2D3339] font-semibold text-base mb-1 group-hover:text-[#1E3A5F] transition-colors duration-300">
                          {service.title}
                        </h4>
                        <p className="text-[#6B7280] text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
