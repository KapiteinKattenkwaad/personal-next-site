'use client';
import { motion } from 'framer-motion';

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
        link: 'https://lunar.be/',
        role: 'Front‑end Developer',
        period: 'Feb 2021 – Dec 2021',
        stack: 'HTML, SCSS, JavaScript, Vue.js, Craft CMS',
    },
    {
        company: 'Liftov',
        role: 'Front‑end Web Developer',
        period: 'Aug 2019 – Dec 2020',
        stack: 'HTML, CSS, JavaScript, Vue.js, Prismic',
    },
];

export default function WorkExperience() {
    return (
        <section id="experience" className="w-full max-w-5xl mx-auto pb-24">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-10"
            >
                Experience
            </motion.h2>

            <div className="relative space-y-8">
                {experiences.map((exp, i) => (
                    <motion.div
                        key={exp.company}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="glass p-4 items-start md:items-center gap-4 md:gap-0 md:grid md:grid-cols-[auto_1fr_auto] md:gap-x-8 relative"
                        style={{ zIndex: 1 }}
                    >
                    
                        {/* Main content */}
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold">
                                {exp.role} {' '}
                                {exp.link ? (
                                    <a className='relative border-b-2 border-white hover:border-b-blue-500 hover:text-blue-500 transition-all' href={exp.link} target='_blank'>
                                        at {exp.company}
                                    </a>
                                ) : <span>at {exp.company}</span>}
                            </h3>
                            <p className="text-sm text-neutral-200 mb-1 md:mb-0">Stack: {exp.stack}</p>
                        </div>
                        {/* Date on right for desktop */}
                        <div className="hidden md:block text-right text-neutral-300 text-base min-w-[180px] pl-4">
                            {exp.period}
                        </div>
                        {/* Date below for mobile */}
                        <div className="md:hidden text-neutral-400 text-base mt-1 mb-2">
                            {exp.period}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}