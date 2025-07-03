import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import BlogList from '../components/BlogList';

// Directory for markdown posts
const postsDirectory = path.join(process.cwd(), 'app/blog/posts');

type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  cover: string;
  intro: string;
  tags?: string[];
  order?: number;
};

function getPosts(): BlogPostMeta[] {
  return fs.readdirSync(postsDirectory)
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      return {
        slug: filename.replace(/\.md$/, ''),
        ...data,
      } as BlogPostMeta;
    })
    .sort((a, b) => {
      if (a.order === undefined && b.order === undefined) return 0;
      if (a.order === undefined) return 1;
      if (b.order === undefined) return -1;
      return a.order - b.order;
    });
}

export default function BlogPage() {
  const posts = getPosts();
  return (
    <section className="w-full max-w-4xl mx-auto pb-24">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Blog</h1>
      <p >
        My <a href="https://maggieappleton.com/garden-history/" target="_blank" className="text-teal-500">digital garden</a>. I write about things I'm learning about and other things I find handy.
      </p>
      <p className="mb-8">
        I'd like to come back to some posts and add more content to them as I learn more.
      </p>
      <BlogList posts={posts} />
    </section>
  );
}

export const metadata = {
  title: "Blog | Max Stouten",
  description: "Read articles and tutorials by Max Stouten on frontend, backend, and food hacks.",
  openGraph: {
    title: "Blog | Max Stouten",
    description: "Read articles and tutorials by Max Stouten on frontend, backend, and food hacks.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Max Stouten",
    description: "Read articles and tutorials by Max Stouten on frontend, backend, and food hacks.",
  },
}; 