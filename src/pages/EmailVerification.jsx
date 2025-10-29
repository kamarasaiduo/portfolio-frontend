import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowRight, Home, LogIn, Loader } from 'lucide-react';

export default function EmailVerification() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const hasVerified = useRef(false); // prevents multiple calls

    const token = searchParams.get('token');

    useEffect(() => {
        if (token && !hasVerified.current) {
            hasVerified.current = true;
            verifyEmail();
        } else if (!token) {
            setStatus('error');
            setMessage('Invalid verification link. No token provided.');
            setLoading(false);
        }
    }, [token]);

    const verifyEmail = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/auth/verify?token=${token}`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setStatus('success');
                setMessage(data.message || 'Email verified successfully. You can now log in.');
            } else {
                setStatus('error');
                setMessage(data.error || 'Invalid or expired verification token.');
            }
        } catch (error) {
            console.error('Verification error:', error);
            setStatus('error');
            setMessage('Failed to verify email. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleContinueToLogin = () => navigate('/login');
    const handleGoHome = () => navigate('/');
    const handleRetry = () => {
        setLoading(true);
        setStatus('loading');
        setMessage('');
        verifyEmail();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
                        <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying Email</h2>
                        <p className="text-gray-600">Please wait while we verify your email address...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                    <div className="text-center mb-6">
                        {status === 'success' ? (
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        ) : (
                            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        )}

                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {status === 'success' ? 'Email Verified!' : 'Verification Failed'}
                        </h1>
                        <p className="text-gray-600">{message}</p>
                    </div>

                    <div className="space-y-3">
                        {status === 'success' ? (
                            <>
                                <button
                                    onClick={handleContinueToLogin}
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
                                >
                                    <LogIn className="w-5 h-5" />
                                    Continue to Login
                                </button>

                                <button
                                    onClick={handleGoHome}
                                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center gap-2"
                                >
                                    <Home className="w-5 h-5" />
                                    Go to Homepage
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleRetry}
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                    Try Again
                                </button>

                                <Link
                                    to="/login"
                                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center gap-2 block text-center"
                                >
                                    <LogIn className="w-5 h-5" />
                                    Back to Login
                                </Link>
                            </>
                        )}
                    </div>

                    {status === 'error' && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-600 text-center">
                                Need help?{' '}
                                <Link to="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                                    Contact support
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
