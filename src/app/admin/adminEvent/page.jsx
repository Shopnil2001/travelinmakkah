'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit3, Plus, Loader2, X, Calendar, MapPin } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '../../../../Provider/AuthProvider';
import LoadingSpinner from '../../../../components/Loading';
import PrivateRoute from '../../../../components/PrivateRoute';
import AdminSidebar from '../../../../components/AdminSidebar';
import '../admin.css';

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
      <div className="admin-layout">
        <AdminSidebar />

        <main className="admin-content">
          <div className="admin-content-wrapper">
            {/* Header */}
            <header className="admin-page-header admin-animate-in">
              <h1 className="admin-page-title">Manage Events</h1>
              <p className="admin-page-subtitle">
                Create and manage upcoming events
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
                  {editingId ? 'Edit Event' : 'Create New Event'}
                </h2>
              </div>
              <div className="admin-card-body">
                <form onSubmit={handleSubmit} className="admin-form-grid">
                  <div>
                    <label className="admin-label">Event Title</label>
                    <input
                      className="admin-input"
                      placeholder="Enter event title"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">Date</label>
                    <input
                      type="date"
                      className="admin-input"
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">Location</label>
                    <input
                      className="admin-input"
                      placeholder="Event location"
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="admin-label">Status</label>
                    <select
                      className="admin-input admin-select"
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className="admin-form-full">
                    <label className="admin-label">Description</label>
                    <textarea
                      className="admin-input admin-textarea"
                      rows={4}
                      placeholder="Describe the event..."
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
                          {editingId ? 'Update Event' : 'Create Event'}
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

            {/* Events List */}
            <section className="admin-animate-in admin-animate-delay-2">
              <h3 className="text-lg font-semibold text-[#2D3339] mb-4 font-serif">
                All Events ({events.length})
              </h3>

              {events.length === 0 ? (
                <div className="admin-empty">
                  <Calendar className="admin-empty-icon" />
                  <h4 className="admin-empty-title">No events yet</h4>
                  <p className="admin-empty-desc">Create your first event above</p>
                </div>
              ) : (
                <div className="admin-grid">
                  {events.map(event => (
                    <div key={event._id} className="admin-item-card">
                      <div className="admin-item-content">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`admin-badge ${
                            event.status === 'upcoming' ? 'admin-badge-success' :
                            event.status === 'ongoing' ? 'admin-badge-warning' :
                            'admin-badge-primary'
                          }`}>
                            {event.status}
                          </span>
                        </div>

                        <h4 className="admin-item-title">{event.title}</h4>

                        <div className="flex items-center gap-4 mt-2 text-sm text-[#6B7280]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-[#C9A962]" />
                            {new Date(event.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          {event.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </span>
                          )}
                        </div>

                        <p className="admin-item-meta mt-3 line-clamp-3">{event.description}</p>
                      </div>

                      <div className="admin-item-footer">
                        <div className="admin-item-actions">
                          <button
                            onClick={() => handleEdit(event)}
                            className="admin-action-btn admin-action-btn-edit"
                          >
                            <Edit3 className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(event._id)}
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

export default AdminEventPage;
