'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Import Framer Motion
import { 
  FileText, 
  Plane, 
  Hotel, 
  Bus, 
  MapPin, 
  PlusSquare, 
  Utensils, 
  Briefcase 
} from 'lucide-react';

const OffersSection = () => {
  const services = [
    {
      title: "Visa Processing",
      description: "Complete assistance with Hajj and Umrah visa applications",
      icon: <FileText className="w-6 h-6 text-[#2d4f43]" />,
    },
    {
      title: "Guided Ziyarat Tours",
      description: "Visiting historical and Islamic places in Makkah and Madinah",
      icon: <MapPin className="w-6 h-6 text-[#2d4f43]" />,
    },
    {
      title: "Air Ticket Booking",
      description: "Flexible travel dates and group arrangements",
      icon: <Plane className="w-6 h-6 text-[#2d4f43]" />,
    },
    {
      title: "Medical Support",
      description: "Basic medical guidance and first-aid support during group travel",
      icon: <PlusSquare className="w-6 h-6 text-[#2d4f43]" />,
    },
    {
      title: "Hotel Accommodation",
      description: "Booking hotels close to Masjid al-Haram and Masjid an-Nabawi",
      icon: <Hotel className="w-6 h-6 text-[#2d4f43]" />,
    },
    {
      title: "Meal Arrangements",
      description: "Breakfast, lunch, and dinner (varies by package)",
      icon: <Utensils className="w-6 h-6 text-[#2d4f43]" />,
    },
    {
      title: "Transportation in Saudi Arabia",
      description: "Air-conditioned buses for Ziyarat and intercity transfers",
      icon: <Bus className="w-6 h-6 text-[#2d4f43]" />,
    },
    {
      title: "Special Hajj Services",
      description: "Mina, Arafat & Muzdalifah tent accommodation and maktab arrangements",
      icon: <Briefcase className="w-6 h-6 text-[#2d4f43]" />,
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between each service item
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-2 mb-12"
      >
        <h2 className="text-3xl font-medium text-[#2d4f43]">What We Do</h2>
        <span className="bg-[#64B5F6] text-white px-4 py-1 rounded-md text-2xl font-semibold">
          Offers
        </span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Image with Slide-in animation */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-4"
        >
          <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-[40px] shadow-lg group">
            <Image
              src="/offer.PNG"
              alt="Pilgrim at Kaaba"
              sizes="(max-width: 1024px) 100vw, 33vw"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Right Side: Services Grid */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-4xl md:text-5xl font-serif text-[#2d4f43] leading-tight mb-4">
              Inspired Services to Complete Your <br />
              <span className="text-[#64B5F6]">Dream Journey</span>
            </h3>
            <p className="text-[#5a6360] text-lg mb-12 max-w-2xl">
              We provide complete services to make the pilgrimage smooth, safe, and comfortable for every pilgrim.
            </p>
          </motion.div>

          {/* Staggered Grid Items */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ x: 5 }} // Slight move on hover
                className="flex items-start gap-4 group"
              >
                <div className="mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#64B5F6] transition-colors duration-300">
                    {service.title}
                  </h4>
                  <p className="text-gray-500 leading-snug">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;