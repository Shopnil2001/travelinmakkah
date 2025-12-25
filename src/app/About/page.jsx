'use client';

import React from 'react';
import Image from 'next/image';
import { Rocket, Lightbulb } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Page Title */}
      <section className="pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-[#2d4f43]">
          About <span className="bg-[#00a651] text-white px-3 py-1 rounded-lg">Us</span>
        </h1>
      </section>

      {/* Hero Story Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-24 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Main Image */}
          <div className="relative h-[450px] w-full rounded-[40px] overflow-hidden shadow-2xl">
            <Image 
              src="/about-kaaba.PNG" 
              alt="Pilgrim praying at the Kaaba" 
              fill 
              className="object-cover"
              priority
            />
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-serif text-[#2d4f43] leading-tight">
              Discover the Story Behind <br />
              <span className="text-[#00a651]">Travel In Makkah</span> and Our <br />
              Commitment to Pilgrims
            </h2>
            
            <div className="text-gray-500 space-y-4 leading-relaxed font-sans">
              <p>
                Welcome to <strong>Travel In Makkah</strong>, your dependable companion on every sacred journey. We are devoted to offering well-organized Hajj and Umrah packages that ensure a smooth and fulfilling pilgrimage for all our respected travelers. Under the guidance of our expertise, we uphold the true spiritual value of every step you take.
              </p>
              <p>
                Explore our wide range of thoughtfully designed tour packages tailored to your individual needs. Our dedicated team also provides complete visa assistance, making your travel preparations effortless.
              </p>
              <p>
                At <strong>Travel In Makkah</strong>, we strive to create a stress-free pilgrimage experience, allowing you to focus solely on the spiritual essence of your journey. Join us as we help shape your sacred aspirations with sincerity, care, and unwavering dedication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Our Mission */}
          <div className="p-10 rounded-[30px] border border-emerald-100 bg-white hover:shadow-lg transition-shadow text-center space-y-4">
            <div className="inline-flex p-4 bg-white shadow-sm border border-gray-50 rounded-2xl text-[#00a651] mb-2">
              <Rocket size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-serif text-[#2d4f43]">Our Mission</h3>
            <p className="text-gray-500 leading-relaxed">
              Our vision is to become the most trusted guide for pilgrims, empowering every believer to experience a spiritually fulfilling and transformative journey to the sacred cities.
            </p>
          </div>

          {/* Our Vision */}
          <div className="p-10 rounded-[30px] border border-emerald-100 bg-white hover:shadow-lg transition-shadow text-center space-y-4">
            <div className="inline-flex p-4 bg-white shadow-sm border border-gray-50 rounded-2xl text-[#00a651] mb-2">
              <Lightbulb size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-serif text-[#2d4f43]">Our Vision</h3>
            <p className="text-gray-500 leading-relaxed">
              Our vision is to become the most trusted guide for pilgrims, empowering every believer to experience a spiritually fulfilling and transformative journey to the sacred cities.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutPage;