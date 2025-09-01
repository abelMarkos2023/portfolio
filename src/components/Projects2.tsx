'use client';

import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { AnimatePresence,motion } from "framer-motion";

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
  const [filteredProjects, setFilteredProjects] = useState<TProject[]>([]);
  const [selectedTech, setSelectedTech] = useState<string>("All");

  // Extract unique technologies from all projects for filter buttons
  const uniqueTechs = ["All","HTML CSS JS","Laravel"," MERN","PHP","Vue",...new Set(projects.flatMap((project) => project.techStack))];

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/projects", { cache: "no-store" });
      const data = await res.json();
      setProjects(data);
      setFilteredProjects(data); // Initially show all projects
    };
    fetchProjects();
  }, []);

  // Filter projects based on selected technology
  useEffect(() => {
    if (selectedTech === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.techStack.includes(selectedTech))
      );
    }
  }, [selectedTech, projects]);




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

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {uniqueTechs.map((tech) => (
          <button
            key={tech}
            onClick={() => setSelectedTech(tech)}
            className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition-colors duration-200 ${
              selectedTech === tech
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <motion.div key={project._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
             
                <ProjectCard project = {project} index = {index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <p className="text-center mt-20 text-gray-500">
          No projects found for this technology.
        </p>
      )}
    </section>
  );
}