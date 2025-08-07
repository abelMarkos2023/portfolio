import React from 'react'
import {motion} from 'framer-motion'
import { TProject } from './Projects'
import Image from 'next/image'
import { ExternalLink,Github } from 'lucide-react'
const ProjectCard = ({project,index}:{project:TProject,index:number}) => {
  return (
     <motion.div
            key={project._id}
            className="bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-blue-700/40 transition duration-500 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.7 }}
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

            <div className="p-5 space-y-4">
              <h3 className="text-2xl font-bold text-white/90 group-hover:text-white">
                {project.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white/10 border border-white/20 text-white text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mt-4">
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
  )
}

export default ProjectCard