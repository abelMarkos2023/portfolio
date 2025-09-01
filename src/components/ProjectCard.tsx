
import React from 'react';
import { motion } from 'framer-motion';
import { TProject } from './Projects';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project, index }: { project: TProject; index: number }) => {
  // Animation variants for grow-in and shrink-out
  const cardVariants = {
    hidden: {
      scale: 0.1,
      opacity: 0,
      border: '2px dotted rgba(255, 255, 255, 0.4)',
      background: 'transparent',
    },
    visible: {
      scale: 1,
      opacity: 1,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgb(17, 24, 39)',
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: 'easeOut' as const,
      },
    },
    exit: {
      scale: 0.1,
      opacity: 0,
      border: '2px dotted rgba(255, 255, 255, 0.4)',
      background: 'transparent',
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: 'easeIn' as const,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className="bg-gray-950 border border-gray-800 max-h-[600px] rounded-2xl overflow-hidden shadow-xl hover:shadow-blue-700/40 transition-shadow duration-500 group flex flex-col"
      style={{ minHeight: '400px' }} // Consistent card height
    >
      <div className="overflow-hidden">
        <Image
          width={500}
          height={300}
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5 flex flex-col justify-between gap-2 flex-grow">
        <h3 className="text-2xl font-bold text-white/90 group-hover:text-white">
          {project.title}
        </h3>
                 <p className="text-xs text-gray-100 leading-relaxed mt-2 overflow-hidden" style={{ 
           display: '-webkit-box',
           WebkitLineClamp: 8,
           WebkitBoxOrient: 'vertical'
         }}>
           {project.description}
         </p>

        <div className="flex flex-wrap gap-2 mt-3">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 cursor-pointer bg-white/10 border border-white/20 text-white text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-4">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md transition"
            >
              <ExternalLink size={16} /> Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition"
            >
              <Github size={16} /> Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;