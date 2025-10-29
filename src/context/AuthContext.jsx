import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = authAPI.getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user;
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role?.toUpperCase() === 'ADMIN';
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role?.toUpperCase() === role.toUpperCase();
  };

  // Set user from OAuth
  const setUserFromOAuth = (userData) => {
    const normalizedUser = {
      ...userData,
      role: userData.role || 'USER',
      isAdmin: (userData.role || 'USER').toUpperCase() === 'ADMIN'
    };
    
    setUser(normalizedUser);
    authAPI.setUser(normalizedUser);
  };

  const login = async (email, password, rememberMe = false) => {
    try {
      setLoading(true);
      const result = await authAPI.login(email, password, rememberMe);
      
      if (result.success) {
        setUser(result.user);
        authAPI.setUser(result.user);
        return { success: true, message: result.message };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const result = await authAPI.register(userData);
      
      if (result.success) {
        // Don't automatically log in - user needs to verify email first
        return { 
          success: true, 
          message: result.message,
          emailSent: result.emailSent
        };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    authAPI.logout();
  };

  const value = {
    user,
    login,
    register,
    logout,
    setUserFromOAuth,
    loading,
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;