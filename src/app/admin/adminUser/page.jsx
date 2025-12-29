'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { useAuth } from '../../../../Provider/AuthProvider';
import LoadingSpinner from '../../../../components/Loading';
import PrivateRoute from '../../../../components/PrivateRoute';
import AdminSidebar from '../../../../components/AdminSidebar';
import { ShieldCheck, ShieldAlert, Lock } from 'lucide-react';

const AdminUserPage = () => {
  const { user,role } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Define your Super Admin email here

  const isSuperAdmin = user && role === 'superadmin';
  const SUPER_ADMIN_EMAIL = isSuperAdmin?user.email:'';
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

  const handleToggleRole = async (id, currentRole, targetEmail) => {
    // 1. Client-side Security Check
    if (!isSuperAdmin) {
      setError('Only the Super Admin can modify roles.');
      return;
    }

    // 2. Prevent Super Admin from removing themselves
    if (targetEmail === SUPER_ADMIN_EMAIL) {
      setError('Super Admin role cannot be modified.');
      return;
    }

    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin';
      await api.put(`/users/${id}/role`, { role: newRole });

      setUsers(prev =>
        prev.map(u =>
          u._id === id ? { ...u, role: newRole } : u
        )
      );
      setError(''); // Clear error on success
    } catch {
      setError('Error updating role. Check server permissions.');
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
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#64B5F6] to-blue-600 bg-clip-text text-transparent">
                User Management
              </h1>
              <div className="flex items-center justify-center gap-2 mt-2">
                {isSuperAdmin ? (
                  <span className="flex items-center gap-1 text-emerald-600 text-sm font-medium bg-emerald-50 px-3 py-1 rounded-full">
                    <ShieldCheck size={16} /> Super Admin Access
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-600 text-sm font-medium bg-amber-50 px-3 py-1 rounded-full">
                    <ShieldAlert size={16} /> Standard Admin (Read-Only)
                  </span>
                )}
              </div>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-2xl max-w-xl mx-auto flex justify-between items-center shadow-sm"
                >
                  <p className="text-sm font-medium">{error}</p>
                  <button onClick={() => setError('')} className="text-xl leading-none">&times;</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ===== TABLE ===== */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-100/50 overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-[#64B5F6] text-white">
                      <th className="px-8 py-5 text-left font-semibold tracking-wider">User Details</th>
                      <th className="px-8 py-5 text-left font-semibold tracking-wider">Current Role</th>
                      <th className="px-8 py-5 text-center font-semibold tracking-wider">Access Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {users.map(u => (
                      <tr key={u._id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-8 py-5 text-gray-900 font-medium">
                          {u.email}
                          {u.email === SUPER_ADMIN_EMAIL && (
                            <span className="ml-2 text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-md uppercase">Owner</span>
                          )}
                        </td>
                        <td className="px-8 py-5">
                          <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                            u.role === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {u.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-center">
                          {isSuperAdmin && u.email !== SUPER_ADMIN_EMAIL ? (
                            <button
                              onClick={() => handleToggleRole(u._id, u.role, u.email)}
                              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                                u.role === 'admin' 
                                  ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-md shadow-rose-100' 
                                  : 'bg-[#64B5F6] text-white hover:bg-blue-500 shadow-md shadow-blue-100'
                              }`}
                            >
                              {u.role === 'admin' ? 'Revoke Admin' : 'Grant Admin'}
                            </button>
                          ) : (
                            <div className="flex items-center justify-center text-gray-400 gap-1 italic text-xs">
                              <Lock size={14} /> Restricted
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
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