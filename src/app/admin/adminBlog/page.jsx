'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit3, Plus, Loader2, X, FileText } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '../../../../Provider/AuthProvider';
import LoadingSpinner from '../../../../components/Loading';
import PrivateRoute from '../../../../components/PrivateRoute';
import AdminSidebar from '../../../../components/AdminSidebar';
import ImageUploader from '../../../../components/ImageUploader';
import '../admin.css';

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
      <div className="admin-layout">
        <AdminSidebar />

        <main className="admin-content">
          <div className="admin-content-wrapper">
            {/* Header */}
            <header className="admin-page-header admin-animate-in">
              <h1 className="admin-page-title">Manage Blogs</h1>
              <p className="admin-page-subtitle">
                Create and manage spiritual guides and articles
              </p>
            </header>

            {/* Error Alert */}
            {error && (
              <div className="admin-alert admin-alert-error admin-animate-in">
                <span>{error}</span>
                <button className="admin-alert-close" onClick={() => setError('')}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Form Card */}
            <div className="admin-card mb-8 admin-animate-in admin-animate-delay-1">
              <div className="admin-card-header">
                <h2 className="admin-card-title">
                  {editingId ? 'Edit Blog' : 'Create New Blog'}
                </h2>
              </div>
              <div className="admin-card-body">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Uploader */}
                  <ImageUploader
                    label="Blog Featured Image"
                    currentUrl={formData.imageUrl}
                    onUpload={(url) => setFormData({ ...formData, imageUrl: url })}
                    maxSizeMB={10}
                  />

                  <div className="admin-form-grid">
                    <div>
                      <label className="admin-label">Blog Title</label>
                      <input
                        className="admin-input"
                        placeholder="Enter blog title"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="admin-label">Author Name</label>
                      <input
                        className="admin-input"
                        placeholder="Author name"
                        value={formData.author}
                        onChange={e => setFormData({ ...formData, author: e.target.value })}
                        required
                      />
                    </div>

                    <div className="admin-form-full">
                      <label className="admin-label">Tags (comma-separated)</label>
                      <input
                        className="admin-input"
                        placeholder="hajj, umrah, spirituality..."
                        value={formData.tags}
                        onChange={e => setFormData({ ...formData, tags: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-full">
                      <label className="admin-label">Content</label>
                      <textarea
                        className="admin-input admin-textarea"
                        rows={8}
                        placeholder="Write your blog content here..."
                        value={formData.content}
                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                        required
                      />
                    </div>

                    <div className="admin-form-full admin-form-actions">
                      <button
                        type="submit"
                        disabled={formLoading}
                        className="admin-btn admin-btn-primary flex-1 sm:flex-none"
                      >
                        {formLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            {editingId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            {editingId ? 'Update Blog' : 'Create Blog'}
                          </>
                        )}
                      </button>

                      {editingId && (
                        <button
                          type="button"
                          onClick={resetForm}
                          className="admin-btn admin-btn-secondary"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Blogs List */}
            <section className="admin-animate-in admin-animate-delay-2">
              <h3 className="text-lg font-semibold text-[#2D3339] mb-4 font-serif">
                All Blogs ({blogs.length})
              </h3>

              {blogs.length === 0 ? (
                <div className="admin-empty">
                  <FileText className="admin-empty-icon" />
                  <h4 className="admin-empty-title">No blogs yet</h4>
                  <p className="admin-empty-desc">Create your first blog post above</p>
                </div>
              ) : (
                <div className="admin-grid">
                  {blogs.map((blog) => (
                    <div key={blog._id} className="admin-item-card">
                      {blog.imageUrl && (
                        <img
                          src={blog.imageUrl}
                          alt={blog.title}
                          className="admin-item-image"
                        />
                      )}
                      <div className="admin-item-content">
                        <h4 className="admin-item-title line-clamp-2">{blog.title}</h4>
                        <p className="admin-item-meta">By {blog.author}</p>

                        {blog.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {blog.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="admin-badge admin-badge-primary text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="admin-item-meta mt-3 line-clamp-3">{blog.content}</p>
                      </div>

                      <div className="admin-item-footer">
                        <div className="admin-item-actions">
                          <button
                            onClick={() => handleEdit(blog)}
                            className="admin-action-btn admin-action-btn-edit"
                          >
                            <Edit3 className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="admin-action-btn admin-action-btn-delete"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </PrivateRoute>
  );
};

export default AdminBlogPage;
