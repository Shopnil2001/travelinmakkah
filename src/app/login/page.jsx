'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../Provider/AuthProvider';
import { useRouter } from 'next/navigation';

const AuthPage = () => {
  const { signIn, createUser, loading } = useAuth();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        await signIn(email, password);
        setSuccess('Login successful! Redirecting...');
      } else {
        await createUser(email, password);
        setSuccess('Registration successful! Please log in.');
        setIsLogin(true);
        setPassword('');
      }
    } catch (err) {
      let message = 'An error occurred';
      if (err.code) {
        switch (err.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            message = 'Invalid email or password';
            break;
          case 'auth/email-already-in-use':
            message = 'Email already registered';
            break;
          case 'auth/weak-password':
            message = 'Password should be at least 6 characters';
            break;
          default:
            message = err.message || message;
        }
      }
      setError(message);
    }
  };

  // Listen to auth state change and redirect based on role
  const { user, role, loading: authLoading } = useAuth();
  console.log(user, role);

  useEffect(() => {
  if (!authLoading && user) {
    if (role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/');
    }
  }
}, [user, role, authLoading, router]);

if (authLoading) {
  return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
}

if (user) {
  return <div className="min-h-screen flex items-center justify-center"><p>Redirecting...</p></div>;
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Login to your account' : 'Register to get started'}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
              }}
              className="text-green-600 font-semibold hover:underline"
            >
              {isLogin ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Admin accounts are created by existing admins.</p>
          <p>Contact support for access.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;