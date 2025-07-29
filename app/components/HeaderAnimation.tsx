import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HeaderAnimation = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="absolute inset-0 ">
                <div className="flex flex-col justify-center h-full max-w-3xl text-white px-4 mx-auto">
                    {/* Avatar/logo on top for mobile, after name for desktop */}
                    <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-2 items-start">
                        {/* Mobile: avatar above, Desktop: avatar after name */}
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="md:hidden w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-1 flex items-center justify-center mb-4">
                            <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image
                                    width={120}
                                    height={120}
                                    src="/avatar.jpeg"
                                    alt="Max Stouten portrait"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="text-3xl flex items-center flex-wrap  text-white text-left"
                        >
                            <motion.span
                                className="text-3xl md:text-4xl mr-2 md:mr-4 my-auto"
                                initial={{ rotate: 0 }}
                                animate={{ rotate: [0, 20, -10, 20, -5, 0] }}
                                transition={{ delay: 1, duration: 1.2, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
                            >
                                👋
                            </motion.span>
                            Hi! I'm Max Stouten

                            <span className="hidden md:inline-block ml-4 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-1">
                                <span className="relative w-full h-full rounded-full overflow-hidden block">
                                    <Image
                                        width={200}
                                        height={200}
                                        src="/avatar.jpeg"
                                        alt="Max Stouten portrait"
                                        className="w-full h-full object-cover"
                                    />
                                </span>
                            </span>

                        </motion.h1>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="text-lg md:text-3xl mb-6 text-gray-300 text-left max-w-3xl"
                    >
                        A full-stack software engineer looking for new problems that need creative, robust solutions.
                    </motion.h2>

                    {/* Pills for programming languages with framer-motion staggered animation */}
                    <motion.div
                        className="flex flex-row flex-wrap gap-3 mb-10 items-start"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { delay: 0.7, staggerChildren: 0.18 } },
                        }}
                    >
                        {/* React pill */}
                        <motion.span
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#20232a] font-semibold text-base shadow-md border border-[#61dafb]"
                        >
                            <Image width={10} height={10} src="/assets/react_logo.svg" alt="React" className="w-5 h-5" style={{ filter: "invert(1)" }} /> React
                        </motion.span>
                        {/* TypeScript pill */}
                        <motion.span
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#007acc] font-semibold text-base shadow-md border border-[#007acc] text-white"
                        >
                            <Image width={10} height={10} src="/assets/typescript_logo.svg" alt="TypeScript" className="w-5 h-5" style={{ filter: "invert(1)" }} /> TypeScript
                        </motion.span>
                        {/* Node.js pill */}
                        <motion.span
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#30330c] font-semibold text-base shadow-md border border-[#8cc84b] "
                        >
                            <Image width={10} height={10} src="/assets/node_logo.svg" alt="Node.js" className="w-5 h-5" style={{ filter: "invert(1)" }} /> Node.js
                        </motion.span>
                        {/* Ruby on Rails pill */}
                        <motion.span
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#c00] font-semibold text-base shadow-md border border-[#c00] text-white"
                        >
                            <Image width={10} height={10} src="/assets/rails_logo.svg" alt="Ruby on Rails" className="w-5 h-5" style={{ filter: "invert(1)" }} /> Ruby on Rails
                        </motion.span>
                        {/* Vue.js pill */}
                        <motion.span
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#31475E] font-semibold text-base shadow-md border border-[#40B47F] text-white"
                        >
                            <Image width={10} height={10} src="/assets/vuejs_logo.svg" alt="Vue.js" className="w-5 h-5" style={{ filter: "invert(1)" }} /> Vue.js
                        </motion.span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: .5, duration: .7 }}
                    >
                        <a
                            className='inline-block border-b-2 border-white hover:border-b-blue-500 hover:text-blue-500 transition-all'
                            target="_blank" href="https://drive.google.com/file/d/1PKCyKiFAW8ceMIS9IYG6CPIjR8w7V6Cq/view?usp=sharing">
                            See resume
                        </a>
                        <motion.span
                         initial={{ opacity: 0, y: 30 }}
                         animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: .8  }}
                        >

                            <a
                                className='inline-block border-b-2 ml-6 border-white hover:border-b-blue-500 hover:text-blue-500 transition-all'
                                target="_blank" href="mailto:maxstouten@gmail.com">
                                Email me
                            </a>
                        </motion.span>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HeaderAnimation;