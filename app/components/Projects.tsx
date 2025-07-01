'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    title: 'Dark mode | BugHerd',
    description: 'The whole BugHerd app and sidebar extensionfinally got dark mode. Oh, the css variables!',
    image: '/assets/bh-darkmode.png',
    link: 'https://updates.bugherd.com/release/esapQ-welcome-to-the-dark-side',
  },
  {
    title: 'iXpole | CMS',
    description: 'A headless CMS with Vue.js and Prismic and a few teeny tiny animations, have a good peek.',
    image: '/assets/ixpole.png',
    link: 'https://www.ixpole.com/',
  },
  {
    title: 'Portfolio Website',
    description: 'A custom website built with Next.js, Tailwind CSS, and Framer Motion, retrieving data from Contentful. The client was content',
    image: '/assets/ally-portfolio.png',
    link: 'https://ally-site-portfolio.vercel.app',
  },
  // {
  //   title: 'Blog Engine',
  //   description: 'A markdown-powered blog engine with custom CMS and live preview.',
  //   image: '/avatar.jpeg',
  //   link: 'https://example.com/blog',
  // },
  // {
  //   title: 'Weather Dashboard',
  //   description: 'A real-time weather dashboard using OpenWeatherMap API and Chart.js.',
  //   image: '/avatar.jpeg',
  //   link: 'https://example.com/weather',
  // },
  // {
  //   title: 'Chat Application',
  //   description: 'A real-time chat app with WebSocket and user authentication.',
  //   image: '/avatar.jpeg',
  //   link: 'https://example.com/chat',
  // },
];

export default function Projects() {
  return (
    <section id="projects" className="w-full max-w-5xl mx-auto pb-24">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-10"
      >
        Some of my projects
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group block bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 cursor-pointer"
          >
            <div className="relative w-full h-48">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:opacity-90 transition-opacity duration-300"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                {project.title}
              </h3>
              <p className="text-sm text-neutral-300 mb-2">{project.description}</p>
              <span className="inline-block text-cyan-400 font-medium group-hover:underline transition-all duration-300">View Project →</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
} 