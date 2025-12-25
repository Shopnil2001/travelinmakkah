'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../Provider/AuthProvider';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

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

  // Real-time validation
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
      let message = 'Something went wrong';
      
      if (err.code) {
        switch (err.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            message = 'Invalid email or password';
            break;
          case 'auth/email-already-in-use':
            message = 'Email already registered. Please log in.';
            break;
          case 'auth/weak-password':
            message = 'Password must be at least 6 characters';
            break;
          case 'auth/invalid-email':
            message = 'Please enter a valid email address';
            break;
          default:
            message = err.message || 'Please try again';
        }
      }
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  // Auto redirect based on role
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-white/50">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mx-auto mb-4" />
          <p className="text-xl font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-white/50 max-w-md w-full">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <p className="text-2xl font-bold text-gray-800 mb-2">Redirecting...</p>
          <p className="text-gray-600">Taking you to your dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          {/* Decorative top gradient */}
          <div className="h-2 bg-gradient-to-r from-emerald-500 to-green-500"></div>
          
          <div className="p-8 sm:p-10">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                {isLogin ? 'Welcome Back' : 'Join TravelinMakkah'}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {isLogin 
                  ? 'Sign in to your account' 
                  : 'Create your pilgrimage booking account'
                }
              </p>
            </div>

            {/* Messages */}
            {error && (
              <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl shadow-sm">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-800 text-sm leading-relaxed flex-1">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-emerald-800 text-sm leading-relaxed flex-1">{success}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`w-full px-4 py-4 pr-12 border-2 rounded-2xl text-lg font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 shadow-sm ${
                      emailValid 
                        ? 'border-emerald-300 bg-emerald-50/50' 
                        : email 
                        ? 'border-red-300 bg-red-50/50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    {email && (
                      <div className={`flex items-center gap-1 p-1 rounded-full ${
                        emailValid ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {emailValid ? (
                          <CheckCircle2 size={16} />
                        ) : (
                          <AlertCircle size={16} />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {!emailValid && email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={16} /> Please enter a valid email
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                    className={`w-full px-4 py-4 pr-12 border-2 rounded-2xl text-lg font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 shadow-sm ${
                      passwordValid 
                        ? 'border-emerald-300 bg-emerald-50/50' 
                        : password 
                        ? 'border-red-300 bg-red-50/50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff size={20} className="text-gray-500" />
                    ) : (
                      <Eye size={20} className="text-gray-500" />
                    )}
                  </button>
                </div>
                {!passwordValid && password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={16} /> Password must be at least 6 characters
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting || !emailValid || !passwordValid}
                className="group w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:transform transition-all duration-200 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-gray-600 text-sm">
                {isLogin 
                  ? "Don't have an account?" 
                  : 'Already have an account?'
                }
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setSuccess('');
                    setEmail('');
                    setPassword('');
                  }}
                  className="ml-1 text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition-colors text-sm"
                >
                  {isLogin ? 'Create one here' : 'Sign in here'}
                </button>
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">
                🔐 Admin accounts are managed separately
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Contact support for administrator access
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default AuthPage;
