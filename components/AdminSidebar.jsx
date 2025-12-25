'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Home, Package, FileText, Star, Calendar, Users, ShoppingCart } from 'lucide-react';

const links = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/adminPackage', label: 'Packages', icon: Package },
  { href: '/admin/adminBlog', label: 'Blogs', icon: FileText },
  { href: '/admin/adminReview', label: 'Reviews', icon: Star },
  { href: '/admin/adminEvent', label: 'Events', icon: Calendar },
  { href: '/admin/adminUser', label: 'Users', icon: Users },
  { href: '/admin/adminProduct', label: 'Products', icon: ShoppingCart },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden fixed top-5 left-5 z-50 p-3 bg-gray-900 text-white rounded-xl shadow-lg"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-lg z-40">
        <div className="px-6 py-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Admin</h2>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive(href)
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-emerald-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <aside
            className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl border-r border-gray-200 flex flex-col"
          >
            <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between">
              
              
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {links.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(href)
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-emerald-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
