import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function OAuthCallback() {
    const navigate = useNavigate();
    const { setUserFromOAuth } = useAuth();

    useEffect(() => {
        // Extract user data from URL parameters (alternative approach)
        const urlParams = new URLSearchParams(window.location.search);
        const userData = urlParams.get('user');
        
        if (userData) {
            try {
                const user = JSON.parse(decodeURIComponent(userData));
                setUserFromOAuth(user);
                navigate('/profile', { replace: true });
            } catch (error) {
                console.error('Error parsing user data:', error);
                navigate('/login?error=oauth_parse_error');
            }
        } else {
            // Fallback: try to fetch from /api/oauth/success
            fetch('https://portfolio-backend-m2je.onrender.com/api/oauth/success', {
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success && data.user) {
                    setUserFromOAuth(data.user);
                    navigate('/profile', { replace: true });
                } else {
                    navigate('/login?error=oauth_failed');
                }
            })
            .catch(error => {
                console.error('OAuth fetch error:', error);
                navigate('/login?error=network_error');
            });
        }
    }, [navigate, setUserFromOAuth]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold">Finalizing Login...</h2>
            </div>
        </div>
    );
}