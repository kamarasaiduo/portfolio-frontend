import React from "react";
import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

// Custom X icon that works with themes
const XIcon = ({ className = "w-5 h-5" }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function SocialMediaButtons() {
  const openLink = (url) => {
    window.open(url, "noopener,noreferrer");
  }; 

  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookF className="w-5 h-5" />,
      color: "bg-[#1877F3] hover:bg-[#145dbf]",
      url: "https://www.facebook.com/Saidukamara.92"
    },
    {
      name: "X (Twitter)",
      icon: <XIcon />,
      color: "bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white",
      url: "https://x.com/kamarasaidu558"
    },
    {
      name: "YouTube",
      icon: <FaYoutube className="w-5 h-5" />,
      color: "bg-[#FF0000] hover:bg-[#cc0000]",
      url: "https://studio.youtube.com/channel/UCGUlwmPdKHl0UkGpnwoXfXw/videos/upload?filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D"
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="w-5 h-5" />,
      color: "bg-gradient-to-r from-[#feda75] via-[#fa7e1e] to-[#d62976] hover:brightness-90",
      url: "https://www.instagram.com/saidukamara.92/"
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn className="w-5 h-5" />,
      color: "bg-[#0A66C2] hover:bg-[#004182]",
      url: "https://www.linkedin.com/in/saidukamara/"
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="w-5 h-5" />,
      color: "bg-[#25D366] hover:bg-[#1ebc57]",
      url: "https://wa.me/23279767376"
    }
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 p-4">
      {socialLinks.map((social) => (
        <button
          key={social.name}
          type="button"
          onClick={() => openLink(social.url)}
          className={`
            flex items-center justify-center 
            w-12 h-12 rounded-lg 
            text-white font-semibold
            transition-all duration-300 
            transform hover:scale-105 
            shadow-md hover:shadow-lg
            ${social.color}
          `}
          aria-label={social.name}
        >
          {social.icon}
        </button>
      ))}
    </div>
  );
}