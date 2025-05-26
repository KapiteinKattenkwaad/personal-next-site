import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Max Stouten – Software Developer',
  description: 'Portfolio of Max Stouten, a full‑stack TypeScript developer specialised in React, Node.js & Ruby on Rails.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-950 text-neutral-100`}>{children}</body>
    </html>
  );
}