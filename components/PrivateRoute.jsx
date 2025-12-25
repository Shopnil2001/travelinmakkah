'use client';

import { useEffect } from 'react';
import { useAuth } from '../Provider/AuthProvider';
import { useRouter, usePathname } from 'next/navigation';
import LoadingSpinner from './Loading';


export default function PrivateRoute({ children, adminOnly = false }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (adminOnly && role !== 'admin') {
      router.replace('/');
      return;
    }
  }, [user, role, loading, pathname, router, adminOnly]);

  if (loading || !user || (adminOnly && role !== 'admin')) {
    return <div><LoadingSpinner></LoadingSpinner></div>; // shows while checking
  }

  return <>{children}</>;
}
