import { getPostBySlug } from '@/lib/posts';
import { getDictionary } from '@/lib/get-dictionary';
import { MDXRemote } from 'next-mdx-remote/rsc';
import BackButton from '@/components/BackButton';

type Props = {
  params: Promise<{ slug: string; lang: 'pt' | 'en' }>;
};

export default async function PostPage({ params }: Props) {
  const { slug, lang } = await params;
  const post = await getPostBySlug(slug, lang);
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-background py-16 px-6 relative z-10">
      <div className="max-w-3xl mx-auto">
        <nav className="flex flex-col mb-12 border-l border-primary/20 pl-4">
          <BackButton 
            href={`/${lang}`} 
            label={dict.blog.backToHome} 
          />
          <BackButton 
            href={`/${lang}/blog`} 
            label={dict.blog.backToBlog} 
          />
        </nav>
        <article>
          <header className="mb-10 border-b border-primary/20 pb-8">
            <h1 className="text-4xl font-bold mb-4 font-display text-primary glow-cyan uppercase">
              {post.metadata.title}
            </h1>
            <time className="font-mono text-sm opacity-60">
              {">"} TIMESTAMP: {new Date(post.metadata.date).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US')}
            </time>
          </header> 
          <section className="prose prose-invert prose-cyan max-w-none font-body">
            <MDXRemote source={post.content} />
          </section>
        </article>
      </div>
    </main>
  );
}