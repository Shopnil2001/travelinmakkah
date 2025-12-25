'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { useAuth } from '../../../../Provider/AuthProvider';
import LoadingSpinner from '../../../../components/Loading';
import PrivateRoute from '../../../../components/PrivateRoute';
import AdminSidebar from '../../../../components/AdminSidebar';

const AdminUserPage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    const loadUsers = async () => {
      setLoading(true);
      try {
        const res = await api.get('/users');
        setUsers(res.data);
      } catch {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [user]);

  const handleToggleRole = async (id, currentRole) => {
    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin';
      await api.put(`/users/${id}/role`, { role: newRole });

      setUsers(prev =>
        prev.map(u =>
          u._id === id ? { ...u, role: newRole } : u
        )
      );
    } catch {
      setError('Error updating role');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <PrivateRoute adminOnly>
      <div className="min-h-screen flex bg-gray-50">
        <AdminSidebar />

        <div className="flex-1 ml-0 lg:ml-64 mt-16 lg:mt-0 px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-6xl mx-auto space-y-8">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Manage Users
              </h1>
              <p className="mt-2 text-gray-600">
                Control admin access for your team
              </p>
            </motion.div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-rose-100 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl max-w-xl mx-auto"
                >
                  <div className="flex justify-between items-center">
                    <span>{error}</span>
                    <button
                      onClick={() => setError('')}
                      className="font-bold text-lg"
                    >
                      ×
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ===== MOBILE CARDS ===== */}
            <div className="grid gap-4 sm:hidden">
              {users.length === 0 && (
                <p className="text-center text-gray-500">
                  No users found
                </p>
              )}

              {users.map(u => (
                <motion.div
                  key={u._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow p-4 space-y-3"
                >
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium break-all">
                      {u.email}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        u.role === 'admin'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {u.role}
                    </span>

                    <button
                      onClick={() => handleToggleRole(u._id, u.role)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold ${
                        u.role === 'admin'
                          ? 'bg-rose-500 text-white'
                          : 'bg-emerald-500 text-white'
                      }`}
                    >
                      {u.role === 'admin'
                        ? 'Remove Admin'
                        : 'Make Admin'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ===== DESKTOP TABLE ===== */}
            <div className="hidden sm:block bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-emerald-500 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Email</th>
                      <th className="px-6 py-4 text-left">Role</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center py-10 text-gray-500"
                        >
                          No users found
                        </td>
                      </tr>
                    ) : (
                      users.map(u => (
                        <tr
                          key={u._id}
                          className="border-b hover:bg-emerald-50"
                        >
                          <td className="px-6 py-4 break-all text-black">
                            {u.email}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                                u.role === 'admin'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleToggleRole(u._id, u.role)}
                              className={`px-6 py-2 rounded-xl text-sm font-semibold ${
                                u.role === 'admin'
                                  ? 'bg-rose-500 text-white hover:bg-rose-600'
                                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
                              }`}
                            >
                              {u.role === 'admin'
                                ? 'Remove Admin'
                                : 'Make Admin'}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default AdminUserPage;
