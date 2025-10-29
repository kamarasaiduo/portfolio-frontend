import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, CircleAlert } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import OAuthButtons from "../components/OAuthButtons";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showResendVerification, setShowResendVerification] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    // Check for pending actions after login
    useEffect(() => {
        // This will run when component mounts to check if there's a pending action
        const pendingAction = localStorage.getItem('pendingAction');
        if (pendingAction && window.location.pathname === '/login') {
            setMessage(`Please login to ${pendingAction === 'download-cv' ? 'download your CV' : 'continue'}`);
        }
    }, []);

    // Load saved email from localStorage
    useEffect(() => {
        const savedEmail = localStorage.getItem("savedEmail");
        const savedRememberMe = localStorage.getItem("rememberMe") === "true";
        if (savedEmail) setEmail(savedEmail);
        if (savedRememberMe) setRememberMe(savedRememberMe);
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setMessage("");
        setShowResendVerification(false);
        setLoading(true);

        try {
            const result = await login(email, password, rememberMe);

            if (result.success) {
                setMessage(result.message || "Login successful! Redirecting...");
                
                // Check for pending actions
                const pendingAction = localStorage.getItem('pendingAction');
                
                // Save remember me preference
                if (rememberMe) {
                    localStorage.setItem("rememberMe", "true");
                } else {
                    localStorage.removeItem("rememberMe");
                }

                setTimeout(() => {
                    if (pendingAction === 'download-cv') {
                        // Clear the pending action and redirect to profile with download action
                        localStorage.removeItem('pendingAction');
                        navigate("/profile?action=download-cv");
                    } else {
                        navigate("/profile");
                    }
                }, 1500);
            } else {
                setError(result.error || "Login failed");
                
                if (result.error?.includes("verify your email")) {
                    setShowResendVerification(true);
                }
            }
        } catch (err) {
            console.error("Login error:", err);
            
            if (err.message?.includes("verify your email")) {
                setError("Please verify your email before logging in. Check your inbox for the verification link.");
                setShowResendVerification(true);
            } else if (err.message?.includes("Failed to fetch")) {
                setError("Cannot connect to the server. Please make sure the backend is running.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    const handleResendVerification = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:8080/api/auth/resend-verification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            
            if (response.ok) {
                setMessage("Verification email sent successfully! Please check your inbox.");
                setShowResendVerification(false);
                setError("");
            } else {
                setError(data.error || "Failed to send verification email");
            }
        } catch (err) {
            setError("Failed to send verification email. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError("Please enter your email address first");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch("http://localhost:8080/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            
            if (response.ok) {
                setMessage("Password reset instructions sent to your email!");
                setError("");
            } else {
                setError(data.error || "Failed to send password reset email");
            }
        } catch (err) {
            setError("Failed to send password reset email. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Function to manually dismiss messages
    const dismissMessage = () => {
        setMessage("");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-4 px-4 sm:px-6 lg:px-8 transition-colors">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
                <div className="flex flex-col lg:flex-row">
                    {/* Left Side - Form Section */}
                    <div className="flex-1 p-4 sm:p-6 lg:p-8">
                        <div className="w-full max-w-xs sm:max-w-sm mx-auto">
                            <div className="text-center mb-4 sm:mb-6">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Log In</h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1 text-xs sm:text-sm">Welcome back! Please enter your details</p>
                            </div>

                            {message && (
                                <div className="mb-3 p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-xs sm:text-sm transition-colors relative">
                                    <button
                                        onClick={dismissMessage}
                                        className="absolute top-2 right-2 text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
                                    >
                                        ×
                                    </button>
                                    <div className="flex items-center gap-1 sm:gap-2 mb-1 pr-6">
                                        <div className="w-1 h-1 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-green-700 dark:text-green-400 text-xs sm:text-sm font-medium">Success!</span>
                                    </div>
                                    <p className="text-green-700 dark:text-green-400 text-xs sm:text-sm pr-6">{message}</p>
                                </div>
                            )}

                            {error && (
                                <div className="mb-3 p-2 sm:p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-xs sm:text-sm transition-colors">
                                    <div className="flex items-start gap-1 sm:gap-2">
                                        <CircleAlert className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                        <div className="flex-1">
                                            <span className="text-red-700 dark:text-red-400 text-xs sm:text-sm block">{error}</span>
                                            {showResendVerification && (
                                                <button
                                                    onClick={handleResendVerification}
                                                    disabled={loading}
                                                    className="text-red-600 dark:text-red-400 underline text-xs sm:text-sm mt-0.5 hover:text-red-700 dark:hover:text-red-300 transition-colors disabled:opacity-50"
                                                >
                                                    {loading ? "Sending..." : "Resend verification email"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <OAuthButtons />

                            <div className="relative my-3 sm:my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                                </div>
                                <div className="relative flex justify-center text-xs sm:text-sm">
                                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">Or continue with email</span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3" autoComplete="on">
                                <div className="space-y-1 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-3 h-3 sm:w-4 sm:h-4 transition-colors" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoComplete="email"
                                            className="w-full pl-7 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-3 h-3 sm:w-4 sm:h-4 transition-colors" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="current-password"
                                            className="w-full pl-7 sm:pl-10 pr-7 sm:pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" /> : <Eye className="w-3 h-3 sm:w-4 sm:h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center space-x-1 sm:space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-700 transition-colors"
                                        />
                                        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Remember me</span>
                                    </label>

                                    <button
                                        type="button"
                                        onClick={handleForgotPassword}
                                        disabled={loading}
                                        className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors disabled:opacity-50"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-black dark:bg-white text-white dark:text-black py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-1 sm:gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-2 h-2 sm:w-3 sm:h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                            Signing in...
                                        </>
                                    ) : (
                                        "Log In"
                                    )}
                                </button>
                            </form>

                            <p className="mt-3 sm:mt-4 text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                                Don't have an account?{" "}
                                <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Image Section */}
                    <div className="hidden lg:flex flex-1 border-l border-gray-200 dark:border-gray-700">
                        <div className="w-full h-full flex items-center justify-center p-1">
                            <img 
                                src="/login.jpg" 
                                alt="image login" 
                                className="max-w-full max-h-full object-contain dark:brightness-90 transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;