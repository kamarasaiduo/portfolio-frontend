import { useState } from "react";
import profilepic from "../assets/profilepic.png";
import Skills from "../components/Skills.jsx";
import Education from "../components/Education.jsx";
import { GraduationCap, Code, Briefcase } from "lucide-react";

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState("education");

  const tabConfig = [
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Code },
    { id: "experience", label: "Experience", icon: Briefcase },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start gap-12">
        {/* Profile Picture */}
        <div className="lg:w-1/3 flex justify-center">
          <div className="relative">
            <img
              src={profilepic}
              alt="Saidu's profile"
              className="rounded-2xl shadow-2xl w-80 h-90 object-cover border-4 border-white dark:border-gray-800"
            />
            <div className="absolute -bottom-6 -right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
              Available for work
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">About Me</h1>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
            Saidu O. Kamara is a student at the University of Makeni with a strong
            passion for coding and web development. I am currently focusing on
            front-end technologies such as HTML, CSS, JavaScript, and React,
            while also exploring back-end development with the goal of becoming
            a full-stack developer.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Explore my education, skills and experience below.
          </p>

          {/* Enhanced Tabs */}
          <div className="flex flex-wrap gap-4 border-b border-gray-300 dark:border-gray-600 mb-8">
            {tabConfig.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-4 px-2 transition-all duration-300 ${
                    activeTab === tab.id
                      ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px]">
            {activeTab === "education" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Education Journey</h2>
                <div className="grid gap-6">
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">University of Makeni</h3>
                        <p className="text-gray-600 dark:text-gray-300">BSc. in Computer Science</p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">2022 – 2026</p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Core courses: Web Development, Networking, Databases, UX Fundamentals.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white"> Link Corporation</h3>
                        <p className="text-gray-600 dark:text-gray-300">Web Development (Full-Stack) </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">2025</p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      React, JavaScript, HTML, CSS, Tailwind CSS, Spring Boot
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Technical Skills</h2>
                <Skills />
              </div>
            )}

            {activeTab === "experience" && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Professional Experience</h2>
                <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
                  <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Building Experience
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Currently working on personal projects and building my portfolio. 
                    This section will be updated with professional experiences soon.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}