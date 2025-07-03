'use client';
import { useState } from 'react';
import Image from 'next/image';

type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  cover: string;
  intro: string;
  tags?: string[];
  order?: number;
};

type BlogListProps = {
  posts: BlogPostMeta[];
};

function getAllTags(posts: BlogPostMeta[]): string[] {
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    if (post.tags) post.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet);
}

export default function BlogList({ posts }: BlogListProps) {
  const allTags = getAllTags(posts);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags && post.tags.includes(selectedTag))
    : posts;

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 ${selectedTag === null ? 'bg-cyan-400 text-black border-cyan-400' : 'bg-neutral-900 text-cyan-400 border-cyan-700 hover:bg-cyan-900'}`}
          onClick={() => setSelectedTag(null)}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 ${selectedTag === tag ? 'bg-cyan-400 text-black border-cyan-400' : 'bg-neutral-900 text-cyan-400 border-cyan-700 hover:bg-cyan-900'}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {filteredPosts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <div className="relative w-full h-48">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                {post.title}
              </h2>
              <p className="text-sm text-neutral-400 mb-1">{post.date}</p>
              <p className="text-sm text-neutral-300 mb-2">{post.intro}</p>
              {post.tags && Array.isArray(post.tags) && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-cyan-900 text-cyan-300 text-xs font-semibold uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <span className="inline-block text-cyan-400 font-medium group-hover:underline transition-all duration-300">Read more →</span>
            </div>
          </a>
        ))}
      </div>
    </>
  );
} 