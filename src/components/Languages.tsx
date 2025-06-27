import React from 'react'
import { motion } from 'framer-motion'
const Languages = () => {
  return (
    <div className="mt-10 flex flex-wrap justify-center items-center gap-6">
  {[
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', alt: 'PHP' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', alt: 'JavaScript' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node.js' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', alt: 'Express' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', alt: 'Next.js' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg', alt: 'Laravel' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', alt: 'MySQL' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', alt: 'MongoDB' },
  ].map((tech, index) => (
    <motion.img
      key={tech.alt}
      src={tech.src}
      alt={tech.alt}
      className="w-12 h-12 sm:w-14 sm:h-14"
      initial={{ y: 0 }}
      animate={{ y: [0, -8, 0] }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
        delay: index * 0.1,
        ease: 'easeInOut',
      }}
      title={tech.alt}
    />
  ))}
</div>

  )
}

export default Languages