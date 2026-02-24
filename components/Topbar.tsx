"use client"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function Navbar(){
    const router = useRouter()
    return (
        <nav className="flex items-center justify-between border border-b bg-background p-4 mx-auto">
            <Button variant={"link"}>
                Blogs App
            </Button>

            <div className="flex items-center justify-center">
                <Button variant={"ghost"}>
                    Blogs
                </Button>
                <Button>
                    Create
                </Button>

            </div>
            <Button>
                   Hello
            </Button>

        </nav>
    )
}