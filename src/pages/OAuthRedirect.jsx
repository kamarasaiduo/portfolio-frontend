import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function OAuthRedirect() {
    const navigate = useNavigate();
    const { user, setUserFromOAuth } = useAuth();
    const [error, setError] = useState('');
    const [status, setStatus] = useState('Processing OAuth login...');

    useEffect(() => {
        fetchOAuthUser();
    }, []);

    // Enhanced OAuth user setting function with proper role handling
    const handleSetUserFromOAuth = (userData) => {
        const userWithRole = {
            ...userData,
            role: userData.role || 'USER' // Ensure role is set, default to USER
        };
        setUserFromOAuth(userWithRole);
    };

    const fetchOAuthUser = async () => {
        try {
            setStatus('Fetching user information...');
            
            const response = await fetch('http://localhost:8080/api/oauth/success', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {
                const data = await response.json();
                
                if (data.success && data.user) {
                    setStatus('Authentication successful! Setting user context...');
                    
                    // ✅ Set user in context and localStorage with proper role handling
                    const userData = {
                        id: data.user.id,
                        fullName: data.user.fullName,
                        email: data.user.email,
                        role: data.user.role || 'USER', // Default to USER if no role
                        isAdmin: (data.user.role || 'USER').toUpperCase() === 'ADMIN'
                    };
                    
                    // Use the enhanced function to set user
                    handleSetUserFromOAuth(userData);
                    
                    // Wait briefly for context to update, then redirect
                    setTimeout(() => {
                        navigate('/profile', { replace: true });
                    }, 1500);
                    
                } else {
                    throw new Error(data.error || 'No user data received from OAuth');
                }
            } else {
                const errorText = await response.text();
                
                // More specific error handling
                if (response.status === 401) {
                    throw new Error('Authentication failed - please try logging in again');
                } else if (response.status === 403) {
                    throw new Error('Access denied - insufficient permissions');
                } else if (response.status === 404) {
                    throw new Error('OAuth endpoint not found - check backend configuration');
                } else {
                    throw new Error(`Authentication failed: ${response.status} - ${errorText}`);
                }
            }
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    };


    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md text-center">
                    <div className="text-red-500 text-6xl mb-4">❌</div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        OAuth Login Failed
                    </h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <div className="space-y-2">
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Back to Login
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Completing OAuth Login
                </h2>
                <p className="text-gray-600 mb-4">{status}</p>
                <p className="text-sm text-gray-500">
                    You will be redirected automatically...
                </p>
            </div>
        </div>
    );
}