'use client';

import { Github, Linkedin, Twitter, Facebook } from "lucide-react";

export default function SocialBar() {
  return (
    <div className="fixed top-1/2 left-4 flex flex-col gap-4 -translate-y-1/2 text-gray-400 z-50">
      <a href="https://github.com/abelMarkos2023" target="_blank" className="hover:text-white">
        <Github size={24} />
      </a>
      <a href="https://www.linkedin.com/in/abel-markos-fullstack" target="_blank" className="hover:text-white">
        <Linkedin size={24} />
      </a>
      <a href="https://x.com/AbelZaDeveloper" target="_blank" className="hover:text-white">
        <Twitter size={24} />
      </a>
      <a href="https://www.facebook.com/amarkos.markos" className="hover:text-white">
        <Facebook size={24} />
      </a>
    </div>
  );
}
