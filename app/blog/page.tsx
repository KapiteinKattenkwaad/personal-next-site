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
      <h1 className="text-3xl md:text-4xl font-bold mb-10">Blog</h1>
      <BlogList posts={posts} />
    </section>
  );
} 