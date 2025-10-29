import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MyProfile from "../components/MyProfile.jsx";

import Education from "../components/Education.jsx";

export default function Profile() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if user came from CV download link via URL parameter
    if (searchParams.get('action') === 'download-cv') {
      triggerDownloadCV();
    }
    
    // Also check localStorage in case the parameter was lost during redirect
    const pendingAction = localStorage.getItem('pendingAction');
    if (pendingAction === 'download-cv') {
      triggerDownloadCV();
      // Clear the pending action after using it
      localStorage.removeItem('pendingAction');
    }
  }, [searchParams]);

  const triggerDownloadCV = () => {
    // Scroll to education section after a short delay
    setTimeout(() => {
      const educationSection = document.getElementById('education');
      if (educationSection) {
        educationSection.scrollIntoView({ behavior: 'smooth' });
        
        // Optional: Highlight the download button
        const downloadBtn = educationSection.querySelector('button');
        if (downloadBtn) {
          downloadBtn.classList.add('ring-2', 'ring-yellow-400', 'ring-opacity-50');
          setTimeout(() => {
            downloadBtn.classList.remove('ring-2', 'ring-yellow-400', 'ring-opacity-50');
          }, 2000);
        }
      }
    }, 500);
  };

  return (
    <>
      <MyProfile />
   <Education />
   
    </>
  );
}