"use client";

import React, { useEffect, useState } from "react";
import { getAllPosts, getUserPosts } from "@/services/post";
import BlogCard, { BlogCardProps } from "../molecules/BlogCard";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useSelector } from "react-redux";
import { RootState } from "./Navbar";


function BlogSection({ editable = false }: { editable?: boolean }) {
    const [blogData, setBlogData] = useState<BlogCardProps[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const LIMIT = 10;

    const userData = useSelector((state: RootState) => state);
    const handleFetchBlogData = async (pageNumber: number) => {
        try {
            const data = editable ? await getUserPosts(userData?.auth?.user?.user?.id) : await getAllPosts(LIMIT, pageNumber);
            if (data && data.length > 0) {
                setBlogData(data);
                if (data.length == LIMIT) setTotalPages(page + 1);
            } else {
                console.error("Invalid data received from API");
            }
        } catch (error) {
            console.error("Error fetching blog data:", error);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    useEffect(() => {
        handleFetchBlogData(page);

    }, [page]);

    return (
        <div className="min-h-screen flex flex-col p-6 h-full w-full ">
            <h1 className="text-3xl font-bold mb-4">{editable ? "Access your own blogs" : "Access blogs"}</h1>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                {blogData.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        id={blog.id}
                        title={blog.title}
                        content={blog.content}
                        created_at={blog.created_at}
                        updated_at={blog.updated_at}
                        owner={blog.owner}
                        editable={editable}
                        onEdit={() => handleFetchBlogData(page)}
                    />
                ))}
            </div>
            {!editable && (
                <div className="flex justify-center mt-4">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious onClick={handlePrevPage} />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                                <PaginationItem key={pageNumber}>
                                    <Button
                                        variant={pageNumber === page ? "default" : "outline"}
                                        onClick={() => setPage(pageNumber)}
                                    >
                                        {pageNumber}
                                    </Button>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext onClick={handleNextPage} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}

        </div>
    );
}

export default BlogSection;

