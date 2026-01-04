'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import api from '@/lib/api';

const EventSection = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000 })]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  if (events.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 px-6 md:px-12 lg:px-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#1E3A5F] font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            Upcoming Journeys
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-[#2D3339]">
            Join Our Next <span className="text-[#C9A962]">Pilgrimage</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="overflow-hidden rounded-3xl shadow-2xl" ref={emblaRef}>
          <div className="flex">
            {events.map((event) => (
              <div key={event._id} className="flex-[0_0_100%] min-w-0">
                <div className="relative min-h-[450px] md:min-h-[500px] overflow-hidden rounded-3xl">

                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src="/EventBG.PNG"
                      alt={event.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Enhanced overlay for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#1E3A5F]/90 to-[#1E3A5F]/75" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 via-transparent to-transparent" />
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4" />

                  {/* Content */}
                  <div className="relative z-10 h-full w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-20 py-14 md:py-16 gap-10">

                    {/* Left: Event Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl">
                      <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-white text-sm font-semibold tracking-wide">
                          Registration Open
                        </span>
                      </div>

                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-display text-white leading-tight mb-5 drop-shadow-lg">
                        <span className='text-[#C9A962]'>{event.title}</span>
                      </h3>

                      <div className="w-20 h-1 bg-gradient-to-r from-[#C9A962] to-[#C9A962]/30 rounded-full mb-6" />

                      <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-md">
                        Join our carefully planned spiritual journey with complete guidance, premium accommodations, and dedicated support throughout your pilgrimage.
                      </p>
                    </div>

                    {/* Right: Date & CTA */}
                    <div className="flex flex-col items-center md:items-end gap-6">
                      {/* Date Card */}
                      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 shadow-xl">
                        <Calendar className="w-7 h-7 text-[#C9A962] mx-auto mb-3" />
                        <p className="text-white/70 text-sm mb-2 uppercase tracking-wider">Departure Date</p>
                        <p className="text-white text-4xl md:text-5xl font-display font-semibold">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-white/70 text-sm mt-2">
                          {new Date(event.date).getFullYear()}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => router.push(`/site/Events/${event._id}`)}
                        className="group flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-[#1E3A5F] bg-white hover:bg-[#F5F5F5] transition-all duration-300 shadow-xl"
                      >
                        Reserve Your Spot
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSection;
