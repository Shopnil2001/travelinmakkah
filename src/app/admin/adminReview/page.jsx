'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit3, Plus, Loader2, X, Star } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '../../../../Provider/AuthProvider';
import LoadingSpinner from '../../../../components/Loading';
import PrivateRoute from '../../../../components/PrivateRoute';
import AdminSidebar from '../../../../components/AdminSidebar';
import ImageUploader from '../../../../components/ImageUploader';
import '../admin.css';

const AdminReviewPage = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    reviewText: '',
    photoUrl: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    const loadReviews = async () => {
      setLoading(true);
      try {
        const res = await api.get('/reviews');
        setReviews(res.data);
      } catch {
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');

    try {
      if (editingId) {
        await api.put(`/reviews/${editingId}`, formData);
      } else {
        await api.post('/reviews', formData);
      }

      resetForm();
      const res = await api.get('/reviews');
      setReviews(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error saving review');
    } finally {
      setFormLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      rating: 5,
      reviewText: '',
      photoUrl: '',
    });
    setEditingId(null);
  };

  const handleEdit = (review) => {
    setFormData({
      name: review.name || '',
      rating: review.rating || 5,
      reviewText: review.reviewText || '',
      photoUrl: review.photoUrl || '',
    });
    setEditingId(review._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this review permanently?')) return;

    try {
      await api.delete(`/reviews/${id}`);
      setReviews(prev => prev.filter(r => r._id !== id));
    } catch {
      setError('Error deleting review');
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
              <h1 className="admin-page-title">Manage Reviews</h1>
              <p className="admin-page-subtitle">
                Add and manage authentic customer testimonials
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
                  {editingId ? 'Edit Review' : 'Create Review'}
                </h2>
              </div>
              <div className="admin-card-body">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Uploader */}
                  <ImageUploader
                    label="Customer Photo"
                    currentUrl={formData.photoUrl}
                    onUpload={(url) => setFormData({ ...formData, photoUrl: url })}
                    maxSizeMB={8}
                  />

                  <div className="admin-form-grid">
                    <div>
                      <label className="admin-label">Customer Name</label>
                      <input
                        className="admin-input"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="admin-label">Rating</label>
                      <select
                        className="admin-input admin-select"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                      >
                        {[5, 4, 3, 2, 1].map((r) => (
                          <option key={r} value={r}>{r} Stars</option>
                        ))}
                      </select>
                    </div>

                    <div className="admin-form-full">
                      <label className="admin-label">Review Text</label>
                      <textarea
                        className="admin-input admin-textarea"
                        rows={5}
                        placeholder="Write the customer's testimonial..."
                        value={formData.reviewText}
                        onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
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
                            {editingId ? 'Update Review' : 'Create Review'}
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

            {/* Reviews List */}
            <section className="admin-animate-in admin-animate-delay-2">
              <h3 className="text-lg font-semibold text-[#2D3339] mb-4 font-serif">
                All Reviews ({reviews.length})
              </h3>

              {reviews.length === 0 ? (
                <div className="admin-empty">
                  <Star className="admin-empty-icon" />
                  <h4 className="admin-empty-title">No reviews yet</h4>
                  <p className="admin-empty-desc">Add your first customer testimonial above</p>
                </div>
              ) : (
                <div className="admin-grid">
                  {reviews.map((review) => (
                    <div key={review._id} className="admin-item-card">
                      <div className="admin-item-content">
                        <div className="flex items-center gap-3 mb-4">
                          {review.photoUrl ? (
                            <img
                              src={review.photoUrl}
                              alt={review.name}
                              className="admin-avatar"
                            />
                          ) : (
                            <div className="admin-avatar-placeholder">
                              {review.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <h4 className="font-semibold text-[#2D3339]">{review.name}</h4>
                            <div className="admin-stars">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`admin-star ${i < review.rating ? 'admin-star-filled' : ''}`}
                                >
                                  *
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <p className="admin-item-meta italic line-clamp-4">
                          "{review.reviewText}"
                        </p>
                      </div>

                      <div className="admin-item-footer">
                        <div className="admin-item-actions">
                          <button
                            onClick={() => handleEdit(review)}
                            className="admin-action-btn admin-action-btn-edit"
                          >
                            <Edit3 className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(review._id)}
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

export default AdminReviewPage;
