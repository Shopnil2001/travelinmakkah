'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit3, Plus, Loader2, X, Globe } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '../../../../Provider/AuthProvider';
import LoadingSpinner from '../../../../components/Loading';
import PrivateRoute from '../../../../components/PrivateRoute';
import AdminSidebar from '../../../../components/AdminSidebar';
import ImageUploader from '../../../../components/ImageUploader';
import '../admin.css';

const AdminVisaPageContent = () => {
  const { user } = useAuth();
  const [visas, setVisas] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    imageUrl: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    const loadVisas = async () => {
      setLoading(true);
      try {
        const res = await api.get('/visas');
        setVisas(res.data);
      } catch {
        setError('Failed to load visa info');
      } finally {
        setLoading(false);
      }
    };
    loadVisas();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');

    try {
      if (editingId) {
        await api.put(`/visas/${editingId}`, formData);
      } else {
        await api.post('/visas', formData);
      }
      resetForm();
      const res = await api.get('/visas');
      setVisas(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error saving visa info');
    } finally {
      setFormLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', subtitle: '', description: '', imageUrl: '' });
    setEditingId(null);
  };

  const handleEdit = (visa) => {
    setFormData({
      title: visa.title || '',
      subtitle: visa.subtitle || '',
      description: visa.description || '',
      imageUrl: visa.imageUrl || '',
    });
    setEditingId(visa._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this visa info permanently?')) return;
    try {
      await api.delete(`/visas/${id}`);
      setVisas(prev => prev.filter(v => v._id !== id));
    } catch {
      setError('Error deleting visa info');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        <div className="admin-content-wrapper">
          {/* Header */}
          <header className="admin-page-header admin-animate-in">
            <h1 className="admin-page-title">Manage Visas</h1>
            <p className="admin-page-subtitle">
              Help pilgrims with visa requirements and procedures
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
                {editingId ? 'Edit Visa Info' : 'Create Visa Info'}
              </h2>
            </div>
            <div className="admin-card-body">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Uploader */}
                <ImageUploader
                  label="Visa Banner Image"
                  currentUrl={formData.imageUrl}
                  onUpload={(url) => setFormData({ ...formData, imageUrl: url })}
                  maxSizeMB={10}
                />

                <div className="admin-form-grid">
                  <div>
                    <label className="admin-label">Title</label>
                    <input
                      className="admin-input"
                      placeholder="e.g. Saudi Visa Requirements"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">Subtitle</label>
                    <input
                      className="admin-input"
                      placeholder="e.g. For Bangladeshi Citizens"
                      value={formData.subtitle}
                      onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-full">
                    <label className="admin-label">Description</label>
                    <textarea
                      className="admin-input admin-textarea"
                      rows={8}
                      placeholder="Full visa processing details, requirements, documents, fees..."
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
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
                          {editingId ? 'Update' : 'Create'}
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

          {/* Visa List */}
          <section className="admin-animate-in admin-animate-delay-2">
            <h3 className="text-lg font-semibold text-[#2D3339] mb-4 font-serif">
              All Visa Info ({visas.length})
            </h3>

            {visas.length === 0 ? (
              <div className="admin-empty">
                <Globe className="admin-empty-icon" />
                <h4 className="admin-empty-title">No visa info yet</h4>
                <p className="admin-empty-desc">Create visa information above</p>
              </div>
            ) : (
              <div className="admin-grid">
                {visas.map((visa) => (
                  <div key={visa._id} className="admin-item-card">
                    {visa.imageUrl && (
                      <img
                        src={visa.imageUrl}
                        alt={visa.title}
                        className="admin-item-image"
                      />
                    )}
                    <div className="admin-item-content">
                      <h4 className="admin-item-title">{visa.title}</h4>
                      <p className="text-[#C9A962] font-medium text-sm mt-1">{visa.subtitle}</p>
                      <p className="admin-item-meta mt-3 line-clamp-4">{visa.description}</p>
                    </div>

                    <div className="admin-item-footer">
                      <div className="admin-item-actions">
                        <button
                          onClick={() => handleEdit(visa)}
                          className="admin-action-btn admin-action-btn-edit"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(visa._id)}
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
  );
};

const AdminVisaPage = () => {
  return (
    <PrivateRoute adminOnly>
      <AdminVisaPageContent />
    </PrivateRoute>
  );
};

export default AdminVisaPage;
