'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit3, Plus, Loader2, X, FileText, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '../../../../Provider/AuthProvider';
import LoadingSpinner from '../../../../components/Loading';
import PrivateRoute from '../../../../components/PrivateRoute';
import AdminSidebar from '../../../../components/AdminSidebar';
import ImageUploader from '../../../../components/ImageUploader';
import { CategoryIcons, AVAILABLE_ICONS } from '../../../../components/CategoryIcons';
import RichTextEditor from '../../../../components/RichTextEditor';
import '../admin.css';

const AdminBlogPage = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');

  // Blog categories state
  const [blogCategories, setBlogCategories] = useState([]);
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    icon: 'compass',
    order: 0,
  });
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoryFormLoading, setCategoryFormLoading] = useState(false);
  const [showCategorySection, setShowCategorySection] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    tags: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (!user) return;
    loadBlogs();
    loadBlogCategories();
  }, [user]);

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

  const loadBlogCategories = async () => {
    try {
      const res = await api.get('/categories');
      setBlogCategories(res.data);
    } catch {
      // Silently fail - categories are optional
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

  const resetCategoryForm = () => {
    setCategoryFormData({
      name: '',
      icon: 'compass',
      order: 0,
    });
    setEditingCategoryId(null);
  };

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

      resetForm();
      loadBlogs();
    } catch {
      setError('Error saving blog');
    } finally {
      setFormLoading(false);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setCategoryFormLoading(true);
    setError('');

    const payload = {
      ...categoryFormData,
      order: Number(categoryFormData.order) || 0,
    };

    try {
      if (editingCategoryId) {
        await api.put(`/categories/${editingCategoryId}`, payload);
      } else {
        await api.post('/categories', payload);
      }

      resetCategoryForm();
      loadBlogCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving category');
    } finally {
      setCategoryFormLoading(false);
    }
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

    // Scroll to form
    setTimeout(() => {
      const formElement = document.getElementById('admin-blog-form-card');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleEditCategory = (category) => {
    setCategoryFormData({
      name: category.name || '',
      icon: category.icon || 'compass',
      order: category.order || 0,
    });
    setEditingCategoryId(category._id);

    // Scroll to category form
    setTimeout(() => {
      const formElement = document.getElementById('admin-category-form-card');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
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

  const handleDeleteCategory = async (id) => {
    if (!confirm('Delete this category permanently?')) return;
    try {
      await api.delete(`/categories/${id}`);
      setBlogCategories(prev => prev.filter(c => c._id !== id));
    } catch {
      setError('Error deleting category');
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
                Create and manage spiritual guides, articles, and their categories
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

            {/* ═══════════════════════════════════════════════════════════════
                BLOG CATEGORIES SECTION
            ═══════════════════════════════════════════════════════════════ */}
            <div id="admin-category-form-card" className="admin-card mb-8 admin-animate-in admin-animate-delay-1">
              <div
                className="admin-card-header cursor-pointer flex items-center justify-between"
                onClick={() => setShowCategorySection(!showCategorySection)}
              >
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-[#1E3A5F]" />
                  <h2 className="admin-card-title">Blog Categories</h2>
                  <span className="text-sm text-gray-500">({blogCategories.length})</span>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  {showCategorySection ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>

              {showCategorySection && (
                <div className="admin-card-body">
                  {/* Info Note */}
                  <div className="admin-alert admin-alert-info mb-6">
                    <span>Note: &quot;All&quot; and &quot;Others&quot; categories are automatically added on the blog page.</span>
                  </div>

                  {/* Category Form */}
                  <form onSubmit={handleCategorySubmit} className="space-y-6 mb-8">
                    <div className="admin-form-grid">
                      <div>
                        <label className="admin-label">Category Name</label>
                        <input
                          className="admin-input"
                          placeholder="e.g. Makkah, Madina, Travel Tips"
                          value={categoryFormData.name}
                          onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <label className="admin-label">Display Order</label>
                        <input
                          type="number"
                          className="admin-input"
                          placeholder="0"
                          value={categoryFormData.order}
                          onChange={(e) => setCategoryFormData({ ...categoryFormData, order: e.target.value })}
                        />
                        <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
                      </div>

                      <div className="admin-form-full">
                        <label className="admin-label">Icon</label>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mt-2">
                          {AVAILABLE_ICONS.map((iconId) => {
                            const IconComp = CategoryIcons[iconId];
                            return (
                              <button
                                key={iconId}
                                type="button"
                                onClick={() => setCategoryFormData({ ...categoryFormData, icon: iconId })}
                                className={`p-3 rounded-lg border-2 transition-all ${
                                  categoryFormData.icon === iconId
                                    ? 'border-[#1E3A5F] bg-[#1E3A5F]/10'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <IconComp className="w-6 h-6 mx-auto text-[#1E3A5F]" />
                                <span className="text-xs text-gray-500 mt-1 block text-center">{iconId}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="admin-form-full admin-form-actions">
                        <button
                          type="submit"
                          disabled={categoryFormLoading}
                          className="admin-btn admin-btn-primary flex-1 sm:flex-none"
                        >
                          {categoryFormLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              {editingCategoryId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                              {editingCategoryId ? 'Update Category' : 'Create Category'}
                            </>
                          )}
                        </button>

                        {editingCategoryId && (
                          <button
                            type="button"
                            onClick={resetCategoryForm}
                            className="admin-btn admin-btn-secondary"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </form>

                  {/* Categories List */}
                  {blogCategories.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Tag className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p>No categories yet. Create your first category above.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {blogCategories.map((category) => {
                        const IconComp = CategoryIcons[category.icon] || CategoryIcons.compass;
                        return (
                          <div key={category._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-[#1E3A5F]/10 flex items-center justify-center">
                                <IconComp className="w-5 h-5 text-[#1E3A5F]" />
                              </div>
                              <div>
                                <h4 className="font-medium text-[#2D3339]">{category.name}</h4>
                                <p className="text-xs text-gray-500">Order: {category.order || 0}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleEditCategory(category)}
                                className="p-2 text-gray-500 hover:text-[#1E3A5F] hover:bg-[#1E3A5F]/10 rounded-lg transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(category._id)}
                                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                BLOG FORM
            ═══════════════════════════════════════════════════════════════ */}
            <div id="admin-blog-form-card" className="admin-card mb-8 admin-animate-in admin-animate-delay-1">
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
                      <RichTextEditor
                        key={editingId || 'new'}
                        value={formData.content}
                        onChange={(content) => setFormData({ ...formData, content })}
                        placeholder="Write your blog content here..."
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

            {/* ═══════════════════════════════════════════════════════════════
                BLOGS LIST
            ═══════════════════════════════════════════════════════════════ */}
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
