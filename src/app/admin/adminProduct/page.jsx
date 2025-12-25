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
      <div className="min-h-screen flex bg-gray-100 text-black">
        <AdminSidebar />

        <main className="flex-1 w-full ml-0 lg:ml-64 mt-20 lg:mt-0 px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8">
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-black"
            >
              Manage Affiliate Products
            </motion.h1>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-100 border border-red-300 text-red-800 px-4 sm:px-6 py-3 sm:py-4 rounded-xl"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* FORM */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black">
                {editingId ? 'Edit Product' : 'Create Product'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Image Uploader - Beautiful & Functional */}
                <div>
                  <ImageUploader
                    label="Product Image"
                    currentUrl={formData.imageUrl}
                    onUpload={(url) => setFormData({ ...formData, imageUrl: url })}
                    maxSizeMB={10}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <input
                    className={inputClass}
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />

                  <input
                    type="number"
                    className={inputClass}
                    placeholder="Price (BDT)"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />

                  <input
                    className={inputClass}
                    placeholder="Category (e.g. Ihram, Prayer Mat)"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />

                  <input
                    className={inputClass}
                    placeholder="Amazon Affiliate URL"
                    value={formData.affiliateUrl}
                    onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
                    required
                  />
                </div>

                <textarea
                  rows={4}
                  className={inputClass}
                  placeholder="Product Description (optional)"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={formLoading || !formData.imageUrl}
                  className="w-full md:w-auto px-12 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg"
                >
                  {formLoading ? (
                    <Loader2 className="animate-spin w-6 h-6" />
                  ) : editingId ? (
                    <Edit3 className="w-6 h-6" />
                  ) : (
                    <Plus className="w-6 h-6" />
                  )}
                  {formLoading ? 'Saving...' : editingId ? 'Update Product' : 'Create Product'}
                </motion.button>
              </form>
            </div>

            {/* PRODUCTS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {products.length === 0 ? (
                <p className="col-span-full text-center py-12 text-gray-500 text-xl">
                  No products yet. Add your first affiliate product above!
                </p>
              ) : (
                products.map((p) => (
                  <motion.div
                    key={p._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden flex flex-col"
                  >
                    <div className="relative h-48 sm:h-56">
                      <img
                        src={p.imageUrl || '/placeholder.jpg'}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                      <h3 className="text-lg sm:text-xl font-bold text-black line-clamp-2">
                        {p.name}
                      </h3>
                      <p className="text-gray-700 text-sm mt-1">{p.category}</p>
                      <p className="text-xl sm:text-2xl font-bold text-emerald-700 mt-2">
                        ৳ {Number(p.price).toLocaleString()}
                      </p>

                      {p.description && (
                        <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                          {p.description}
                        </p>
                      )}

                      <div className="flex justify-between items-center mt-auto pt-4 gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="flex items-center gap-2 text-emerald-700 font-semibold text-sm sm:text-base hover:text-emerald-800"
                        >
                          <Edit3 size={18} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="flex items-center gap-2 text-red-600 font-semibold text-sm sm:text-base hover:text-red-800"
                        >
                          <Trash2 size={18} /> Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </PrivateRoute>
  );
}