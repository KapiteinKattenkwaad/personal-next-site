'use client';
import { motion } from 'framer-motion';
import { a, span } from 'framer-motion/client';

const experiences = [
    {
        company: 'BugHerd',
        link: 'https://bugherd.com/',
        role: 'Software Developer',
        period: 'Feb 2023 – May 2025',
        stack: 'React (TypeScript), Ruby on Rails, Node.js',
    },
    {
        company: 'Icon Agency',
        link: 'https://iconagency.com.au/',
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

export default function WorkExperience() {
    return (

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
                        <h3 className="text-xl font-semibold">
                            {exp.role} &nbsp;
                           
                            {
                                exp.link ? (
                                    <a className='relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-cyan-400 after:via-blue-500 after:to-purple-600' href={exp.link} target='_blank'>
                                        @ {exp.company}
                                    </a>
                                )
                                    : <span>
                                       @  {exp.company}
                                    </span>
                            }

                        </h3>
                        <p className="text-sm text-neutral-400 mb-1">{exp.period}</p>
                        <p className="text-sm text-neutral-300">Stack: {exp.stack}</p>
                    </motion.div>
                ))}
            </div>
        </section>

    )
}