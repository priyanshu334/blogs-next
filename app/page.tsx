import Container from "@/components/layout/container";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";


export default async function BlogPage() {
    const supabase = await createClient()
 const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <header className="mb-20">
            <h1 className="text-4xl font-light tracking-tight mb-4">Insights</h1>
            <p className="text-muted-foreground text-lg font-light max-w-md">
              Long-form thinking on computing, systems, and structured learning.
            </p>
          </header>

          {/* Posts List */}
          <div className="flex flex-col gap-12">
            {posts?.map((post) => (
              <Link 
                key={post.slug} 
                href={`/dashboard/blogs/${post.slug}`}
                className="group block"
              >
                <article className="space-y-4 transition-all duration-300 group-hover:translate-x-1">
                  
                  {/* Metadata */}
                  <div className="flex items-center gap-3 text-[13px] uppercase tracking-widest text-muted-foreground font-medium">
                    <span>{post.tag}</span>
                    <span className="h-px w-8 bg-border" />
                    <span>{post.date}</span>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h2 className="text-2xl font-medium tracking-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed font-light line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read More / Arrow */}
                  <div className="pt-2 text-sm font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read post 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  
                </article>
              </Link>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}