import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    details: ["University of Makeni", "Makeni, Sierra Leone"],
    color: "red"
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+232 79 767 376"],
    color: "green"
  },
  {
    icon: Mail,
    title: "Email",
    details: ["kamarasaidu558@gmail.com"],
    color: "blue"
  },
  {
    icon: Clock,
    title: "Available Hours to contact",
    details: ["Monday - Sunday: 7:00 AM - 9:00 PM", ""],
    color: "purple"
  }
];

const colorClasses = {
  red: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400",
  green: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400",
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
  purple: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400"
};

export default function Contact() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-1">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Feel free to reach out to me for any questions or opportunities. I'm always open to discussing new projects and ideas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {contactInfo.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index}
              className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
            >
              <div className={`w-12 h-12 ${colorClasses[item.color]} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">{item.title}</h3>
              <div className="space-y-1">
                {item.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 dark:text-gray-300 text-sm">{detail}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Let's Work Together!</h2>
        <p className="mb-6 opacity-90">
          I'm currently available for freelance work and full-time opportunities. 
          If you have a project that you want to get started, think you need my help with something, then get in touch.
        </p>
        <a
          href="mailto:saidukamara@example.com"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
        >
          <Mail size={20} />
          Send Me an Email
        </a>
      </div>
    </section>
  );
}