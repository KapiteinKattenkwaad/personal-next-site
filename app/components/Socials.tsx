'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Socials() {
    return (
        <>
            <Link
                href="mailto:maxstouten@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative transition-transform hover:scale-110 hover:opacity-80"
                aria-label="Email"
            >
                <svg className='w-8 h-8 border p-1 border-white rounded-full transition-colors hover:bg-teal-500' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white text-xs px-2 py-1 rounded opacity-0 group-focus:opacity-100 group-hover:opacity-100 transition-opacity duration-300 delay-500 pointer-events-none whitespace-nowrap">
                Email
                </span>
            </Link>
            <Link
                href="https://www.linkedin.com/in/max-stouten"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative transition-transform hover:scale-110 hover:opacity-80"
                aria-label="LinkedIn Profile"
            >
                <Image
                    src="/assets/icons8-linkedin.svg"
                    alt="LinkedIn"
                    width={32}
                    height={32}
                    className="w-8 h-8 bg-white rounded-full transition-colors hover:bg-teal-500"
                />
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white text-xs px-2 py-1 rounded opacity-0 group-focus:opacity-100 group-hover:opacity-100 transition-opacity duration-300 delay-500 pointer-events-none whitespace-nowrap">
                    LinkedIn
                </span>
            </Link>
            <Link
                href="https://github.com/KapiteinKattenkwaad"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative transition-transform hover:scale-110 hover:opacity-80"
                aria-label="GitHub Profile"
            >
                <Image
                    src="/assets/icons8-github.svg"
                    alt="GitHub"
                    width={32}
                    height={32}
                    className="w-8 h-8 bg-white rounded-full transition-colors hover:bg-teal-500"
                />
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white text-xs px-2 py-1 rounded opacity-0 group-focus:opacity-100 group-hover:opacity-100 transition-opacity duration-300 delay-500 pointer-events-none whitespace-nowrap">
                    GitHub
                </span>
            </Link>
        </>
    )
}