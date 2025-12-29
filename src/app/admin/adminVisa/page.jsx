'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit3, Plus, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '../../../../Provider/AuthProvider';
import LoadingSpinner from '../../../../components/Loading';
import PrivateRoute from '../../../../components/PrivateRoute';
import AdminSidebar from '../../../../components/AdminSidebar';
import ImageUploader from '../../../../components/ImageUploader';
const AdminVisaPageContent = () => {
  // Move ALL logic here (state, effects, handlers)
  const inputClass = 'w-full px-5 py-4 rounded-2xl border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-emerald-400/30 focus:border-emerald-500 shadow-sm transition';
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
  return <div>
    <div className="min-h-screen flex bg-gray-50">
        <AdminSidebar />

        <main className="flex-1 lg:ml-64 px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl font-bold text-black">
                Manage Visa Processing Info
              </h1>
              <p className="text-gray-700 mt-2">
                Help pilgrims with visa requirements and procedures
              </p>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-white rounded-2xl shadow-xl border p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-6">
                {editingId ? 'Edit Visa Info' : 'Create Visa Info'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <ImageUploader
                    label="Visa Banner Image"
                    currentUrl={formData.imageUrl}
                    onUpload={(url) => setFormData({ ...formData, imageUrl: url })}
                    maxSizeMB={10}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    className={inputClass}
                    placeholder="Title (e.g. Saudi Visa Requirements)"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                  <input
                    className={inputClass}
                    placeholder="Subtitle (e.g. For Bangladeshi Citizens)"
                    value={formData.subtitle}
                    onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                    required
                  />
                </div>

                <textarea
                  rows={8}
                  className={`${inputClass} min-h-[200px]`}
                  placeholder="Full visa processing details, requirements, documents, fees, timeline..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  required
                />

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3"
                  >
                    {formLoading ? (
                      <>
                        <Loader2 className="animate-spin w-5 h-5" />
                        Saving...
                      </>
                    ) : editingId ? (
                      <>
                        <Edit3 className="w-5 h-5" />
                        Update
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        Create
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
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visas.length === 0 ? (
                <p className="col-span-full text-center text-xl text-gray-500 py-12">
                  No visa information yet. Create one above!
                </p>
              ) : (
                visas.map((visa) => (
                  <motion.div
                    key={visa._id}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-3xl shadow-xl border overflow-hidden flex flex-col"
                  >
                    {visa.imageUrl && (
                      <img src={visa.imageUrl} alt={visa.title} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold text-black">{visa.title}</h3>
                      <p className="text-emerald-700 font-medium mt-2">{visa.subtitle}</p>
                      <p className="text-gray-700 mt-4 line-clamp-4 flex-1">{visa.description}</p>
                      <div className="flex justify-between mt-6 pt-4 border-t">
                        <button onClick={() => handleEdit(visa)} className="text-emerald-700 font-bold flex items-center gap-2">
                          <Edit3 size={18} /> Edit
                        </button>
                        <button onClick={() => handleDelete(visa._id)} className="text-red-600 font-bold flex items-center gap-2">
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
  </div>;
};


const AdminVisaPage = () => {
  

  return (
    <PrivateRoute adminOnly>
      <AdminVisaPageContent></AdminVisaPageContent>
    </PrivateRoute>
  );
};

export default AdminVisaPage;