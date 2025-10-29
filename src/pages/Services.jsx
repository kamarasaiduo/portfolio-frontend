import React from "react";
import { Palette, Code, Zap, Smartphone } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Website Design",
    desc: "Clean, modern, and responsive UI designs that provide excellent user experience across all devices.",
    features: ["Responsive Design", "Modern UI/UX", "User-Centered Approach"]
  },
  {
    icon: Code,
    title: "React Development",
    desc: "Building dynamic and interactive web applications using React with reusable components and efficient state management.",
    features: ["Component-Based", "State Management", "SPA Routing"]
  },
  {
    icon: Zap,
    title: "Performance Tuning",
    desc: "Optimizing website performance for faster load times, better user experience, and improved SEO rankings.",
    features: ["Speed Optimization", "SEO Friendly", "Best Practices"]
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    desc: "Creating websites that look and work perfectly on all devices from desktop to mobile phones.",
    features: ["Mobile-First", "Cross-Platform", "Touch-Friendly"]
  }
];

export default function Services() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">My Services</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          I offer a range of services to help bring your digital ideas to life with modern technologies and best practices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div 
              key={index}
              className="p-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{service.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{service.desc}</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Let's discuss how I can help bring your vision to life with modern web technologies.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}