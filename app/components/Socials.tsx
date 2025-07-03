'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Socials() {
    return (
        <>
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
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-500 pointer-events-none whitespace-nowrap">
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
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-500 pointer-events-none whitespace-nowrap">
                    GitHub
                </span>
            </Link>
        </>
    )
}