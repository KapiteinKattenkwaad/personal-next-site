"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Socials from '../components/Socials'

export default function Page() {
    return (
        <main>
            <section className="w-full max-w-xl mx-auto pb-24 pt-16 px-4 md:px-0 flex flex-col gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="w-40 h-40 mx-auto rounded-full mb-4 bg-gradient-to-br from-cyan-400 to-blue-600 p-1 shadow-lg"
                >
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                            src="/avatar.jpeg"
                            alt="Max Stouten portrait"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-center"
                >
                    Hi, I'm Max Stouten
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="text-lg text-neutral-300 mb-2 md:text-left text-center max-w-2xl mx-auto"
                >
                    I'm a passionate full-stack software developer focused on building beautiful, performant, and user-friendly web applications. I love working with <span className='text-cyan-400'>React</span>, <span className='text-cyan-400'>TypeScript</span>, and <span className='text-cyan-400'>Node.js</span>, and I'm always exploring new technologies and creative solutions.
                    <br />
                    <br />
                    When I'm not coding, you might find me experimenting with food hacks, enjoying the outdoors or reading a book (go and add me on <a href='https://www.goodreads.com/maximusreadimus' target='_blank' className='text-teal-500 underline '>Goodreads</a>).
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    className="text-lg text-neutral-300 mb-2 md:text-left text-center "
                >
                    <p className="mb-2 max-w-2xl mx-auto">Other technologies that I work with or use:</p>
                    <ul className="space-y-1 max-w-2xl mx-auto list-disc pl-4">
                        <li className='text-cyan-400'>Vue.js</li>
                        <li className='text-cyan-400'>Ruby on Rails</li>
                        <li className='text-cyan-400'>Next.js</li>
                        <li className='text-cyan-400'>Cursor (my go-to IDE)</li>
                        <li className='text-cyan-400'>Brave (my go-to privacy friendly browser)</li>
                        <li className='text-cyan-400'>Vercel and Netlify</li>
                    </ul>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex flex-col items-center gap-2 mt-8"
                >
                    <span className="text-cyan-400 font-semibold ">Let's connect!</span>
                    <div className="flex justify-center items-center gap-6 py-6 ">
                        <Socials />
                    </div>
                </motion.div>
            </section>
        </main>
    );
} 