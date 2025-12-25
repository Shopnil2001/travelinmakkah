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
  'w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500';

const AdminEventPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    status: 'upcoming',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    const loadEvents = async () => {
      setLoading(true);
      try {
        const res = await api.get('/events');
        setEvents(res.data);
      } catch {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');

    try {
      const payload = { ...formData, date: new Date(formData.date) };

      editingId
        ? await api.put(`/events/${editingId}`, payload)
        : await api.post('/events', payload);

      const res = await api.get('/events');
      setEvents(res.data);
      resetForm();
    } catch {
      setError('Error saving event');
    } finally {
      setFormLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      location: '',
      status: 'upcoming',
    });
    setEditingId(null);
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date?.split('T')[0],
      location: event.location || '',
      status: event.status || 'upcoming',
    });
    setEditingId(event._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this event permanently?')) return;
    await api.delete(`/events/${id}`);
    setEvents(prev => prev.filter(e => e._id !== id));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <PrivateRoute adminOnly>
      <div className="flex min-h-screen bg-gray-100">

        {/* SIDEBAR (same as AdminUser) */}
        <AdminSidebar />

        {/* MAIN CONTENT */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:mt-0 mt-20">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-black">
              Manage Events
            </h1>
            <p className="text-gray-700 mt-2">
              Create and manage all events
            </p>
          </motion.div>

          {/* ERROR */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* FORM */}
          <div className="bg-white rounded-xl shadow p-6 mb-10">
            <h2 className="text-xl font-bold text-black mb-5">
              {editingId ? 'Edit Event' : 'Create Event'}
            </h2>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <input
                className={inputClass}
                placeholder="Event Title"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                required
              />

              <input
                type="date"
                className={inputClass}
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                required
              />

              <input
                className={inputClass}
                placeholder="Location"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
              />

              <select
                className={inputClass}
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>

              <textarea
                className={`${inputClass} md:col-span-2`}
                rows={4}
                placeholder="Event Description"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                required
              />

              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  {formLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Plus />
                  )}
                  {editingId ? 'Update Event' : 'Create Event'}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-200 text-black rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* EVENTS LIST */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow p-5 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-black">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  {event.location && (
                    <p className="text-sm text-gray-700 mt-1">
                      📍 {event.location}
                    </p>
                  )}
                  <p className="text-gray-800 mt-3 line-clamp-3">
                    {event.description}
                  </p>
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(event)}
                    className="flex items-center gap-2 text-emerald-700 font-semibold"
                  >
                    <Edit3 size={18} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="flex items-center gap-2 text-red-600 font-semibold"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>
    </PrivateRoute>
  );
};

export default AdminEventPage;
