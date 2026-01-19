'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Package,
  Building2,
  Video,
  HelpCircle,
  PlayCircle,
  ArrowRight
} from 'lucide-react';

const HajjServicesSection = () => {
  const services = [
    {
      icon: Package,
      title: <span className="text-white font-bold">Hajj Packages</span>,
      description: "Hajj packages include various services and amenities to help pilgrims throughout their journey."
    },
    {
      icon: Building2,
      title: <span className="text-white font-bold">Hajj Facilities</span>,
      description: "It includes all amenities provided in and around the holy city of Mecca, Medinah, Azizia, Mina, Muzdalifa and Arfat."
    },
    {
      icon: Video,
      title: <span className="text-white font-bold">Hajj Training Videos</span>,
      description: "Hajj training videos are instructional videos designed to educate and prepare Muslims for the Hajj pilgrimage."
    },
    {
      icon: HelpCircle,
      title: <span className="text-white font-bold">Hajj FAQ&apos;s</span>,
      description: "Our FAQs are designed to help pilgrims embark their holy journey with all the relevant details they need to know about."
    },
    {
      icon: PlayCircle,
      title: <span className="text-white font-bold">Hajj Services Videos</span>,
      description: "These videos provide an in-depth look at the entire Hajj journey, from the preparations before the pilgrimage."
    }
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative min-h-[550px] sm:min-h-[650px] lg:min-h-[800px] w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/extra Hajj.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/55 to-[#0a1628]/65" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 lg:py-28">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display tracking-[0.15em] mb-6">
            <span className="text-[#C9A962]">HAJJ</span>
            <span className="text-white ml-4">SERVICES</span>
          </h2>
          <p className="text-white/85 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Hajj services refer to the various facilities and support provided to Muslim pilgrims who undertake the Hajj pilgrimage to the holy city of Mecca, Saudi Arabia. Hajj is one of the Five Pillars of Islam and is obligatory for all physically and financially able Muslims to perform at least once in their lifetime.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#C9A962]/20 flex items-center justify-center group-hover:bg-[#C9A962]/30 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-[#C9A962]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[#C9A962] font-semibold text-lg mb-2">
                      {service.title}
                    </h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Learn More Button - placed in the 6th position */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center md:justify-start"
          >
            <Link
              href="/site/Hajj"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1E3A5F] font-semibold rounded-xl hover:bg-[#F5F5F5] transition-all duration-300"
              style={{
                boxShadow: '0 4px 20px rgba(255, 255, 255, 0.15)'
              }}
            >
              Learn More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HajjServicesSection;
