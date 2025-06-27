'use client';

import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function SocialBar() {
  return (
    <div className="fixed top-1/2 left-4 flex flex-col gap-4 -translate-y-1/2 text-gray-400 z-50">
      <a href="https://github.com/yourgithub" target="_blank" className="hover:text-white">
        <Github size={24} />
      </a>
      <a href="https://linkedin.com/in/yourlinkedin" target="_blank" className="hover:text-white">
        <Linkedin size={24} />
      </a>
      <a href="https://twitter.com/yourtwitter" target="_blank" className="hover:text-white">
        <Twitter size={24} />
      </a>
      <a href="mailto:your.email@example.com" className="hover:text-white">
        <Mail size={24} />
      </a>
    </div>
  );
}
