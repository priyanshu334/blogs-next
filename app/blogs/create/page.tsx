'use client'

import Container from "@/components/layout/container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Foundations", "Systems", "Networking", "AI"];

export default function CreatePostPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Foundations"); // Default category
    const [loading, setLoading] = useState(false);

    const handlePublish = async () => {
        // Basic Validation
        if (!title || !slug || !content) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        const supabase = createClient(); // No need for 'await' with createBrowserClient

        const { error } = await supabase.from("posts").insert([
            {
                title,
                slug,
                excerpt,
                content,
                category,
                published: true,
            }
        ]);

        if (error) {
            toast.error(`Error: ${error.message}`);
            setLoading(false);
            return;
        }

        toast.success("Successfully created post!");
        
        // Refresh the page or redirect to the post
        router.push(`/blogs/${slug}`);
        router.refresh();
    };

    return (
        <section className="py-24">
            <Container>
                <div className="max-w-3xl mx-auto space-y-12">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-semibold tracking-tight">Create Article</h1>
                        <p className="text-muted-foreground">Document structured insights on computing and systems.</p>
                        <Separator />
                    </div>

                    <Card>
                        <CardContent className="p-8 space-y-8">
                            {/* Title */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <Input 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Why Foundations Matter Before AI" 
                                />
                            </div>

                            {/* Slug */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Slug</label>
                                <Input 
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="why-foundations-matter" 
                                />
                            </div>

                            {/* Category Selection */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium">Category</label>
                                <div className="flex gap-2 flex-wrap">
                                    {CATEGORIES.map((cat) => (
                                        <Badge 
                                            key={cat}
                                            variant={category === cat ? "default" : "secondary"}
                                            className="cursor-pointer transition-colors"
                                            onClick={() => setCategory(cat)}
                                        >
                                            {cat}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Excerpt */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Excerpt</label>
                                <Textarea
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    placeholder="Short summary of the article..."
                                    className="min-h-[100px]"
                                />
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Content (Markdown)</label>
                                <Textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write your article in markdown..."
                                    className="min-h-[300px]"
                                />
                            </div>

                            <div className="pt-4">
                                <Button 
                                    onClick={handlePublish} 
                                    disabled={loading} 
                                    className="w-full"
                                >
                                    {loading ? "Publishing..." : "Publish Article"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Container>
        </section>
    );
}