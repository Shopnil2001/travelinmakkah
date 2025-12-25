'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/api';
import LoadingSpinner from '../../../components/Loading';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get('/blogs');
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

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="text-center py-16 px-6">
        <h1 className="text-4xl font-serif text-[#2d4f43]">
          Latest <span className="bg-[#00a651] text-white px-3 py-1 rounded-lg">Blogs</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {blogs.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 rounded-[40px] border-2 border-dashed border-emerald-100">
             <p className="text-[#2d4f43] font-serif italic">No articles found yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog) => (
              <Link href={`/Blog/${blog._id}`} key={blog._id} className="group">
                <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="relative h-52 w-full">
                    <Image 
                      src={blog.imageUrl || '/placeholder.jpg'} 
                      alt={blog.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-lg font-bold text-[#2d4f43] group-hover:text-[#00a651] transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-xs text-gray-400 mt-4">By {blog.author} • {new Date(blog.date).toLocaleDateString()}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;