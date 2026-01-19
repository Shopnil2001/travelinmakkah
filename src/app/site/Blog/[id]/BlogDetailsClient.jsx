'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/api';
import { ArrowLeft, Calendar, User, Tag, Share2, BookOpen, Star } from 'lucide-react';
import StarRating from '../../../../../components/ui/StarRating';

const BlogDetailsClient = ({ blog: initialBlog, id }) => {
  const router = useRouter();
  const [blog] = useState(initialBlog);

  // Rating state
  const [ratingData, setRatingData] = useState({
    averageRating: 0,
    totalRatings: 0,
    hasRated: false,
    userRating: null
  });
  const [ratingLoading, setRatingLoading] = useState(false);
  const [ratingMessage, setRatingMessage] = useState({ type: '', text: '' });

  // Fetch rating data
  useEffect(() => {
    const fetchRating = async () => {
      if (!id) return;
      try {
        const res = await api.get(`/blogs/${id}/rating`);
        if (res.data.success) {
          setRatingData({
            averageRating: res.data.averageRating,
            totalRatings: res.data.totalRatings,
            hasRated: res.data.hasRated,
            userRating: res.data.userRating
          });
        }
      } catch (err) {
        console.error('Error fetching rating:', err);
      }
    };
    fetchRating();
  }, [id]);

  // Handle rating submission
  const handleRate = async (rating) => {
    setRatingLoading(true);
    setRatingMessage({ type: '', text: '' });

    try {
      const res = await api.post(`/blogs/${id}/rate`, { rating });
      if (res.data.success) {
        setRatingData(prev => ({
          ...prev,
          averageRating: res.data.averageRating,
          totalRatings: res.data.totalRatings,
          hasRated: true,
          userRating: rating
        }));
        setRatingMessage({
          type: 'success',
          text: 'Thank you for your rating!'
        });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to submit rating';
      setRatingMessage({
        type: 'error',
        text: errorMsg
      });
    } finally {
      setRatingLoading(false);
      // Clear message after 5 seconds
      setTimeout(() => setRatingMessage({ type: '', text: '' }), 5000);
    }
  };

  // Generate JSON-LD structured data for SEO
  const generateStructuredData = () => {
    if (!blog) return null;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blog.title,
      "author": {
        "@type": "Person",
        "name": blog.author
      },
      "datePublished": blog.date,
      "image": blog.imageUrl || undefined,
      "articleBody": blog.content?.substring(0, 500),
      "publisher": {
        "@type": "Organization",
        "name": "TravelInMakkah"
      }
    };

    // Add aggregate rating if there are ratings
    if (ratingData.totalRatings > 0) {
      structuredData.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": ratingData.averageRating.toFixed(1),
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": ratingData.totalRatings.toString()
      };
    }

    return structuredData;
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] via-white to-[#F1F5F9] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#1E3A5F]/5 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-[#1E3A5F]/40" />
          </div>
          <h2 className="text-2xl font-serif text-[#1E3A5F] mb-3">Article Not Found</h2>
          <p className="text-[#64748B] mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/site/Blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E3A5F] text-white font-medium rounded-xl hover:bg-[#2E5A8F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] via-white to-[#F1F5F9] overflow-hidden">
      {/* JSON-LD Structured Data for SEO */}
      {blog && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
        />
      )}

      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blog-detail-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="#1E3A5F"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blog-detail-pattern)"/>
        </svg>
      </div>

      {/* Hero Section with Featured Image */}
      <section className="relative">
        {/* Featured Image */}
        {blog.imageUrl && (
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F] via-[#1E3A5F]/60 to-transparent"></div>

            {/* Back Button */}
            <div className="absolute top-6 left-6 md:left-12 z-10">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Blogs</span>
              </button>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
              <div className="max-w-4xl mx-auto">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                    Article
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight mb-6">
                  <span className='text-white'>{blog.title}</span>
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{blog.author}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-white/40 hidden md:block"></div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* If no image, show simple header */}
        {!blog.imageUrl && (
          <div className="relative pt-20 pb-16 px-6 md:px-12 bg-gradient-to-br from-[#1E3A5F] to-[#2E5A8F]">
            {/* Back Button */}
            <div className="max-w-4xl mx-auto mb-8">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Blogs</span>
              </button>
            </div>

            <div className="max-w-4xl mx-auto text-center">
              <span className="px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full">
                Article
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight mt-6 mb-6">
                {blog.title}
              </h1>
              <div className="flex justify-center items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{blog.author}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/40"></div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Article Content */}
      <article className="relative max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Decorative element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 rounded-full bg-white border border-[#E2E8F0] shadow-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-[#1E3A5F]" />
          </div>
        </div>

        {/* Content Card */}
        <div className="relative bg-white rounded-3xl border border-[#E2E8F0] shadow-[0_20px_60px_-20px_rgba(30,58,95,0.1)] p-8 md:p-12 lg:p-16">
          {/* Left accent bar */}
          <div className="absolute left-0 top-12 bottom-12 w-1 bg-gradient-to-b from-[#1E3A5F] to-[#2E5A8F] rounded-r-full"></div>

          {/* Blog Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#F1F5F9]">
              <div className="flex items-center gap-3 mb-4">
                <Tag className="w-5 h-5 text-[#1E3A5F]" />
                <span className="text-sm font-medium text-[#1E3A5F] tracking-wide uppercase">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-[#F1F5F9] text-[#1E3A5F] rounded-full text-sm font-medium hover:bg-[#1E3A5F] hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Rating Section */}
          <div className="mt-12 pt-8 border-t border-[#F1F5F9]">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-5 h-5 text-[#1E3A5F]" />
              <span className="text-sm font-medium text-[#1E3A5F] tracking-wide uppercase">Rate This Article</span>
            </div>

            <div className="bg-[#F8FAFC] rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-[#475569] text-sm mb-3">
                    {ratingData.hasRated
                      ? 'Thank you for rating this article!'
                      : 'Did you find this article helpful? Let us know!'}
                  </p>
                  <StarRating
                    rating={ratingData.averageRating}
                    totalRatings={ratingData.totalRatings}
                    interactive={!ratingData.hasRated}
                    onRate={handleRate}
                    hasRated={ratingData.hasRated}
                    userRating={ratingData.userRating}
                    loading={ratingLoading}
                    size="lg"
                  />
                </div>

                {ratingMessage.text && (
                  <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    ratingMessage.type === 'success'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {ratingMessage.text}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-[#F1F5F9]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Share2 className="w-5 h-5 text-[#1E3A5F]" />
                <span className="text-sm font-medium text-[#1E3A5F]">Share this article</span>
              </div>
              <div className="flex gap-3">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/travelinmakkah"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@travelinmakkah-sn2iy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/travelinmakkah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@travel.in.makkah"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                {/* Pinterest */}
                <a
                  href="https://www.pinterest.com/travelinmakkah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                  className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.43l1.4-5.96s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-.99 4-.28 1.19.6 2.16 1.77 2.16 2.13 0 3.76-2.25 3.76-5.49 0-2.87-2.06-4.88-5-4.88-3.41 0-5.41 2.56-5.41 5.2 0 1.03.4 2.13.89 2.73.1.12.11.22.08.35l-.33 1.36c-.05.22-.18.27-.4.16-1.5-.7-2.43-2.89-2.43-4.65 0-3.78 2.75-7.26 7.92-7.26 4.16 0 7.4 2.97 7.4 6.93 0 4.14-2.61 7.46-6.23 7.46-1.22 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15A12 12 0 1 0 12 0z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Author Card */}
        <div className="mt-12 bg-gradient-to-br from-[#1E3A5F] to-[#2E5A8F] rounded-2xl p-8 md:p-10">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-serif text-white font-medium">
                {blog.author?.charAt(0)?.toUpperCase() || 'A'}
              </span>
            </div>
            <div>
              <p className="text-white/60 text-sm uppercase tracking-wider mb-1">Written by</p>
              <h3 className="text-xl font-serif text-white mb-2"><span className='text-white'>{blog.author}</span></h3>
              <p className="text-white/70 text-sm">Sharing insights about pilgrimage, spiritual journeys, and sacred travel experiences.</p>
            </div>
          </div>
        </div>

        {/* Back to Blogs CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/site/Blog"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-[#1E3A5F] text-[#1E3A5F] font-medium rounded-xl hover:bg-[#1E3A5F] hover:text-white transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Explore More Articles
          </Link>
        </div>
      </article>

      {/* Bottom Decorative Section */}
      <section className="relative py-16 px-6 md:px-12 bg-gradient-to-br from-[#1E3A5F] to-[#152a45] overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full border border-white"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full border border-white/50"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
            <span className='text-white'>Enjoyed This Article?</span>
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for more spiritual insights and pilgrimage guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:ring-0 outline-none transition-all duration-300"
            />
            <button className="px-8 py-4 bg-white text-[#1E3A5F] font-medium rounded-xl hover:bg-white/90 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailsClient;
