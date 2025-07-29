'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const recommendations = [
    {
        name: 'Alistair Munnings',
        company: 'Icon Agency',
        profileImg: 'https://media.licdn.com/dms/image/v2/D5603AQHwI18e8NfMiQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1733071104150?e=1756944000&v=beta&t=Okn9hVR1jz1mrHpH_MoPxDJekxnIbbRQD9fsAGCmtuo',
        link: 'https://www.linkedin.com/in/almunnings',
        role: 'Technical Lead',
        description: `I highly recommend Max for any dev position he's considering. Max and I have worked together in a hybrid backend/frontend role on multiple projects, and he's helped me plan and research for larger headless applications, build WordPress sites and intranets, maintained legacy Vue codebases, contributed to Department of Defence style libraries, integrated, researched and developed new technologies, built interactive Drupal features, built conceptual D3.js visualisations, helped on quoting and has just been all-round great guy.

Max is a skilled dev. He's got a solid understanding of the base dev stack, including HTML/CSS, VueJS, Craft CMS (fe/be), WordPress (fe/be), Drupal (fe), Twig Templating, and has been developing in a Docker environment, utilising Cloud based deployments (Amazee Lagoon, GovCMS & Custom). Max adapted and figured out our dev stack and workflows almost immediately. He hit the ground running. He has a natural talent for problem-solving and is always eager to learn new technologies to enhance his skillset.

A couple of the things that set Max apart from other developers is his communication skills and ability to think creatively. He has shown personability, adaptability and knowledge. He speaks up when a new or alternative way presents itself. 

He's got a keen interest in developing with GraphQL on platforms such as Storyblock, Nuxt, and custom in-house APIs. He made impressive team presentations with working MVPs that were persuasive and exciting. His ability to stay up-to-date with the latest technologies and trends in the field is impressive and makes him a valuable resource.

In addition to his technical skills, Max is an excellent person. He's reliable, efficient, and goes above and beyond to ensure that his teammates are happy, and the job is done. He's got a cool demeanour that would make him perfect for future mentoring positions.

I have no doubt that Max would be an excellent addition to any development team. If his skill sets don't align exactly to your requirements, he's the kind of dev that'll learn, and grow with you. 

I can confidently say that Max is a valuable asset. Max is a keeper.`,
    },
    {
        name: 'Richy Vong',
        company: 'BugHerd',
        profileImg: 'https://media.licdn.com/dms/image/v2/D5603AQE3cLphjVnoWw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1676288165224?e=1756944000&v=beta&t=oBZR_jXGXMdF8OozmA0qyS9zK__i5rgZtTnO1Mwvybs',
        link: 'https://www.linkedin.com/in/richy-vong-4357b548',
        role: 'Design Lead',
        description: `Max is one of the most well-rounded software engineers I’ve worked with, and a designer's dream.

            He joined BugHerd with a strong agency background, and for the past two years we’ve worked side-by-side in the product team. His agency experience shows in all the right ways: Clear communication, attention to detail, and the ability to deliver under pressure.

            But what really sets Max apart is how he’s grown into product development. He knows how to apply lean principles in testing ideas, and not afraid to throw something out if it’s not working.`,

    },
    {
        name: 'Marina Domoney',
        company: 'BugHerd',
        profileImg: 'https://media.licdn.com/dms/image/v2/C4D03AQHWshoht36cew/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1517020890839?e=1756944000&v=beta&t=lh_3vUbrh2Ee9WKDmONuAHL5ElqP7QZa3m_0bQKjFHk',
        link: 'https://www.linkedin.com/in/marina-domoney-53727b23',
        role: 'Senior Marketing Manager',
        description: `I had the pleasure of working with Max for over a year and although we weren’t in the same team, Max was definitely an asset to BugHerd and was very respected by everyone. 

                As someone in marketing, I really appreciated how he could take technical ideas and explain them in a way that made sense. 

                He’s very responsive, always willing to help out, and just a really solid team player. He cares about building things that actually work for users, not just ticking boxes.`,

    }
   
];

const formatDescription = (text: string) => {
    return text.split('\n\n').filter(paragraph => paragraph.trim() !== '');
};

const truncateText = (text: string, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return truncated.substring(0, lastSpace) + '...';
};

export default function Recommendations() {

    const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

    const toggleExpanded = (index: number) => {
        setExpandedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <section id="recommendations" className="w-full max-w-5xl mx-auto pb-24">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-10 md:flex"
            >
                What colleagues say about me
                <span className='hidden md:inline-flex mt-4 md:ml-auto md:mt-auto text-base relative border-b-2 border-white hover:border-b-blue-500 hover:text-blue-500 transition-all'>
                    <a href="https://www.linkedin.com/in/max-stouten/details/recommendations" target='_blank'>
                        More LinkedIn recommendations
                    </a>
                </span>
            </motion.h2>

            <div className="relative space-y-8">
                {recommendations.map((rec, i) => {
                    const isExpanded = expandedItems[i];
                    const paragraphs = formatDescription(rec.description);
                    const fullText = rec.description;
                    const truncatedText = truncateText(fullText);
                    const shouldTruncate = fullText.length > 200;

                    return (
                        <motion.div
                            key={`${rec.company}-${i}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="glass p-6 relative "
                            style={{ zIndex: 1 }}
                        >

                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-4">
                                    <Image
                                        alt={rec.name}
                                        className="rounded-full object-cover"
                                        width={48}
                                        height={48}
                                        src={rec.profileImg}
                                    />
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{rec.name}</h3>
                                        <p className="text-sm text-neutral-300">
                                            {rec.role} at {rec.company}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-neutral-200 leading-relaxed">
                                    {shouldTruncate && !isExpanded ? (
                                        <div>
                                            <p>{truncatedText}</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {paragraphs.map((paragraph, idx) => (
                                                <p key={idx} className="text-sm md:text-base leading-relaxed text-neutral-200">
                                                    {paragraph.trim()}
                                                </p>
                                            ))}
                                        </div>
                                    )}

                                    {shouldTruncate && (
                                        <button
                                            onClick={() => toggleExpanded(i)}
                                            className="mt-3 cursor-pointer text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 rounded px-1"
                                        >
                                            {isExpanded ? 'Read less' : 'Read more'}
                                        </button>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <a
                                        href={rec.link}
                                        target='_blank'
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                        View LinkedIn Profile
                                    </a>
                                </div>
                            </div>

                        </motion.div>
                    );
                })}
            </div>
            <a
                className='inline-block md:hidden mt-8 md:ml-auto md:mt-auto text-base relative border-b-2 border-white hover:border-b-blue-500 hover:text-blue-500 transition-all'
                href="https://www.linkedin.com/in/max-stouten/details/recommendations" target='_blank'>
                More LinkedIn recommendations
            </a>
        </section>
    )
}