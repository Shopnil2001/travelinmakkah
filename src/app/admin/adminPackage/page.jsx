'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit3, Plus, Loader2, X, Package } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '../../../../Provider/AuthProvider';
import LoadingSpinner from '../../../../components/Loading';
import PrivateRoute from '../../../../components/PrivateRoute';
import AdminSidebar from '../../../../components/AdminSidebar';
import '../admin.css';

const AdminPackagePage = () => {
  const { user } = useAuth();
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    inclusions: '',
    region: '',
    category: 'Umrah',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    const loadPackages = async () => {
      setLoading(true);
      try {
        const res = await api.get('/packages');
        setPackages(res.data);
      } catch {
        setError('Failed to load packages');
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');

    const data = {
      ...formData,
      price: Number(formData.price),
      inclusions: formData.inclusions
        .split(',')
        .map((i) => i.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await api.put(`/packages/${editingId}`, data);
      } else {
        await api.post('/packages', data);
      }

      resetForm();
      const res = await api.get('/packages');
      setPackages(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error saving package');
    } finally {
      setFormLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      duration: '',
      inclusions: '',
      region: '',
      category: 'Umrah',
    });
    setEditingId(null);
  };

  const handleEdit = (pkg) => {
    setFormData({
      title: pkg.title,
      description: pkg.description,
      price: pkg.price,
      duration: pkg.duration,
      inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions.join(', ') : '',
      region: pkg.region || '',
      category: pkg.category || 'Umrah',
    });
    setEditingId(pkg._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this package permanently?')) return;
    try {
      await api.delete(`/packages/${id}`);
      setPackages((prev) => prev.filter((p) => p._id !== id));
    } catch {
      setError('Error deleting package');
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
              <h1 className="admin-page-title">Manage Packages</h1>
              <p className="admin-page-subtitle">
                Create, edit, and manage your Hajj & Umrah packages
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
                  {editingId ? 'Edit Package' : 'Create New Package'}
                </h2>
              </div>
              <div className="admin-card-body">
                <form onSubmit={handleSubmit} className="admin-form-grid">
                  <div>
                    <label className="admin-label">Package Title</label>
                    <input
                      className="admin-input"
                      placeholder="Enter package title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">Category</label>
                    <select
                      className="admin-input admin-select"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Umrah">Umrah</option>
                      <option value="Hajj">Hajj</option>
                    </select>
                  </div>

                  <div>
                    <label className="admin-label">Price (BDT)</label>
                    <input
                      className="admin-input"
                      type="number"
                      placeholder="50000"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">Duration</label>
                    <input
                      className="admin-input"
                      placeholder="14 Days"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-full">
                    <label className="admin-label">Inclusions (comma-separated)</label>
                    <textarea
                      className="admin-input admin-textarea"
                      rows={3}
                      placeholder="Hotel, Flights, Visa, Transportation, Meals..."
                      value={formData.inclusions}
                      onChange={(e) => setFormData({ ...formData, inclusions: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-full">
                    <label className="admin-label">Description</label>
                    <textarea
                      className="admin-input admin-textarea"
                      rows={4}
                      placeholder="Detailed package description..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                          {editingId ? 'Updating...' : 'Creating...'}
                        </>
                      ) : (
                        <>
                          {editingId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          {editingId ? 'Update Package' : 'Create Package'}
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
                </form>
              </div>
            </div>

            {/* Packages List */}
            <section className="admin-animate-in admin-animate-delay-2">
              <h3 className="text-lg font-semibold text-[#2D3339] mb-4 font-serif">
                All Packages ({packages.length})
              </h3>

              {packages.length === 0 ? (
                <div className="admin-empty">
                  <Package className="admin-empty-icon" />
                  <h4 className="admin-empty-title">No packages yet</h4>
                  <p className="admin-empty-desc">Create your first package using the form above</p>
                </div>
              ) : (
                <div className="admin-grid">
                  {packages.map((pkg) => (
                    <div key={pkg._id} className="admin-item-card">
                      <div className="admin-item-content">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`admin-badge ${pkg.category === 'Hajj' ? 'admin-badge-gold' : 'admin-badge-primary'}`}>
                            {pkg.category}
                          </span>
                          <span className="text-sm text-[#6B7280]">{pkg.duration}</span>
                        </div>

                        <h4 className="admin-item-title line-clamp-2">{pkg.title}</h4>

                        <div className="admin-price mt-2">
                          <span className="admin-price-currency">BDT </span>
                          {pkg.price?.toLocaleString()}
                        </div>

                        <p className="admin-item-meta mt-3 line-clamp-3">{pkg.description}</p>
                      </div>

                      <div className="admin-item-footer">
                        <div className="admin-item-actions">
                          <button
                            onClick={() => handleEdit(pkg)}
                            className="admin-action-btn admin-action-btn-edit"
                          >
                            <Edit3 className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(pkg._id)}
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

export default AdminPackagePage;
