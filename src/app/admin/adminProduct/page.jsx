'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit3, Plus, Loader2, X, ShoppingCart } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '../../../../Provider/AuthProvider';
import LoadingSpinner from '../../../../components/Loading';
import PrivateRoute from '../../../../components/PrivateRoute';
import AdminSidebar from '../../../../components/AdminSidebar';
import ImageUploader from '../../../../components/ImageUploader';
import '../admin.css';

export default function AdminProductPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');

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
                Add and manage affiliate products
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
                      <input
                        className="admin-input"
                        placeholder="e.g. Ihram, Prayer Mat"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                      />
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

            {/* Products List */}
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
                      <img
                        src={p.imageUrl || '/placeholder.jpg'}
                        alt={p.name}
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
