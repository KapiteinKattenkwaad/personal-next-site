'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'BugHerd',
    role: 'Software Developer',
    period: 'Feb 2023 – May 2025',
    stack: 'React (TypeScript), Ruby on Rails, Node.js',
  },
  {
    company: 'Icon Agency',
    role: 'Front‑end Developer',
    period: 'Jan 2022 – Feb 2023',
    stack: 'Vue 3, Next.js, SCSS, JavaScript, WordPress',
  },
  {
    company: 'Lunar',
    role: 'Front‑end Developer',
    period: 'Feb 2021 – Dec 2021',
    stack: 'HTML, SCSS, JavaScript, Craft CMS',
  },
  {
    company: 'Liftov',
    role: 'Front‑end Web Developer',
    period: 'Aug 2019 – Dec 2020',
    stack: 'HTML, CSS, JavaScript, Prismic',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 md:px-8 lg:px-16">
      {/* HERO */}
      <section className="flex flex-col items-center text-center pt-24 pb-32 gap-6 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden shadow-2xl animation float"
        >
          <Image
            src="/avatar.jpeg"
            alt="Max Stouten portrait"
            fill
            sizes="(max-width: 768px) 160px, 208px"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 via-sky-500 to-indigo-500 bg-clip-text text-transparent"
        >
          Hey, I'm <span className="inline-block origin-bottom-left inline-flex">Max Stouten <span className="inline-block animate-wave text-4xl">&nbsp; 👋</span></span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-lg md:text-xl text-neutral-300 max-w-xl"
        >
          Full-stack software developer focusing on React (TypeScript) &amp; Node.js. Currently crafting better bug-tracking experiences at <span className="font-semibold text-teal-400">BugHerd</span>.
        </motion.p>

        <motion.a
          href="#experience"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-teal-500 px-6 py-3 font-medium text-teal-400 hover:bg-teal-500 hover:text-neutral-950 transition-colors"
        >
          View my work
          <svg 
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </motion.a>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="w-full max-w-3xl pb-24">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-10"
        >
          Experience
        </motion.h2>

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="border-l-2 border-teal-500 pl-6 relative"
            >
              <h3 className="text-xl font-semibold">{exp.role} @ {exp.company}</h3>
              <p className="text-sm text-neutral-400 mb-1">{exp.period}</p>
              <p className="text-sm text-neutral-300">Stack: {exp.stack}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-neutral-800 py-10 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Max Stouten — Built with Next.js 15 &amp; Tailwind CSS
      </footer>
    </main>
  );
}