'use client';

import React from 'react';
import Image from 'next/image';
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

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
      {/* Section Header */}
      <div className="flex items-center justify-center gap-2 mb-12">
        <h2 className="text-3xl font-medium text-[#2d4f43]">What We Do</h2>
        <span className="bg-[#00a651] text-white px-4 py-1 rounded-md text-2xl font-semibold">
          Offters
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Image */}
        <div className="lg:col-span-4">
          <div className="relative h-[600px] w-full overflow-hidden rounded-[40px] shadow-lg">
            <Image
              src="/offer.PNG" // Replace with your image path
              alt="Pilgrim at Kaaba"
              sizes="(max-width: 1024px) 100vw, 33vw"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Side: Services Grid */}
        <div className="lg:col-span-8">
          <h3 className="text-4xl md:text-5xl font-serif text-[#2d4f43] leading-tight mb-4">
            Inspired Services to Complete Your <br />
            <span className="text-[#00a651]">Dream Journey</span>
          </h3>
          <p className="text-[#5a6360] text-lg mb-12 max-w-2xl">
            We provides complete services to make the pilgrimage smooth, safe, and comfortable for every pilgrim.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {services.map((service, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0">
                  {service.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">
                    {service.title}
                  </h4>
                  <p className="text-gray-500 leading-snug">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;