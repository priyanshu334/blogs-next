// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Container from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";

// This function enables Next.js 16 high-performance caching
async function getPost(slug: string) {
  const supabase = await createClient();
  
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  return post;
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound(); // Triggers the 404 page if the slug doesn't exist
  }

  return (
    <article className="py-24">
      <Container>
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-4">
            <Badge>{post.category}</Badge>
            <h1 className="text-5xl font-bold tracking-tight">{post.title}</h1>
            <p className="text-xl text-muted-foreground">{post.excerpt}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
            <Separator />
          </div>

          {/* Render Markdown or Plain Text Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {post.content}
          </div>
        </div>
      </Container>
    </article>
  );
}