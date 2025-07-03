'use client';

import Link from 'next/link';

export default function Navigation() {
    return (
        <div className="w-full max-w-4xl mx-auto pb-20 font-bold mt-10 flex items-center gap-6">
            <Link
                href="/"
                className="group relative transition-transform hover:scale-110 hover:opacity-80"
            >
                Home
            </Link>
            <Link
                href="/blog"
                className="group relative transition-transform hover:scale-110 hover:opacity-80"
            >
                Blog
            </Link>
        </div>
    )
}