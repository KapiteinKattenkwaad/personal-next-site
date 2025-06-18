'use client';

import HeaderAnimation from './components/HeaderAnimation';
import WorkExperience from './components/WorkExperience';
import Footer from './components/Footer';


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <HeaderAnimation />
      <WorkExperience />
      <Footer />
    </main>
  );
}