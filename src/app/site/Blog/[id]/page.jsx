'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/api';
import { ArrowLeft, Calendar, User, Tag, Share2, BookOpen } from 'lucide-react';
import LoadingSpinner from '../../../../../components/Loading';

const BlogDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog content:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBlog();
  }, [id]);

  if (loading) return <LoadingSpinner />;

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
      <article className="relative max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-20">
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
          <div className="prose prose-lg max-w-none">
            <div className="text-[#475569] leading-[1.9] text-lg whitespace-pre-wrap font-sans">
              {blog.content}
            </div>
          </div>

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

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-[#F1F5F9]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Share2 className="w-5 h-5 text-[#1E3A5F]" />
                <span className="text-sm font-medium text-[#1E3A5F]">Share this article</span>
              </div>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </button>
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

export default BlogDetails;