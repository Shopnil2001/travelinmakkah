'use client';

import { useState, useEffect } from 'react';
import { X, ShieldCheck, ShieldAlert, Lock, Users } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '../../../../Provider/AuthProvider';
import LoadingSpinner from '../../../../components/Loading';
import PrivateRoute from '../../../../components/PrivateRoute';
import AdminSidebar from '../../../../components/AdminSidebar';
import '../admin.css';

const AdminUserPage = () => {
  const { user, role } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isSuperAdmin = user && role === 'superadmin';
  const SUPER_ADMIN_EMAIL = isSuperAdmin ? user.email : '';

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
    if (!isSuperAdmin) {
      setError('Only the Super Admin can modify roles.');
      return;
    }

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
      setError('');
    } catch {
      setError('Error updating role. Check server permissions.');
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="admin-page-title">User Management</h1>
                  <p className="admin-page-subtitle">
                    Manage user roles and permissions
                  </p>
                </div>
                <div>
                  {isSuperAdmin ? (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
                      <ShieldCheck className="w-4 h-4" />
                      Super Admin Access
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium border border-amber-200">
                      <ShieldAlert className="w-4 h-4" />
                      Read-Only Access
                    </span>
                  )}
                </div>
              </div>
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

            {/* Users Table */}
            <div className="admin-card admin-animate-in admin-animate-delay-1">
              <div className="admin-card-header">
                <h2 className="admin-card-title">All Users ({users.length})</h2>
              </div>

              {users.length === 0 ? (
                <div className="admin-empty">
                  <Users className="admin-empty-icon" />
                  <h4 className="admin-empty-title">No users found</h4>
                  <p className="admin-empty-desc">Users will appear here once registered</p>
                </div>
              ) : (
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>User Details</th>
                        <th>Current Role</th>
                        <th className="text-center">Access Control</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u._id}>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="admin-avatar-placeholder text-sm">
                                {u.email?.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-medium text-[#2D3339]">
                                  {u.email}
                                </div>
                                {u.email === SUPER_ADMIN_EMAIL && (
                                  <span className="admin-badge admin-badge-gold text-xs mt-1">
                                    Owner
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={`admin-badge ${
                              u.role === 'admin' || u.role === 'superadmin'
                                ? 'admin-badge-primary'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {u.role?.toUpperCase()}
                            </span>
                          </td>
                          <td className="text-center">
                            {isSuperAdmin && u.email !== SUPER_ADMIN_EMAIL ? (
                              <button
                                onClick={() => handleToggleRole(u._id, u.role, u.email)}
                                className={`admin-btn text-sm py-2 px-4 ${
                                  u.role === 'admin'
                                    ? 'admin-btn-danger'
                                    : 'admin-btn-primary'
                                }`}
                              >
                                {u.role === 'admin' ? 'Revoke Admin' : 'Grant Admin'}
                              </button>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[#6B7280] text-sm">
                                <Lock className="w-4 h-4" />
                                Restricted
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </PrivateRoute>
  );
};

export default AdminUserPage;
