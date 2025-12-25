// src/app/admin/adminPackage/page.jsx
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
  'w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-400/30 focus:border-emerald-400/50 shadow-sm hover:shadow-md transition-all duration-300';

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

  // Load packages when user is ready
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
      <div className="min-h-screen flex bg-gray-50">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main content area – same spacing as dashboard */}
        <div className="flex-1 p-8 ml-0 lg:ml-64 lg:mt-0 mt-16">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Manage Packages
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Create, edit, and manage your Hajj & Umrah packages with ease
              </p>
            </motion.div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="bg-rose-50 border border-rose-200 text-rose-800 px-6 py-4 rounded-2xl shadow-lg max-w-2xl mx-auto"
                >
                  <div className="flex items-center justify-between">
                    <span>{error}</span>
                    <button
                      onClick={() => setError('')}
                      className="text-rose-500 hover:text-rose-700 font-bold text-xl ml-4"
                    >
                      ×
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100/50 p-10"
            >
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                {editingId ? '✏️ Edit Package' : '➕ Create New Package'}
              </h2>

              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Package Title
                  </label>
                  <input
                    className={inputClass}
                    placeholder="Enter an attractive package title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Category
                  </label>
                  <select
                    className={inputClass}
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="Umrah">🕋 Umrah</option>
                    <option value="Hajj">🕋 Hajj</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Price (BDT)
                  </label>
                  <input
                    className={inputClass}
                    type="number"
                    placeholder="50000"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Duration
                  </label>
                  <input
                    className={inputClass}
                    placeholder="14 Days"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Inclusions
                  </label>
                  <textarea
                    className={`${inputClass} resize-vertical`}
                    rows={3}
                    placeholder="Hotel, Flights, Visa processing, Transportation, Meals, Ziyarat..."
                    value={formData.inclusions}
                    onChange={(e) =>
                      setFormData({ ...formData, inclusions: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Description
                  </label>
                  <textarea
                    className={`${inputClass} resize-vertical`}
                    rows={5}
                    placeholder="Detailed description of your package including itinerary, highlights, and special features..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-4 focus:ring-emerald-400/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {formLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {editingId ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        {editingId ? (
                          <Edit3 className="w-5 h-5" />
                        ) : (
                          <Plus className="w-6 h-6" />
                        )}
                        {editingId ? 'Update Package' : 'Create Package'}
                      </>
                    )}
                  </motion.button>

                  {editingId && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={resetForm}
                      className="px-8 py-5 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-400/50 transition-all duration-300 border border-gray-200"
                    >
                      Cancel
                    </motion.button>
                  )}
                </div>
              </form>
            </motion.div>

            {/* Packages Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
                📦 All Packages ({packages.length})
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="col-span-full text-center py-24 bg-white/60 rounded-3xl shadow-xl border-2 border-dashed border-emerald-200"
                  >
                    <Plus className="w-20 h-20 text-emerald-300 mx-auto mb-6" />
                    <h3 className="text-3xl font-bold text-gray-600 mb-3">
                      No packages yet
                    </h3>
                    <p className="text-xl text-gray-500">
                      Create your first Hajj or Umrah package above!
                    </p>
                  </motion.div>
                ) : (
                  packages.map((pkg, index) => (
                    <motion.div
                      key={pkg._id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-emerald-100/50 overflow-hidden transition-all duration-500 hover:border-emerald-300/70"
                    >
                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-bold ${
                              pkg.category === 'Hajj'
                                ? 'bg-rose-100 text-rose-700 border-2 border-rose-200'
                                : 'bg-emerald-100 text-emerald-800 border-2 border-emerald-200'
                            }`}
                          >
                            {pkg.category}
                          </span>
                          <span className="px-3 py-1 bg-white/60 text-xs font-semibold text-gray-700 rounded-full shadow-sm">
                            {pkg.duration}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-all duration-300 line-clamp-2">
                          {pkg.title}
                        </h3>

                        <p className="text-4xl font-black mb-6 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                          ৳ {pkg.price.toLocaleString()}
                        </p>

                        <p className="text-gray-600 leading-relaxed line-clamp-4 mb-8">
                          {pkg.description}
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-emerald-50 to-blue-50/50 px-8 py-6 border-t border-emerald-100">
                        <div className="flex items-center justify-between">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEdit(pkg)}
                            className="flex items-center gap-2 px-5 py-3 bg-white text-emerald-700 hover:text-emerald-800 font-semibold rounded-2xl shadow-lg hover:shadow-xl border border-emerald-200 hover:border-emerald-300 transition-all duration-300"
                          >
                            <Edit3 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            Edit
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(pkg._id)}
                            className="flex items-center gap-2 px-5 py-3 bg-white text-rose-700 hover:text-rose-800 font-semibold rounded-2xl shadow-lg hover:shadow-xl border border-rose-200 hover:border-rose-300 transition-all duration-300"
                          >
                            <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            Delete
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default AdminPackagePage;
