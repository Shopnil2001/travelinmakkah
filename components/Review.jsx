"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import api from "@/lib/api";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
    dragFree: true,
  });

  // Parallax effect for background
  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      if (!bgRef.current || !sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrolled = windowHeight - rect.top;
        const totalDistance = windowHeight + rect.height;
        const progress = scrolled / totalDistance;
        const yOffset = (progress - 0.5) * 80;

        bgRef.current.style.transform = `scale(1.03) translateY(${
          yOffset * 0.5
        }px)`;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateParallax();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get("/reviews");
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (loading || reviews.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative py-24 lg:py-32 overflow-hidden "
      style={{ backgroundImage: "url('/test2.webp')" }}
    >
      {/* ══════════════════════════════════════════════════════════════════════
          PROMINENT BACKGROUND IMAGE - Clearly visible
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          willChange: "transform",
          zIndex: -1, // Add this line
        }}
      >
        <Image
          src="/review-background.webp"
          alt=""
          fill
          priority
          quality={85}
          className="object-cover"
          style={{
            objectPosition: "center center",
            filter: "blur(6px) saturate(80%)",
            opacity: 0.35,
          }}
        />
      </div>

      {/* Subtle vignette effect - keeps background visible while adding depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(30,58,95,0.15)_100%)]" />

      {/* Very light overlay for text readability - background still prominently visible */}
      <div className="absolute inset-0 backdrop-blur-[2.5px] bg-gradient-to-b from-white/50 via-transparent to-white" />

      {/* Decorative geometric patterns on sides */}
      {/* <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1E3A5F]/10 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1E3A5F]/10 to-transparent" /> */}

      {/* Floating decorative elements */}
      <motion.div
        className="hidden sm:block absolute top-20 left-10 w-24 h-24 rounded-full border border-[#C9A962]/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="hidden sm:block absolute bottom-20 right-10 w-32 h-32 rounded-full border border-[#C9A962]/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          CONTENT CONTAINER
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          {/* Decorative top element */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent" />
            <div className="relative">
              <Sparkles className="w-6 h-6 text-[#C9A962]" />
              <div className="absolute inset-0 animate-ping">
                <Sparkles className="w-6 h-6 text-[#C9A962]/30" />
              </div>
            </div>
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent" />
          </div>

          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#1E3A5F] font-semibold text-xs uppercase tracking-[0.3em] mb-4 drop-shadow-sm"
          >
            Testimonials
          </motion.p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-[#1E3A5F] mb-4 sm:mb-6 leading-[1.1] drop-shadow-sm">
            Voices of Our{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#C9A962]">Pilgrims</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 10C50 2 150 2 198 10"
                  stroke="#C9A962"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
            </span>
          </h2>

          <p className="text-[#2D3339]/80 max-w-xl mx-auto text-base md:text-lg leading-relaxed drop-shadow-sm">
            Heartfelt stories from those who have completed their sacred journey
            with us
          </p>
        </motion.div>

        {/* Navigation Controls - Floating above carousel */}
        <div className="flex items-center justify-between mb-8">
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#E8E3DA]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-[#C9A962] fill-[#C9A962]"
                />
              ))}
              <span className="text-sm font-medium text-[#2D3339] ml-2">
                5-Star Service
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-2 border-[#1E3A5F]/20 flex items-center justify-center hover:bg-[#1E3A5F] hover:border-[#1E3A5F] hover:text-white text-[#1E3A5F] transition-all duration-300 shadow-lg"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollNext}
              className="w-12 h-12 rounded-full bg-[#1E3A5F] border-2 border-[#1E3A5F] flex items-center justify-center text-white hover:bg-[#152A45] transition-all duration-300 shadow-lg"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            CAROUSEL
        ══════════════════════════════════════════════════════════════════════ */}
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          ref={emblaRef}
        >
          <div className="flex gap-6 lg:gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_48%] lg:flex-[0_0_32%]"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group relative h-full"
                >
                  {/* Card glow effect on hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#C9A962]/20 via-[#1E3A5F]/20 to-[#C9A962]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative bg-white/95 backdrop-blur-md p-8 lg:p-9 rounded-2xl border border-white/50 h-full flex flex-col overflow-hidden shadow-[0_8px_32px_rgba(30,58,95,0.12)] hover:shadow-[0_20px_60px_rgba(30,58,95,0.2)] transition-all duration-500">
                    {/* Decorative corner accent */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-bl from-[#C9A962]/20 to-transparent rounded-full transition-all duration-500 group-hover:scale-150" />
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-[#1E3A5F]/10 to-transparent rounded-full" />

                    {/* Large quote icon background */}
                    <div className="absolute top-4 right-4 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500">
                      <Quote className="w-20 h-20 text-[#1E3A5F]" />
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1.5 mb-6 relative z-10">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * i, duration: 0.3 }}
                        >
                          <Star className="w-5 h-5 text-[#C9A962] fill-[#C9A962] drop-shadow-sm" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-[#2D3339] text-base leading-[1.85] mb-8 flex-grow relative z-10 font-medium">
                      &ldquo;{review.reviewText}&rdquo;
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 pt-6 border-t border-[#E8E3DA]/80 relative z-10">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#C9A962] to-[#1E3A5F] rounded-full opacity-50 blur-sm group-hover:opacity-80 transition-opacity" />
                        <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-white">
                          <Image
                            src={review.photoUrl || "/default-avatar.webp"}
                            alt={review.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-[#1E3A5F] text-base mb-0.5">
                          {review.name}
                        </p>
                        <p className="text-[#6B7280] text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A962]" />
                          {new Date(review.date).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {reviews.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`transition-all duration-400 rounded-full ${
                selectedIndex === index
                  ? "w-10 h-3 bg-gradient-to-r from-[#1E3A5F] to-[#2A4A73]"
                  : "w-3 h-3 bg-[#1E3A5F]/30 hover:bg-[#1E3A5F]/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Navigation Arrows */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollPrev}
            className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm border-2 border-[#1E3A5F]/20 flex items-center justify-center text-[#1E3A5F] shadow-lg"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollNext}
            className="w-14 h-14 rounded-full bg-[#1E3A5F] flex items-center justify-center text-white shadow-lg"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
