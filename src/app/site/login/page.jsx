'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../../Provider/AuthProvider';
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
          default:
            message = err.message || 'Please try again';
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
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xl">
          <Loader2 className="w-12 h-12 text-[#64B5F6] animate-spin mx-auto mb-4" />
          <p className="text-xl font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FBFE] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md relative">
        
        {/* Animated Background Blobs with brand color */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#64B5F6] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-blue-50 overflow-hidden">
          {/* Top Brand Stripe */}
          <div className="h-2 bg-[#64B5F6]"></div>
          
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#64B5F6] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-gray-500 font-medium">
                {isLogin ? 'Sign in to Travel In Makkah' : 'Join our pilgrimage community'}
              </p>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#64B5F6] flex-shrink-0" />
                <p className="text-blue-700 text-sm font-medium">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-200 outline-none ${
                      emailValid 
                        ? 'border-blue-100 bg-blue-50/30' 
                        : email ? 'border-red-100 bg-red-50/30' : 'border-gray-100 focus:border-[#64B5F6]'
                    }`}
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-200 outline-none ${
                      passwordValid 
                        ? 'border-blue-100 bg-blue-50/30' 
                        : password ? 'border-red-100 bg-red-50/30' : 'border-gray-100 focus:border-[#64B5F6]'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#64B5F6]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || !emailValid || !passwordValid}
                className="w-full bg-[#64B5F6] hover:bg-blue-500 disabled:bg-gray-200 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-100 transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3"
              >
                {submitting ? <Loader2 className="animate-spin" /> : (isLogin ? 'Sign In' : 'Get Started')}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-gray-500 font-medium hover:text-[#64B5F6] transition-colors"
              >
                {isLogin ? "New here? " : "Already have an account? "}
                <span className="text-[#64B5F6] font-bold underline underline-offset-4">
                  {isLogin ? "Create Account" : "Login"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 10px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
};

export default AuthPage;