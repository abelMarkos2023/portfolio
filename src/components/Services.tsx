'use client';

import { Code, Monitor, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: <Code size={32} className="text-indigo-400" />,
    title: "Full-Stack Web Apps",
    desc: "Complete web applications from backend APIs to clean frontend UIs using Next.js and MongoDB.",
  },
  {
    icon: <Monitor size={32} className="text-teal-400" />,
    title: "Responsive Websites",
    desc: "Modern, mobile-friendly websites built with TailwindCSS and Next.js — fast, clean, and scalable.",
  },
  {
    icon: <ImageIcon size={32} className="text-pink-400" />,
    title: "Cloud Media Hosting",
    desc: "Cloud image management, media optimization, and secure image delivery with Cloudinary.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative px-6 py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      <div className="text-center mb-14">
        <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Services
        </h2>
        <p className="text-gray-400 mt-3 text-sm max-w-md mx-auto">
          What I do best, powered by passion and a love for clean code.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="relative group bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-xl overflow-hidden"
            whileHover={{ scale: 1.03, rotate: 0.3 }}
            transition={{ type: "spring", stiffness: 300 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full opacity-10 blur-3xl animate-pulse" />
            <div className="relative z-10 space-y-3">
              {service.icon}
              <h3 className="text-xl font-semibold text-white/90 group-hover:text-white">
                {service.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {service.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
