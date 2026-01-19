'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../../Provider/AuthProvider';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, Lock } from 'lucide-react';

const AuthPage = () => {
  const { signIn, createUser, user, role, loading: authLoading } = useAuth();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  }, [email]);

  useEffect(() => {
    setPasswordValid(password.length >= 6);
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailValid || !passwordValid) {
      setError('Please fix the errors above');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        await signIn(email, password);
        setSuccess('Login successful! Redirecting...');
      } else {
        await createUser(email, password);
        setSuccess('Account created! Please log in.');
        setTimeout(() => {
          setIsLogin(true);
          setPassword('');
        }, 1500);
      }
    } catch (err) {
      let message = 'Something went wrong. Please try again.';
      if (err.code) {
        switch (err.code) {
          case 'auth/invalid-credential':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            message = 'Invalid email or password';
            break;
          case 'auth/email-already-in-use':
            message = 'Email already registered. Please log in.';
            break;
          case 'auth/too-many-requests':
            message = 'Too many failed attempts. Please try again later.';
            break;
          case 'auth/network-request-failed':
            message = 'Network error. Please check your connection.';
            break;
        }
      }
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      const redirectTimer = setTimeout(() => {
        if (role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      }, 1000);
      return () => clearTimeout(redirectTimer);
    }
  }, [user, role, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E8E3DA] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <Loader2 className="w-10 h-10 text-[#C9A962] animate-spin mx-auto mb-4" />
          <p className="text-lg font-medium text-[#2D3339]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-lg border border-[#E8E3DA] shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">

          {/* Header Stripe */}
          <div className="h-1.5 bg-gradient-to-r from-[#C9A962] to-[#D4BC82]" />

          <div className="p-8 sm:p-10">
            {/* Icon & Title */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#C9A962]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock className="w-7 h-7 text-[#C9A962]" />
              </div>
              <h1 className="text-2xl font-display font-medium text-[#2D3339] mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-[#6B7280] text-sm">
                {isLogin ? 'Sign in to Travel In Makkah' : 'Join our pilgrimage community'}
              </p>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full px-4 py-3.5 rounded-lg border-2 transition-colors outline-none ${emailValid
                      ? 'border-[#C9A962]/30 bg-[#C9A962]/5'
                      : email ? 'border-red-200 bg-red-50/30' : 'border-[#E8E3DA] focus:border-[#C9A962]'
                    }`}
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`w-full px-4 py-3.5 pr-12 rounded-lg border-2 transition-colors outline-none ${passwordValid
                        ? 'border-[#C9A962]/30 bg-[#C9A962]/5'
                        : password ? 'border-red-200 bg-red-50/30' : 'border-[#E8E3DA] focus:border-[#C9A962]'
                      }`}
                    placeholder="Min. 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#C9A962] transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitting || !emailValid || !passwordValid}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-lg font-semibold text-white transition-all duration-300 disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, #C9A962 0%, #A88B4A 100%)',
                  boxShadow: '0 4px 16px rgba(201, 169, 98, 0.25)'
                }}
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </motion.button>
            </form>

            {/* Toggle */}
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setSuccess('');
                }}
                className="text-[#6B7280] text-sm"
              >
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <span className="text-[#C9A962] font-semibold hover:underline">
                  {isLogin ? 'Create one' : 'Sign in'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
