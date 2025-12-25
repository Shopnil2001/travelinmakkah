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
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

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
    <section className="py-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto overflow-hidden rounded-[40px]" ref={emblaRef}>
        <div className="flex">
          {events.map((event) => (
            <div key={event._id} className="flex-[0_0_100%] min-w-0 relative h-[250px] md:h-[300px]">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/EventBG.PNG" // Use event.imageUrl if available in DB
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-between px-10 md:px-20 text-center md:text-left">
                <div className="flex flex-col justify-center h-full">
                  <span className="text-[#00a651] font-medium mb-2 tracking-wide">
                    Sacred Path Pilgrimage Tour
                  </span>
                  <h2 className="text-4xl md:text-6xl font-serif text-white border-b-4 border-[#00a651] pb-2 inline-block">
                    {event.title}
                  </h2>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="bg-[#00a651] text-white px-3 py-1 rounded text-sm font-bold">Dream</span>
                    <span className="text-white text-sm">Destination</span>
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-end justify-center h-full pt-4 md:pt-0">
                  <span className="text-[#00a651] font-medium mb-2">Join our upcoming trips</span>
                  <h3 className="text-3xl md:text-5xl font-serif text-white mb-6">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                  </h3>
                  <button 
                    onClick={() => router.push(`/events/${event._id}`)}
                    className="bg-[#00a651] hover:bg-[#008f45] text-white px-10 py-3 rounded-xl font-bold transition-all"
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