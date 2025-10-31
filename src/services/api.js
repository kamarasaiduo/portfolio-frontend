// Use your live backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://portfolio-backend-m2je.onrender.com';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const authAPI = {
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: userData.fullName,
          email: userData.email,
          password: userData.password,
          role: 'USER'
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Registration failed: ${response.status}`);
      }

      return {
        success: true,
        user: {
          id: data.user.id,
          fullName: data.user.fullName,
          email: data.user.email,
          role: data.user.role,
          enabled: data.user.enabled
        },
        message: data.message,
        emailSent: data.emailSent
      };
      
    } catch (error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        return {
          success: false,
          error: 'Cannot connect to the server. Please make sure the backend is running.'
        };
      }
      
      return {
        success: false,
        error: error.message || 'Registration failed'
      };
    }
  },

  login: async (email, password, rememberMe = false) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          rememberMe: rememberMe
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Handle specific HTTP status codes
        if (response.status === 403) {
          throw new Error(data.error || 'Please verify your email before logging in');
        } else if (response.status === 401) {
          throw new Error(data.error || 'Invalid email or password');
        } else {
          throw new Error(data.error || `Login failed: ${response.status}`);
        }
      }

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      return {
        success: true,
        user: {
          id: data.user.id,
          fullName: data.user.fullName,
          email: data.user.email,
          role: data.user.role
        },
        message: data.message
      };
      
    } catch (error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        return {
          success: false,
          error: 'Cannot connect to the server. Please make sure the backend is running.'
        };
      }
      
      return {
        success: false,
        error: error.message || 'Login failed'
      };
    }
  },

  // Forgot password function
  forgotPassword: async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Password reset request failed: ${response.status}`);
      }

      return {
        success: true,
        message: data.message
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Password reset request failed'
      };
    }
  },

  // Reset password function
  resetPassword: async (token, newPassword) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          newPassword: newPassword
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Password reset failed: ${response.status}`);
      }

      return {
        success: true,
        message: data.message
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Password reset failed'
      };
    }
  },

  // Resend verification function
  resendVerification: async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Verification resend failed: ${response.status}`);
      }

      return {
        success: true,
        message: data.message
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to resend verification email'
      };
    }
  },

  // Verify email function
  verifyEmail: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify?token=${token}`);
      const data = await response.json();

      if (response.ok && data.success) {
        return {
          success: true,
          message: data.message
        };
      } else {
        throw new Error(data.error || 'Email verification failed');
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to verify email'
      };
    }
  },

  // Logout function
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('savedEmail');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  },

  // Set user data in localStorage
  setUser: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
  }
};