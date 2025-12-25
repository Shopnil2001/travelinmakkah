'use client';

import { useAuth } from "../Provider/AuthProvider";

const AdminHeader = () => {
  const { user, logOut } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Welcome, {user?.email}</span>
          <button
            onClick={logOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;