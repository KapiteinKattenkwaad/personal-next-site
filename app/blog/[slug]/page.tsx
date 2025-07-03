import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { marked, MarkedOptions } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

// PrismJS highlight setup
marked.setOptions({
  highlight: function (code: string, lang: string) {
    if (lang && Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    }
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  },
} as MarkedOptions);

// Required for dynamic routes in Next.js app directory
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'app/blog/posts');
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({ params }: any) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'app/blog/posts', `${slug}.md`);
  if (!fs.existsSync(filePath)) return {};
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);
  return {
    title: `${data.title} | Max Stouten`,
    description: data.intro,
    openGraph: {
      title: data.title,
      description: data.intro,
      images: data.cover ? [{ url: data.cover }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.intro,
      images: data.cover ? [data.cover] : [],
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'app/blog/posts', `${slug}.md`);
  if (!fs.existsSync(filePath)) return notFound();
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const html = marked(content);

  return (
    <article className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
        {data.title}
      </h1>
      <p className="text-neutral-400 mb-2">{data.date}</p>
      <div className="relative w-full h-64 mb-6">
        <Image src={data.cover} alt={data.title} fill className="object-cover rounded-lg" />
      </div>
      <p className="text-lg text-neutral-300 mb-6">{data.intro}</p>
      {data.tags && Array.isArray(data.tags) && (
        <div className="mb-6 flex flex-wrap gap-2">
          {data.tags.map((tag: string) => (
            <span key={tag} className="px-2 py-0.5 rounded bg-cyan-900 text-cyan-300 text-xs font-semibold uppercase tracking-wide">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
} 