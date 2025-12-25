'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit3, Plus, Loader2, X } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '../../../../Provider/AuthProvider';
import LoadingSpinner from '../../../../components/Loading';
import PrivateRoute from '../../../../components/PrivateRoute';
import AdminSidebar from '../../../../components/AdminSidebar';

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm';

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

  const closeError = () => setError('');

  if (loading) return <LoadingSpinner />;

  return (
    <PrivateRoute adminOnly>
      <div className="flex min-h-screen bg-gray-50">
        {/* MOBILE SIDEBAR OVERLAY */}
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" />

        {/* SIDEBAR */}
        <AdminSidebar />

        {/* MAIN CONTENT */}
        <main className="flex-1 lg:ml-0 ml-0 transition-all duration-300 overflow-x-hidden">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-7xl mx-auto">
            
            {/* MOBILE HEADER */}
            <div className="lg:hidden mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Manage Events
                </h1>
                <button className="lg:hidden p-2 rounded-lg hover:bg-gray-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Create and manage all events
              </p>
            </div>

            {/* DESKTOP HEADER */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden lg:block mb-8"
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Manage Events
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Create and manage all events
              </p>
            </motion.div>

            {/* ERROR */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="mb-6 p-4 sm:p-5 bg-red-50 border border-red-200 rounded-2xl shadow-sm relative"
                >
                  <button
                    onClick={closeError}
                    className="absolute top-3 right-3 p-1 hover:bg-red-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-red-500" />
                  </button>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-red-800 text-sm sm:text-base leading-relaxed flex-1">
                      {error}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FORM CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8 mb-8 lg:mb-10"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                {editingId ? 'Edit Event' : 'Create New Event'}
              </h2>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
                  <input
                    className={inputClass}
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    className={inputClass}
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    className={inputClass}
                    placeholder="Event location"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    className={`${inputClass} bg-gray-50`}
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    className={`${inputClass} resize-vertical min-h-[100px]`}
                    placeholder="Describe the event..."
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {formLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        {editingId ? 'Update Event' : 'Create Event'}
                      </>
                    )}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </motion.div>

            {/* EVENTS GRID */}
            {events.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No events yet</h3>
                <p className="text-gray-600 text-lg">Create your first event above</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {events.map(event => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 p-5 sm:p-6 hover:-translate-y-1 transition-all duration-200 group"
                  >
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-emerald-600 font-medium mt-1">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                        {event.location && (
                          <p className="text-xs sm:text-sm text-gray-600 mt-1 flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {event.location}
                          </p>
                        )}
                      </div>

                      <p className="text-gray-700 text-sm sm:text-base line-clamp-3 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.status === 'upcoming' ? 'bg-emerald-100 text-emerald-800' :
                          event.status === 'ongoing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {event.status}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(event)}
                            className="p-2 hover:bg-emerald-50 rounded-xl transition-all duration-200 group/edit"
                            title="Edit event"
                          >
                            <Edit3 size={18} className="text-emerald-600 group-hover/edit:text-emerald-700" />
                          </button>
                          <button
                            onClick={() => handleDelete(event._id)}
                            className="p-2 hover:bg-red-50 rounded-xl transition-all duration-200 group/delete"
                            title="Delete event"
                          >
                            <Trash2 size={18} className="text-red-500 group-hover/delete:text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </PrivateRoute>
  );
};

export default AdminEventPage;
