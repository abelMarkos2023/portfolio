'use client';

import { useState } from 'react';
import { X, FileText, Download } from 'lucide-react';

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-6 py-3  bg-gradient-to-l from-yellow-600 to-teal-600 hover:from-blue-500 hover:to-orange-500  text-lg shadow-lg shadow-blue-800/30 hover:shadow-pink-700/40 transition-all duration-300 text-white font-semibold rounded-lg  hover:bg-green-700 cursor-pointer "
      >
        <FileText className="mr-2" size={20} />
        View Résumé
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center">
          {/* Modal Content */}
          <div className="relative bg-white rounded-xl w-[90%] max-w-4xl h-[80vh] shadow-2xl overflow-hidden flex flex-col">

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
            >
              <X size={24} />
            </button>

            {/* Download Button */}
            <a
              href="/resume.pdf"
              download
              className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:text-blue-800 flex items-center gap-1 shadow-blue-800/30 hover:shadow-pink-700/40 transition-all duration-300 px-4 py-2 rounded-md text-white font-semibold"
            >
              <Download size={20} />
              Download
            </a>

            {/* PDF Viewer */}
            <iframe
              src="/resume.pdf"
              className="w-full h-full mt-16"
              title="Resume"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
