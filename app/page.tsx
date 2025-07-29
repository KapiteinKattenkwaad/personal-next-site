'use client';

import HeaderAnimation from './components/HeaderAnimation';
import Recommendations from './components/Recommendations';
import Projects from './components/Projects';
import WorkExperience from './components/WorkExperience';
import Footer from './components/Footer';


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <HeaderAnimation />
      <Recommendations />
      <Projects />
      <WorkExperience />
      <Footer />
    </main>
  );
}