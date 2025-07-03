'use client';
import Socials from './Socials'

export default function Footer() {
    return (
        <div className="w-full">
            <div className="flex justify-center items-center gap-6 py-6 border-t border-neutral-800">
                <Socials />
            </div>
            <footer className="w-full border-t border-neutral-800 py-6 text-center text-sm text-neutral-500">
                © {new Date().getFullYear()} Max Stouten — Built with Next.js 15 &amp; Tailwind CSS
            </footer>
        </div>
    )
}