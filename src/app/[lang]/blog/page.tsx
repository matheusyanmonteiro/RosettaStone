import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import BackButton from "@/components/BackButton";
import { getDictionary } from '@/lib/get-dictionary';

export default async function BlogPage({ params }: { params: Promise<{ lang: any }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const posts = getAllPosts(lang);

  return (
    <main className="max-w-4xl mx-auto p-10 relative z-10">
      <BackButton 
        href={`/${lang}`} 
        label={dict.blog.backToHome} 
      />

      <header className="mb-16">
        <h1 className="text-4xl font-bold font-display text-primary glow-cyan glitch uppercase" data-text={dict.blog.title}>
          {dict.blog.title}
        </h1>
        <p className="font-mono text-xs text-muted-foreground mt-2 opacity-60">
          {">"} DIRECTORY: /ROOT/SYSTEM/DATA_DUMP
        </p>
      </header>

      <div className="flex flex-col gap-8">
        {posts.map((post, index) => (
          <Link key={post.slug} href={`/${lang}/blog/${post.slug}`} className="group relative">
            <div className="border border-border bg-card/40 backdrop-blur-sm p-8 hover:border-primary/50 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/30 group-hover:border-primary" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/30 group-hover:border-primary" />
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h2 className="text-2xl font-display tracking-wider text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <span className="font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                  [{new Date(post.date).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US')}]
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 font-body">
                {post.description}
              </p>
              <div className="font-mono text-[10px] text-primary/60 group-hover:text-primary transition-colors">
                {">"} READ_FULL_ENTRY
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}