'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit3, Plus, Loader2 } from 'lucide-react';

import api from '@/lib/api';
import { useAuth } from '../../../../Provider/AuthProvider';
import LoadingSpinner from '../../../../components/Loading';
import PrivateRoute from '../../../../components/PrivateRoute';
import AdminSidebar from '../../../../components/AdminSidebar';
import ImageUploader from '../../../../components/ImageUploader'; // ← Your beautiful uploader

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm';

const AdminBlogPage = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    tags: '',
    imageUrl: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    const loadBlogs = async () => {
      setLoading(true);
      try {
        const res = await api.get('/blogs');
        setBlogs(res.data);
      } catch {
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');

    const payload = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await api.put(`/blogs/${editingId}`, payload);
      } else {
        await api.post('/blogs', payload);
      }

      const res = await api.get('/blogs');
      setBlogs(res.data);
      resetForm();
    } catch {
      setError('Error saving blog');
    } finally {
      setFormLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      author: '',
      tags: '',
      imageUrl: '',
    });
    setEditingId(null);
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title || '',
      content: blog.content || '',
      author: blog.author || '',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
      imageUrl: blog.imageUrl || '',
    });
    setEditingId(blog._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog permanently?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs(prev => prev.filter(b => b._id !== id));
    } catch {
      setError('Error deleting blog');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <PrivateRoute adminOnly>
      <div className="min-h-screen flex bg-gray-50">
        <AdminSidebar />

        <main className="flex-1 lg:ml-64 px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl font-bold text-black">
                Manage Blogs
              </h1>
              <p className="text-gray-700 mt-2">
                Create and manage spiritual guides and articles
              </p>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* FORM */}
            <div className="bg-white rounded-2xl shadow-xl border p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-6">
                {editingId ? 'Edit Blog' : 'Create Blog'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Image Uploader */}
                <div>
                  <ImageUploader
                    label="Blog Featured Image"
                    currentUrl={formData.imageUrl}
                    onUpload={(url) => setFormData({ ...formData, imageUrl: url })}
                    maxSizeMB={10}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <input
                    className={inputClass}
                    placeholder="Blog Title"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    required
                  />

                  <input
                    className={inputClass}
                    placeholder="Author Name"
                    value={formData.author}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                    required
                  />

                  <input
                    className={inputClass}
                    placeholder="Tags (comma separated)"
                    value={formData.tags}
                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                  />
                </div>

                <textarea
                  className={`${inputClass} min-h-[200px]`}
                  placeholder="Write your blog content here..."
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  required
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
                  >
                    {formLoading ? (
                      <>
                        <Loader2 className="animate-spin w-5 h-5" />
                        Saving...
                      </>
                    ) : editingId ? (
                      <>
                        <Edit3 className="w-5 h-5" />
                        Update Blog
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        Create Blog
                      </>
                    )}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3.5 bg-gray-200 hover:bg-gray-300 text-black rounded-xl font-semibold"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* BLOG LIST */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.length === 0 ? (
                <p className="col-span-full text-center text-xl text-gray-500 py-12">
                  No blogs yet. Create your first one above!
                </p>
              ) : (
                blogs.map((blog) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl shadow-lg border overflow-hidden flex flex-col"
                  >
                    {blog.imageUrl && (
                      <div className="relative h-48">
                        <img
                          src={blog.imageUrl}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-black line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-700 mt-1">
                        By {blog.author}
                      </p>

                      {blog.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {blog.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-gray-700 mt-4 line-clamp-4 flex-1">
                        {blog.content}
                      </p>

                      <div className="flex justify-between items-center mt-6 pt-4 border-t">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="flex items-center gap-2 text-emerald-700 font-semibold"
                        >
                          <Edit3 size={18} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="flex items-center gap-2 text-red-600 font-semibold"
                        >
                          <Trash2 size={18} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </PrivateRoute>
  );
};

export default AdminBlogPage;