"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RootState } from "./Navbar";
import { useSelector } from "react-redux";
import BlogEditor from "./Editor";
import { Input } from "../ui/input";
import { createPost, updatePost } from "@/services/post";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";

interface PostDialogProps {
    open: boolean;
    onOpenChange: () => void;
    title?: string;
    content?: string;
    update?: boolean;
    postId?: number;
}

const PostEditorDialog: React.FC<PostDialogProps> = ({
    open,
    onOpenChange,
    title,
    content,
    update,
    postId,
}) => {
    const [postTitle, setPostTitle] = useState<string>(title || "");
    const [postContent, setPostContent] = useState<string>(content || "");
    const router = useRouter();

    const userData = useSelector((state: RootState) => state);
    console.log(userData)

    const handleUpdateOrCreate = async () => {
        if (update && postId) {
            await updatePost(postId, { title: postTitle, content: postContent }, userData?.auth?.user?.access_token);
        } else {
            await createPost({ title: postTitle, content: postContent }, userData?.auth?.user?.access_token);
        }
        onOpenChange();
        router.push('/dashboard');
    };

    const postFormUI = () => {
        return (
            <>
                <Label>Post title</Label>
                <Input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Enter post title"
                />
                <Label>Post content</Label>
                <BlogEditor defaultValue={content || ""} onChange={(e) => setPostContent(e)} />

            </>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[80vw] h-fit max-w-[80vw] max-h-[80vh]" >
                <DialogHeader>
                    <DialogTitle>{update ? 'Update' : 'Create'} Post</DialogTitle>
                    <DialogDescription>
                        {title === "Update"
                            ? "Make changes to your post here. Click save when you're done."
                            : "Create a new post. Fill in the details below."}
                    </DialogDescription>
                </DialogHeader>

                {postFormUI()}

                <DialogFooter>
                    <Button type="button" onClick={handleUpdateOrCreate}>
                        {update ? 'Update' : 'Create'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PostEditorDialog;
