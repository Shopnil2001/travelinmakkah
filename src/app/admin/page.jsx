// src/app/admin/page.jsx
'use client';

import Link from 'next/link';
import PrivateRoute from '../../../components/PrivateRoute';
import AdminSidebar from '../../../components/AdminSidebar';

const AdminDashboard = () => {
  return (
    <PrivateRoute adminOnly={true}>
      <div className="min-h-screen flex bg-gray-50">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main content area */}
        <div className="flex-1 p-8 ml-0 lg:ml-64 lg:mt-0 mt-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Manage your Hajj & Umrah packages, blogs, reviews, events, products, and users.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/admin/adminPackage"
              className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <div className="text-5xl mb-4">📦</div>
              <h2 className="text-2xl font-semibold">Packages</h2>
              <p className="text-gray-500 mt-2">Manage Hajj & Umrah packages</p>
            </Link>

            <Link
              href="/admin/adminBlog"
              className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <div className="text-5xl mb-4">✍️</div>
              <h2 className="text-2xl font-semibold">Blogs</h2>
              <p className="text-gray-500 mt-2">Add and edit blog posts</p>
            </Link>

            <Link
              href="/admin/adminReview"
              className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <div className="text-5xl mb-4">⭐</div>
              <h2 className="text-2xl font-semibold">Reviews</h2>
              <p className="text-gray-500 mt-2">Manage customer testimonials</p>
            </Link>

            <Link
              href="/admin/adminEvent"
              className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <div className="text-5xl mb-4">📅</div>
              <h2 className="text-2xl font-semibold">Events</h2>
              <p className="text-gray-500 mt-2">Create upcoming events</p>
            </Link>

            <Link
              href="/admin/adminUser"
              className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <div className="text-5xl mb-4">👥</div>
              <h2 className="text-2xl font-semibold">Users</h2>
              <p className="text-gray-500 mt-2">Manage admin access</p>
            </Link>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default AdminDashboard;
