import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Hero() {
  const { isAuthenticated } = useAuth();

  const handleDownloadCVClick = () => {
    // Store the intended action for after login
    if (!isAuthenticated) {
      localStorage.setItem('pendingAction', 'download-cv');
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Hi, I'm Saidu O. Kamara
        </h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          A passionate front-end developer who loves building clean, simple, and
          responsive web experiences.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/23279767376"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            Contact Me (WhatsApp)
          </a>
          
          {isAuthenticated ? (
            <Link
              to="/profile?action=download-cv"
              className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Download size={20} />
              Download CV
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={handleDownloadCVClick}
              className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Download size={20} />
              Download CV
            </Link>
          )}
          
          <Link
            to="/profile"
            className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}