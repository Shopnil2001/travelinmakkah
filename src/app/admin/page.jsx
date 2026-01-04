'use client';

import Link from 'next/link';
import {
  Package, FileText, Star, Calendar, Users, ShoppingCart, Globe,
  TrendingUp, ArrowRight
} from 'lucide-react';
import PrivateRoute from '../../../components/PrivateRoute';
import AdminSidebar from '../../../components/AdminSidebar';
import './admin.css';

const quickActions = [
  {
    href: '/admin/adminPackage',
    label: 'Packages',
    description: 'Manage Hajj & Umrah packages',
    icon: Package,
    color: 'from-[#1E3A5F] to-[#2A4A73]',
  },
  {
    href: '/admin/adminVisa',
    label: 'Visas',
    description: 'Visa processing & requirements',
    icon: Globe,
    color: 'from-[#1E3A5F] to-[#2A4A73]',
  },
  {
    href: '/admin/adminBlog',
    label: 'Blogs',
    description: 'Create & edit blog posts',
    icon: FileText,
    color: 'from-[#1E3A5F] to-[#2A4A73]',
  },
  {
    href: '/admin/adminReview',
    label: 'Reviews',
    description: 'Customer testimonials',
    icon: Star,
    color: 'from-[#1E3A5F] to-[#2A4A73]',
  },
  {
    href: '/admin/adminEvent',
    label: 'Events',
    description: 'Upcoming events & activities',
    icon: Calendar,
    color: 'from-[#1E3A5F] to-[#2A4A73]',
  },
  {
    href: '/admin/adminUser',
    label: 'Users',
    description: 'User roles & permissions',
    icon: Users,
    color: 'from-[#1E3A5F] to-[#2A4A73]',
  },
  {
    href: '/admin/adminProduct',
    label: 'Products',
    description: 'Affiliate product catalog',
    icon: ShoppingCart,
    color: 'from-[#1E3A5F] to-[#2A4A73]',
  },
];

const AdminDashboard = () => {
  return (
    <PrivateRoute adminOnly={true}>
      <div className="admin-layout">
        <AdminSidebar />

        <main className="admin-content">
          <div className="admin-content-wrapper">
            {/* Header */}
            <header className="admin-page-header admin-animate-in">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="admin-page-title">Welcome to Dashboard</h1>
                  <p className="admin-page-subtitle">
                    Manage your Hajj & Umrah travel services from one place
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#E8E3DA] shadow-sm">
                    <TrendingUp className="w-4 h-4 text-[#C9A962]" />
                    <span className="text-[#4A5158]">System Active</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Welcome Card */}
            <div className="admin-card mb-8 admin-animate-in admin-animate-delay-1 overflow-hidden">
              <div className="relative p-6 lg:p-8 bg-gradient-to-r from-[#1E3A5F] to-[#2A4A73]">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <pattern id="admin-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M10 0L20 10L10 20L0 10z" fill="currentColor" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#admin-pattern)" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-white mb-2">
                    <span className='text-white'>Travel in Makkah</span>
                  </h2>
                  <p className="text-white/80 max-w-xl">
                    Your trusted partner for sacred journeys. Manage all aspects of your Hajj & Umrah
                    services including packages, visa processing, customer reviews, and more.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-6">
                    <Link
                      href="/admin/adminPackage"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A962] hover:bg-[#D4BC82] text-[#1E3A5F] font-semibold rounded-lg transition-colors"
                    >
                      <Package className="w-4 h-4" />
                      Add Package
                    </Link>
                    <Link
                      href="/admin/adminBlog"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border border-white/20"
                    >
                      <FileText className="w-4 h-4" />
                      Write Blog
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <section className="admin-animate-in admin-animate-delay-2">
              <h3 className="text-lg font-semibold text-[#2D3339] mb-4 font-serif">
                Quick Actions
              </h3>
              <div className="admin-grid">
                {quickActions.map(({ href, label, description, icon: Icon }, index) => (
                  <Link
                    key={href}
                    href={href}
                    className="admin-stat-card group"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className={`admin-stat-icon bg-gradient-to-br ${quickActions[index].color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="admin-stat-title group-hover:text-[#1E3A5F] transition-colors">
                      {label}
                    </h4>
                    <p className="admin-stat-desc">{description}</p>
                    <div className="mt-3 flex items-center text-sm font-medium text-[#C9A962] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Manage</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Footer Info */}
            <footer className="mt-12 pt-6 border-t border-[#E8E3DA] text-center admin-animate-in admin-animate-delay-3">
              <p className="text-sm text-[#6B7280]">
                Need help? Contact support or check the documentation.
              </p>
            </footer>
          </div>
        </main>
      </div>
    </PrivateRoute>
  );
};

export default AdminDashboard;
