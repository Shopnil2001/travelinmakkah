'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import api from '@/lib/api';

const EventSection = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  // Added delay to Autoplay for better UX
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

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
    <section className="py-10 px-4 md:px-12 lg:px-24 bg-white">
      <div className="max-w-5/6 mx-auto overflow-hidden rounded-[30px] md:rounded-[50px] shadow-xl" ref={emblaRef}>
        <div className="flex">
          {events.map((event) => (
            <div key={event._id} className="flex-[0_0_100%] min-w-0 relative min-h-[400px] md:h-[400px]">
              
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/EventBG.PNG" 
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/70 md:bg-black/50" />
              </div>

              {/* Content Container */}
              <div className="relative z-10 h-full w-full flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-16 lg:px-24 py-12 md:py-0 gap-8">
                
                {/* Left Side: Title & Info */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                  <span className="text-[#64B5F6] font-semibold tracking-[0.2em] uppercase text-xs md:text-sm">
                    Sacred Path Pilgrimage Tour
                  </span>
                  <div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white leading-tight">
                      {event.title}
                    </h2>
                    <div className="h-1.5 w-24 bg-[#64B5F6] mt-2 mx-auto md:mx-0 rounded-full" />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <span className="bg-[#64B5F6] text-white px-3 py-1 rounded-md text-xs font-bold uppercase">Dream</span>
                    <span className="text-white/90 text-sm font-medium">Destination</span>
                  </div>
                </div>

                {/* Right Side: Date & Action */}
                <div className="flex flex-col items-center md:items-end space-y-4">
                  <div className="text-center md:text-right">
                    <span className="text-[#64B5F6] text-sm font-medium block mb-1">Join our upcoming trips</span>
                    <h3 className="text-4xl md:text-5xl font-serif text-white">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </h3>
                  </div>
                  <button 
                    onClick={() => router.push(`/site/Events/${event._id}`)}
                    className="bg-[#64B5F6] hover:bg-white hover:text-[#2d4f43] text-white px-12 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Book Now
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventSection;