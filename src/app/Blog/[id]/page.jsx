'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/api';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import LoadingSpinner from '../../../../components/Loading';

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

  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (!blog) return <div className="p-20 text-center">Article not found.</div>;

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-6 pt-10">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#00a651] hover:underline mb-8 font-medium"
        >
          <ArrowLeft size={18} /> Back to Blogs
        </button>
      </div>

      <article className="max-w-4xl mx-auto px-6 pb-24">
        {/* Header Metadata */}
        <div className="space-y-4 mb-10 text-center">
          <div className="flex justify-center gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1"><User size={14}/> {blog.author}</span>
            <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(blog.date).toLocaleDateString()}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#2d4f43] leading-tight">
            {blog.title}
          </h1>
        </div>

        {/* Featured Image */}
        {blog.imageUrl && (
          <div className="relative h-[300px] md:h-[500px] w-full rounded-[40px] overflow-hidden mb-12 shadow-lg">
            <Image 
              src={blog.imageUrl} 
              alt={blog.title} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {/* We render content as paragraphs if it's plain text, or safely as HTML if you use a rich text editor */}
          <div className="whitespace-pre-wrap font-sans">
            {blog.content}
          </div>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
            <Tag size={18} className="text-[#00a651]" />
            {blog.tags.map((tag, i) => (
              <span key={i} className="bg-emerald-50 text-[#00a651] px-4 py-1 rounded-full text-sm font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogDetails;