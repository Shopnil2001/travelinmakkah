'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Menu, X, LayoutDashboard, Package, FileText, Star,
  Calendar, Users, ShoppingCart, LogOut, BookOpen,
  KeyRound, Eye, EyeOff, Loader2, CheckCircle, AlertCircle
} from 'lucide-react';
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/adminPackage', label: 'Packages', icon: Package },
  { href: '/admin/adminBlog', label: 'Blogs', icon: FileText },
  { href: '/admin/adminReview', label: 'Reviews', icon: Star },
  { href: '/admin/adminEvent', label: 'Events', icon: Calendar },
  { href: '/admin/adminUser', label: 'Users', icon: Users },
  { href: '/admin/adminProduct', label: 'Products', icon: ShoppingCart },
  { href: '/admin/adminPdf', label: 'PDF Manager', icon: BookOpen },
];

// Change Password Modal Component
function ChangePasswordModal({ isOpen, onClose }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess(false);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (currentPassword === newPassword) {
      setError('New password must be different from current password');
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;

      if (!user || !user.email) {
        throw new Error('No user is currently signed in');
      }

      // Re-authenticate user with current password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      setSuccess(true);

      // Auto close after success
      setTimeout(() => {
        handleClose();
      }, 2000);

    } catch (err) {
      console.error('Password change error:', err);

      // Handle specific Firebase errors
      switch (err.code) {
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Current password is incorrect');
          break;
        case 'auth/weak-password':
          setError('New password is too weak. Use at least 6 characters');
          break;
        case 'auth/requires-recent-login':
          setError('Session expired. Please log out and log in again');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please try again later');
          break;
        default:
          setError(err.message || 'Failed to change password');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-modal-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2A4A73] px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <KeyRound className="w-5 h-5 text-[#C9A962]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white"><span className='text-white'>Change Password</span></h2>
                <p className="text-xs text-white/60">Update your admin password</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Success Message */}
          {success && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-700 font-medium">
                Password changed successfully!
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-[#2D3339] mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                disabled={loading || success}
                className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-[#E8E3DA] focus:border-[#1E3A5F] focus:ring-0 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#2D3339] transition-colors"
              >
                {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-[#2D3339] mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 6 characters)"
                disabled={loading || success}
                className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-[#E8E3DA] focus:border-[#1E3A5F] focus:ring-0 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#2D3339] transition-colors"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium text-[#2D3339] mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                disabled={loading || success}
                className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-[#E8E3DA] focus:border-[#1E3A5F] focus:ring-0 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#2D3339] transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="text-xs text-[#6B7280] bg-[#FAF8F5] rounded-lg p-3">
            <p className="font-medium text-[#2D3339] mb-1">Password requirements:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>At least 6 characters long</li>
              <li>Must be different from current password</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-[#E8E3DA] text-[#2D3339] font-medium hover:bg-[#FAF8F5] transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#1E3A5F] to-[#2A4A73] text-white font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Changing...</span>
                </>
              ) : success ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Done!</span>
                </>
              ) : (
                <span>Change Password</span>
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes modal-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal-in {
          animation: modal-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}

// NavContent extracted as a separate component
function NavContent({ pathname, onLinkClick, onChangePasswordClick }) {
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
      <div className="px-4 py-4 border-t border-[#2A4A73]/30 space-y-1">
        {/* Change Password Button */}
        <button
          onClick={onChangePasswordClick}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-[#C9A962] hover:bg-[#C9A962]/10 transition-all duration-200"
        >
          <KeyRound className="w-5 h-5" />
          <span>Change Password</span>
        </button>

        {/* Back to Site */}
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
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const handleMobileClose = () => setMobileOpen(false);

  const handleChangePasswordClick = () => {
    setMobileOpen(false); // Close mobile menu if open
    setPasswordModalOpen(true);
  };

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
        <NavContent
          pathname={pathname}
          onLinkClick={() => {}}
          onChangePasswordClick={handleChangePasswordClick}
        />
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
            <NavContent
              pathname={pathname}
              onLinkClick={handleMobileClose}
              onChangePasswordClick={handleChangePasswordClick}
            />
          </aside>
        </div>
      )}

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      />

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
