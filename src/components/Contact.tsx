// 'use client';

// import { motion } from 'framer-motion';
// import { Mail } from 'lucide-react';

// export default function ContactMe() {
//   return (
//     <section
//       id="contact"
//       className="relative px-6 py-24 bg-gradient-to-br from-gray-950 to-black text-white overflow-hidden"
//     >
//       <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-3xl animate-pulse" />

//       <div className="relative z-10 text-center mb-16">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
//         >
//           Contact Me 🚀
//         </motion.h2>
//         <p className="text-gray-400 mt-4 text-sm max-w-xl mx-auto">
//           Ready to launch your next big idea? I bring code to life with high performance, beautiful design, and bulletproof logic.
//         </p>
//       </div>

//       <motion.form
//         whileInView={{ opacity: [0, 1], y: [30, 0] }}
//         transition={{ duration: 0.7 }}
//         className="relative z-10 max-w-xl mx-auto bg-gray-900 p-10 rounded-2xl shadow-xl space-y-6 border border-gray-800"
//       >
//         <div className="flex items-center gap-3 text-white">
//           <Mail size={20} className="text-blue-400" />
//           <span className="text-lg font-semibold">Let&apos;s connect</span>
//         </div>

//         <input
//           type="text"
//           name="name"
//           placeholder="Your Name"
//           required
//           className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Your Email"
//           required
//           className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <textarea
//           name="message"
//           placeholder="Your Message"
//           rows={5}
//           required
//           className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         ></textarea>

//         <button
//           type="submit"
//           className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-pink-500 text-white font-bold rounded-md text-lg shadow-lg hover:shadow-pink-700/40 transition-all duration-300"
//         >
//           💼 Let’s Build Something Amazing
//         </button>
//       </motion.form>

//       <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gray-600 text-xs">
//         🚀 Powered by passion and too much coffee
//       </div>
//     </section>
//   );
// }


'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function ContactMe() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setStatus('Message sent! 🎉');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('Something went wrong. 😢');
    }

    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="relative px-6 py-24 bg-gradient-to-br from-gray-950 to-black text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-3xl animate-pulse" />

      <div className="relative z-10 text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          Contact Me 🚀
        </motion.h2>
        <p className="text-gray-400 mt-4 text-sm max-w-xl mx-auto">
          Ready to launch your next big idea? I bring code to life with high performance, beautiful design, and bulletproof logic.
        </p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        whileInView={{ opacity: [0, 1], y: [30, 0] }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-xl mx-auto bg-gray-900 p-10 rounded-2xl shadow-xl space-y-6 border border-gray-800"
      >
        <div className="flex items-center gap-3 text-white">
          <Mail size={20} className="text-blue-400" />
          <span className="text-lg font-semibold">Let&apos;s connect</span>
        </div>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={5}
          required
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-pink-500 text-white font-bold rounded-md text-lg shadow-lg hover:shadow-pink-700/40 transition-all duration-300"
        >
          {loading ? 'Sending...' : '💼 Let’s Build Something Amazing'}
        </button>

        {status && <p className="text-sm text-center mt-4 text-gray-300">{status}</p>}
      </motion.form>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gray-600 text-xs">
        🚀 Powered by passion and too much coffee
      </div>
    </section>
  );
}
