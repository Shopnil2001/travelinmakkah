'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  Menu, X, Home, Package, FileText, Star, 
  Calendar, Users, ShoppingCart, Globe 
} from 'lucide-react';

const links = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/adminPackage', label: 'Packages', icon: Package },
  { href: '/admin/adminVisa', label: 'Visas', icon: Globe }, // Added Visa route
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
        className="lg:hidden fixed top-5 left-5 z-50 p-3 bg-[#64B5F6] text-white rounded-xl shadow-lg"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-sm z-40">
        <div className="px-6 py-8 border-b border-gray-50 text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-[#64B5F6] bg-clip-text text-transparent">
            Admin Panel
          </h2>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                isActive(href)
                  ? 'bg-[#64B5F6] text-white shadow-lg shadow-blue-100'
                  : 'text-gray-500 hover:bg-blue-50 hover:text-[#64B5F6]'
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
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
          
          <aside
            className="absolute inset-y-0 left-0 w-72 bg-white shadow-2xl flex flex-col transition-transform"
          >
            <div className="px-6 py-8 border-b border-gray-50">
               <h2 className="text-xl font-bold text-gray-900">Admin</h2>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {links.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    isActive(href)
                      ? 'bg-[#64B5F6] text-white shadow-lg'
                      : 'text-gray-500 hover:bg-blue-50 hover:text-[#64B5F6]'
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