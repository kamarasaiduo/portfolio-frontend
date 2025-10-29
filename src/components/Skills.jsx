import React from "react";
import { Code, Palette, Database, GitBranch } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Palette,
    skills: ["JavaScript", "React", "HTML", "CSS", "Tailwind CSS"],
    color: "blue"
  },
  {
    title: "Backend",
    icon: Code,
    skills: ["Node.js", "REST APIs", "Spring Boot"],
    color: "green"
  },
  {
    title: "Tools",
    icon: GitBranch,
    skills: ["Git", "GitHub", "VS Code", "Intellij"],
    color: "purple"
  },
  {
    title: "Database",
    icon: Database,
    skills: ["MySQL", "MongoDB"],
    color: "orange"
  }
];

const colorClasses = {
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  orange: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
};

export default function Skills() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">Skills & Technologies</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div 
              key={index}
              className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${colorClasses[category.color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium ${colorClasses[category.color]} border border-transparent hover:border-current transition-all duration-300`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}