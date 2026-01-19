"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/api";
import LoadingSpinner from "../../../../components/Loading";
import { Loader2, CheckCircle, AlertCircle, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { CategoryIcon } from "../../../../components/CategoryIcons";

const POSTS_PER_PAGE = 12;

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([
    { id: "All", label: "All", icon: "grid", isSpecial: true },
    { id: "Others", label: "Others", icon: "compass", isSpecial: true },
  ]);

  // Get dynamic category names (excluding All and Others)
  const getDynamicCategoryNames = () => {
    return categories
      .filter((c) => !c.isSpecial)
      .map((c) => c.label.toLowerCase());
  };

  // Filter blogs based on active category
  const getFilteredBlogs = () => {
    if (activeCategory === "All") {
      return blogs;
    }

    if (activeCategory === "Others") {
      const dynamicNames = getDynamicCategoryNames();
      return blogs.filter((blog) => {
        const tags = blog.tags?.map((t) => t.toLowerCase()) || [];
        return !tags.some((tag) => dynamicNames.includes(tag));
      });
    }

    // Filter by selected category name (case-insensitive)
    return blogs.filter((blog) =>
      blog.tags?.some((tag) => tag.toLowerCase() === activeCategory.toLowerCase())
    );
  };

  // Get count for a specific category
  const getCategoryCount = (category) => {
    if (category.id === "All") return blogs.length;

    if (category.id === "Others") {
      const dynamicNames = getDynamicCategoryNames();
      return blogs.filter((blog) => {
        const tags = blog.tags?.map((t) => t.toLowerCase()) || [];
        return !tags.some((tag) => dynamicNames.includes(tag));
      }).length;
    }

    return blogs.filter((b) =>
      b.tags?.some((t) => t.toLowerCase() === category.label.toLowerCase())
    ).length;
  };

  const filteredBlogs = getFilteredBlogs();

  // Pagination calculations
  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of blog grid
    window.scrollTo({ top: 450, behavior: 'smooth' });
  };

  // Handle category change - reset to page 1
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  // Newsletter subscription state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle"); // idle, loading, success, error
  const [newsletterMessage, setNewsletterMessage] = useState("");

  // Email validation helper
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle newsletter form submission
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterStatus("loading");
    setNewsletterMessage("");

    // Client-side validation
    if (!newsletterEmail.trim()) {
      setNewsletterStatus("error");
      setNewsletterMessage("Please enter your email address");
      return;
    }

    if (!validateEmail(newsletterEmail)) {
      setNewsletterStatus("error");
      setNewsletterMessage("Please enter a valid email address");
      return;
    }

    try {
      // Call backend API to subscribe
      const response = await api.post("/newsletter/subscribe", {
        email: newsletterEmail.trim().toLowerCase(),
      });

      if (response.data.success) {
        setNewsletterStatus("success");
        setNewsletterMessage(response.data.message || "Successfully subscribed!");
        setNewsletterEmail("");
      } else {
        setNewsletterStatus("error");
        setNewsletterMessage(response.data.message || "Subscription failed");
      }
    } catch (error) {
      setNewsletterStatus("error");
      setNewsletterMessage(
        error.response?.data?.message || "Unable to subscribe. Please try again."
      );
    }

    // Auto-reset status after 5 seconds
    setTimeout(() => {
      setNewsletterStatus("idle");
      setNewsletterMessage("");
    }, 5000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blogs and categories in parallel
        const [blogsRes, categoriesRes] = await Promise.all([
          api.get("/blogs"),
          api.get("/categories").catch(() => ({ data: [] })),
        ]);

        const blogsData = blogsRes.data.blogs || blogsRes.data || [];
        setBlogs(blogsData);

        // Build categories array: All + dynamic categories + Others
        const dynamicCategories = (categoriesRes.data || []).map((cat) => ({
          id: cat.name,
          label: cat.name,
          icon: cat.icon || "compass",
          isSpecial: false,
        }));

        const finalCategories = [
          { id: "All", label: "All", icon: "grid", isSpecial: true },
          ...dynamicCategories,
          { id: "Others", label: "Others", icon: "compass", isSpecial: true },
        ];

        setCategories(finalCategories);
      } catch (err) {
        setBlogs([]);
        // Keep default categories on error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] via-white to-[#F1F5F9] overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="blog-pattern"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="30" cy="30" r="1" fill="#1E3A5F" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blog-pattern)" />
        </svg>
      </div>

      {/* Video Hero Banner Section */}
      <section className="relative h-[55vh] min-h-[400px] max-h-[600px] overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/Blog-BG.mp4" type="video/mp4" />
        </video>

        {/* Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/90 via-[#1E3A5F]/70 to-[#1E3A5F]/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/40 via-transparent to-[#0a1628]/40"></div>

        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="hero-geometric"
                x="0"
                y="0"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path d="M40 0L80 40L40 80L0 40Z" fill="none" stroke="white" strokeWidth="0.5" />
                <circle cx="40" cy="40" r="15" fill="none" stroke="white" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-geometric)" />
          </svg>
        </div>

        {/* Decorative Corner Elements */}
        <div className="hidden md:block absolute top-8 left-8 w-24 h-24 opacity-20">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="35" stroke="white" strokeWidth="0.3" />
            <circle cx="50" cy="50" r="22" stroke="white" strokeWidth="0.3" />
          </svg>
        </div>
        <div className="hidden md:block absolute top-8 right-8 w-20 h-20 opacity-20">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 5L75 40L40 75L5 40Z" stroke="white" strokeWidth="0.5" />
            <path d="M40 20L60 40L40 60L20 40Z" stroke="white" strokeWidth="0.3" />
          </svg>
        </div>

        {/* Bottom Decorative Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

        {/* Content Container */}
        <div className="relative h-full flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-3 mb-6 animate-fadeIn"
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/60"></div>
              <span className="text-white/80 font-medium text-sm tracking-[0.3em] uppercase">
                Our Insights
              </span>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/60"></div>
            </div>

            {/* Main Title */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 tracking-tight animate-fadeInUp"
              style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            >
              <span className="block mb-2 text-white">Latest</span>
              <span className="relative inline-block">
                <span className="relative z-10 px-8 py-2 text-blue-400">
                  Blogs
                </span>
                <span className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg transform -skew-x-3"></span>
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-white/70 max-w-xl mx-auto text-lg md:text-xl leading-relaxed animate-fadeInUp"
              style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
            >
              Explore our articles on pilgrimage, spiritual guidance, and travel tips
            </p>

            {/* Scroll Indicator */}
            <div
              className="mt-10 animate-fadeIn"
              style={{ animationDelay: '1s', animationFillMode: 'both' }}
            >
              <div className="inline-flex flex-col items-center gap-2 text-white/50">
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1">
                  <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animation Keyframes - injected via style tag */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        @keyframes gentleSway {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(3px) rotate(0.5deg); }
        }
        @keyframes gentleSwayReverse {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(-3px) rotate(-0.5deg); }
        }
        @keyframes shimmer {
          0% { opacity: 0.4; }
          50% { opacity: 0.7; }
          100% { opacity: 0.4; }
        }
        .sway-animation {
          animation: gentleSway 6s ease-in-out infinite;
        }
        .sway-animation-reverse {
          animation: gentleSwayReverse 7s ease-in-out infinite;
        }
        .shimmer-animation {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════
          Elegant Category Navigation Panel
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC]">
        {/* Subtle geometric pattern background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="elegant-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke="#1E3A5F" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#elegant-grid)" />
          </svg>
        </div>

        {/* Content wrapper */}
        <div className="relative py-10 sm:py-12 md:py-14">
          {/* Top decorative line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl px-8">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1E3A5F]/20 to-[#1E3A5F]/10"></div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F]/30"></div>
                <div className="w-2 h-2 rotate-45 border border-[#1E3A5F]/30"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F]/30"></div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#1E3A5F]/20 to-[#1E3A5F]/10"></div>
            </div>
          </div>

          {/* Left decorative accent */}
          <div className="hidden md:block absolute left-8 lg:left-16 top-1/2 -translate-y-1/2">
            <svg width="60" height="120" viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
              <path d="M30 0L60 30L30 60L0 30Z" stroke="#1E3A5F" strokeWidth="1" />
              <path d="M30 60L60 90L30 120L0 90Z" stroke="#1E3A5F" strokeWidth="1" />
              <circle cx="30" cy="60" r="8" stroke="#1E3A5F" strokeWidth="1" />
              <circle cx="30" cy="30" r="3" fill="#1E3A5F" fillOpacity="0.4" />
              <circle cx="30" cy="90" r="3" fill="#1E3A5F" fillOpacity="0.4" />
            </svg>
          </div>

          {/* Right decorative accent */}
          <div className="hidden md:block absolute right-8 lg:right-16 top-1/2 -translate-y-1/2">
            <svg width="60" height="120" viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
              <path d="M30 0L60 30L30 60L0 30Z" stroke="#1E3A5F" strokeWidth="1" />
              <path d="M30 60L60 90L30 120L0 90Z" stroke="#1E3A5F" strokeWidth="1" />
              <circle cx="30" cy="60" r="8" stroke="#1E3A5F" strokeWidth="1" />
              <circle cx="30" cy="30" r="3" fill="#1E3A5F" fillOpacity="0.4" />
              <circle cx="30" cy="90" r="3" fill="#1E3A5F" fillOpacity="0.4" />
            </svg>
          </div>

          {/* Section label */}
          <div className="flex items-center justify-center mb-6">
            <span className="text-[#64748B] text-xs tracking-[0.25em] uppercase font-medium">
              Browse by Topic
            </span>
          </div>

          {/* Category Tabs */}
          <div className="relative z-10 flex items-center justify-center px-4">
            <div className="relative">
              {/* Subtle glow behind the card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#1E3A5F]/5 via-[#1E3A5F]/10 to-[#1E3A5F]/5 rounded-3xl blur-xl"></div>

              {/* Main tabs container */}
              <div className="relative inline-flex items-center flex-wrap justify-center gap-1.5 bg-white rounded-2xl p-2 shadow-[0_4px_24px_-4px_rgba(30,58,95,0.12)] border border-[#E2E8F0]/80">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`relative flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-gradient-to-br from-[#1E3A5F] to-[#2A4A73] text-white shadow-lg shadow-[#1E3A5F]/20"
                        : "text-[#475569] hover:text-[#1E3A5F] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    {/* Active indicator dot */}
                    {activeCategory === category.id && (
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/80"></span>
                    )}

                    {/* Category Icon */}
                    <CategoryIcon iconId={category.icon} className="w-4 h-4" />
                    <span className="hidden sm:inline">{category.label}</span>
                    <span className="sm:hidden">{category.label.slice(0, 3)}</span>

                    {/* Count Badge */}
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-md transition-all duration-300 ${
                        activeCategory === category.id
                          ? "bg-white/20 text-white"
                          : "bg-[#F1F5F9] text-[#64748B]"
                      }`}
                    >
                      {getCategoryCount(category)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom decorative line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl px-8">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1E3A5F]/10 to-[#1E3A5F]/20"></div>
              <div className="w-6 h-px bg-[#1E3A5F]/30"></div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#1E3A5F]/10 to-[#1E3A5F]/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="relative pt-12 sm:pt-16 md:pt-20 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header with Active Category */}
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1E293B]">
                {activeCategory === "All" ? "All Articles" : `${activeCategory} Articles`}
              </h2>
              <p className="text-[#64748B] mt-1">
                {filteredBlogs.length} {filteredBlogs.length === 1 ? "article" : "articles"} found
              </p>
            </div>
          </div>

          {blogs.length === 0 ? (
            /* Empty State - No blogs at all */
            <div className="relative">
              <div className="absolute -inset-2 border-2 border-dashed border-[#1E3A5F]/20 rounded-[2rem]"></div>
              <div className="relative text-center py-24 bg-white rounded-3xl border border-[#E2E8F0]">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#1E3A5F]/5 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-[#1E3A5F]/40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 9H21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 21V9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif text-[#1E3A5F] mb-3">
                  No Articles Yet
                </h3>
                <p className="text-[#64748B] max-w-md mx-auto">
                  We&apos;re working on bringing you insightful articles about
                  pilgrimage and spiritual journeys. Check back soon!
                </p>
              </div>
            </div>
          ) : filteredBlogs.length === 0 ? (
            /* Empty State - No blogs in selected category */
            <div className="relative">
              <div className="absolute -inset-2 border-2 border-dashed border-[#1E3A5F]/20 rounded-[2rem]"></div>
              <div className="relative text-center py-20 bg-white rounded-3xl border border-[#E2E8F0]">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#1E3A5F]/5 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#1E3A5F]/40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-serif text-[#1E3A5F] mb-2">
                  No {activeCategory} Articles
                </h3>
                <p className="text-[#64748B] max-w-sm mx-auto mb-6">
                  There are no articles tagged with #{activeCategory} yet. Explore other categories!
                </p>
                <button
                  onClick={() => handleCategoryChange("All")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E3A5F] text-white text-sm font-medium rounded-xl hover:bg-[#2E5A8F] transition-colors duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/>
                    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/>
                    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/>
                    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  View All Articles
                </button>
              </div>
            </div>
          ) : (
            /* Blog Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedBlogs.map((blog, index) => (
                <Link
                  href={`/${blog.slug || blog._id}`}
                  key={blog._id}
                  className="group"
                >
                  <article className="relative h-full bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] hover:border-[#1E3A5F]/20 hover:shadow-[0_20px_50px_-15px_rgba(30,58,95,0.15)] transition-all duration-500">
                    {/* Image Container */}
                    <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                      <Image
                        src={typeof blog.imageUrl === "string" && blog.imageUrl.trim() ? blog.imageUrl : "/placeholder.svg"}
                        alt={blog.title || "Blog post"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/60 via-[#1E3A5F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[#1E3A5F] text-xs font-medium rounded-full">
                          Article
                        </span>
                      </div>

                      {/* Read More Indicator */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                          <svg
                            className="w-5 h-5 text-[#1E3A5F]"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12H19M19 12L12 5M19 12L12 19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 md:p-6">
                      {/* Date & Author */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-2 text-[#64748B] text-sm">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="3"
                              y="4"
                              width="18"
                              height="18"
                              rx="2"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M16 2V6M8 2V6M3 10H21"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span>
                            {new Date(blog.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-[#CBD5E1]"></div>
                        <span className="text-[#64748B] text-sm">
                          {blog.author}
                        </span>
                      </div>

                      {/* Rating Display */}
                      {blog.ratingStats && blog.ratingStats.totalRatings > 0 && (
                        <div className="flex items-center gap-1.5 mb-3">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3.5 h-3.5 ${
                                  star <= Math.round(blog.ratingStats.averageRating)
                                    ? "text-[#C9A962] fill-[#C9A962]"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-[#64748B] ml-1">
                            {blog.ratingStats.averageRating.toFixed(1)} ({blog.ratingStats.totalRatings})
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-xl font-serif font-medium text-[#1E293B] group-hover:text-[#1E3A5F] transition-colors duration-300 line-clamp-2 leading-relaxed">
                        {blog.title}
                      </h2>

                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {blog.tags.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-2.5 py-1 bg-[#F1F5F9] text-[#1E3A5F]/70 rounded-md text-xs font-medium group-hover:bg-[#1E3A5F]/10 transition-colors duration-300"
                            >
                              <span className="text-[#1E3A5F]/40 mr-0.5">#</span>
                              {tag}
                            </span>
                          ))}
                          {blog.tags.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 text-[#64748B] text-xs">
                              +{blog.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Read More Link */}
                      <div className="mt-4 pt-4 border-t border-[#F1F5F9]">
                        <span className="inline-flex items-center gap-2 text-[#1E3A5F] text-sm font-medium group-hover:gap-3 transition-all duration-300">
                          Read Article
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12H19M19 12L12 5M19 12L12 19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>

                    {/* Left Accent Bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1E3A5F] to-[#2E5A8F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {filteredBlogs.length > POSTS_PER_PAGE && (
            <div className="mt-12 sm:mt-16">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Page info */}
                <p className="text-sm text-[#64748B] order-2 sm:order-1">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredBlogs.length)} of {filteredBlogs.length} articles
                </p>

                {/* Pagination buttons */}
                <div className="flex items-center gap-1 order-1 sm:order-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                      currentPage === 1
                        ? "text-[#CBD5E1] cursor-not-allowed"
                        : "text-[#1E3A5F] hover:bg-[#1E3A5F]/10"
                    }`}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                      <React.Fragment key={index}>
                        {page === '...' ? (
                          <span className="w-10 h-10 flex items-center justify-center text-[#64748B]">
                            ...
                          </span>
                        ) : (
                          <button
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-300 ${
                              currentPage === page
                                ? "bg-[#1E3A5F] text-white shadow-lg shadow-[#1E3A5F]/20"
                                : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1E3A5F]"
                            }`}
                          >
                            {page}
                          </button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                      currentPage === totalPages
                        ? "text-[#CBD5E1] cursor-not-allowed"
                        : "text-[#1E3A5F] hover:bg-[#1E3A5F]/10"
                    }`}
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="relative py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-[#1E3A5F] to-[#152a45] overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full border border-white"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full border border-white/50"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6">
            <svg
              className="w-5 h-5 text-white/60"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-white/80 text-sm tracking-[0.2em] uppercase">
              Stay Connected
            </span>
            <svg
              className="w-5 h-5 text-white/60"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
            <span className="text-white">Want More Spiritual Insights?</span>
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter and receive the latest articles on
            pilgrimage guidance, travel tips, and spiritual wisdom.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={newsletterStatus === "loading"}
                className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:ring-0 outline-none transition-all duration-300 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={newsletterStatus === "loading"}
                className="px-8 py-4 bg-white text-[#1E3A5F] font-medium rounded-xl hover:bg-white/90 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {newsletterStatus === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>

            {/* Status Message */}
            {newsletterMessage && (
              <div
                className={`flex items-center justify-center gap-2 mt-4 text-sm ${
                  newsletterStatus === "success"
                    ? "text-green-300"
                    : newsletterStatus === "error"
                    ? "text-red-300"
                    : "text-white/70"
                }`}
              >
                {newsletterStatus === "success" ? (
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                ) : newsletterStatus === "error" ? (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                ) : null}
                <span>{newsletterMessage}</span>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
