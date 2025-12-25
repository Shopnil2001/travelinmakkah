'use client';

import { useAuth } from '../Provider/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AdminRoute = ({ children }) => {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login'); // or your login page
      } else if (role !== 'admin') {
        router.push('/'); // redirect non-admins
      }
    }
  }, [user, role, loading, router]);

  if (loading || !user || role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return children;
};

export default AdminRoute;