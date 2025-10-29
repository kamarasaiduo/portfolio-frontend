import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, User, CircleAlert, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import OAuthButtons from "../components/OAuthButtons";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(true);

    const { register } = useAuth();
    const navigate = useNavigate();

    // Load saved data for reuse
    useEffect(() => {
        const savedName = localStorage.getItem("savedName");
        const savedEmail = localStorage.getItem("savedRegEmail");
        if (savedName) setFullName(savedName);
        if (savedEmail) setEmail(savedEmail);
    }, []);

    // Save entered values to localStorage
    useEffect(() => {
        if (fullName) localStorage.setItem("savedName", fullName);
        if (email) localStorage.setItem("savedRegEmail", email);
    }, [fullName, email]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        if (!passwordRegex.test(password)) {
            setError(
                "Password must be at least 8 characters and include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
            );
            setLoading(false);
            return;
        }

        try {
            const userData = { fullName, email, password };
            const result = await register(userData);

            if (result.success) {
                setMessage("Registration successful! Please check your email to verify your account.");
                setEmailSent(result.emailSent);

                setFullName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");

                localStorage.removeItem("savedName");
                localStorage.removeItem("savedRegEmail");

                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } else {
                setError(result.error || "Registration failed");
            }
        } catch {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    // Password strength calculation
    const passwordStrength = () => {
        if (password.length === 0) return { strength: 0, text: "", color: "" };

        let strength = 0;
        const checks = [
            password.length >= 8,
            /[A-Z]/.test(password),
            /[a-z]/.test(password),
            /\d/.test(password),
            /[!@#$%^&*(),.?":{}|<>]/.test(password)
        ];
        strength = checks.filter(Boolean).length;

        switch (strength) {
            case 5:
                return { strength: 100, text: "Very Strong", color: "bg-green-500" };
            case 4:
                return { strength: 80, text: "Strong", color: "bg-green-400" };
            case 3:
                return { strength: 60, text: "Medium", color: "bg-yellow-500" };
            default:
                return { strength: 40, text: "Weak", color: "bg-red-500" };
        }
    };

    const strength = passwordStrength();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-4 px-4 sm:px-6 lg:px-8 transition-colors">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
                <div className="flex flex-col lg:flex-row">
                    {/* Left Side - Form Section */}
                    <div className="flex-1 p-4 sm:p-6 lg:p-8">
                        <div className="w-full max-w-xs sm:max-w-sm mx-auto">
                            <div className="text-center mb-4 sm:mb-6">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Sign Up</h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1 text-xs sm:text-sm">Create your account to get started</p>
                            </div>

                            {message && (
                                <div className="mb-3 p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-xs sm:text-sm transition-colors">
                                    <div className="flex items-center gap-1 sm:gap-2 mb-1">
                                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 dark:text-green-400" />
                                        <span className="text-green-700 dark:text-green-400 text-xs sm:text-sm font-medium">Success!</span>
                                    </div>
                                    <p className="text-green-700 dark:text-green-400 text-xs sm:text-sm">{message}</p>
                                    {!emailSent && (
                                        <p className="text-green-600 dark:text-green-400 text-xs sm:text-sm mt-0.5">
                                            ✅ Verification email could not be sent. Request a new one from login.
                                        </p>
                                    )}
                                </div>
                            )}

                            {error && (
                                <div className="mb-3 p-2 sm:p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-xs sm:text-sm flex items-start gap-1 sm:gap-2 transition-colors">
                                    <CircleAlert className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-red-700 dark:text-red-400 text-xs sm:text-sm">{error}</span>
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
                                {/* Full Name */}
                                <div className="space-y-1 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-3 h-3 sm:w-4 sm:h-4 transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            autoComplete="name"
                                            className="w-full pl-7 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-1 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-3 h-3 sm:w-4 sm:h-4 transition-colors" />
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoComplete="email"
                                            className="w-full pl-7 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-1 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-3 h-3 sm:w-4 sm:h-4 transition-colors" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create a password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="new-password"
                                            className="w-full pl-7 sm:pl-10 pr-7 sm:pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                                            required
                                            minLength={8}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" /> : <Eye className="w-3 h-3 sm:w-4 sm:h-4" />}
                                        </button>
                                    </div>

                                    {/* Password strength bar */}
                                    {password.length > 0 && (
                                        <div className="space-y-0.5 sm:space-y-1">
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 sm:h-2 transition-colors">
                                                <div
                                                    className={`h-1 sm:h-2 rounded-full transition-all duration-300 ${strength.color}`}
                                                    style={{ width: `${strength.strength}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                Password strength: <span className="font-medium">{strength.text}</span>
                                            </p>
                                        </div>
                                    )}

                                    {/* Password requirements */}
                                    <ul className="mt-1 text-xs text-gray-600 dark:text-gray-400 space-y-0.5 transition-colors">
                                        <li className="flex items-center gap-1">
                                            {password.length >= 8 ? <span className="text-green-600 dark:text-green-400">✅</span> : <span className="text-red-500 dark:text-red-400">❌</span>}
                                            At least 8 characters
                                        </li>
                                        <li className="flex items-center gap-1">
                                            {/[A-Z]/.test(password) ? <span className="text-green-600 dark:text-green-400">✅</span> : <span className="text-red-500 dark:text-red-400">❌</span>}
                                            One uppercase letter
                                        </li>
                                        <li className="flex items-center gap-1">
                                            {/[a-z]/.test(password) ? <span className="text-green-600 dark:text-green-400">✅</span> : <span className="text-red-500 dark:text-red-400">❌</span>}
                                            One lowercase letter
                                        </li>
                                        <li className="flex items-center gap-1">
                                            {/\d/.test(password) ? <span className="text-green-600 dark:text-green-400">✅</span> : <span className="text-red-500 dark:text-red-400">❌</span>}
                                            One number
                                        </li>
                                        <li className="flex items-center gap-1">
                                            {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? <span className="text-green-600 dark:text-green-400">✅</span> : <span className="text-red-500 dark:text-red-400">❌</span>}
                                            One special character
                                        </li>
                                    </ul>
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-1 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-3 h-3 sm:w-4 sm:h-4 transition-colors" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            autoComplete="new-password"
                                            className="w-full pl-7 sm:pl-10 pr-7 sm:pr-10 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" /> : <Eye className="w-3 h-3 sm:w-4 sm:h-4" />}
                                        </button>
                                    </div>
                                    {confirmPassword && password !== confirmPassword && (
                                        <p className="text-red-500 dark:text-red-400 text-xs">Passwords do not match</p>
                                    )}
                                    {confirmPassword && password === confirmPassword && (
                                        <p className="text-green-500 dark:text-green-400 text-xs">Passwords match</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-black dark:bg-white text-white dark:text-black py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-1 sm:gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-2 h-2 sm:w-3 sm:h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                            Creating Account...
                                        </>
                                    ) : (
                                        "Sign Up"
                                    )}
                                </button>
                            </form>

                            <p className="mt-3 sm:mt-4 text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                                Already have an account?{" "}
                                <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                                    Log in
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