"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getPost } from "@/services/post";

interface Post {
    id?: string;
    ownerId?: string;
    title?: string;
    content?: string;
    created_at?: string;
    updated_at?: string;
}

const PostPage = () => {
    const searchParams = useSearchParams();
    const post_id = searchParams.get("post_id");
    const owner_id = searchParams.get("owner_id");

    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const formattedDate = (date: string | undefined) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const fetchPost = async (postId: string, ownerId: string) => {
        try {
            const response = await getPost(Number(postId), Number(ownerId));
            setPost(response);
        } catch (error) {
            console.error("Failed to fetch post:", error);
            setPost(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (post_id && owner_id) {
            fetchPost(post_id, owner_id);
        }
    }, [post_id, owner_id]);

    return (
        <div className="min-h-screen p-4">
            {loading ? (
                <div className="flex justify-center items-center">
                    <Skeleton className="w-full h-40 rounded-xl" />
                </div>
            ) : post ? (
                <div className="p-8">
                    <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
                    <h6 className="text-gray-500">
                        {formattedDate(post?.updated_at || post?.created_at)}
                    </h6>
                    <div className="prose lg:prose-xl mt-8" dangerouslySetInnerHTML={{ __html: post?.content || "" }} />
                </div>
            ) : (
                <div className="flex justify-center items-center h-full">
                    <p className="text-red-500">Post not found.</p>
                </div>
            )}
        </div>
    );
};

export default PostPage;