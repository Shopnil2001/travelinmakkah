'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../Firebase/firebase.config';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';
import axios from 'axios';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Update user profile
  const updateUserProfile = (name, photoURL = '') => {
    return updateProfile(auth.currentUser, { displayName: name, photoURL });
  };

  // Send email verification
  const verifyEmail = () => {
    setLoading(true);
    return sendEmailVerification(auth.currentUser);
  };

  // Password reset
  const passwordReset = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // Log out user
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem('token');
    return signOut(auth);
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          // Get Firebase ID token
          const token = await currentUser.getIdToken();
          localStorage.setItem('token', token);

          // Fetch role from your backend
          const res = await axios.get(
            'https://travelinmakkah-backend.vercel.app/api/users/role',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setRole(res.data.role || 'user');
        } catch (error) {
          console.error('Error fetching role:', error);
          setRole('user');
        }
      } else {
        localStorage.removeItem('token');
        setRole(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const authInfo = {
    user,
    role,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    verifyEmail,
    passwordReset,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

// Custom hook for easier usage
export const useAuth = () => useContext(AuthContext);
