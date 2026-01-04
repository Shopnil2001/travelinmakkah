"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/api";
import LoadingSpinner from "../../../../components/Loading";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        const data = res.data.blogs || res.data || [];
        setBlogs(data);
      } catch (err) {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
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

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 md:px-12 lg:px-20">
        {/* Decorative elements */}
        <div className="absolute top-12 left-12 w-24 h-24 opacity-10">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="48" stroke="#1E3A5F" strokeWidth="1" />
            <circle cx="50" cy="50" r="32" stroke="#1E3A5F" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="absolute top-16 right-16 w-20 h-20 opacity-10">
          <svg
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 0L80 40L40 80L0 40Z"
              stroke="#1E3A5F"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center relative z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#1E3A5F]"></div>
              <span className="text-[#1E3A5F] font-medium text-sm tracking-[0.3em] uppercase">
                Our Insights
              </span>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#1E3A5F]"></div>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#1E293B] mb-6 tracking-tight">
              <span className="inline-flex items-center gap-4">
                <span>Latest</span>
                <span className="relative inline-block">
                  <span className="relative z-10 text-white px-6 py-2">
                    Blogs
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F] to-[#2E5A8F] rounded-xl transform -skew-x-3"></span>
                </span>
              </span>
            </h1>

            <p className="text-[#64748B] max-w-xl mx-auto text-lg md:text-xl">
              Explore our articles on pilgrimage, spiritual guidance, and travel
              tips
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="relative pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {blogs.length === 0 ? (
            /* Empty State */
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
          ) : (
            /* Blog Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <Link
                  href={`/site/Blog/${blog._id}`}
                  key={blog._id}
                  className="group"
                >
                  <article className="relative h-full bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] hover:border-[#1E3A5F]/20 hover:shadow-[0_20px_50px_-15px_rgba(30,58,95,0.15)] transition-all duration-500">
                    {/* Image Container */}
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={blog.imageUrl || "/placeholder.jpg"}
                        alt={blog.title}
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
                    <div className="p-6">
                      {/* Date & Author */}
                      <div className="flex items-center gap-3 mb-4">
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

                      {/* Title */}
                      <h2 className="text-xl font-serif font-medium text-[#1E293B] group-hover:text-[#1E3A5F] transition-colors duration-300 line-clamp-2 leading-relaxed">
                        {blog.title}
                      </h2>

                      {/* Read More Link */}
                      <div className="mt-5 pt-5 border-t border-[#F1F5F9]">
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
