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
  'w-full px-5 py-4 rounded-2xl border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-emerald-400/30 focus:border-emerald-500 shadow-sm transition';

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
      <div className="min-h-screen flex bg-gray-50 text-gray-900">
        <AdminSidebar />

        <div className="flex-1 ml-0 lg:ml-64 mt-16 lg:mt-0 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3">
                Manage Reviews
              </h1>
              <p className="text-gray-800 text-base sm:text-lg max-w-2xl mx-auto">
                Add and manage authentic customer testimonials
              </p>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-2xl shadow max-w-2xl mx-auto"
                >
                  <div className="flex justify-between items-center">
                    <span>{error}</span>
                    <button
                      onClick={() => setError('')}
                      className="font-bold text-xl"
                    >
                      ×
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 sm:p-10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-8">
                {editingId ? 'Edit Review' : 'Create Review'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Image Uploader */}
                <div>
                  <ImageUploader
                    label="Customer Photo"
                    currentUrl={formData.photoUrl}
                    onUpload={(url) => setFormData({ ...formData, photoUrl: url })}
                    maxSizeMB={8}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold text-black mb-2">
                      Customer Name *
                    </label>
                    <input
                      className={inputClass}
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-black mb-2">
                      Rating *
                    </label>
                    <select
                      className={inputClass}
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    >
                      {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>{r} Stars</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-black mb-2">
                    Review Text *
                  </label>
                  <textarea
                    rows={6}
                    className={`${inputClass} resize-vertical`}
                    placeholder="Write the customer's heartfelt review..."
                    value={formData.reviewText}
                    onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 disabled:opacity-50"
                  >
                    {formLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        {editingId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        {editingId ? 'Update Review' : 'Create Review'}
                      </>
                    )}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-8 py-4 bg-gray-200 text-black rounded-2xl font-bold"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </motion.div>

            {/* REVIEW CARDS */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-8">
                All Reviews ({reviews.length})
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.length === 0 ? (
                  <p className="col-span-full text-center text-xl text-gray-500 py-12">
                    No reviews yet. Add the first one above!
                  </p>
                ) : (
                  reviews.map((review) => (
                    <motion.div
                      key={review._id}
                      whileHover={{ y: -8 }}
                      className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden flex flex-col"
                    >
                      <div className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                          {review.photoUrl ? (
                            <img
                              src={review.photoUrl}
                              alt={review.name}
                              className="w-16 h-16 rounded-full object-cover border-4 border-emerald-100 shadow-md"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-2xl font-bold text-emerald-700 shadow-md">
                              {review.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <h3 className="font-bold text-black text-lg">{review.name}</h3>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-800 leading-relaxed line-clamp-5">
                          "{review.reviewText}"
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-8 py-5 border-t border-emerald-100">
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => handleEdit(review)}
                            className="flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800"
                          >
                            <Edit3 className="w-5 h-5" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(review._id)}
                            className="flex items-center gap-2 text-red-600 font-semibold hover:text-red-800"
                          >
                            <Trash2 className="w-5 h-5" /> Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default AdminReviewPage;