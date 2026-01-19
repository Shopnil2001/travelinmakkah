'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Trash2, Edit3, Plus, Loader2, X, ShoppingCart, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '../../../../Provider/AuthProvider';
import LoadingSpinner from '../../../../components/Loading';
import PrivateRoute from '../../../../components/PrivateRoute';
import AdminSidebar from '../../../../components/AdminSidebar';
import ImageUploader from '../../../../components/ImageUploader';
import { CategoryIcons, AVAILABLE_PRODUCT_ICONS } from '../../../../components/CategoryIcons';
import '../admin.css';

export default function AdminProductPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');

  // Product categories state
  const [productCategories, setProductCategories] = useState([]);
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    icon: 'box',
    order: 0,
  });
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoryFormLoading, setCategoryFormLoading] = useState(false);
  const [showCategorySection, setShowCategorySection] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    price: '',
    category: '',
    affiliateUrl: '',
    description: '',
  });

  useEffect(() => {
    if (!user) return;
    loadProducts();
    loadProductCategories();
  }, [user]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const loadProductCategories = async () => {
    try {
      const res = await api.get('/product-categories');
      setProductCategories(res.data);
    } catch {
      // Silently fail - categories are optional
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      imageUrl: '',
      price: '',
      category: '',
      affiliateUrl: '',
      description: '',
    });
    setEditingId(null);
  };

  const resetCategoryForm = () => {
    setCategoryFormData({
      name: '',
      icon: 'box',
      order: 0,
    });
    setEditingCategoryId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      setError('Please upload a product image');
      return;
    }
    setFormLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
      };
      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
      } else {
        await api.post('/products', payload);
      }

      resetForm();
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.error || 'Error saving product');
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
        await api.put(`/product-categories/${editingCategoryId}`, payload);
      } else {
        await api.post('/product-categories', payload);
      }

      resetCategoryForm();
      loadProductCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving category');
    } finally {
      setCategoryFormLoading(false);
    }
  };

  const handleEdit = (p) => {
    setFormData({
      name: p.name || '',
      imageUrl: p.imageUrl || '',
      price: p.price || '',
      category: p.category || '',
      affiliateUrl: p.affiliateUrl || '',
      description: p.description || '',
    });
    setEditingId(p._id);

    // Scroll to form
    setTimeout(() => {
      const formElement = document.getElementById('admin-product-form-card');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleEditCategory = (category) => {
    setCategoryFormData({
      name: category.name || '',
      icon: category.icon || 'box',
      order: category.order || 0,
    });
    setEditingCategoryId(category._id);

    // Scroll to category form
    setTimeout(() => {
      const formElement = document.getElementById('admin-product-category-form-card');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product permanently?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      setError('Error deleting product');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm('Delete this category permanently?')) return;
    try {
      await api.delete(`/product-categories/${id}`);
      setProductCategories((prev) => prev.filter((c) => c._id !== id));
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
              <h1 className="admin-page-title">Manage Products</h1>
              <p className="admin-page-subtitle">
                Add and manage affiliate products and their categories
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
                PRODUCT CATEGORIES SECTION
            ═══════════════════════════════════════════════════════════════ */}
            <div id="admin-product-category-form-card" className="admin-card mb-8 admin-animate-in admin-animate-delay-1">
              <div
                className="admin-card-header cursor-pointer flex items-center justify-between"
                onClick={() => setShowCategorySection(!showCategorySection)}
              >
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-[#1E3A5F]" />
                  <h2 className="admin-card-title">Product Categories</h2>
                  <span className="text-sm text-gray-500">({productCategories.length})</span>
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
                  {/* Category Form */}
                  <form onSubmit={handleCategorySubmit} className="space-y-6 mb-8">
                    <div className="admin-form-grid">
                      <div>
                        <label className="admin-label">Category Name</label>
                        <input
                          className="admin-input"
                          placeholder="e.g. Ihram, Prayer Mat, Books"
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
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 mt-2">
                          {AVAILABLE_PRODUCT_ICONS.map((iconId) => {
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
                                <IconComp className="w-5 h-5 mx-auto text-[#1E3A5F]" />
                                <span className="text-[10px] text-gray-500 mt-1 block text-center truncate">{iconId}</span>
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
                  {productCategories.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Tag className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p>No categories yet. Create your first category above.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {productCategories.map((category) => {
                        const IconComp = CategoryIcons[category.icon] || CategoryIcons.box;
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
                PRODUCT FORM
            ═══════════════════════════════════════════════════════════════ */}
            <div id="admin-product-form-card" className="admin-card mb-8 admin-animate-in admin-animate-delay-1">
              <div className="admin-card-header">
                <h2 className="admin-card-title">
                  {editingId ? 'Edit Product' : 'Create New Product'}
                </h2>
              </div>
              <div className="admin-card-body">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Uploader */}
                  <ImageUploader
                    label="Product Image"
                    currentUrl={formData.imageUrl}
                    onUpload={(url) => setFormData({ ...formData, imageUrl: url })}
                    maxSizeMB={10}
                    required
                  />

                  <div className="admin-form-grid">
                    <div>
                      <label className="admin-label">Product Name</label>
                      <input
                        className="admin-input"
                        placeholder="Product name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="admin-label">Price (BDT)</label>
                      <input
                        type="number"
                        className="admin-input"
                        placeholder="1000"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="admin-label">Category</label>
                      {productCategories.length > 0 ? (
                        <select
                          className="admin-input"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          required
                        >
                          <option value="">Select a category</option>
                          {productCategories.map((cat) => (
                            <option key={cat._id} value={cat.name}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          className="admin-input"
                          placeholder="e.g. Ihram, Prayer Mat"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          required
                        />
                      )}
                      {productCategories.length === 0 && (
                        <p className="text-xs text-amber-600 mt-1">
                          Tip: Create categories above to use a dropdown selector
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="admin-label">Affiliate URL</label>
                      <input
                        className="admin-input"
                        placeholder="https://amazon.com/..."
                        value={formData.affiliateUrl}
                        onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
                        required
                      />
                    </div>

                    <div className="admin-form-full">
                      <label className="admin-label">Description (optional)</label>
                      <textarea
                        className="admin-input admin-textarea"
                        rows={3}
                        placeholder="Product description..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-full admin-form-actions">
                      <button
                        type="submit"
                        disabled={formLoading || !formData.imageUrl}
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
                            {editingId ? 'Update Product' : 'Create Product'}
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
                PRODUCTS LIST
            ═══════════════════════════════════════════════════════════════ */}
            <section className="admin-animate-in admin-animate-delay-2">
              <h3 className="text-lg font-semibold text-[#2D3339] mb-4 font-serif">
                All Products ({products.length})
              </h3>

              {products.length === 0 ? (
                <div className="admin-empty">
                  <ShoppingCart className="admin-empty-icon" />
                  <h4 className="admin-empty-title">No products yet</h4>
                  <p className="admin-empty-desc">Add your first affiliate product above</p>
                </div>
              ) : (
                <div className="admin-grid">
                  {products.map((p) => (
                    <div key={p._id} className="admin-item-card">
                      <Image
                        src={typeof p.imageUrl === "string" && p.imageUrl.trim() ? p.imageUrl : "/placeholder.svg"}
                        alt={p.name || "Product"}
                        width={400}
                        height={192}
                        className="admin-item-image"
                      />
                      <div className="admin-item-content">
                        <h4 className="admin-item-title line-clamp-2">{p.name}</h4>
                        <p className="admin-item-meta">{p.category}</p>

                        <div className="admin-price mt-2">
                          <span className="admin-price-currency">BDT </span>
                          {Number(p.price).toLocaleString()}
                        </div>

                        {p.description && (
                          <p className="admin-item-meta mt-3 line-clamp-2">{p.description}</p>
                        )}
                      </div>

                      <div className="admin-item-footer">
                        <div className="admin-item-actions">
                          <button
                            onClick={() => handleEdit(p)}
                            className="admin-action-btn admin-action-btn-edit"
                          >
                            <Edit3 className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p._id)}
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
}
