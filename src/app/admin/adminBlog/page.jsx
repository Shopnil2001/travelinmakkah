'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit3, Plus, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '../../../../Provider/AuthProvider';
import LoadingSpinner from '../../../../components/Loading';
import PrivateRoute from '../../../../components/PrivateRoute';
import AdminSidebar from '../../../../components/AdminSidebar';

const inputClass =
  'w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500';

const AdminBlogPage = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    tags: '',
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
      editingId
        ? await api.put(`/blogs/${editingId}`, payload)
        : await api.post('/blogs', payload);

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
    setFormData({ title: '', content: '', author: '', tags: '' });
    setEditingId(null);
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
    });
    setEditingId(blog._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog permanently?')) return;
    await api.delete(`/blogs/${id}`);
    setBlogs(prev => prev.filter(b => b._id !== id));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <PrivateRoute adminOnly>
      <div className="min-h-screen flex bg-gray-50">

        {/* Sidebar — SAME AS AdminUser */}
        <AdminSidebar />

        {/* Main content — SAME MARGINS AS AdminUser */}
        <div className="flex-1 ml-0 lg:ml-64 mt-20 lg:mt-0 px-4 sm:px-6 lg:px-8 py-6 ">

          <div className="max-w-7xl mx-auto space-y-8">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl font-bold text-black">
                Manage Blogs
              </h1>
              <p className="text-gray-700 mt-2">
                Create and manage blog posts
              </p>
            </motion.div>

            {/* Error */}
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

            {/* Form */}
            <div className="bg-white rounded-xl shadow border p-6">
              <h2 className="text-xl font-bold text-black mb-5">
                {editingId ? 'Edit Blog' : 'Create Blog'}
              </h2>

              <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-4"
              >
                <input
                  className={inputClass}
                  placeholder="Blog Title"
                  value={formData.title}
                  onChange={e =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />

                <input
                  className={inputClass}
                  placeholder="Author Name"
                  value={formData.author}
                  onChange={e =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  required
                />

                <input
                  className={inputClass}
                  placeholder="Tags (comma separated)"
                  value={formData.tags}
                  onChange={e =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                />

                <textarea
                  className={`md:col-span-2 ${inputClass}`}
                  rows={6}
                  placeholder="Blog content..."
                  value={formData.content}
                  onChange={e =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                />

                <div className="md:col-span-2 flex gap-3">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                  >
                    {formLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : editingId ? (
                      <Edit3 size={18} />
                    ) : (
                      <Plus size={18} />
                    )}
                    {editingId ? 'Update Blog' : 'Create Blog'}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 bg-gray-200 text-black rounded-lg font-semibold"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Blog List */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map(blog => (
                <div
                  key={blog._id}
                  className="bg-white rounded-xl shadow border p-5 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-black">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-700 mt-1">
                      By {blog.author}
                    </p>

                    {blog.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {blog.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-200 text-black text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-gray-800 mt-3 line-clamp-3">
                      {blog.content}
                    </p>
                  </div>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="flex items-center gap-2 text-emerald-700 font-semibold"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="flex items-center gap-2 text-red-600 font-semibold"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default AdminBlogPage;
