'use client';

export default function Footer() {
    return (
        <footer className="w-full border-t border-neutral-800 py-10 text-center text-sm text-neutral-500">
            © {new Date().getFullYear()} Max Stouten — Built with Next.js 15 &amp; Tailwind CSS
        </footer>

    )
}