'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Menu, X, LayoutDashboard, Package, FileText, Star,
  Calendar, Users, ShoppingCart, Globe, LogOut, BookOpen
} from 'lucide-react';

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/adminPackage', label: 'Packages', icon: Package },
  { href: '/admin/adminVisa', label: 'Visas', icon: Globe },
  { href: '/admin/adminBlog', label: 'Blogs', icon: FileText },
  { href: '/admin/adminReview', label: 'Reviews', icon: Star },
  { href: '/admin/adminEvent', label: 'Events', icon: Calendar },
  { href: '/admin/adminUser', label: 'Users', icon: Users },
  { href: '/admin/adminProduct', label: 'Products', icon: ShoppingCart },
  { href: '/admin/adminPdf', label: 'PDF Manager', icon: BookOpen },
];

// NavContent extracted as a separate component
function NavContent({ pathname, onLinkClick }) {
  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Brand */}
      <div className="px-6 py-6 border-b border-[#2A4A73]/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C9A962] to-[#A88B4A] flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg font-serif">T</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white font-serif tracking-wide">
              <span className='text-white'>Travel Admin</span>
            </h2>
            <p className="text-xs text-[#C9A962]/80">Management Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="space-y-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onLinkClick}
                className={`
                  group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200 relative
                  ${active
                    ? 'bg-gradient-to-r from-[#C9A962]/20 to-[#C9A962]/10 text-[#C9A962]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {/* Active indicator */}
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#C9A962] rounded-r-full" />
                )}
                <Icon className={`w-5 h-5 transition-colors ${active ? 'text-[#C9A962]' : 'text-white/50 group-hover:text-white/80'}`} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#2A4A73]/30">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Back to Site</span>
        </Link>
      </div>
    </>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileClose = () => setMobileOpen(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-[92px] left-4 z-50 p-3 bg-[#1E3A5F] text-white rounded-xl shadow-lg hover:bg-[#2A4A73] transition-colors"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col fixed top-[80px] bottom-0 left-0 w-[280px] bg-gradient-to-b from-[#1E3A5F] to-[#152A45] z-40 shadow-2xl">
        <NavContent pathname={pathname} onLinkClick={() => {}} />
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[80px] z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleMobileClose}
          />

          {/* Sidebar */}
          <aside className="absolute top-0 bottom-0 left-0 w-[280px] bg-gradient-to-b from-[#1E3A5F] to-[#152A45] shadow-2xl flex flex-col animate-slide-in">
            <NavContent pathname={pathname} onLinkClick={handleMobileClose} />
          </aside>
        </div>
      )}

      <style jsx global>{`
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
