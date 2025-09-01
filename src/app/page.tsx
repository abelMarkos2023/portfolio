'use client'
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SocialBar from "@/components/SocialBar";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Projects2 from "@/components/Projects2";



export default function HomePage() {

 

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      

      
      {/* Navbar */}
    <Navbar />

      {/* Hero */}
     <Hero />
   <div className="px-8 md:px-16">
    
     <SocialBar />
      {/* Projects */}
      <Projects2 />

      {/* Services */}
     <Services />

      {/* Contact */}
      <Contact />
   </div>
      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm border-t border-gray-800 p-4">
        © {new Date().getFullYear()} Abel Markos. All rights reserved.
      </footer>
    </div>
  );
}
