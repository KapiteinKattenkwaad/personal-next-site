'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { sendGaEvent } from '../utils/gtag';

const handleClick = (value: string) => {
  sendGaEvent({
    action: 'projects_click',
    category: 'user_engagement',
    label: value,
    value: 1,
  });
};

const projects = [
  {
    title: 'Onboarding | BugHerd',
    description: 'Created a new modern onboarding flow for BugHerd with React and Ruby on Rails.',
    image: '/assets/bh-onboarding.png',
  },
  {
    title: 'Dark mode | BugHerd',
    description: 'The whole BugHerd app and sidebar extension finally got dark mode. Oh, the css variables!',
    image: '/assets/bh-darkmode.png',
    link: 'https://updates.bugherd.com/release/esapQ-welcome-to-the-dark-side',
  },
  {
    title: 'CMS | Liftov',
    description: 'A headless CMS with Vue.js and Prismic and a few teeny tiny animations.',
    image: '/assets/ixpole.png',
    link: 'https://www.ixpole.com/',
  },
  {
    title: 'Marketing Site | Lunar',
    description: 'For this logistics company I made a website with Craft CMS and Tailwind to create a nice flow.',
    image: '/assets/adpo-screenshot.png',
    link: 'https://www.adpo.com/en',
  },
  {
    title: 'Vue.js app | Icon Agency',
    description: 'To make the timeline for the 75th anniversary more interactive and smooth, I\'ve used a Vue 3 application inside of the Drupal theme. It uses Pinia for state management.',
    image: '/assets/asd-screenshot.png',
    link: 'https://www.asd.gov.au/about/history/timeline/',
  }
];

export default function Projects() {
  return (
    <section id="projects" className="gradient-background w-full max-w-5xl mx-auto pb-24">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-10"
      >
        Some of my projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-8">
        {/* First project: big overlay card */}
        <motion.a
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          href={projects[0].link}
          target="_blank"
          rel="noopener noreferrer"
          className="glass relative col-span-1 md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden flex items-end min-h-[350px] md:min-h-[500px] shadow-lg group"
          style={{ minHeight: 350 }}
        >
          <Image
            width={600}
            height={600}
            src={projects[0].image}
            alt={projects[0].title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
          />
          <div className="relative z-10 w-full p-8 bg-gradient-to-t from-black/80 to-black/10">
            <h3 className="text-2xl font-bold text-white mb-2">{projects[0].title}</h3>
            {/* <p className="text-base text-neutral-200 mb-2">{projects[0].description}</p> */}
            {/* <span className="inline-block text-cyan-400 font-medium group-hover:underline transition-all duration-300">View Project →</span> */}
          </div>
        </motion.a>

        {/* Next two projects: stacked in col 3 */}
        {projects.slice(1, 3).map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + idx * 0.15, duration: 0.7 }}
          >
            <a
              // @ts-ignore
              onClick={handleClick('projects_click')}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass col-span-1 md:col-start-3 flex flex-row-reverse md:flex-row items-stretch bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] hover:shadow-xl transition-transform duration-300 cursor-pointer"
              style={{ minHeight: 170 }}
            >
              <div className="relative w-2/5 md:h-auto">
                <Image
                  height={200}
                  width={200}
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full group-hover:opacity-90 transition-opacity duration-300"
                />
              </div>
              <div className="flex-1 p-5 flex flex-col justify-center">
                <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-300">
                  {project.title}
                </h3>
                {/* <p className="text-sm text-neutral-300 mb-2">{project.description}</p> */}
                {/* <span className="inline-block text-cyan-400 font-medium group-hover:underline transition-all duration-300">View Project →</span> */}
              </div>
            </a>
          </motion.div>
        ))}
      </div>
      {/* Next two projects: stacked in col 2 */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-8 mt-8">
        {projects.slice(3, 5).map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + idx * 0.15, duration: 0.7 }}
          >
            <a
              // @ts-ignore
              onClick={handleClick('projects_click')}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass col-span-1 md:col-start-3 flex flex-row-reverse md:flex-row items-stretch bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] hover:shadow-xl transition-transform duration-300 cursor-pointer"
              style={{ minHeight: 170 }}
            >
              <div className="relative w-2/5 md:h-auto">
                <Image
                  height={200}
                  width={200}
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full group-hover:opacity-90 transition-opacity duration-300"
                />
              </div>
              <div className="flex-1 p-5 flex flex-col justify-center">
                <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-300">
                  {project.title}
                </h3>
                {/* <p className="text-sm text-neutral-300 mb-2">{project.description}</p> */}
                {/* <span className="inline-block text-cyan-400 font-medium group-hover:underline transition-all duration-300">View Project →</span> */}
              </div>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 