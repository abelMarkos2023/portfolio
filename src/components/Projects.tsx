'use client';

import { useEffect, useState } from "react";

import ProjectCard from "./ProjectCard";

export type TProject = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  liveDemoUrl: string;
  githubUrl: string;
  techStack: string[];
};

export default function Projects() {
  const [projects, setProjects] = useState<TProject[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/projects", { cache: "no-store" });
      const data = await res.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="px-6 py-20 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="text-center mb-14">
        <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          My Work
        </h2>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto text-lg">
          A selection of apps and websites I’ve crafted with love and caffeine ☕
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <ProjectCard project={project} key={project._id} index={index} />
        ))}
      </div>

      {projects.length === 0 && (
        <p className="text-center mt-20 text-gray-500">No projects published yet.</p>
      )}
    </section>
  );
}
