import React from "react";
import { Download } from "lucide-react";

export default function Education() {
  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv-saidu-kamara.pdf';
    link.download = 'Saidu_Kamara_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="education" className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
       
        <button
          onClick={downloadCV}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <Download size={20} />
          Download My CV
        </button>
      </div>
    </section>
  );
}


