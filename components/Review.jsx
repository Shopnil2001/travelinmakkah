'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import api from '@/lib/api'; //

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Initialize Embla Slider
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start', 
    loop: true,
    slidesToScroll: 1 
  });

  // Handle dot navigation
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get('/reviews'); //
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading || reviews.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2d4f43] mb-4">
            Why People <span className="bg-[#00a651] text-white px-3 py-1 rounded-md">choose us</span>
          </h2>
          <p className="text-[#5a6360] max-w-2xl mx-auto leading-relaxed">
            Trusted by thousands—read reviews from pilgrims who journeyed with us.
          </p>
        </div>

        {/* Embla Slider Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-6">
            {reviews.map((review) => (
              <div 
                key={review._id} 
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_48%] lg:flex-[0_0_23.5%]"
              >
                <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 h-full flex flex-col relative">
                  
                  {/* Stars & Date Row */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-[#f1c40f] text-xl">★</span>
                      ))}
                    </div>
                    <span className="text-gray-300 text-xs font-medium">
                      {new Date(review.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      }).replace(/ /g, '-')}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-[#5a6360] text-[15px] leading-relaxed mb-8 italic flex-grow">
                    "{review.reviewText}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-emerald-50">
                      <Image
                        src={review.photoUrl || '/default-avatar.png'} //
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-bold text-[#2d4f43] text-sm font-serif">
                      {review.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Navigation Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`transition-all duration-300 h-2.5 rounded-full ${
                selectedIndex === index ? 'w-8 bg-[#00a651]' : 'w-2.5 bg-gray-200'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;