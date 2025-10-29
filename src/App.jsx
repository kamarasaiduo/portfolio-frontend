import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import OAuthRedirect from "./pages/OAuthRedirect.jsx";
import Profile from "./pages/Profile.jsx";
import SocialMediaButtons from "./components/SocialMediaButtons.jsx";

function AppContent() {
  const location = useLocation();
  
  const hideSocialMediaRoutes = [
    '/login',
    '/register', 
    '/reset-password',
    '/email-verification',
    '/oauth/redirect',
    '/oauth2/redirect',
    '/admin/users',
    '/profile'
  ];

  const shouldShowSocialMedia = !hideSocialMediaRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">  
      <Header />
      <main className="flex-1 fade-in">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/oauth/redirect" element={<OAuthRedirect />} />
          <Route path="/oauth2/redirect" element={<OAuthRedirect />} />
          
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />
          
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {shouldShowSocialMedia && <SocialMediaButtons />}
      
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}